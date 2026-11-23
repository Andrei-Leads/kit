import type { Metadata } from "next";
import { iniciales, metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { CifrasFachada } from "@/components/secciones/CifrasFachada";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { ListaGarantias } from "@/components/secciones/Garantias";
import { ListaZonas } from "@/components/secciones/ZonasPreguntas";
import { anioActual } from "@/lib/anio";
import { mensajeInicio, TEXTO_WA } from "@/lib/mensajes";
import { cifras } from "@/lib/textos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/empresa", titulo: "Empresa" });

/**
 * Empresa (Interiores.dc.html): h1 con el nombre y la descripción a la izquierda, la historia a la
 * derecha; las cifras; las fotos del taller en 3:2; «Quiénes somos» (iniciales en un círculo, como
 * en el diseño: `equipo[].foto` no se pinta, porque a 56 px no cabe la etiqueta de origen) y
 * «Nuestras garantías» lado a lado; y el CTA final. Cada bloque solo con datos. Sin historia,
 * equipo ni fotos, la página queda en la descripción, las zonas y el CTA.
 */
export default async function Page() {
  const { negocio, contacto, empresa, garantias, acreditaciones, marcas, zonas } = config;
  const anio = await anioActual();
  const listaCifras = cifras(config, anio);
  const hayGarantias = garantias.length > 0 || acreditaciones.length > 0 || marcas.length > 0;
  const hayEquipo = empresa.equipo.length > 0;
  const vacia = empresa.historia.length === 0 && empresa.imagenes.length === 0 && !hayEquipo;

  return (
    <>
      <span data-pagina="empresa" hidden />
      <section className="contenedor pt-2 pb-[clamp(48px,2rem+4vw,88px)]">
        <Migas
          migas={[
            { href: "/", texto: "Inicio" },
            { href: "/empresa", texto: "Empresa" },
          ]}
        />
        <div className="mt-2 flex flex-wrap gap-x-16 gap-y-7">
          <div className="flex flex-[1_1_340px] flex-col gap-4">
            <h1 className="titulo-display">{negocio.nombre}</h1>
            <p className="text-[clamp(1.125rem,1rem+0.5vw,1.375rem)] leading-normal">{negocio.descripcionCorta}</p>
          </div>
          {empresa.historia.length > 0 && (
            <div className="flex flex-[1.2_1_340px] flex-col gap-4 pt-2">
              {empresa.historia.map((p) => (
                <p key={p} className="text-texto-suave">
                  {p}
                </p>
              ))}
            </div>
          )}
        </div>
      </section>

      <CifrasFachada cifras={listaCifras} />

      {empresa.imagenes.length > 0 && (
        <section aria-label="El taller" className="contenedor pt-8">
          <ul className="grid gap-4 md:grid-cols-2">
            {empresa.imagenes.map((f, i) => (
              <li key={f.src}>
                <Foto imagen={f} proporcion="3/2" sizes="(min-width: 1200px) 568px, (min-width: 768px) 50vw, 100vw" preload={i === 0} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {(hayEquipo || hayGarantias) && (
        <section aria-label="Equipo y garantías" className="py-[clamp(48px,2rem+4vw,96px)]">
          <div className="contenedor flex flex-wrap gap-x-16 gap-y-12">
            {hayEquipo && (
              <div className="flex-[1_1_320px]">
                <h2 className="titulo-seccion mb-5">Quiénes somos</h2>
                <ul className="flex flex-col gap-2.5">
                  {empresa.equipo.map((e) => (
                    <li key={e.nombre} className="tarjeta flex items-center gap-4 px-[18px] py-3.5">
                      <span aria-hidden="true" className="flex size-14 flex-none items-center justify-center rounded-full bg-primario-suave text-[19px] font-extrabold">
                        {iniciales(e.nombre)}
                      </span>
                      <span className="flex flex-col">
                        <strong className="text-[17px]">{e.nombre}</strong>
                        {e.cargo && <span className="text-[15px] text-texto-suave">{e.cargo}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {hayGarantias && (
              <div className="flex-[1_1_320px]">
                <h2 className="titulo-seccion mb-5">{garantias.length > 0 ? "Nuestras garantías" : "Con quién trabajamos"}</h2>
                <ListaGarantias garantias={garantias} acreditaciones={acreditaciones} marcas={marcas} columnas={false} />
              </div>
            )}
          </div>
        </section>
      )}

      {vacia && zonas.length > 0 && (
        <section aria-labelledby="titulo-zonas" className="contenedor pb-[clamp(48px,2rem+4vw,96px)]">
          <h2 id="titulo-zonas" className="titulo-seccion mb-5">
            Dónde trabajamos
          </h2>
          <ListaZonas zonas={zonas} />
        </section>
      )}

      <div className={hayEquipo || hayGarantias || (vacia && zonas.length > 0) ? undefined : "mt-[clamp(48px,2rem+4vw,96px)]"}>
        <CtaFinal
          cta={{ telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje: mensajeInicio(contacto) }}
          titulo="¿Cómo quedaría tu fachada?"
          textoWhatsapp={TEXTO_WA}
        />
      </div>
    </>
  );
}
