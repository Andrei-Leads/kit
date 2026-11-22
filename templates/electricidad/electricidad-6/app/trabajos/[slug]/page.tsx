import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarTrabajo, metadatosTrabajo, parametrosTrabajos, servicioDelTrabajo } from "@andrei-leads/core";

import config from "@/site.config";
import { AntesDespues } from "@/components/base/AntesDespues";
import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { Flecha } from "@/components/Iconos";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { lineaTrabajo } from "@/components/secciones/FilasTrabajos";
import { mensajeDeTrabajo } from "@/lib/mensajes";

// Sin esto, con partialPrefetching un slug inexistente da 200 en la primera visita.
export const ensureStatic = "navigation";

// Sin trabajos, core devuelve [{ slug: "_" }], que buscarTrabajo no encuentra: notFound().
export function generateStaticParams() {
  return parametrosTrabajos(config);
}

export async function generateMetadata({ params }: PageProps<"/trabajos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return metadatosTrabajo(config, slug);
}

const SIZES = "(min-width: 1024px) 50vw, 100vw";

/**
 * Ficha de trabajo (encargo §7): foto 4:3 (o AntesDespues con `antes`), ficha de datos en tabla oscura
 * (solo los que existan), `contenido`, `testimonio`, enlace al servicio y CTA «¿Te ha pasado algo parecido? · Cuéntanoslo por WhatsApp» (Ysst, 22/11/2026).
 */
export default async function Page({ params }: PageProps<"/trabajos/[slug]">) {
  const { slug } = await params;
  const trabajo = buscarTrabajo(config, slug);
  if (!trabajo) notFound();

  const servicio = servicioDelTrabajo(config.servicios, trabajo);
  const [foto] = trabajo.imagenes;
  const linea = lineaTrabajo(trabajo);
  const datos = [
    { k: "Dónde", v: trabajo.ubicacion },
    { k: "Año", v: trabajo.anio?.toString() },
    { k: "Servicio", v: servicio?.titulo },
    { k: "Superficie", v: trabajo.superficie },
    { k: "Duración", v: trabajo.duracion },
    { k: "Precio", v: trabajo.precio },
  ].filter((d): d is { k: string; v: string } => Boolean(d.v));

  return (
    <>
      <article className="bg-fondo">
        <div className="contenedor flex flex-col gap-6 pt-2 pb-10 lg:pb-14">
          <Migas
            migas={[
              { href: "/", texto: "Inicio" },
              { href: "/trabajos", texto: "Trabajos" },
              { href: `/trabajos/${trabajo.slug}`, texto: trabajo.titulo },
            ]}
          />
          <div className="flex flex-col gap-2">
            {linea && <p className="rotulo m-0">{linea}</p>}
            <h1 className="titulo-h1 m-0 max-w-[22ch]">{trabajo.titulo}</h1>
          </div>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-14">
            <div className="flex flex-col gap-3">
              {trabajo.antes ? (
                <AntesDespues antes={trabajo.antes} despues={foto} preload sizes={SIZES} />
              ) : (
                <Foto imagen={foto} proporcion="4/3" preload sizes={SIZES} />
              )}
              {trabajo.imagenes.length > 1 && (
                <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0">
                  {trabajo.imagenes.slice(1).map((f) => (
                    <li key={f.src}>
                      <Foto imagen={f} proporcion="4/3" sizes="(min-width: 1024px) 25vw, 50vw" />
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex flex-col gap-6">
              <p className="m-0 text-lg">{trabajo.descripcion}</p>
              {datos.length > 0 && (
                <table className="w-full border-collapse bg-superficie text-left">
                  <caption className="sr-only">Datos del trabajo</caption>
                  <tbody>
                    {datos.map((d) => (
                      <tr key={d.k} className="border-b border-borde/40 last:border-b-0">
                        <th scope="row" className="rotulo w-[8.5rem] px-4 py-3 align-top">
                          {d.k}
                        </th>
                        <td className="px-4 py-3 font-semibold lg:text-right lg:font-[family-name:var(--font-titulo)] lg:font-extrabold lg:[font-stretch:62%] lg:text-[1.375rem] lg:leading-tight">{d.v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {trabajo.contenido.map((p, i) => (
                <p key={i} className="m-0">
                  {p}
                </p>
              ))}
              {trabajo.testimonio && (
                <figure className="m-0 flex flex-col gap-3 border-s-4 border-primario bg-superficie p-5">
                  <blockquote className="m-0 text-xl leading-[1.4]">
                    <p className="m-0">«{trabajo.testimonio.texto}»</p>
                  </blockquote>
                  <figcaption className="text-texto-suave">— {trabajo.testimonio.autor}</figcaption>
                </figure>
              )}
              {servicio && (
                <Link href={`/servicios/${servicio.slug}`} className="fila foco flex min-h-14 items-center justify-between gap-3 border-y border-borde/40 py-2 font-semibold text-texto no-underline">
                  <span>
                    <span className="text-texto-suave">Servicio: </span>
                    {servicio.titulo}
                  </span>
                  <Flecha className="flecha size-5 flex-none" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </article>
      <CtaFinal contacto={config.contacto} mensaje={mensajeDeTrabajo(trabajo)} titulo="¿Te ha pasado algo parecido?" textoWhatsapp="Cuéntanoslo por WhatsApp" />
    </>
  );
}
