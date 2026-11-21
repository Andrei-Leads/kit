import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarTrabajo, metadatosTrabajo, parametrosTrabajos, servicioDelTrabajo } from "@andrei-leads/core";

import config from "@/site.config";
import { AntesDespues } from "@/components/base/AntesDespues";
import { Foto } from "@/components/base/Foto";
import { Pareja } from "@/components/Botones";
import { IconoFlecha } from "@/components/Iconos";
import { BandaInterior } from "@/components/secciones/BandaInterior";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { metaTrabajo } from "@/components/secciones/TrabajosBento";
import { mensajeDeTrabajo } from "@/lib/mensajes";
import { datosCta } from "@/lib/textos";

// Sin esto, con partialPrefetching un slug inexistente da 200 en la primera visita.
export const ensureStatic = "navigation";

// Sin trabajos, core devuelve [{ slug: "_" }], que hace notFound().
export function generateStaticParams() {
  return parametrosTrabajos(config);
}

export async function generateMetadata({ params }: PageProps<"/trabajos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return metadatosTrabajo(config, slug);
}

// El texto visible no dice WhatsApp: el lector oye «Quiero algo parecido por WhatsApp».
const TEXTO_WA = (
  <>
    Quiero algo parecido<span className="sr-only"> por WhatsApp</span>
  </>
);

/**
 * Ficha de trabajo: banda pleno (migas, h1, descripción, contexto y pareja) →
 * foto principal en tarjeta (con `antes`, AntesDespues) → cifras (superficie,
 * duración, año, precio: solo las que existan) → `contenido` → testimonio en
 * tarjeta pleno → enlace al servicio → CTA «¿Quieres algo parecido?».
 */
export default async function Page({ params }: PageProps<"/trabajos/[slug]">) {
  const { slug } = await params;
  const trabajo = buscarTrabajo(config, slug);
  if (!trabajo) notFound();

  const servicio = servicioDelTrabajo(config.servicios, trabajo);
  const cta = datosCta(config, mensajeDeTrabajo(trabajo));
  const [principal, ...resto] = trabajo.imagenes;
  const meta = metaTrabajo(trabajo);
  const cifras = [
    { etiqueta: "Superficie", valor: trabajo.superficie },
    { etiqueta: "Duración", valor: trabajo.duracion },
    { etiqueta: "Año", valor: trabajo.anio?.toString() },
    { etiqueta: "Precio", valor: trabajo.precio },
  ].filter((c): c is { etiqueta: string; valor: string } => Boolean(c.valor));

  return (
    <>
      <span data-pagina="trabajos" hidden />
      <BandaInterior
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/trabajos", texto: "Trabajos" },
          { href: `/trabajos/${trabajo.slug}`, texto: trabajo.titulo },
        ]}
        titulo={trabajo.titulo}
        entrada={
          <>
            <p>{trabajo.descripcion}</p>
            {meta && <p className="mt-3! text-base font-semibold">{meta}</p>}
          </>
        }
      >
        <Pareja cta={cta} tono="pleno" textoWhatsapp={TEXTO_WA} />
      </BandaInterior>

      <section aria-label="Fotos y datos del trabajo" className="seccion">
        <div className="contenedor">
          <div className="rounded-tarjeta bg-superficie p-2.5">
            {trabajo.antes ? (
              <AntesDespues antes={trabajo.antes} despues={principal} sizes="(min-width: 1280px) 1180px, 100vw" proporcion="16/9" preload />
            ) : (
              <Foto imagen={principal} sizes="(min-width: 1280px) 1180px, 100vw" proporcion="16/9" preload />
            )}
          </div>
          {resto.length > 0 && (
            <ul className="m-0 mt-(--hueco-bento) grid list-none gap-(--hueco-bento) p-0 sm:grid-cols-2">
              {resto.map((f) => (
                <li key={f.src} className="rounded-tarjeta bg-superficie p-2.5">
                  <Foto imagen={f} sizes="(min-width: 640px) 50vw, 100vw" proporcion="4/3" />
                </li>
              ))}
            </ul>
          )}
          {cifras.length > 0 && (
            <dl className="m-0 mt-(--hueco-bento) grid grid-cols-2 gap-(--hueco-bento) lg:grid-cols-4">
              {cifras.map((c) => (
                <div key={c.etiqueta} data-aparecer className="flex flex-col rounded-tarjeta bg-superficie p-5 lg:p-7">
                  <dt className="text-sm font-semibold text-texto-suave">{c.etiqueta}</dt>
                  <dd className="m-0 mt-3 font-titulo text-[clamp(1.75rem,1.3rem+2vw,3rem)] leading-none font-[750] tracking-[-0.035em] tabular-nums">
                    <span data-cifra-sube>
                      <span>{c.valor}</span>
                    </span>
                  </dd>
                  <span aria-hidden="true" className="raya-acento mt-2.5" />
                </div>
              ))}
            </dl>
          )}
          {trabajo.contenido.length > 0 && (
            <div className="mt-12 max-w-[66ch]">
              <h2 className="titulo-seccion">Cómo lo hicimos</h2>
              {trabajo.contenido.map((p) => (
                <p key={p} className="m-0 mt-4 text-[1.125rem]">
                  {p}
                </p>
              ))}
            </div>
          )}
          {trabajo.testimonio && (
            <figure className="sobre-pleno m-0 mt-12 rounded-tarjeta bg-pleno p-7 text-sobre-primario md:p-12">
              <blockquote className="m-0">
                <p className="m-0 font-titulo text-[clamp(1.5rem,1.2rem+1.4vw,2.25rem)] leading-[1.25] font-semibold tracking-[-0.02em]">
                  «{trabajo.testimonio.texto}»
                </p>
              </blockquote>
              <figcaption className="mt-5 font-bold">{trabajo.testimonio.autor}</figcaption>
            </figure>
          )}
          {servicio && (
            <Link
              href={`/servicios/${servicio.slug}`}
              className="tarjeta-enlace mt-(--hueco-bento) flex min-h-20 items-center justify-between gap-4 rounded-tarjeta bg-alterna py-4 pr-4 pl-6 text-texto no-underline"
            >
              <span className="flex flex-col">
                <span className="text-sm font-semibold text-texto-suave">Servicio</span>
                <span className="text-xl font-bold">{servicio.titulo}</span>
              </span>
              <span aria-hidden="true" className="grid size-10 flex-none place-items-center rounded-full bg-primario text-sobre-primario">
                <IconoFlecha className="size-[18px]" />
              </span>
            </Link>
          )}
        </div>
      </section>

      <CtaFinal cta={cta} contacto={config.contacto} titulo="¿Quieres algo parecido?" textoWhatsapp={TEXTO_WA} />
    </>
  );
}
