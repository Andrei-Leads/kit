import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  buscarServicio,
  metadatosServicio,
  otrosServicios,
  parametrosServicios,
  precioDesde,
  trabajosDelServicio,
} from "@andrei-leads/core";

import config from "@/site.config";
import { Pareja } from "@/components/Botones";
import { Foto } from "@/components/base/Foto";
import { Preguntas } from "@/components/base/Preguntas";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { HeroInterior } from "@/components/secciones/HeroInterior";
import { Antetitulo, EnlaceFlecha, Senal, Titular, UltimaDestacada } from "@/components/Titular";
import { mensajeDeServicio } from "@/lib/mensajes";
import { datosCta, fichaTrabajo, lineaConfianza, lineaHorario, numero } from "@/lib/textos";
import { cn } from "@/lib/utils";

// Un slug que no está en generateStaticParams se genera en la primera visita. Sin esto,
// partialPrefetching sirve antes el App Shell con 200 y el 404 solo llega a la segunda.
export const ensureStatic = "navigation";

// Con cacheComponents, generateStaticParams no puede devolver []: core pone un slug de relleno.
export function generateStaticParams() {
  return parametrosServicios(config);
}

// Servicio sin `contenido`: core devuelve `noindex, follow`. Slug inexistente: {}.
export async function generateMetadata({ params }: PageProps<"/servicios/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return metadatosServicio(config, slug);
}

/**
 * Ficha de servicio, plantilla de «competencia» (encargo §7): hero interior →
 * tira de `incluye` + pareja-cierre → bloques texto/imagen alternando lados →
 * precio orientativo → trabajos del servicio en bandas 4:1 → preguntas →
 * pareja final → tarjetas a los demás servicios (nunca al actual).
 */
export default async function Page({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const servicio = buscarServicio(config, slug);
  if (!servicio) notFound();

  const indice = config.servicios.findIndex((s) => s.slug === servicio.slug);
  const cta = datosCta(config.contacto, mensajeDeServicio(servicio));
  const extra = servicio.imagenes.slice(2);
  const obras = trabajosDelServicio(config.trabajos, servicio);
  const otros = otrosServicios(config.servicios, servicio);
  const precio = servicio.precioDesde ? precioDesde(servicio.precioDesde) : undefined;

  return (
    <>
      <span data-pagina="servicios" hidden />
      <HeroInterior
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/servicios", texto: "Servicios" },
          { href: `/servicios/${servicio.slug}`, texto: servicio.titulo },
        ]}
        titulo={<UltimaDestacada texto={servicio.titulo} />}
        frase={servicio.descripcion}
        cta={cta}
        confianza={lineaConfianza(config)}
        imagenes={servicio.imagenes.slice(0, 2)}
        numeroPagina={numero(indice)}
      />

      {servicio.incluye.length > 0 && (
        <section aria-labelledby="titulo-incluye" className="pb-[clamp(72px,3.5rem+4vw,128px)]">
          <div className="contenedor flex flex-col gap-10">
            <h2 id="titulo-incluye" className="sr-only">
              Qué incluye
            </h2>
            <ol className="m-0 grid list-none gap-x-8 gap-y-2 p-0 sm:grid-cols-2 lg:grid-cols-4">
              {servicio.incluye.map((x, i) => (
                <li key={x} data-aparecer className="flex flex-col gap-3 border-t border-[var(--color-linea)] pt-4 pb-4 text-[17px]">
                  <span className="etiqueta text-acento">{numero(i)}</span>
                  {x}
                </li>
              ))}
            </ol>
            <Pareja cta={cta} tamano="cierre" />
          </div>
        </section>
      )}

      {servicio.contenido.length > 0 && (
        <section aria-labelledby="titulo-como" className="pb-[clamp(72px,3.5rem+4vw,128px)]">
          <div className="contenedor flex flex-col gap-[clamp(48px,3rem+2vw,96px)]">
            {extra.length === 0 ? (
              <div className="grid gap-x-[clamp(32px,5vw,96px)] gap-y-8 lg:grid-cols-[5fr_7fr]">
                <div className="flex flex-col gap-6">
                  <Antetitulo>El servicio</Antetitulo>
                  <Titular id="titulo-como" lineas={["Cómo lo", <><Senal>hacemos</Senal>.</>]} />
                </div>
                <div className="flex max-w-[62ch] flex-col gap-4">
                  {servicio.contenido.map((p) => (
                    <p key={p} className="m-0">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-6">
                  <Antetitulo>El servicio</Antetitulo>
                  <Titular id="titulo-como" lineas={[<>Cómo lo <Senal>hacemos</Senal>.</>]} />
                </div>
                {servicio.contenido.map((p, i) => {
                  const foto = extra[i];
                  return (
                    <div key={p} className={cn("grid items-center gap-x-[clamp(32px,5vw,96px)] gap-y-6", foto && "lg:grid-cols-2")}>
                      <p className={cn("m-0 max-w-[62ch]", foto && i % 2 === 1 && "lg:order-2")}>{p}</p>
                      {foto && <Foto imagen={foto} sizes="(min-width: 1024px) 560px, 100vw" className="px-grande" claseEnvoltorio="w-full max-w-[560px]" />}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </section>
      )}

      {precio && (
        <section aria-label="Precio orientativo" className="pb-[clamp(72px,3.5rem+4vw,128px)]">
          <div className="contenedor">
            <div className="flex flex-wrap items-baseline gap-x-10 gap-y-3 border-y border-[var(--color-linea)] py-8">
              <p className="etiqueta m-0 text-acento">Precio orientativo</p>
              <p className="m-0 font-texto text-[clamp(2.25rem,1.6rem+2.4vw,3.5rem)] leading-none font-extralight tracking-[-0.02em] tabular-nums">
                {precio.desde ? `desde ${precio.importe}` : precio.importe}
              </p>
              <p className="m-0 max-w-[40ch] text-[15px] text-texto-suave">El precio cerrado va en el presupuesto, sobre tu obra.</p>
            </div>
          </div>
        </section>
      )}

      {obras.length > 0 && (
        <section aria-labelledby="titulo-obras" className="pb-[clamp(72px,3.5rem+4vw,128px)]">
          <div className="contenedor flex flex-col gap-8">
            <Titular id="titulo-obras" lineas={[<>Obras de este <Senal>servicio</Senal>.</>]} />
            <ul className="m-0 flex list-none flex-col p-0">
              {obras.map((t) => (
                <li key={t.slug} className="grid items-center gap-x-[clamp(24px,4vw,64px)] gap-y-5 border-t border-[var(--color-linea)] py-8 md:grid-cols-[1.4fr_1fr]">
                  <Foto imagen={t.imagenes[0]} proporcion="4/1" sizes="(min-width: 768px) 56vw, 100vw" />
                  <div className="flex flex-col gap-3">
                    {fichaTrabajo(t) && <p className="etiqueta m-0 text-acento">{fichaTrabajo(t)}</p>}
                    <h3 className="titulo-pequeno">{t.titulo}</h3>
                    <EnlaceFlecha href={`/trabajos/${t.slug}`}>
                      Ver proyecto<span className="sr-only">: {t.titulo}</span>
                    </EnlaceFlecha>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {servicio.preguntas.length > 0 && (
        <section aria-labelledby="titulo-preguntas" className="pb-[clamp(72px,3.5rem+4vw,128px)]">
          <div className="contenedor grid gap-x-[clamp(32px,5vw,96px)] gap-y-6 lg:grid-cols-[5fr_7fr]">
            <div>
              <Antetitulo>Preguntas</Antetitulo>
              <h2 id="titulo-preguntas" className="sr-only">
                Preguntas sobre {servicio.titulo}
              </h2>
            </div>
            <Preguntas preguntas={servicio.preguntas} grupo="preguntas-servicio" />
          </div>
        </section>
      )}

      <CtaFinal
        cta={cta}
        titular={
          <>
            ¿Lo <Senal>hablamos</Senal>?
          </>
        }
        confianza={lineaHorario(config.contacto)}
      />

      {otros.length > 0 && (
        <section aria-labelledby="titulo-otros" className="pb-[clamp(80px,4rem+5vw,144px)]">
          <div className="contenedor flex flex-col gap-6">
            <h2 id="titulo-otros" className="etiqueta m-0 text-acento">
              Otros servicios
            </h2>
            <ul className="m-0 grid list-none grid-cols-1 border-t border-l border-[var(--color-linea)] p-0 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
              {otros.map((s) => {
                const i = config.servicios.indexOf(s);
                return (
                  <li key={s.slug} className="flex flex-col justify-between gap-8 border-r border-b border-[var(--color-linea)] p-6">
                    <span className="etiqueta text-acento">{numero(i)}</span>
                    <div className="flex flex-col gap-3">
                      <h3 className="titulo-pequeno">{s.titulo}</h3>
                      <EnlaceFlecha href={`/servicios/${s.slug}`}>
                        Descubrir<span className="sr-only"> {s.titulo}</span>
                      </EnlaceFlecha>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
