import type { Metadata } from "next";
import { iniciales, listaY, metadatosPagina } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { Marco } from "@/components/Marco";
import { CabeceraInterior } from "@/components/secciones/CabeceraInterior";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Garantias } from "@/components/secciones/Garantias";
import { Zonas } from "@/components/secciones/Zonas";
import { mensajeInicio } from "@/lib/mensajes";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/empresa", titulo: "El taller" });

/**
 * /empresa «El taller» (encargo §7): historia y equipo (inicial en un rombo, sin fotos de
 * personas), fotos del taller, garantías, marcas y zonas. Con todo vacío: descripción, zonas y CTA.
 */
export default function Page() {
  const { negocio, contacto, empresa } = config;
  const conHistoria = empresa.historia.length > 0;
  const conEquipo = empresa.equipo.length > 0;
  return (
    <Marco actual="empresa">
      <CabeceraInterior
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/empresa", texto: "El taller" },
        ]}
        titulo="El taller"
        entradilla={negocio.descripcionCorta}
      />

      {(conHistoria || conEquipo) && (
        <section aria-label="Historia y equipo" className="pt-[clamp(32px,5vw,64px)]">
          <div className="contenedor grid items-start gap-[clamp(24px,4vw,64px)] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            {conHistoria && (
              <div>
                <h2 className="h2 mb-3.5">Historia</h2>
                {empresa.historia.map((p) => (
                  <p key={p} className="mb-3.5 max-w-[62ch] text-pretty">
                    {p}
                  </p>
                ))}
              </div>
            )}
            {conEquipo && (
              <div>
                <h2 className="h2 mb-3.5">Quiénes somos</h2>
                <ul className="grid gap-2">
                  {empresa.equipo.map((p) => (
                    <li key={p.nombre} className="hierro corte-tarjeta flex items-center gap-[18px] px-[18px] py-3.5">
                      {p.foto ? (
                        <Foto imagen={p.foto} sizes="56px" proporcion="1/1" etiquetaCompacta className="size-14 flex-none" />
                      ) : (
                        <span aria-hidden="true" className="m-1.5 grid size-11 flex-none rotate-45 place-items-center border border-acento">
                          <span className="-rotate-45 font-titulo text-2xl font-extrabold text-acento">{iniciales(p.nombre).charAt(0)}</span>
                        </span>
                      )}
                      <span>
                        <span className="block font-titulo text-2xl leading-none font-extrabold uppercase">{p.nombre}</span>
                        {p.cargo && <span className="mt-0.5 block text-[15px] text-texto-suave">{p.cargo}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {empresa.imagenes.length > 0 && (
        <section aria-label="Fotos del taller" className="pt-[clamp(32px,5vw,64px)]">
          <ul className="contenedor grid gap-3 lg:grid-cols-2">
            {empresa.imagenes.map((f) => (
              <li key={f.src} data-aparecer>
                <Foto imagen={f} sizes="(min-width: 1024px) 590px, calc(100vw - 32px)" proporcion="3/2" className="corte-tarjeta" />
              </li>
            ))}
          </ul>
        </section>
      )}

      <Garantias garantias={config.garantias} acreditaciones={config.acreditaciones} anioFundacion={negocio.anioFundacion} />
      {config.marcas.length > 0 && (
        <section aria-labelledby="titulo-marcas" className="pb-2">
          <div className="contenedor">
            <h2 id="titulo-marcas" className="h2 mb-2.5">
              Con qué trabajamos
            </h2>
            <p className="font-titulo text-[clamp(1.25rem,1rem+1vw,1.75rem)] font-bold uppercase">{listaY(config.marcas)}</p>
          </div>
        </section>
      )}
      <Zonas zonas={config.zonas} />
      <CtaFinal contacto={contacto} mensaje={mensajeInicio(contacto)} />
    </Marco>
  );
}
