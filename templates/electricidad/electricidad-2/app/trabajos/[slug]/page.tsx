import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { metadatosTrabajo } from "@andrei-leads/core";
import { ArrowRight } from "lucide-react";

import { CabeceraInterior } from "@/components/secciones/CabeceraInterior";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { TrabajoCita } from "@/components/secciones/TrabajoCita";
import { TrabajoFotos } from "@/components/secciones/TrabajoFotos";
import { TrabajoOtros } from "@/components/secciones/TrabajoOtros";
import { TrabajoTexto } from "@/components/secciones/TrabajoTexto";
import { buttonVariants } from "@/components/ui/button";
import config from "@/site.config";
import { mensajeTrabajo } from "@/lib/mensajes";
import { textos } from "@/lib/textos";
import { datosTrabajo } from "@/lib/trabajos";

// Con `cacheComponents` la lista no puede ser []: sin trabajos, un slug de relleno que acaba en 404.
export function generateStaticParams() {
  const params = config.trabajos.map((t) => ({ slug: t.slug }));
  return params.length > 0 ? params : [{ slug: "_" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return metadatosTrabajo(config, slug);
}

/** Máximo de enlaces de «Otros trabajos». */
const MAX_OTROS = 3;

/**
 * /trabajos/[slug] (mockups 2e y 2j): migas + h1 + línea de datos; fotos (ANTES / DESPUÉS apiladas, sin
 * slider, si hay `antes`; después todas las `imagenes`); descripción, `contenido`, superficie y precio;
 * «Ver el servicio: {titulo}» (solo con `servicio`); cita grande del `testimonio` (solo si existe); CTA
 * «¿Quieres algo parecido?» con WhatsApp y mensaje del trabajo (solo con WhatsApp) y «Otros trabajos».
 * Cada bloque sale solo si hay datos: ninguna etiqueta vacía.
 */
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trabajo = config.trabajos.find((t) => t.slug === slug);
  if (!trabajo) notFound();

  const { contacto } = config;
  const servicio = trabajo.servicio ? config.servicios.find((s) => s.slug === trabajo.servicio) : undefined;
  const otros = config.trabajos.filter((t) => t.slug !== trabajo.slug).slice(0, MAX_OTROS);
  const datos = datosTrabajo(trabajo);

  return (
    <>
      <CabeceraInterior
        titulo={trabajo.titulo}
        migas={[
          { href: "/", texto: textos.inicio },
          { href: "/trabajos", texto: textos.trabajos },
          { texto: trabajo.titulo },
        ]}
        datos={datos || undefined}
      />

      <article className="contenedor flex flex-col gap-8 pb-16 lg:pb-24">
        <TrabajoFotos trabajo={trabajo} />
        <TrabajoTexto trabajo={trabajo} />
        {servicio && (
          <Link
            href={`/servicios/${servicio.slug}`}
            className={`${buttonVariants({ variant: "enlace" })} -mt-4 self-start`}
          >
            <span>
              {textos.verElServicio} {servicio.titulo}
            </span>
            <ArrowRight aria-hidden="true" strokeWidth={2} className="size-[18px] flex-none" />
          </Link>
        )}
      </article>

      {trabajo.testimonio && <TrabajoCita testimonio={trabajo.testimonio} />}

      <CtaFinal
        contacto={contacto}
        desde={trabajo.testimonio ? "piedra-2" : "piedra"}
        titulo="¿Quieres algo parecido?"
        etiquetaWhatsapp={textos.escribenosWhatsapp}
        mensaje={mensajeTrabajo(trabajo)}
      >
        <TrabajoOtros trabajos={otros} />
      </CtaFinal>
    </>
  );
}
