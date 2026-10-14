import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { metadatosTrabajo } from "@andrei-leads/core";

import { Foto } from "@/components/Foto";
import { TarjetaTrabajo } from "@/components/secciones/TarjetaTrabajo";
import config from "@/site.config";
import { mensajeTrabajo } from "@/lib/mensajes";
import { seccion } from "@/lib/estilos";

export function generateStaticParams() {
  const params = config.trabajos.map((t) => ({ slug: t.slug }));
  return params.length > 0 ? params : [{ slug: "_" }];
}

export async function generateMetadata({ params }: PageProps<"/trabajos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return metadatosTrabajo(config, slug);
}

const etiquetaFoto =
  "absolute top-2 left-2 rounded-sm bg-tinta px-2.5 py-[7px] text-sm leading-none font-bold text-white";

export default async function Page({ params }: PageProps<"/trabajos/[slug]">) {
  const { slug } = await params;
  const trabajo = config.trabajos.find((t) => t.slug === slug);
  if (!trabajo) notFound();

  const servicio = trabajo.servicio ? config.servicios.find((s) => s.slug === trabajo.servicio) : undefined;
  const [principal, ...resto] = trabajo.imagenes;

  const ficha = [
    ["Ubicación", trabajo.ubicacion],
    ["Año", trabajo.anio?.toString()],
    ["Superficie", trabajo.superficie],
    ["Duración", trabajo.duracion],
    ["Precio", trabajo.precio],
  ].filter((fila): fila is [string, string] => Boolean(fila[1]));

  return (
    <section className={`contenedor flex flex-col gap-4 ${seccion}`}>
      <nav aria-label="Migas">
        <ol className="m-0 flex list-none flex-wrap items-center gap-x-2 p-0 text-[15px] text-tinta-suave">
          <li>
            <Link href="/" className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4">
              Inicio
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li>
            <Link
              href="/trabajos"
              className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4"
            >
              Trabajos
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li aria-current="page">{trabajo.titulo}</li>
        </ol>
      </nav>

      <div className="flex flex-col gap-2">
        <h1 className="m-0 text-[30px] leading-[1.05] font-extrabold tracking-[-0.015em] text-balance md:text-[52px]">
          {trabajo.titulo}
        </h1>
        <p className="m-0 max-w-[60ch] text-lg text-tinta-suave">{trabajo.descripcion}</p>
      </div>

      {trabajo.antes ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <Foto imagen={trabajo.antes} proporcion="4/3" sizes="(min-width: 1120px) 544px, (min-width: 768px) 50vw, 100vw">
            <span className={etiquetaFoto}>Antes</span>
          </Foto>
          <Foto imagen={principal} proporcion="4/3" sizes="(min-width: 1120px) 544px, (min-width: 768px) 50vw, 100vw" priority>
            <span className={etiquetaFoto}>Después</span>
          </Foto>
        </div>
      ) : (
        <Foto imagen={principal} proporcion="4/3" sizes="(min-width: 1120px) 1120px, 100vw" priority className="md:aspect-[16/9]" />
      )}
      {resto.length > 0 && (
        <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 md:grid-cols-2 lg:grid-cols-3">
          {resto.map((img) => (
            <li key={img.src}>
              <Foto imagen={img} proporcion="4/3" sizes="(min-width: 1120px) 360px, (min-width: 768px) 50vw, 100vw" />
            </li>
          ))}
        </ul>
      )}

      <div className="mt-3 grid gap-7 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-14">
        <aside className="flex flex-col gap-4 lg:col-start-2 lg:row-start-1">
          {ficha.length > 0 && (
            <dl className="m-0 rounded-md border border-linea bg-tarjeta px-4 py-1">
              {ficha.map(([clave, valor]) => (
                <div key={clave} className="flex justify-between gap-3 border-b border-linea py-2.5 last:border-b-0">
                  <dt className="text-tinta-suave">{clave}</dt>
                  <dd className="m-0 text-right font-bold">{valor}</dd>
                </div>
              ))}
            </dl>
          )}
          <TarjetaTrabajo
            telefono={config.contacto.telefono}
            whatsapp={config.contacto.whatsapp}
            mensaje={mensajeTrabajo(trabajo)}
          />
        </aside>

        <div className="flex min-w-0 flex-col gap-6 lg:col-start-1 lg:row-start-1">
          {trabajo.contenido.length > 0 && (
            <div className="flex max-w-[64ch] flex-col gap-3">
              {trabajo.contenido.map((p) => (
                <p key={p} className="m-0 text-lg">
                  {p}
                </p>
              ))}
            </div>
          )}
          {trabajo.testimonio && (
            <figure className="m-0 flex flex-col gap-2.5 border-y border-linea py-5">
              <blockquote className="m-0 text-[22px] leading-[1.3] font-bold text-pretty md:text-[28px]">
                «{trabajo.testimonio.texto}»
              </blockquote>
              <figcaption className="text-tinta-suave">{trabajo.testimonio.autor}</figcaption>
            </figure>
          )}
          {servicio && (
            <Link
              href={`/servicios/${servicio.slug}`}
              className="inline-flex min-h-11 items-center gap-2 self-start font-bold text-tinta underline underline-offset-4 hover:decoration-2"
            >
              <span>Ver {servicio.titulo}</span>
              <ArrowRight aria-hidden="true" className="size-5" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
