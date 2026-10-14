import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";
import { Check } from "lucide-react";

import { Foto } from "@/components/Foto";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Zonas } from "@/components/secciones/Zonas";
import config from "@/site.config";
import { anioActual } from "@/lib/anio";
import { seccion } from "@/lib/estilos";
import { mensajeGeneral } from "@/lib/mensajes";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/empresa", titulo: "Quiénes somos" });

const h2Bloque = "m-0 text-2xl leading-[1.15] font-extrabold md:text-[32px]";

function iniciales(nombre: string): string {
  return nombre
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

export default async function Page() {
  const { negocio, empresa, garantias, acreditaciones, marcas, zonas, contacto } = config;
  const anio = negocio.anioFundacion;
  const anios = anio ? (await anioActual()) - anio : undefined;
  const historia = empresa.historia.slice(0, 2);

  return (
    <>
      <section className={`contenedor flex flex-col gap-7 ${seccion}`}>
        <div className="flex flex-col gap-2.5">
          <h1 className="m-0 text-[32px] leading-[1.05] font-extrabold tracking-[-0.015em] md:text-[56px]">
            Quiénes somos
          </h1>
          <p className="m-0 max-w-[56ch] text-[19px] text-pretty text-tinta-suave">{negocio.descripcionCorta}</p>
        </div>

        {anio && anios !== undefined && (
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-y border-linea py-4">
            <strong className="text-[34px] leading-none font-extrabold tabular-nums md:text-[56px]">
              Desde {anio}
            </strong>
            {anios > 0 && <span className="text-lg text-tinta-suave">{anios} años</span>}
          </div>
        )}

        {(historia.length > 0 || empresa.imagenes.length > 0) && (
          <div className="grid items-start gap-7 md:grid-cols-2 md:gap-14">
            {historia.length > 0 && (
              <div className="flex flex-col gap-3">
                {historia.map((p) => (
                  <p key={p} className="m-0 text-lg text-pretty">
                    {p}
                  </p>
                ))}
              </div>
            )}
            {empresa.imagenes.length > 0 && (
              <ul className="m-0 grid list-none grid-cols-2 gap-2.5 p-0">
                {empresa.imagenes.map((img) => (
                  <li key={img.src}>
                    <Foto imagen={img} proporcion="1/1" sizes="(min-width: 1120px) 270px, (min-width: 768px) 25vw, 50vw" />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {empresa.equipo.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className={h2Bloque}>Equipo</h2>
            <ul className="m-0 grid list-none grid-cols-1 gap-2.5 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {empresa.equipo.map((m) => (
                <li
                  key={m.nombre}
                  className="flex items-center gap-3 rounded-md border border-linea bg-tarjeta p-3"
                >
                  {m.foto ? (
                    <Foto imagen={m.foto} proporcion="1/1" sizes="52px" decorativa className="w-[52px] flex-none" />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="grid size-[52px] flex-none place-items-center rounded-md bg-tinta text-xl font-extrabold text-white"
                    >
                      {iniciales(m.nombre)}
                    </span>
                  )}
                  <span className="flex flex-col leading-tight">
                    <strong className="text-[17px]">{m.nombre}</strong>
                    {m.cargo && <span className="text-[15px] text-tinta-suave">{m.cargo}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {garantias.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className={h2Bloque}>Garantías</h2>
            <ul className="m-0 grid list-none grid-cols-1 gap-2 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {garantias.map((g) => (
                <li key={g} className="flex items-start gap-2.5 rounded-md border border-linea bg-tarjeta px-3.5 py-3">
                  <Check aria-hidden="true" className="mt-0.5 size-5 flex-none text-acero" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {acreditaciones.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className={h2Bloque}>Acreditaciones</h2>
            <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
              {acreditaciones.map((a) => (
                <li key={a.nombre}>
                  <strong>{a.nombre}</strong>
                  {a.numero && <span className="text-tinta-suave tabular-nums"> {a.numero}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}

        {marcas.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className={h2Bloque}>Marcas con las que trabajamos</h2>
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              {marcas.map((m) => (
                <li key={m}>
                  <span className="inline-block rounded-md border border-linea bg-tarjeta px-3 py-2 font-semibold">
                    {m}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <Zonas zonas={zonas} telefono={contacto.telefono} />
      <CtaFinal telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensajeGeneral(contacto)} />
    </>
  );
}
