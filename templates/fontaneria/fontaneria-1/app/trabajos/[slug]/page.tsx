import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarTrabajo, metadatosTrabajo, parametrosTrabajos, servicioDelTrabajo } from "@andrei-leads/core";

import config from "@/site.config";
import { AntesDespues } from "@/components/base/AntesDespues";
import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { ParCta } from "@/components/ParCta";
import { mensajeDeTrabajo } from "@/lib/mensajes";
import { lineaHorario, textoLlamar } from "@/lib/textos";

// Sin esto, un slug inexistente da 200 en la primera visita (partialPrefetching).
export const ensureStatic = "navigation";

// Sin trabajos, core devuelve [{ slug: "_" }], que no existe: notFound().
export function generateStaticParams() {
  return parametrosTrabajos(config);
}

export async function generateMetadata({ params }: PageProps<"/trabajos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return metadatosTrabajo(config, slug);
}

const TAMANOS = "(min-width: 1200px) 1120px, calc(100vw - 32px)";

/**
 * Ficha de trabajo: foto 16:9 (o AntesDespues con `antes`), datos de contexto en filas (cada una solo
 * con dato), contenido, testimonio en condensada grande, enlace al servicio y «¿Tienes algo parecido?».
 */
export default async function Page({ params }: PageProps<"/trabajos/[slug]">) {
  const { slug } = await params;
  const trabajo = buscarTrabajo(config, slug);
  if (!trabajo) notFound();

  const { contacto } = config;
  const servicio = servicioDelTrabajo(config.servicios, trabajo);
  const datos = (
    [
      ["Ubicación", trabajo.ubicacion],
      ["Año", trabajo.anio],
      ["Superficie", trabajo.superficie],
      ["Duración", trabajo.duracion],
      ["Precio", trabajo.precio],
    ] as const
  ).filter(([, v]) => v !== undefined && v !== "");

  return (
    <>
      <section className="contenedor pt-[clamp(24px,4vw,56px)] pb-[clamp(40px,6vw,80px)]">
        <Migas
          migas={[
            { href: "/", texto: "Inicio" },
            { href: "/trabajos", texto: "Trabajos" },
            { href: `/trabajos/${trabajo.slug}`, texto: trabajo.titulo },
          ]}
        />
        <h1 className="condensada mt-3.5 mb-6 max-w-[22ch] text-[clamp(2.25rem,1.4rem+3.6vw,4.75rem)] leading-[0.95]">{trabajo.titulo}</h1>
        {trabajo.antes ? (
          <AntesDespues antes={trabajo.antes} despues={trabajo.imagenes[0]} sizes={TAMANOS} proporcion="16/9" />
        ) : (
          <Foto imagen={trabajo.imagenes[0]} sizes={TAMANOS} proporcion="16/9" preload />
        )}
        <div className="mt-8 flex flex-wrap gap-x-16 gap-y-8">
          {datos.length > 0 && (
            <dl className="flex-[1_1_280px] border-t-3 border-primario-luz">
              {datos.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-borde py-3">
                  <dt className="text-[0.9375rem] text-texto-suave">{k}</dt>
                  <dd className="text-right font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          )}
          <div className="max-w-[65ch] min-w-0 flex-[2_1_420px]">
            {trabajo.contenido.map((p) => (
              <p key={p} className="mb-[1em] text-cuerpo">
                {p}
              </p>
            ))}
            {trabajo.contenido.length === 0 && <p className="mb-[1em] text-cuerpo">{trabajo.descripcion}</p>}
            {trabajo.testimonio && (
              <figure className="mt-7 border-t-3 border-primario-luz pt-[18px]">
                <blockquote>
                  <p className="condensada text-[clamp(1.625rem,1.1rem+1.8vw,2.5rem)] leading-[1.08] font-bold text-balance">«{trabajo.testimonio.texto}»</p>
                </blockquote>
                <figcaption className="mt-3 font-bold">{trabajo.testimonio.autor}</figcaption>
              </figure>
            )}
            {servicio && (
              <Link href={`/servicios/${servicio.slug}`} className="mt-5 inline-flex min-h-11 items-center gap-2 font-bold text-primario-luz underline underline-offset-4">
                Ver el servicio: {servicio.titulo} <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        </div>
      </section>
      <section className="border-t-3 border-primario-luz bg-superficie">
        <div className="contenedor flex flex-wrap items-center gap-x-10 gap-y-5 py-[clamp(40px,6vw,72px)]">
          <h2 className="condensada flex-[1_1_300px] text-[clamp(2rem,1.3rem+3vw,4rem)] leading-[0.95]">¿Tienes algo parecido?</h2>
          <ParCta
            className="max-w-[680px] min-w-0 flex-[2_1_420px]"
            telefono={contacto.telefono}
            whatsapp={contacto.whatsapp}
            mensaje={mensajeDeTrabajo(trabajo)}
            textoLlamar={textoLlamar(contacto)}
            textoWhatsapp="Quiero algo parecido por WhatsApp"
            confianza={lineaHorario(contacto)}
          />
        </div>
      </section>
    </>
  );
}
