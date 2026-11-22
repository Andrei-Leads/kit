import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarTrabajo, metadatosTrabajo, minusculaInicial, parametrosTrabajos, servicioDelTrabajo } from "@andrei-leads/core";

import config from "@/site.config";
import { AntesDespues } from "@/components/base/AntesDespues";
import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { datosCta } from "@/lib/cta";
import { mensajeDeTrabajo, TEXTO_WHATSAPP_TRABAJO } from "@/lib/mensajes";
import { cn } from "@/lib/utils";

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
 * Ficha de casa (encargo §7): h1, contexto en píldoras (solo lo que haya) y el antes/después
 * en arco, o la foto sola en arco → descripción y `contenido` → galería en arcos alternos →
 * testimonio → enlace al servicio → «¿Quieres algo parecido?».
 */
export default async function Page({ params }: PageProps<"/trabajos/[slug]">) {
  const { slug } = await params;
  const trabajo = buscarTrabajo(config, slug);
  if (!trabajo) notFound();

  const servicio = servicioDelTrabajo(config.servicios, trabajo);
  const [principal, ...galeria] = trabajo.imagenes;
  const pildoras = [trabajo.ubicacion, trabajo.anio?.toString(), trabajo.superficie, trabajo.duracion, trabajo.precio].filter(
    (x): x is string => Boolean(x),
  );

  return (
    <>
      <span data-pagina="trabajos" hidden />
      <section aria-labelledby="titulo-trabajo" className="contenedor pt-[clamp(1.25rem,4vw,4rem)]">
        <Migas
          migas={[
            { href: "/", texto: "Inicio" },
            { href: "/trabajos", texto: "Casas" },
            { href: `/trabajos/${trabajo.slug}`, texto: trabajo.titulo },
          ]}
          className="mb-2"
        />
        <h1 id="titulo-trabajo" className="titulo-display max-w-[16ch]">
          {trabajo.titulo}
        </h1>
        {pildoras.length > 0 && (
          <ul aria-label="Datos de la obra" className="m-0 mt-5 flex list-none flex-wrap gap-2 p-0">
            {pildoras.map((x) => (
              <li key={x} className="rounded-full border border-borde bg-superficie px-3.5 py-1.5 text-[15px] leading-snug font-semibold">
                {x}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-[clamp(2rem,4vw,3.5rem)]">
          {trabajo.antes ? (
            <AntesDespues
              antes={trabajo.antes}
              despues={principal}
              titulo={trabajo.titulo}
              sizes="(min-width: 1024px) 520px, 100vw"
              preload
              className="mx-auto w-full max-w-[720px] [@media(scripting:enabled)]:max-w-[520px]"
            />
          ) : (
            <Foto imagen={principal} sizes="(min-width: 1024px) 520px, 100vw" arco preload className="mx-auto max-w-[520px]" />
          )}
        </div>
      </section>

      <section aria-label="La obra" className="contenedor grid gap-x-16 gap-y-8 pt-[clamp(3.5rem,2.5rem+5vw,6rem)] lg:grid-cols-2">
        <p className="remate m-0 text-[clamp(1.25rem,1.05rem+0.8vw,1.625rem)] leading-[1.45]">{trabajo.descripcion}</p>
        {trabajo.contenido.length > 0 && (
          <div className="max-w-[62ch]">
            {trabajo.contenido.map((p) => (
              <p key={p} className="m-0 mb-[18px]">
                {p}
              </p>
            ))}
          </div>
        )}
      </section>

      {galeria.length > 0 && (
        <section aria-label="Más fotos de la casa" className="contenedor pt-[clamp(3.5rem,2.5rem+5vw,6rem)]">
          <ul className="mx-auto m-0 grid max-w-[880px] list-none grid-cols-2 gap-x-[clamp(16px,4vw,48px)] gap-y-4 p-0">
            {galeria.map((f, i) => (
              <li key={f.src} className={cn(i % 2 === 1 && "mt-12")}>
                <Foto imagen={f} sizes="(min-width: 1024px) 420px, 50vw" arco calidad={60} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {(trabajo.testimonio || servicio) && (
        <section aria-label="Testimonio" className="contenedor pt-[clamp(3.5rem,2.5rem+5vw,6rem)]">
          {trabajo.testimonio && (
            <figure className="m-0 mx-auto max-w-[880px] rounded-tarjeta bg-alterna p-[clamp(28px,5vw,56px)]">
              <blockquote className="remate m-0 text-[clamp(1.375rem,1.1rem+1.2vw,2rem)] leading-[1.35] text-balance">
                «{trabajo.testimonio.texto}»
              </blockquote>
              <figcaption className="mt-4 text-base text-texto-suave">{trabajo.testimonio.autor}</figcaption>
            </figure>
          )}
          {servicio && (
            <p className="m-0 mt-7 text-center">
              <Link href={`/servicios/${servicio.slug}`} className="inline-flex min-h-11 items-center text-base font-semibold underline">
                Ver {minusculaInicial(servicio.titulo)} <span aria-hidden="true">&nbsp;→</span>
              </Link>
            </p>
          )}
        </section>
      )}

      <CtaFinal
        cta={datosCta(config.contacto, mensajeDeTrabajo(trabajo))}
        titulo="¿Quieres algo parecido?"
        texto="Cuéntanos cómo es tu casa y vamos a verla."
        textoWhatsapp={TEXTO_WHATSAPP_TRABAJO}
      />
    </>
  );
}
