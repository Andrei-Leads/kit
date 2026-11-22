import Link from "next/link";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buscarTrabajo, metadatosTrabajo, parametrosTrabajos, servicioDelTrabajo } from "@andrei-leads/core";

import config from "@/site.config";
import { MarcaPagina } from "@/components/MarcaPagina";
import { Transicion } from "@/components/Transicion";
import { AntesDespues } from "@/components/base/AntesDespues";
import { Foto } from "@/components/base/Foto";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { HeroInterior } from "@/components/secciones/HeroInterior";
import { mensajeDeTrabajo } from "@/lib/mensajes";
import { datosCta, destacarFinal, destacarUltima, lineaConfianza, lineaHorario, lugarAnio } from "@/lib/textos";

// Un slug que no está en generateStaticParams se genera en la primera visita. Sin esto,
// partialPrefetching sirve antes el App Shell con 200 y el 404 solo llega a la segunda.
export const ensureStatic = "navigation";

// Con cacheComponents, generateStaticParams no puede devolver []: sin trabajos, core pone "_" (→ 404).
export function generateStaticParams() {
  return parametrosTrabajos(config);
}

export async function generateMetadata({ params }: PageProps<"/trabajos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return metadatosTrabajo(config, slug);
}

const QUIERO = "Quiero algo parecido";

/**
 * Ficha de trabajo (encargo §7): hero interior con «Quiero algo parecido» →
 * antes/después a ancho completo en 3:2 (sin `antes`, las fotos van en el
 * collage del hero) → ficha en filas (cada dato solo si existe) y «Cómo fue» →
 * resto de fotos → testimonio como cita grande → CTA final con el mensaje del trabajo.
 */
export default async function Page({ params }: PageProps<"/trabajos/[slug]">) {
  const { slug } = await params;
  const trabajo = buscarTrabajo(config, slug);
  if (!trabajo) notFound();

  const cta = datosCta(config.contacto, mensajeDeTrabajo(trabajo));
  const servicio = servicioDelTrabajo(config.servicios, trabajo);
  const [inicio, ultima] = destacarUltima(trabajo.titulo);
  const [principal, ...resto] = trabajo.imagenes;
  const conAntes = Boolean(trabajo.antes);
  const fotosExtra = conAntes ? resto : resto.slice(1);
  type Fila = { dt: string; dd: ReactNode };
  const ficha = ([
    trabajo.ubicacion && { dt: "Ubicación", dd: trabajo.ubicacion },
    trabajo.anio && { dt: "Año", dd: String(trabajo.anio) },
    servicio && {
      dt: "Servicio",
      dd: (
        <Link href={`/servicios/${servicio.slug}`} className="underline underline-offset-4 hover:text-primario">
          {servicio.titulo}
        </Link>
      ),
    },
    trabajo.superficie && { dt: "Superficie", dd: trabajo.superficie },
    trabajo.duracion && { dt: "Duración", dd: trabajo.duracion },
    trabajo.precio && { dt: "Precio", dd: trabajo.precio },
  ] as (Fila | false | "" | 0 | undefined)[]).filter((x): x is Fila => Boolean(x));

  return (
    <>
      <MarcaPagina pagina="trabajos" inicioClaro />
      <HeroInterior
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/trabajos", texto: "Trabajos" },
          { href: `/trabajos/${trabajo.slug}`, texto: trabajo.titulo },
        ]}
        etiqueta={lugarAnio(trabajo) || undefined}
        titulo={
          <>
            {inicio}
            <em>{ultima}</em>
          </>
        }
        frase={trabajo.descripcion}
        cta={cta}
        textoWhatsapp={QUIERO}
        confianza={lineaConfianza(config)}
        fotos={conAntes ? undefined : [principal, resto[0]]}
        transicion={conAntes ? undefined : `foto-${trabajo.slug}`}
        sinFotos={conAntes}
      />

      {trabajo.antes && (
        <div className="contenedor -mt-4 lg:-mt-12">
          <Transicion nombre={`foto-${trabajo.slug}`}>
            <AntesDespues antes={trabajo.antes} despues={principal} titulo={trabajo.titulo} sizes="(min-width: 1280px) 1120px, calc(100vw - 2 * var(--margen))" preload />
          </Transicion>
        </div>
      )}

      {(ficha.length > 0 || trabajo.contenido.length > 0) && (
        <section data-tono="claro" aria-label="Ficha del trabajo" className="seccion bg-fondo">
          <div className="contenedor grid gap-14 lg:grid-cols-[360px_minmax(0,560px)] lg:gap-20">
            {ficha.length > 0 && (
              <div>
                <h2 className="etiqueta m-0 mb-4">Ficha</h2>
                <dl className="m-0 border-b border-borde">
                  {ficha.map((f) => (
                    <div key={f.dt} className="grid grid-cols-[120px_1fr] gap-4 border-t border-borde py-3.5 lg:grid-cols-[140px_1fr]">
                      <dt className="text-sm text-texto-suave">{f.dt}</dt>
                      <dd className="m-0">{f.dd}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
            {trabajo.contenido.length > 0 && (
              <div className="flex flex-col gap-5">
                <h2 className="etiqueta m-0">Cómo fue</h2>
                {trabajo.contenido.map((p, i) =>
                  i === 0 ? (
                    <p key={i} className="titulo m-0 text-[24px] leading-[1.3] lg:text-[30px]">
                      {p}
                    </p>
                  ) : (
                    <p key={i} className="m-0 text-lg leading-relaxed text-texto-suave">
                      {p}
                    </p>
                  ),
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {fotosExtra.length > 0 && (
        <section aria-label="Más fotos del trabajo" className="bg-fondo pb-[var(--espacio-seccion)]">
          <ul className="contenedor m-0 grid list-none gap-6 sm:grid-cols-2 lg:gap-10">
            {fotosExtra.map((f) => (
              <li key={f.src} data-aparecer>
                <Foto imagen={f} sizes="(min-width: 1024px) 540px, (min-width: 640px) 45vw, 100vw" proporcion="4/5" />
              </li>
            ))}
          </ul>
        </section>
      )}

      {trabajo.testimonio && (
        <section data-tono="claro" aria-label="Testimonio" className="seccion bg-alterna">
          <figure className="contenedor m-0 flex flex-col gap-6">
            <blockquote className="titulo m-0 max-w-[760px] text-[30px] leading-[1.15] lg:text-[56px]">
              <Cita texto={trabajo.testimonio.texto} />
            </blockquote>
            <figcaption className="text-sm text-texto-suave">{trabajo.testimonio.autor}</figcaption>
          </figure>
        </section>
      )}

      <CtaFinal cta={cta} lineas={[<>¿Quieres algo <em>parecido</em>?</>]} textoWhatsapp={QUIERO} confianza={lineaHorario(config.contacto.horario)} />
    </>
  );
}

function Cita({ texto }: { texto: string }) {
  const [inicio, final, cierre] = destacarFinal(texto);
  return (
    <>
      «{inicio}
      <em>{final}</em>
      {cierre}»
    </>
  );
}
