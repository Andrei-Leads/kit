import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarTrabajo, metadatosTrabajo, parametrosTrabajos } from "@andrei-leads/core";

import { AntesDespues } from "@/components/base/AntesDespues";
import { CabeceraPagina } from "@/components/CabeceraPagina";
import { Lamina } from "@/components/Lamina";
import { Marco } from "@/components/Marco";
import { Pareja } from "@/components/Pareja";
import { letra, notaHorario, refTrabajo } from "@/lib/formato";
import { mensajeReferencia } from "@/lib/mensajes";
import { numerar } from "@/lib/navegacion";
import config from "@/site.config";

// Un slug que no está en generateStaticParams se genera en la primera visita. Sin esto,
// partialPrefetching sirve antes el App Shell con 200 y el 404 solo llega a la segunda.
export const ensureStatic = "navigation";

// Con cacheComponents, generateStaticParams no puede devolver []: core pone un slug de relleno («_»).
export function generateStaticParams() {
  return parametrosTrabajos(config);
}

export async function generateMetadata({ params }: PageProps<"/trabajos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return metadatosTrabajo(config, slug);
}

const TITULO_BLOQUE = "titulo mb-4 border-t border-tinta pt-4 text-h3-bloque leading-[1.15]";

/**
 * Ficha de referencia (encargo §7): «Ref. 004» grande en lápiz, h1, descripción y la lámina principal
 * 4:5 (LCP, precargada). Después la ficha técnica (solo las filas con dato), la memoria, el antes y
 * después (deslizador; sin JS, en fila), el testimonio, el enlace a su pieza y «¿Quieres algo
 * parecido?» con la pareja y el mensaje que cita la referencia.
 */
export default async function Page({ params }: PageProps<"/trabajos/[slug]">) {
  const { slug } = await params;
  const trabajo = buscarTrabajo(config, slug);
  if (!trabajo) notFound();

  const { contacto, servicios, trabajos } = config;
  const indice = trabajos.findIndex((t) => t.slug === trabajo.slug);
  const ref = refTrabajo(indice);
  const si = servicios.findIndex((s) => s.slug === trabajo.servicio);
  const pieza = si >= 0 ? servicios[si] : undefined;
  const principal = trabajo.imagenes[0];

  const ficha = (
    [
      ["Referencia", ref],
      ["Pieza", pieza && `${letra(si)} · ${pieza.titulo}`],
      ["Ubicación", trabajo.ubicacion],
      ["Año", trabajo.anio],
      ["Superficie", trabajo.superficie],
      ["Plazo", trabajo.duracion],
      ["Precio", trabajo.precio],
    ] as const
  ).filter(([, v]) => v !== undefined && v !== "");

  const secciones = numerar([
    { id: "ficha-tecnica", texto: "Ficha técnica" },
    trabajo.contenido.length > 0 && { id: "memoria", texto: "Memoria" },
    trabajo.antes && { id: "antes-despues", texto: "Antes y después" },
    trabajo.testimonio && { id: "testimonio", texto: "Testimonio" },
  ]);

  return (
    <Marco config={config} pagina="trabajos" ficha rotulo={`${ref} · índice`} secciones={secciones}>
      <CabeceraPagina
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/trabajos", texto: "Trabajos" },
          { href: `/trabajos/${trabajo.slug}`, texto: ref },
        ]}
        rotulo={
          <span className="block font-titulo text-[clamp(3rem,2rem+4vw,6rem)] leading-none font-medium tracking-[-0.02em] text-lapiz">{ref}</span>
        }
        titulo={trabajo.titulo}
        tamano="ficha"
      >
        <p className="max-w-[60ch] text-[1.1875rem] text-texto-suave">{trabajo.descripcion}</p>
        <div className="mt-3 max-w-[560px]">
          <Lamina imagen={principal} numero={1} proporcion="4/5" preload sizes="(min-width: 1024px) 560px, 100vw" />
        </div>
      </CabeceraPagina>

      <section id="ficha-tecnica" aria-labelledby="h2-ficha" className="pt-16">
        <h2 id="h2-ficha" className={TITULO_BLOQUE}>
          Ficha técnica
        </h2>
        <dl className="grid max-w-[820px] grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-6">
          {ficha.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 border-b border-borde py-3">
              <dt className="font-titulo text-[12.5px] tracking-[0.04em] text-texto-suave">{k}</dt>
              <dd className="text-right font-titulo text-[13.5px]">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {trabajo.contenido.length > 0 && (
        <section id="memoria" aria-labelledby="h2-memoria" className="pt-16">
          <h2 id="h2-memoria" className={TITULO_BLOQUE}>
            Memoria del trabajo
          </h2>
          <div className="flex max-w-[66ch] flex-col gap-4">
            {trabajo.contenido.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>
      )}

      {trabajo.antes && (
        <section id="antes-despues" aria-labelledby="h2-antes-despues" className="pt-16">
          <h2 id="h2-antes-despues" className={TITULO_BLOQUE}>
            Antes y después
          </h2>
          <AntesDespues antes={trabajo.antes} despues={principal} numero={2} sizes="(min-width: 1024px) 560px, 100vw" className="max-w-[560px]" />
        </section>
      )}

      {trabajo.testimonio && (
        <section id="testimonio" aria-label="Testimonio" className="pt-16">
          <figure className="flex max-w-[720px] flex-col gap-3.5 border border-tinta bg-superficie p-[clamp(24px,1rem+1.5vw,40px)]">
            <p className="font-titulo text-[12.5px] tracking-[0.04em] text-lapiz">Testimonio · {ref}</p>
            <blockquote className="text-[clamp(1.25rem,1.1rem+0.6vw,1.625rem)] leading-[1.4]">«{trabajo.testimonio.texto}»</blockquote>
            <figcaption className="text-texto-suave">— {trabajo.testimonio.autor}</figcaption>
          </figure>
        </section>
      )}

      <section aria-labelledby="h2-parecido" className="flex max-w-[720px] flex-col gap-5 pt-18">
        {pieza && (
          <Link href={`/servicios/${pieza.slug}`} className="inline-flex min-h-12 items-center gap-3 self-start no-underline">
            <span aria-hidden="true" className="letra">
              {letra(si)}
            </span>
            <span className="underline">
              Pieza {letra(si)} · {pieza.titulo}
            </span>
            <span aria-hidden="true">→</span>
          </Link>
        )}
        <h2 id="h2-parecido" className="titulo text-h2 leading-[1.1]">
          ¿Quieres algo parecido?
        </h2>
        <Pareja contacto={contacto} mensaje={mensajeReferencia(trabajo, indice)} textoWhatsapp="Quiero algo parecido" nota={notaHorario(contacto)} />
      </section>
    </Marco>
  );
}
