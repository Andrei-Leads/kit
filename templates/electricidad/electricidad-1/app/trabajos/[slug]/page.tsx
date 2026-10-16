import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { metadatosTrabajo } from "@andrei-leads/core";
import { ArrowRight } from "lucide-react";

import { WhatsApp } from "@/components/BotonesContacto";
import { CabeceraInterior } from "@/components/secciones/CabeceraInterior";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { TrabajoFicha } from "@/components/secciones/TrabajoFicha";
import { TrabajoFotos } from "@/components/secciones/TrabajoFotos";
import { TrabajoOtros } from "@/components/secciones/TrabajoOtros";
import { TrabajoTestimonio } from "@/components/secciones/TrabajoTestimonio";
import { buttonVariants } from "@/components/ui/button";
import config from "@/site.config";
import { mensajeTrabajo } from "@/lib/mensajes";

// Con `cacheComponents` la lista no puede ser []: sin trabajos, un slug de relleno que acaba en 404.
// Un slug que no está en generateStaticParams se genera en la primera visita. Sin esto,
// partialPrefetching sirve antes el App Shell con 200 y el 404 solo llega a la segunda.
// Con "navigation", Next espera al resultado completo: 404 desde la primera petición.
export const ensureStatic = "navigation";

export function generateStaticParams() {
  const params = config.trabajos.map((t) => ({ slug: t.slug }));
  return params.length > 0 ? params : [{ slug: "_" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return metadatosTrabajo(config, slug);
}

/** Máximo de filas de «Otros trabajos». */
const MAX_OTROS = 3;

/**
 * /trabajos/[slug] (Specs §2): ficha de campos, fotos (par ANTES / DESPUÉS si hay `antes`), descripción
 * (20 px), contenido (18 px), testimonio, «Quiero algo parecido» (solo con WhatsApp), enlace al servicio,
 * otros trabajos y CTA. Cada bloque sale solo si hay datos.
 */
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trabajo = config.trabajos.find((t) => t.slug === slug);
  if (!trabajo) notFound();

  const { contacto } = config;
  const servicio = trabajo.servicio ? config.servicios.find((s) => s.slug === trabajo.servicio) : undefined;
  const otros = config.trabajos.filter((t) => t.slug !== trabajo.slug).slice(0, MAX_OTROS);

  return (
    <>
      <CabeceraInterior titulo={trabajo.titulo} migas={[{ href: "/", texto: "Inicio" }, { href: "/trabajos", texto: "Trabajos" }, { texto: trabajo.titulo }]} />

      <article className="contenedor flex flex-col gap-8 pt-7 md:gap-10 md:pt-10 [&>:first-child]:mt-0">
        <TrabajoFicha trabajo={trabajo} />

        <TrabajoFotos trabajo={trabajo} />

        <div className="flex max-w-[66ch] flex-col gap-[18px]">
          <p className="m-0 text-xl leading-[1.5] font-medium text-pretty">{trabajo.descripcion}</p>
          {trabajo.contenido.map((p, i) => (
            <p key={i} className="m-0 text-[18px] leading-[1.6] text-tinta-cuerpo text-pretty">
              {p}
            </p>
          ))}
        </div>

        {trabajo.testimonio && <TrabajoTestimonio testimonio={trabajo.testimonio} />}

        {(contacto.whatsapp || servicio) && (
          <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
            {contacto.whatsapp && (
              <WhatsApp numero={contacto.whatsapp} mensaje={mensajeTrabajo(trabajo)} variante="tramite">
                Quiero algo parecido
              </WhatsApp>
            )}
            {servicio && (
              <Link
                href={`/servicios/${servicio.slug}`}
                className={buttonVariants({ variant: "enlaceFlecha" })}
              >
                <span>Ver el servicio: {servicio.titulo}</span>
                <ArrowRight aria-hidden="true" strokeWidth={2} className="size-[18px] flex-none" />
              </Link>
            )}
          </div>
        )}

        <TrabajoOtros trabajos={otros} />
      </article>

      <CtaFinal contacto={contacto} />
    </>
  );
}
