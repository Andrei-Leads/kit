import Link from "next/link";
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
import { MarcaPagina } from "@/components/MarcaPagina";
import { Foto } from "@/components/base/Foto";
import { Preguntas } from "@/components/base/Preguntas";
import { BandaTrabajo } from "@/components/secciones/BandaTrabajo";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { HeroInterior } from "@/components/secciones/HeroInterior";
import { Titular } from "@/components/secciones/Titular";
import { mensajeDeServicio } from "@/lib/mensajes";
import { contextoTrabajo, datosCta, destacarUltima, lineaConfianza, lineaHorario, lugarAnio, numero } from "@/lib/textos";
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
 * Ficha de servicio (encargo §7, plantilla «de competencia»): hero interior con
 * el mensaje del servicio → tira «Qué incluye» y otra pareja → «El trabajo»
 * (bloques texto/imagen con `imagenes[2+]`; sin fotos extra, columna de 640 px)
 * → trabajos del servicio en bandas 4:1 → preguntas → CTA final → otros servicios.
 */
export default async function Page({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const servicio = buscarServicio(config, slug);
  if (!servicio) notFound();

  const indice = config.servicios.indexOf(servicio);
  const cta = datosCta(config.contacto, mensajeDeServicio(servicio));
  const [inicio, ultima] = destacarUltima(servicio.titulo);
  const [foto1, foto2, ...extra] = servicio.imagenes;
  const precio = servicio.precioDesde ? precioDesde(servicio.precioDesde) : undefined;
  const trabajos = trabajosDelServicio(config.trabajos, servicio);
  const otros = otrosServicios(config.servicios, servicio).slice(0, 3);
  // Sin `contenido`, la descripción hace de texto (y core ya pone noindex).
  const parrafos = servicio.contenido.length > 0 ? servicio.contenido : [];
  // Cada dos párrafos, una foto extra (imagenes[2+]).
  const tramos = Array.from({ length: Math.ceil(parrafos.length / 2) }, (_, i) => ({
    parrafos: parrafos.slice(i * 2, i * 2 + 2),
    foto: extra[i],
  }));

  return (
    <>
      <MarcaPagina pagina="servicios" inicioClaro />
      <HeroInterior
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/servicios", texto: "Servicios" },
          { href: `/servicios/${servicio.slug}`, texto: servicio.titulo },
        ]}
        etiqueta={`${numero(indice)} · Servicio`}
        titulo={
          <>
            {inicio}
            <em>{ultima}</em>
          </>
        }
        frase={servicio.descripcion}
        extra={
          precio && (
            <p className="m-0 text-xs font-medium tracking-[0.08em] uppercase">
              {precio.desde ? `Desde ${precio.importe}` : precio.importe}
            </p>
          )
        }
        cta={cta}
        confianza={lineaConfianza(config)}
        fotos={[foto1, foto2]}
      />

      <section data-tono="claro" aria-labelledby="titulo-incluye" className="bg-alterna py-14 lg:py-24">
        <div className="contenedor flex flex-col gap-10">
          {servicio.incluye.length > 0 && (
            <>
              <h2 id="titulo-incluye" className="etiqueta m-0">
                Qué incluye
              </h2>
              <ul className="m-0 grid list-none grid-cols-2 gap-x-4 gap-y-6 p-0 lg:max-w-[1000px] lg:grid-cols-4 lg:gap-8">
                {servicio.incluye.map((x, i) => (
                  <li key={x} className="flex flex-col gap-2.5 border-t border-borde pt-4">
                    <span aria-hidden="true" className="text-xs tracking-[0.08em] text-texto-suave">
                      {numero(i)}
                    </span>
                    <span className="text-[17px] leading-snug lg:text-lg">{x}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
          <Pareja cta={cta} />
        </div>
      </section>

      <section data-tono="claro" aria-labelledby="titulo-trabajo" className="seccion bg-fondo">
        <div className="contenedor flex flex-col gap-14 lg:gap-24">
          {tramos.length > 0 ? (
            tramos.map((t, i) => (
              <div key={i} className={cn("grid gap-8 lg:grid-cols-[440px_minmax(0,640px)] lg:gap-0", t.foto && "lg:grid-cols-2 lg:items-center lg:gap-20")}>
                {i === 0 && !t.foto ? (
                  <h2 id="titulo-trabajo" className="etiqueta m-0 lg:pt-3">
                    El trabajo
                  </h2>
                ) : (
                  !t.foto && <span aria-hidden="true" />
                )}
                {t.foto && (
                  <Foto imagen={t.foto} sizes="(min-width: 1024px) 540px, 100vw" proporcion="4/5" className={cn("parallax-grande", i % 2 === 1 && "lg:order-2")} />
                )}
                <div className="flex max-w-[640px] flex-col gap-5">
                  {i === 0 && t.foto && (
                    <h2 id="titulo-trabajo" className="etiqueta m-0">
                      El trabajo
                    </h2>
                  )}
                  {t.parrafos.map((p, j) =>
                    i === 0 && j === 0 ? (
                      <p key={j} className="titulo m-0 text-[24px] leading-[1.3] lg:text-[30px]">
                        {p}
                      </p>
                    ) : (
                      <p key={j} className="m-0 text-lg leading-relaxed text-texto-suave">
                        {p}
                      </p>
                    ),
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="grid gap-6 lg:grid-cols-[440px_minmax(0,640px)]">
              <h2 id="titulo-trabajo" className="etiqueta m-0 lg:pt-3">
                El trabajo
              </h2>
              <p className="titulo m-0 text-[24px] leading-[1.3] lg:text-[30px]">{servicio.descripcion}</p>
            </div>
          )}
        </div>
      </section>

      {trabajos.length > 0 && (
        <section data-tono="claro" aria-labelledby="titulo-trabajos-servicio" className="bg-fondo pb-[var(--espacio-seccion)]">
          <div className="contenedor flex flex-col gap-14">
            <h2 id="titulo-trabajos-servicio" className="etiqueta m-0">
              Trabajos de este servicio
            </h2>
            {trabajos.map((t) => (
              <BandaTrabajo
                key={t.slug}
                banda={{
                  clave: t.slug,
                  imagen: t.imagenes[0],
                  etiqueta: lugarAnio(t) || undefined,
                  titulo: t.titulo,
                  contexto: contextoTrabajo(t).map((c) => c.dd).join(" · ") || undefined,
                  href: `/trabajos/${t.slug}`,
                }}
              />
            ))}
          </div>
        </section>
      )}

      {servicio.preguntas.length > 0 && (
        <section data-tono="claro" aria-labelledby="titulo-preguntas" className="bg-fondo pb-[var(--espacio-seccion)]">
          <div className="contenedor grid gap-10 lg:grid-cols-[440px_minmax(0,560px)]">
            <div className="flex flex-col gap-[18px]">
              <p className="etiqueta">Preguntas</p>
              <Titular id="titulo-preguntas" className="text-[36px] lg:text-[48px]" lineas={["Lo que nos", <em key="e">preguntan</em>]} />
            </div>
            <Preguntas preguntas={servicio.preguntas} grupo="preguntas-servicio" />
          </div>
        </section>
      )}

      <CtaFinal cta={cta} lineas={[<>¿Hablamos de <em>tu obra</em>?</>]} confianza={lineaHorario(config.contacto.horario)} />

      {otros.length > 0 && (
        <section data-tono="claro" aria-labelledby="titulo-otros" className="seccion bg-fondo">
          <div className="contenedor flex flex-col gap-10">
            <h2 id="titulo-otros" className="etiqueta m-0">
              Otros servicios
            </h2>
            <ul className="m-0 grid list-none gap-10 p-0 sm:grid-cols-2 lg:max-w-[1000px] lg:grid-cols-3 lg:gap-8">
              {otros.map((s) => (
                <li key={s.slug} data-aparecer>
                  <Link href={`/servicios/${s.slug}`} className="group flex flex-col gap-4 no-underline">
                    {s.imagenes[0] ? (
                      <Foto imagen={s.imagenes[0]} sizes="(min-width: 1024px) 312px, (min-width: 640px) 45vw, 100vw" proporcion="4/3" decorativa />
                    ) : (
                      <div aria-hidden="true" className="textura flex aspect-[4/3] items-end rounded-foto bg-tinta-suave p-5">
                        <span className="titulo text-[96px] leading-[0.8] font-extralight text-white">{numero(config.servicios.indexOf(s))}</span>
                      </div>
                    )}
                    <span className="titulo text-[26px] leading-[1.15]">{s.titulo}</span>
                    <span className="text-[15px]">
                      Ver el servicio <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
