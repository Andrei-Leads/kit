import type { Metadata } from "next";
import { iniciales, listaY, metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { anioActual } from "@/lib/anio";
import { mensajeBase } from "@/lib/mensajes";
import { anios, textosValoracion } from "@/lib/textos";
import { cn } from "@/lib/utils";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/empresa", titulo: "Empresa" });

/**
 * /empresa (encargo §7 y entrega): corta y compacta. A la izquierda, introducción, `historia`, cifras
 * (años y valoración, con la etiqueta bajo el número), acreditaciones, garantías con rombos y `marcas`;
 * a la derecha, `imagenes` pequeñas en paralelogramo. Debajo, `equipo` (sin foto: iniciales en rombo).
 * Con todo vacío queda la descripción, las zonas y el CTA.
 */
export default async function Page() {
  const { negocio, contacto, empresa, acreditaciones, garantias, marcas, valoracion, zonas } = config;
  const antiguedad = negocio.anioFundacion ? (await anioActual()) - negocio.anioFundacion : 0;
  const v = valoracion && textosValoracion(valoracion);
  const deGuardia = contacto.urgencias24h || Boolean(contacto.tiempoLlegada);

  return (
    <>
      <section className="bg-fondo [background-image:var(--haz)]">
        <div className="contenedor flex flex-col gap-6 pt-2 pb-10 lg:pb-14">
          <Migas migas={[{ href: "/", texto: "Inicio" }, { href: "/empresa", texto: "Empresa" }]} />
          <div className={cn("grid gap-8", empresa.imagenes.length > 0 && "lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-14")}>
            <div className="flex flex-col gap-6">
              <h1 className="titulo-h1 m-0">Quién coge el teléfono</h1>
              <p className="m-0 max-w-[60ch] text-lg">{negocio.descripcionCorta}</p>
              {empresa.historia.map((p, i) => (
                <p key={i} className="m-0 max-w-[68ch]">
                  {p}
                </p>
              ))}
              {zonas.length > 0 && (
                <p className="m-0 max-w-[68ch] text-texto-suave">
                  <strong className="font-bold text-texto">Trabajamos en </strong>
                  {listaY(zonas)}.
                </p>
              )}

              {(antiguedad > 0 || v) && (
                <dl className="m-0 flex flex-wrap gap-x-12 gap-y-4 border-t-2 border-borde/60 pt-4">
                  {antiguedad > 0 && (
                    <div className="flex flex-col-reverse">
                      <dt className="rotulo">{deGuardia ? `De guardia desde ${negocio.anioFundacion}` : `Desde ${negocio.anioFundacion}`}</dt>
                      <dd className="condensada m-0 text-cifra">{anios(antiguedad)}</dd>
                    </div>
                  )}
                  {v && (
                    <div className="flex flex-col-reverse">
                      <dt className="rotulo">{v.total}</dt>
                      <dd className="condensada m-0 text-cifra">
                        {v.media}
                        <span aria-hidden="true"> ★</span>
                        <span className="sr-only"> de 5</span>
                      </dd>
                    </div>
                  )}
                </dl>
              )}

              {acreditaciones.length > 0 && (
                <ul className="m-0 flex list-none flex-col gap-2 p-0">
                  {acreditaciones.map((a) => (
                    <li key={a.nombre} className="bg-superficie p-4">
                      <span className="block font-bold">{a.nombre}</span>
                      {a.numero && <span className="condensada mt-1 block text-[1.75rem] leading-none">n.º {a.numero}</span>}
                    </li>
                  ))}
                </ul>
              )}

              {garantias.length > 0 && (
                <div className="flex flex-col gap-3">
                  <h2 className="titulo-h2 m-0">Lo que te garantizamos</h2>
                  <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                    {garantias.map((g) => (
                      <li key={g} className="flex items-center gap-3.5 text-lg">
                        <span aria-hidden="true" className="rombo" />
                        {g}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {marcas.length > 0 && (
                <p className="m-0 max-w-[68ch] text-texto-suave">
                  <strong className="font-bold text-texto">Trabajamos con </strong>
                  {listaY(marcas)}.
                </p>
              )}
            </div>

            {empresa.imagenes.length > 0 && (
              <ul className="m-0 grid list-none content-start gap-3 p-0 sm:grid-cols-2 lg:grid-cols-1">
                {empresa.imagenes.map((f) => (
                  <li key={f.src}>
                    <Foto imagen={f} proporcion="3/2" sizes="(min-width: 1024px) 30vw, 50vw" />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {empresa.equipo.length > 0 && (
        <section aria-labelledby="titulo-equipo" className="bg-fondo">
          <div className="contenedor flex flex-col gap-6 pb-10 lg:pb-14">
            <h2 id="titulo-equipo" className="titulo-h2 m-0">
              Equipo
            </h2>
            <ul className="m-0 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
              {empresa.equipo.map((m) => (
                <li key={m.nombre} className="flex items-center gap-4">
                  {m.foto ? (
                    <Foto imagen={m.foto} miniatura proporcion="1/1" sizes="80px" className="w-20 flex-none" />
                  ) : (
                    <span aria-hidden="true" className="flex size-20 flex-none items-center justify-center">
                      <span className="flex size-14 rotate-45 items-center justify-center bg-primario">
                        <span className="condensada -rotate-45 text-2xl text-sobre-primario">{iniciales(m.nombre)}</span>
                      </span>
                    </span>
                  )}
                  <span className="flex flex-col">
                    <span className="condensada text-[1.375rem] leading-tight">{m.nombre}</span>
                    {m.cargo && <span className="text-texto-suave">{m.cargo}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaFinal contacto={contacto} mensaje={mensajeBase(contacto)} />
    </>
  );
}
