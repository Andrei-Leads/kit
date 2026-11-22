import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarTrabajo, metadatosTrabajo, parametrosTrabajos, servicioDelTrabajo } from "@andrei-leads/core";

import config from "@/site.config";
import { ParejaCta } from "@/components/ParejaCta";
import { AntesDespues } from "@/components/base/AntesDespues";
import { Foto } from "@/components/base/Foto";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { HeroInterior } from "@/components/secciones/HeroInterior";
import { mensajeDeTrabajo, RESPUESTA, TEXTO_WA_TRABAJO } from "@/lib/mensajes";
import { confianzaHorario, lugarAnio, pieOrigen, porAnio } from "@/lib/textos";

// Ver app/servicios/[slug]/page.tsx: sin esto, un slug inexistente da 200 en la primera visita.
export const ensureStatic = "navigation";

// Sin trabajos, core devuelve [{ slug: "_" }], que no existe: la página hace notFound().
export function generateStaticParams() {
  return parametrosTrabajos(config);
}

export async function generateMetadata({ params }: PageProps<"/trabajos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return metadatosTrabajo(config, slug);
}

/**
 * Ficha de trabajo (encargo §7): hero con el título, la pareja («Quiero algo parecido» +
 * Llamar) y la ficha (ubicación, año, superficie, duración, precio y servicio enlazado).
 * Módulo escenográfico: `AntesDespues` grande en 4:5 junto a `contenido` fijado en
 * escritorio; sin `antes`, collage. Después, el testimonio, el trabajo siguiente y la
 * pareja final con el mensaje del trabajo.
 */
export default async function Page({ params }: PageProps<"/trabajos/[slug]">) {
  const { slug } = await params;
  const trabajo = buscarTrabajo(config, slug);
  if (!trabajo) notFound();

  const c = config;
  const cta = { telefono: c.contacto.telefono, whatsapp: c.contacto.whatsapp, mensaje: mensajeDeTrabajo(trabajo) };
  const servicio = servicioDelTrabajo(c.servicios, trabajo);
  const ficha: { k: string; v: string; href?: string }[] = [
    { k: "Ubicación", v: trabajo.ubicacion ?? "" },
    { k: "Año", v: trabajo.anio ? String(trabajo.anio) : "" },
    { k: "Superficie", v: trabajo.superficie ?? "" },
    { k: "Duración", v: trabajo.duracion ?? "" },
    { k: "Precio", v: trabajo.precio ?? "" },
  ].filter((f) => f.v);
  if (servicio) ficha.push({ k: "Servicio", v: servicio.titulo, href: `/servicios/${servicio.slug}` });
  const orden = porAnio(c.trabajos);
  const siguiente = orden.length > 1 ? orden[(orden.findIndex((t) => t.slug === trabajo.slug) + 1) % orden.length] : undefined;
  const [principal, segunda] = trabajo.imagenes;

  return (
    <>
      <HeroInterior
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/trabajos", texto: "Trabajos" },
          { href: `/trabajos/${trabajo.slug}`, texto: trabajo.titulo },
        ]}
        antetitulo={lugarAnio(trabajo) || "Trabajo"}
        titulo={trabajo.titulo}
        frase={trabajo.descripcion}
        cta={cta}
        textoWhatsapp={TEXTO_WA_TRABAJO}
        confianza={{ texto: RESPUESTA }}
        lateral={
          ficha.length > 0 ? (
            <dl className="m-0 grid grid-cols-2 gap-x-6 border-t border-borde">
              {ficha.map((f) => (
                <div key={f.k} className="border-b border-borde py-4">
                  <dt className="etiqueta">{f.k}</dt>
                  <dd className="fino m-0 mt-1.5 text-[22px] leading-snug">
                    {f.href ? (
                      <Link href={f.href} className="underline decoration-1 underline-offset-[5px]">
                        {f.v}
                      </Link>
                    ) : (
                      f.v
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          ) : (
            <span />
          )
        }
      />

      <section data-tono="claro" aria-label="La obra" className="seccion bg-superficie">
        <div className="contenedor rejilla items-start gap-y-10">
          <div className="lg:col-[1/8]">
            {trabajo.antes ? (
              <AntesDespues
                antes={trabajo.antes}
                despues={principal}
                sizes="(min-width: 1024px) 640px, 100vw"
                transicion={`trabajo-${trabajo.slug}`}
                className="w-full max-w-[640px]"
              />
            ) : (
              <div className="relative max-w-[640px]">
                <div className={segunda ? "pb-14" : undefined}>
                  <div className={segunda ? "w-[82%]" : undefined}>
                    <Foto imagen={principal} sizes="(min-width: 1024px) 520px, 82vw" etiqueta="no" transicion={`trabajo-${trabajo.slug}`} />
                  </div>
                </div>
                {segunda && (
                  <div className="absolute right-0 bottom-0 z-[2] w-[40%]">
                    <div className="px-mini">
                      <Foto imagen={segunda} sizes="(min-width: 1024px) 260px, 40vw" etiqueta="no" />
                    </div>
                  </div>
                )}
                {pieOrigen([principal, segunda]) && <p className="m-0 mt-2 text-xs text-texto-suave">{pieOrigen([principal, segunda])}</p>}
              </div>
            )}
          </div>
          <div className="lg:sticky lg:top-28 lg:col-[9/13]">
            <p className="etiqueta">La obra</p>
            <p className="fino m-0 mt-3 text-[22px] leading-[1.3]">{trabajo.descripcion}</p>
            {trabajo.contenido.map((p) => (
              <p key={p} className="m-0 mt-4 text-texto-suave">
                {p}
              </p>
            ))}
            {trabajo.imagenes.slice(trabajo.antes ? 1 : 2).map((f) => (
              <Foto key={f.src} imagen={f} sizes="(min-width: 1024px) 30vw, 100vw" className="mt-8" />
            ))}
          </div>
        </div>
      </section>

      {trabajo.testimonio && (
        <section data-tono="claro" aria-label="Testimonio" className="seccion bg-fondo">
          <figure className="contenedor m-0">
            <blockquote className="fino m-0 max-w-[24em] text-[32px] leading-[1.2] lg:text-[44px]">«{trabajo.testimonio.texto}»</blockquote>
            <figcaption className="mt-4 text-sm text-texto-suave">{trabajo.testimonio.autor}</figcaption>
          </figure>
          <div className="contenedor">
            <ParejaCta cta={cta} textoWhatsapp={TEXTO_WA_TRABAJO} confianza={{ texto: RESPUESTA }} className="mt-10 max-w-[620px]" />
          </div>
        </section>
      )}

      {siguiente && (
        <nav aria-label="Trabajo siguiente" className="border-t border-borde bg-alterna">
          <Link href={`/trabajos/${siguiente.slug}`} className="contenedor flex min-h-24 flex-wrap items-center justify-between gap-x-8 gap-y-2 py-6 no-underline">
            <span className="etiqueta">Trabajo siguiente</span>
            <span className="fino text-2xl lg:text-[28px]">
              {siguiente.titulo} <span aria-hidden="true">→</span>
            </span>
          </Link>
        </nav>
      )}

      <CtaFinal
        cta={cta}
        lineas={[<>¿Quieres algo</>, <><em>parecido</em>?</>]}
        textoWhatsapp={TEXTO_WA_TRABAJO}
        confianza={confianzaHorario(c.contacto.horario)}
      />
    </>
  );
}
