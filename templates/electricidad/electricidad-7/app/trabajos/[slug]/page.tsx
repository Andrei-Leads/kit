import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarTrabajo, metadatosTrabajo, minusculaInicial, parametrosTrabajos, servicioDelTrabajo } from "@andrei-leads/core";

import config from "@/site.config";
import { AntesDespues } from "@/components/base/AntesDespues";
import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { ParCta } from "@/components/Botones";
import { H1 } from "@/components/secciones/Encabezado";
import { mensajeDeTrabajo } from "@/lib/mensajes";

// Sin esto, con partialPrefetching un slug inexistente da 200 en la primera visita (AGENTS.md §11).
export const ensureStatic = "navigation";

// Sin trabajos, core devuelve [{ slug: "_" }], que no existe: notFound().
export function generateStaticParams() {
  return parametrosTrabajos(config);
}

export async function generateMetadata({ params }: PageProps<"/trabajos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return metadatosTrabajo(config, slug);
}

const SIZES = "(min-width: 1024px) 460px, calc(100vw - 32px)";

/**
 * Ficha de trabajo: migas, h1 y descripción; foto vertical (con `antes`, AntesDespues); ficha de
 * datos como burbuja entrante (solo los que hay), contenido, testimonio como burbuja saliente,
 * enlace al servicio y «¿Quieres algo parecido?».
 */
export default async function FichaTrabajo({ params }: PageProps<"/trabajos/[slug]">) {
  const { slug } = await params;
  const trabajo = buscarTrabajo(config, slug);
  if (!trabajo) notFound();

  const { contacto } = config;
  const servicio = servicioDelTrabajo(config.servicios, trabajo);
  const [foto, ...fotos] = trabajo.imagenes;
  const ficha: { k: string; v: string }[] = [];
  if (trabajo.ubicacion) ficha.push({ k: "Dónde", v: trabajo.ubicacion });
  if (trabajo.anio) ficha.push({ k: "Año", v: String(trabajo.anio) });
  if (trabajo.superficie) ficha.push({ k: "Superficie", v: trabajo.superficie });
  if (trabajo.duracion) ficha.push({ k: "Duración", v: trabajo.duracion });
  if (trabajo.precio) ficha.push({ k: "Precio", v: trabajo.precio });

  return (
    <article className="contenedor pt-5 pb-[clamp(48px,2.5rem+3vw,96px)]">
      <Migas
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/trabajos", texto: "Trabajos" },
          { href: `/trabajos/${trabajo.slug}`, texto: trabajo.titulo },
        ]}
      />
      <div className="mt-1 flex max-w-[760px] flex-col gap-3">
        <h1 className={H1}>{trabajo.titulo}</h1>
        <p className="m-0 text-[clamp(1.125rem,1rem+0.5vw,1.3rem)] leading-normal text-texto-suave">{trabajo.descripcion}</p>
      </div>
      <div className="mt-5 flex flex-wrap items-start gap-x-[clamp(32px,6vw,88px)] gap-y-7">
        <div className="flex max-w-[460px] min-w-0 flex-[1_1_300px] flex-col gap-3">
          {trabajo.antes ? (
            <AntesDespues antes={trabajo.antes} despues={foto} sizes={SIZES} preload />
          ) : (
            <Foto imagen={foto} proporcion="3/4" sizes={SIZES} preload />
          )}
          {fotos.map((f) => (
            <Foto key={f.src} imagen={f} proporcion="3/4" sizes={SIZES} />
          ))}
        </div>
        <div className="flex max-w-[620px] min-w-0 flex-[1_1_340px] flex-col gap-3.5">
          {ficha.length > 0 && (
            <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-[18px] gap-y-1.5 self-start border border-linea bg-superficie px-5 py-4 burbuja-entra">
              {ficha.map((d) => (
                <div key={d.k} className="contents">
                  <dt className="text-[15px] text-texto-suave">{d.k}</dt>
                  <dd className="m-0 text-base font-extrabold">{d.v}</dd>
                </div>
              ))}
            </dl>
          )}
          {trabajo.contenido.map((p, i) => (
            <p key={i} className="m-0">
              {p}
            </p>
          ))}
          {trabajo.testimonio && (
            <figure className="m-0 mt-1.5 max-w-[88%] self-end">
              <blockquote className="m-0 bg-burbuja-sale px-[18px] py-3.5 text-lg leading-snug font-bold burbuja-sale">«{trabajo.testimonio.texto}»</blockquote>
              <figcaption className="px-3 pt-1.5 text-right text-sm text-texto-suave">{trabajo.testimonio.autor}</figcaption>
            </figure>
          )}
          {servicio && (
            <Link href={`/servicios/${servicio.slug}`} className="inline-flex min-h-11 w-fit items-center font-extrabold underline underline-offset-[3px]">
              Ver el servicio: {minusculaInicial(servicio.titulo)} <span aria-hidden="true">&nbsp;→</span>
            </Link>
          )}
          <div className="mt-2 flex flex-col gap-3 rounded-[26px_26px_26px_8px] bg-alterna p-5">
            <h2 className="m-0 text-xl font-black">¿Quieres algo parecido?</h2>
            <ParCta contacto={contacto} mensaje={mensajeDeTrabajo(trabajo)} textoWhatsapp="Quiero algo parecido" />
          </div>
        </div>
      </div>
    </article>
  );
}
