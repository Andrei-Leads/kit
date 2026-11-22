import type { Metadata } from "next";
import { iniciales, metadatosPagina } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { EnElTaller } from "@/components/secciones/EnElTaller";
import { Garantias } from "@/components/secciones/Garantias";
import { ZonasPreguntas } from "@/components/secciones/ZonasPreguntas";
import { anioActual } from "@/lib/anio";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/empresa", titulo: "Quiénes somos" });

/**
 * /empresa (encargo §7): migas, h1, historia con «{n} años · Restaurando desde {año}», fotos del
 * taller en arcos, equipo (iniciales si no hay foto; nunca una cara de IA), en el taller, garantías,
 * zonas y CTA final. Cada bloque vacío se oculta.
 */
export default async function Page() {
  const { negocio, empresa, proceso, videoPano, contacto, garantias, acreditaciones, marcas, zonas, preguntas, galeria } = config;
  const anios = negocio.anioFundacion ? (await anioActual()) - negocio.anioFundacion : 0;
  const [primero, ...resto] = empresa.historia;
  return (
    <>
      <section className="contenedor pt-10">
        <Migas
          migas={[
            { href: "/", texto: "Inicio" },
            { href: "/empresa", texto: "Empresa" },
          ]}
        />
        <h1 className="titulo-display mt-3">Quiénes somos</h1>
        {(primero || anios > 0) && (
          <div className="mt-[clamp(24px,4vw,48px)] flex flex-wrap items-start gap-x-[clamp(40px,6vw,96px)] gap-y-6">
            {primero && (
              <div className="max-w-[62ch] min-w-0 flex-[1.4_1_360px]">
                <p className="text-[clamp(1.25rem,1.1rem+0.7vw,1.625rem)] leading-[1.4] text-pretty">{primero}</p>
                {resto.map((p) => (
                  <p key={p} className="mt-4 text-texto-suave text-pretty">
                    {p}
                  </p>
                ))}
              </div>
            )}
            {anios > 0 && (
              <p className="min-w-0 flex-[1_1_260px] border-l-[1.5px] border-borde pl-6">
                <strong className="block text-[clamp(2.5rem,2rem+2vw,4rem)] leading-none font-[660]">{anios === 1 ? "1 año" : `${anios} años`}</strong>
                <span className="mt-1.5 block text-texto-suave">Restaurando desde {negocio.anioFundacion}</span>
              </p>
            )}
          </div>
        )}
        {empresa.imagenes.length > 0 && (
          <ul aria-label="El taller" className="mt-[clamp(40px,6vw,72px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-4">
            {empresa.imagenes.map((f, i) => (
              <li key={f.src}>
                <Foto
                  imagen={f}
                  sizes="(min-width: 1280px) 384px, (min-width: 640px) 33vw, 100vw"
                  proporcion="4/5"
                  preload={i === 0 && !primero}
                  className="rounded-arco-medio"
                />
              </li>
            ))}
          </ul>
        )}
        {empresa.equipo.length > 0 && (
          <div className="mt-[clamp(48px,7vw,88px)]">
            <h2 className="mb-5 text-h2 font-[640]">El equipo</h2>
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,220px),1fr))] gap-5">
              {empresa.equipo.map((m) => (
                <li key={m.nombre} className="flex items-center gap-4">
                  {m.foto ? (
                    <Foto imagen={m.foto} sizes="72px" proporcion="1/1" posicionEtiqueta="ninguna" className="size-[72px] flex-none rounded-full" />
                  ) : (
                    <span aria-hidden="true" className="flex size-[72px] flex-none items-center justify-center rounded-full border-[1.5px] border-borde text-xl font-[620]">
                      {iniciales(m.nombre)}
                    </span>
                  )}
                  <span>
                    <strong className="block font-[620]">{m.nombre}</strong>
                    {m.cargo && <span className="text-[15px] text-texto-suave">{m.cargo}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
      <EnElTaller proceso={proceso} videoPano={videoPano} empresa={empresa} contacto={contacto} sinFoto />
      <Garantias garantias={garantias} acreditaciones={acreditaciones} marcas={marcas} anioFundacion={negocio.anioFundacion} />
      <ZonasPreguntas zonas={zonas} preguntas={preguntas} sinPreguntas />
      <CtaFinal galeria={galeria} empresa={empresa} contacto={contacto} />
    </>
  );
}
