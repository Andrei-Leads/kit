import type { Metadata } from "next";
import { listaY, metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { Foto } from "@/components/base/Foto";
import { CabeceraPagina } from "@/components/CabeceraPagina";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { anioActual } from "@/lib/anio";
import { mensajeInicio } from "@/lib/mensajes";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/empresa", titulo: "El obrador" });

/**
 * /empresa «El obrador» (entrega §07): la historia en condensada grande (sin historia, la
 * `descripcionCorta`), las fotos del obrador en blanco y negro (la primera 3:2 y ancha, el resto
 * 4:5), «Quién lo hace» como lista con líneas y la ficha del obrador (desde, garantías, herrajes,
 * acreditaciones, zonas): cada fila sin dato desaparece.
 */
export default async function Page() {
  const { negocio, empresa, garantias, marcas, acreditaciones, zonas, contacto } = config;
  const historia = empresa.historia.length > 0 ? empresa.historia : [negocio.descripcionCorta];
  const anio = negocio.anioFundacion;
  const anios = anio ? (await anioActual()) - anio : 0;
  const filas: [string, string][] = (
    [
      ["Desde", anio ? (anios > 0 ? `${anio} · ${anios} ${anios === 1 ? "año" : "años"}` : String(anio)) : ""],
      ["Garantías", listaY(garantias)],
      ["Herrajes", listaY(marcas)],
      ["Acreditaciones", listaY(acreditaciones.map((a) => (a.numero ? `${a.nombre} (n.º ${a.numero})` : a.nombre)))],
      ["Zonas", listaY(zonas)],
    ] as [string, string][]
  ).filter(([, v]) => v !== "");

  return (
    <>
      <CabeceraPagina
        pagina="empresa"
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/empresa", texto: "Obrador" },
        ]}
        titulo="El obrador"
      />
      <section aria-label="Historia" className="contenedor flex flex-col gap-[clamp(1.5rem,1rem+2vw,3rem)] pt-[clamp(1.5rem,1rem+2vw,3rem)]">
        {historia.map((p) => (
          <p key={p} className="ft m-0 max-w-[26ch] text-[clamp(1.75rem,1rem+3vw,4rem)] leading-[0.98] text-balance">
            {p}
          </p>
        ))}
        {empresa.imagenes.length > 0 && (
          <div className="flex flex-wrap items-start gap-(--calle-rejilla)">
            {empresa.imagenes.map((img, i) => (
              <Foto
                key={img.src}
                imagen={img}
                proporcion={i === 0 ? "3/2" : "4/5"}
                sizes={i === 0 ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 40vw, 100vw"}
                gris
                className={i === 0 ? "min-w-0 flex-[3_1_420px]" : "min-w-0 flex-[2_1_260px]"}
              />
            ))}
          </div>
        )}
        {empresa.equipo.length > 0 && (
          <section aria-labelledby="titulo-equipo" className="flex flex-col gap-2.5">
            <h2 id="titulo-equipo" className="titulo-h2 m-0">
              Quién lo hace
            </h2>
            <ul className="m-0 list-none border-t-2 border-borde p-0">
              {empresa.equipo.map((q) => (
                <li key={q.nombre} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b-2 border-borde py-2.5">
                  <span className="flex items-center gap-3.5">
                    {q.foto && <Foto imagen={q.foto} proporcion="1/1" sizes="64px" gris etiqueta="corta" className="w-16 flex-none" />}
                    <span className="ft text-[clamp(1.5rem,1.1rem+1.4vw,2.5rem)] leading-none">{q.nombre}</span>
                  </span>
                  {q.cargo && <span className="pie-ficha text-texto-suave">{q.cargo}</span>}
                </li>
              ))}
            </ul>
          </section>
        )}
        {filas.length > 0 && (
          <dl className="m-0 max-w-[900px] border-t-2 border-borde">
            {filas.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] items-baseline gap-3 border-b-2 border-borde py-2.5">
                <dt className="pie-ficha text-texto-suave">{k}</dt>
                <dd className="ft m-0 text-xl leading-[1.1]">{v}</dd>
              </div>
            ))}
          </dl>
        )}
      </section>
      <CtaFinal contacto={contacto} mensaje={mensajeInicio(contacto)} />
    </>
  );
}
