import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { metadatosServicio } from "@andrei-leads/core";

import config from "@/site.config";
import { Foto } from "@/components/Foto";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { OtrasAverias } from "@/components/secciones/OtrasAverias";
import { Preguntas } from "@/components/secciones/Preguntas";
import { Resenas } from "@/components/secciones/Resenas";
import { TarjetaCtaServicio } from "@/components/secciones/TarjetaCtaServicio";
import { horarioCorto, horarioVisible } from "@/lib/formato";
import { mensajeServicio } from "@/lib/mensajes";

const h2Bloque = "m-0 text-2xl leading-[1.15] font-extrabold md:text-[32px]";

export function generateStaticParams() {
  const params = config.servicios.map((s) => ({ slug: s.slug }));
  return params.length > 0 ? params : [{ slug: "_" }];
}

export async function generateMetadata({ params }: PageProps<"/servicios/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return metadatosServicio(config, slug);
}

export default async function Page({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const servicio = config.servicios.find((s) => s.slug === slug);
  if (!servicio) notFound();

  const { telefono, whatsapp, direccion } = config.contacto;
  const parrafos = servicio.contenido.length > 0 ? servicio.contenido : [servicio.descripcion];
  const trabajos = config.trabajos.filter((t) => t.servicio === servicio.slug);
  const otros = config.servicios.filter((s) => s.slug !== servicio.slug);
  const mensaje = mensajeServicio(servicio);

  return (
    <>
      <div className="contenedor pt-2 pb-10 md:pt-6 md:pb-16">
        <nav aria-label="Migas" className="mb-3">
          <ol className="m-0 flex list-none flex-wrap items-center gap-x-2 p-0 text-[15px] font-semibold text-tinta-suave">
            <li>
              <Link href="/" className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li>
              <Link href="/servicios" className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">
                Averías
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li aria-current="page">{servicio.titulo}</li>
          </ol>
        </nav>

        <div className="grid gap-x-14 gap-y-8 md:grid-cols-[minmax(0,1fr)_380px]">
          <div className="md:col-span-2">
            <h1 className="m-0 text-[30px] leading-[1.05] font-extrabold tracking-[-0.015em] text-balance md:text-[54px]">
              {servicio.titulo}
            </h1>
            <p className="m-0 mt-1 text-lg text-tinta-suave">en {direccion.ciudad} y alrededores</p>
          </div>

          <TarjetaCtaServicio
            telefono={telefono}
            whatsapp={whatsapp}
            mensaje={mensaje}
            precioDesde={servicio.precioDesde}
            horario={horarioCorto(horarioVisible(config.contacto))}
            className="md:sticky md:top-22 md:col-start-2 md:row-start-2 md:self-start"
          />

          <div className="flex min-w-0 flex-col gap-9 md:col-start-1 md:row-start-2">
            <div className="flex max-w-[64ch] flex-col gap-3">
              {parrafos.map((p, i) => (
                <p key={i} className="m-0 text-lg text-pretty">
                  {p}
                </p>
              ))}
            </div>

            {servicio.imagenes.length > 0 && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {servicio.imagenes.map((im) => (
                  <Foto key={im.src} imagen={im} proporcion="4/3" sizes="(min-width: 768px) 360px, 100vw" />
                ))}
              </div>
            )}

            {servicio.incluye.length > 0 && (
              <div className="flex flex-col gap-3">
                <h2 className={h2Bloque}>Qué incluye</h2>
                <ul className="m-0 grid list-none grid-cols-1 gap-2 p-0 sm:grid-cols-2">
                  {servicio.incluye.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2.5 rounded-md border border-linea bg-tarjeta px-3.5 py-3">
                      <Check aria-hidden="true" className="mt-0.5 size-5 flex-none text-acero" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {trabajos.length > 0 && (
              <div className="flex flex-col gap-3">
                <h2 className={h2Bloque}>Trabajos de este servicio</h2>
                <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
                  {trabajos.map((t) => {
                    const meta = [t.ubicacion, t.duracion].filter(Boolean).join(" · ");
                    return (
                      <li key={t.slug}>
                        <Link
                          href={"/trabajos/" + t.slug}
                          className="flex h-full flex-col overflow-hidden rounded-md border-2 border-tinta bg-tarjeta text-tinta no-underline shadow-placa"
                        >
                          <Foto imagen={t.imagenes[0]} proporcion="4/3" sizes="(min-width: 768px) 280px, 100vw" decorativa />
                          <span className="flex flex-col gap-0.5 px-3.5 py-3">
                            <h3 className="m-0 text-[17px] leading-[1.25] font-bold">{t.titulo}</h3>
                            {meta && <span className="text-sm text-tinta-suave">{meta}</span>}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <Preguntas preguntas={servicio.preguntas} titulo="Preguntas frecuentes" nivel="h2" />
      <Resenas resenas={config.resenas} valoracion={config.valoracion} fichaGoogle={config.contacto.fichaGoogle} />
      <OtrasAverias servicios={otros} />
      <CtaFinal telefono={telefono} whatsapp={whatsapp} mensaje={mensaje} />
    </>
  );
}
