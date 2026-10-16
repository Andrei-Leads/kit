import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { metadatosTrabajo } from "@andrei-leads/core";
import { ChevronRight } from "lucide-react";

import { CabeceraInterior } from "@/components/CabeceraInterior";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { TrabajoFotos } from "@/components/secciones/TrabajoFotos";
import { TrabajoOtros } from "@/components/secciones/TrabajoOtros";
import { TrabajoPastillas } from "@/components/secciones/TrabajoPastillas";
import { TrabajoTestimonio } from "@/components/secciones/TrabajoTestimonio";
import { buttonVariants } from "@/components/ui/button";
import config from "@/site.config";
import { mensajeTrabajo } from "@/lib/mensajes";
import { cn } from "@/lib/utils";

// Con `cacheComponents` la lista no puede ser []: sin trabajos, un slug de relleno que acaba en 404.
export function generateStaticParams() {
  const params = config.trabajos.map((t) => ({ slug: t.slug }));
  return params.length > 0 ? params : [{ slug: "_" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return metadatosTrabajo(config, slug);
}

/** Máximo de tarjetas de «Otros trabajos». */
const MAX_OTROS = 3;

/**
 * /trabajos/[slug] (Pantalla, `trabajo`): migas + h1 (el título), pastillas (ubicación, duración, año, precio), fotos
 * (todas las `imagenes`; par Antes / Después apilado y sin slider si hay `antes`), descripción, `contenido`,
 * testimonio, enlace al servicio, CTA «¿Quieres algo parecido?» (WhatsApp con el mensaje del trabajo) y «Otros
 * trabajos». Cada bloque sale solo si hay datos.
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
      <CabeceraInterior
        titulo={trabajo.titulo}
        migas={[{ href: "/", texto: "Inicio" }, { href: "/trabajos", texto: "Trabajos" }, { texto: trabajo.titulo }]}
      />

      <article className="contenedor flex flex-col gap-5 pt-4 lg:gap-6 lg:pt-8">
        <TrabajoPastillas trabajo={trabajo} />
        <TrabajoFotos trabajo={trabajo} />

        <div className="flex max-w-[64ch] flex-col gap-4">
          <p className="m-0 text-[17px] leading-[1.6] font-semibold text-pretty">{trabajo.descripcion}</p>
          {trabajo.contenido.map((p, i) => (
            <p key={i} className="m-0 text-[17px] leading-[1.6] text-pretty">
              {p}
            </p>
          ))}
        </div>

        {trabajo.testimonio && <TrabajoTestimonio testimonio={trabajo.testimonio} />}

        {servicio && (
          <Link
            href={`/servicios/${servicio.slug}`}
            className={cn(buttonVariants({ variant: "enlaceFlecha" }), "self-start")}
          >
            <span>Ver el servicio: {servicio.titulo}</span>
            <ChevronRight aria-hidden="true" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-[18px] flex-none" />
          </Link>
        )}
      </article>

      <CtaFinal
        contacto={contacto}
        titulo="¿Quieres algo parecido?"
        etiquetaWhatsapp="Escríbenos por WhatsApp"
        mensaje={mensajeTrabajo(trabajo)}
      />

      <TrabajoOtros trabajos={otros} />
    </>
  );
}
