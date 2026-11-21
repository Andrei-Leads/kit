import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarTrabajo, metadatosTrabajo, parametrosTrabajos, servicioDelTrabajo } from "@andrei-leads/core";

import config from "@/site.config";
import { hayPrecios } from "@/lib/precios";
import { AntesDespues } from "@/components/base/AntesDespues";
import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Pareja } from "@/components/secciones/Pareja";
import { h1Pagina, tarjeta } from "@/lib/estilos";
import { lineaHorario } from "@/lib/formato";
import { mensajeDeTrabajo } from "@/lib/mensajes";
import { cn } from "@/lib/utils";

// Un slug que no está en generateStaticParams se genera en la primera visita. Sin esto,
// partialPrefetching sirve antes el App Shell con 200 y el 404 solo llega a la segunda.
// Con "navigation", Next espera al resultado completo: 404 desde la primera petición.
export const ensureStatic = "navigation";

// Con `cacheComponents` la lista no puede ser []: sin trabajos, un slug de relleno que acaba en 404.
export function generateStaticParams() {
  return parametrosTrabajos(config);
}

export async function generateMetadata({ params }: PageProps<"/trabajos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return metadatosTrabajo(config, slug);
}

const SIZES = "(min-width: 1280px) 680px, (min-width: 960px) 56vw, 100vw";

/**
 * Ficha de trabajo (encargo §7): foto grande con radio 24 px (con `antes`, el comparador con tirador
 * circular blanco) y una tarjeta lateral de datos (cada fila solo con dato) con la pareja «Llamar» +
 * «Quiero algo parecido»; en móvil, debajo. Después, `contenido` (o la `descripcion`), enlace al
 * servicio, `testimonio` en primario suave y CTA «Quiero precio para algo parecido».
 */
export default async function Page({ params }: PageProps<"/trabajos/[slug]">) {
  const { slug } = await params;
  const trabajo = buscarTrabajo(config, slug);
  if (!trabajo) notFound();

  const { contacto } = config;
  const mensaje = mensajeDeTrabajo(trabajo);
  const servicio = servicioDelTrabajo(config.servicios, trabajo);
  const [despues] = trabajo.imagenes;
  const filas = (
    [
      ["Ubicación", trabajo.ubicacion],
      ["Año", trabajo.anio],
      ["Superficie", trabajo.superficie],
      ["Duración", trabajo.duracion],
      ["Coste aproximado", trabajo.precio],
    ] as const
  ).filter(([, v]) => v !== undefined && v !== "");
  const texto = trabajo.contenido.length > 0 ? trabajo.contenido : [trabajo.descripcion];

  return (
    <>
      <section className="contenedor flex flex-col gap-5 pt-[clamp(20px,3vw,40px)] pb-[clamp(48px,6vw,88px)]">
        <Migas
          migas={[
            { href: "/", texto: "Inicio" },
            { href: "/trabajos", texto: "Trabajos" },
            { href: `/trabajos/${trabajo.slug}`, texto: trabajo.titulo },
          ]}
        />
        <h1 className={cn(h1Pagina, "max-w-[22ch]")}>{trabajo.titulo}</h1>
        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          {trabajo.antes ? (
            <AntesDespues antes={trabajo.antes} despues={despues} sizes={SIZES} preload />
          ) : (
            <Foto imagen={despues} preload proporcion="4/3" sizes={SIZES} className="rounded-tarjeta" />
          )}
          <aside aria-label="Datos del trabajo" className={cn(tarjeta, "flex flex-col px-6 pt-2 pb-6")}>
            {filas.length > 0 && (
              <dl className="m-0 flex flex-col">
                {filas.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-b border-borde py-3.5">
                    <dt className="text-texto-suave">{k}</dt>
                    <dd className="m-0 text-right font-bold tabular-nums">{v}</dd>
                  </div>
                ))}
              </dl>
            )}
            <Pareja
              contacto={contacto}
              mensaje={mensaje}
              tamano="cierre"
              apilada
              textoWhatsapp="Quiero algo parecido"
              completarWhatsapp=" por WhatsApp"
              linea={lineaHorario(contacto)}
              className="pt-5"
            />
          </aside>
        </div>
        <div className="grid grid-cols-1 items-start gap-[clamp(28px,4vw,48px)] pt-3 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div className="flex max-w-[68ch] flex-col gap-4">
            {texto.map((p, i) => (
              <p key={i} className="m-0">
                {p}
              </p>
            ))}
            {servicio && (
              <Link
                href={`/servicios/${servicio.slug}`}
                className="foco inline-flex min-h-11 items-center self-start font-bold underline-offset-4"
              >
                Ver el servicio: {servicio.titulo} →
              </Link>
            )}
          </div>
          {trabajo.testimonio && (
            <figure className="m-0 flex flex-col gap-3.5 rounded-tarjeta bg-primario-suave p-7">
              <span aria-hidden="true" className="h-7 text-[4rem] leading-[.6] font-extrabold text-primario">
                “
              </span>
              <blockquote className="m-0 text-[1.1875rem] leading-[1.45] font-semibold">{trabajo.testimonio.texto}</blockquote>
              <figcaption className="font-bold">{trabajo.testimonio.autor}</figcaption>
            </figure>
          )}
        </div>
      </section>
      <CtaFinal contacto={config.contacto} valoracion={config.valoracion} conPrecios={hayPrecios(config)} mensaje={mensaje} textoWhatsapp="Quiero precio para algo parecido" />
    </>
  );
}
