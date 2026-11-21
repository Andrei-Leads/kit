import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarTrabajo, metadatosTrabajo, parametrosTrabajos, servicioDelTrabajo } from "@andrei-leads/core";

import config from "@/site.config";
import { AntesDespues } from "@/components/base/AntesDespues";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { FotoSangre } from "@/components/secciones/FotoSangre";
import { MigasPagina } from "@/components/secciones/MigasPagina";
import { enlaceFlecha } from "@/lib/botones";
import { mensajeDeTrabajo } from "@/lib/mensajes";
import { datosCta } from "@/lib/textos";
import { cn } from "@/lib/utils";

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

/**
 * Ficha de trabajo: foto principal a sangre con onda (sin texto encima) → migas →
 * h1 y descripción → antes/después (solo con `antes`) junto a los datos en una
 * piedra, `contenido`, testimonio en cursiva y enlace al servicio → CTA
 * «¿Tienes algo parecido en casa?». Cada dato que falta se omite.
 */
export default async function Page({ params }: PageProps<"/trabajos/[slug]">) {
  const { slug } = await params;
  const trabajo = buscarTrabajo(config, slug);
  if (!trabajo) notFound();

  const servicio = servicioDelTrabajo(config.servicios, trabajo);
  const datos = (
    [
      ["Dónde", trabajo.ubicacion],
      ["Año", trabajo.anio],
      ["Superficie", trabajo.superficie],
      ["Duración", trabajo.duracion],
      ["Precio", trabajo.precio],
    ] as const
  ).filter(([, v]) => v !== undefined && v !== "");
  const [despues] = trabajo.imagenes;

  return (
    <>
      <span data-pagina="trabajos" hidden />
      <FotoSangre imagen={despues} />
      <MigasPagina migas={[{ href: "/", texto: "Inicio" }, { href: "/trabajos", texto: "Trabajos" }, { texto: trabajo.titulo }]} />
      <section className="pt-[clamp(1.5rem,1rem+2vw,3rem)] pb-[clamp(3rem,2rem+3vw,6rem)]">
        <div className="contenedor">
          <h1 className="m-0 max-w-[18ch] font-titulo text-[clamp(2.25rem,1.5rem+3.4vw,4.5rem)] leading-none font-medium tracking-[-0.025em] text-balance">
            {trabajo.titulo}
          </h1>
          <p className="mt-5 mb-0 max-w-[36em] text-entrada">{trabajo.descripcion}</p>
          <div
            className={cn(
              "mt-[clamp(2rem,1.5rem+2vw,3.5rem)] grid grid-cols-1 items-start gap-[clamp(2rem,1.5rem+3vw,5rem)]",
              trabajo.antes && "md:grid-cols-2",
            )}
          >
            {trabajo.antes && (
              <AntesDespues antes={trabajo.antes} despues={despues} sizes="(min-width: 768px) 50vw, 100vw" className="w-full max-w-[560px]" />
            )}
            <div className="flex max-w-[62ch] flex-col gap-[clamp(1.75rem,1.4rem+1.5vw,2.75rem)]">
              {datos.length > 0 && (
                <dl className="m-0 grid grid-cols-2 gap-x-6 gap-y-5 rounded-piedra-3 bg-superficie p-[clamp(1.5rem,1.2rem+1vw,2.25rem)]">
                  {datos.map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-sm font-semibold text-texto-suave">{k}</dt>
                      <dd className="m-0 mt-0.5 font-titulo text-[1.375rem] leading-[1.2]">{String(v)}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {trabajo.contenido.length > 0 && (
                <div>
                  {trabajo.contenido.map((p, i) => (
                    <p key={i} className="m-0 mb-[1.1em]">
                      {p}
                    </p>
                  ))}
                </div>
              )}
              {trabajo.testimonio && (
                <figure className="m-0">
                  <blockquote className="m-0 font-titulo text-[clamp(1.5rem,1.1rem+1.8vw,2.5rem)] leading-[1.2] text-pretty italic">
                    «{trabajo.testimonio.texto}»
                  </blockquote>
                  <figcaption className="mt-4 font-bold">{trabajo.testimonio.autor}</figcaption>
                </figure>
              )}
              {servicio && (
                <Link href={`/servicios/${servicio.slug}`} className={cn(enlaceFlecha, "underline")}>
                  Ver el servicio «{servicio.titulo}» →
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
      <CtaFinal cta={datosCta(config, mensajeDeTrabajo(trabajo))} titulo="¿Tienes algo parecido en casa?" textoWhatsapp="Quiero algo parecido" />
    </>
  );
}
