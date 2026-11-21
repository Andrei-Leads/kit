import type { Metadata } from "next";
import { iniciales, metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { Foto } from "@/components/base/Foto";
import { Encabezado } from "@/components/Encabezado";
import { Cuadrado } from "@/components/Iconos";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { cifras } from "@/lib/cifras";
import { mensajeInicio } from "@/lib/mensajes";
import { lineaHorario, textoLlamar } from "@/lib/textos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/empresa", titulo: "Quiénes somos" });

/**
 * /empresa (corta): historia y cifras; equipo (foto 1:1 o la inicial en un cuadrado); acreditaciones,
 * garantías y marcas. Con todo vacío: descripción y zonas. Siempre, el CTA final.
 */
export default async function Page() {
  const { negocio, contacto, empresa, acreditaciones, garantias, marcas, zonas } = config;
  const lista = await cifras(config);
  const haySolvencia = acreditaciones.length > 0 || garantias.length > 0 || marcas.length > 0;
  const vacia = empresa.historia.length === 0 && empresa.equipo.length === 0 && !haySolvencia && lista.length === 0;
  return (
    <>
      <Encabezado
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/empresa", texto: "Empresa" },
        ]}
        titulo="Quiénes somos"
      >
        {(empresa.historia.length > 0 || lista.length > 0) && (
          <div className="mt-7 flex flex-wrap gap-x-16 gap-y-8">
            {empresa.historia.length > 0 && (
              <div className="max-w-[65ch] min-w-0 flex-[3_1_480px]">
                {empresa.historia.map((p) => (
                  <p key={p} className="mb-[1em] text-cuerpo">
                    {p}
                  </p>
                ))}
              </div>
            )}
            {lista.length > 0 && (
              <dl className="min-w-0 flex-[2_1_300px]">
                {lista.map((c) => (
                  <div key={c.antes} className="border-t border-borde pt-2.5 pb-3.5">
                    <dt className="text-sm text-texto-suave">{c.antes}</dt>
                    <dd className="condensada mt-0.5 text-[2.5rem] leading-none tracking-normal text-primario-luz tabular-nums">{c.cifra}</dd>
                    {c.despues && <dd className="mt-1 text-sm text-texto-suave">{c.despues}</dd>}
                  </div>
                ))}
              </dl>
            )}
          </div>
        )}
      </Encabezado>

      {empresa.imagenes.length > 0 && (
        <section className="border-t border-borde">
          <div className="contenedor grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-4 py-[clamp(40px,6vw,80px)]">
            {empresa.imagenes.map((im) => (
              <Foto key={im.src} imagen={im} sizes="(min-width: 1024px) 380px, calc(100vw - 32px)" proporcion="4/3" />
            ))}
          </div>
        </section>
      )}

      {empresa.equipo.length > 0 && (
        <section className="border-t border-borde">
          <div className="contenedor py-[clamp(40px,6vw,80px)]">
            <h2 className="condensada mb-6 text-h2">El equipo</h2>
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-6">
              {empresa.equipo.map((m) => (
                <li key={m.nombre}>
                  {m.foto ? (
                    <Foto imagen={m.foto} sizes="200px" proporcion="1/1" />
                  ) : (
                    <div aria-hidden="true" className="condensada flex aspect-square items-center justify-center border border-borde bg-superficie text-[4.5rem] leading-none text-primario-luz">
                      {iniciales(m.nombre).charAt(0)}
                    </div>
                  )}
                  <p className="mt-2.5 font-bold">{m.nombre}</p>
                  {m.cargo && <p className="mt-0.5 text-sm text-texto-suave">{m.cargo}</p>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {haySolvencia && (
        <section className="border-t border-borde">
          {(acreditaciones.length > 0 || garantias.length > 0) && (
            <div className="contenedor flex flex-wrap gap-x-16 gap-y-8 py-[clamp(40px,6vw,80px)]">
              {acreditaciones.length > 0 && (
                <div className="min-w-0 flex-[1_1_320px]">
                  <h2 className="condensada border-b-3 border-primario-luz pb-3 text-[1.75rem] leading-none">Acreditaciones</h2>
                  <ul>
                    {acreditaciones.map((a) => (
                      <li key={a.nombre} className="flex flex-wrap justify-between gap-x-4 gap-y-1 border-b border-borde py-3">
                        <span>{a.nombre}</span>
                        {a.numero && <span className="text-texto-suave tabular-nums">{a.numero}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {garantias.length > 0 && (
                <div className="min-w-0 flex-[1_1_320px]">
                  <h2 className="condensada border-b-3 border-primario-luz pb-3 text-[1.75rem] leading-none">Garantías</h2>
                  <ul>
                    {garantias.map((g) => (
                      <li key={g} className="flex items-baseline gap-3 border-b border-borde py-3">
                        <Cuadrado />
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          {marcas.length > 0 && (
            <p className="contenedor pb-[clamp(40px,6vw,80px)] text-sm text-texto-suave first:pt-[clamp(40px,6vw,80px)]">
              Trabajamos con{" "}
              <span className="condensada text-2xl tracking-[0.02em] text-texto uppercase">{marcas.join(" · ")}</span>
            </p>
          )}
        </section>
      )}

      {vacia && (
        <section className="border-t border-borde">
          <div className="contenedor py-[clamp(40px,6vw,80px)]">
            <p className="mb-4 max-w-[60ch]">{negocio.descripcionCorta}</p>
            {zonas.length > 0 && <p className="condensada text-2xl uppercase">{zonas.join(" / ")}</p>}
          </div>
        </section>
      )}

      <CtaFinal
        telefono={contacto.telefono}
        whatsapp={contacto.whatsapp}
        mensaje={mensajeInicio(contacto)}
        textoLlamar={textoLlamar(contacto)}
        horario={lineaHorario(contacto)}
      />
    </>
  );
}
