import type { ReactNode } from "react";
import Link from "next/link";
import type { Imagen, Servicio, SiteConfig } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { fichaPieza, numeroPieza, piezasTexto, type PiezaNumerada } from "@/lib/piezas";
import { cn } from "@/lib/utils";

/**
 * Tarjeta sin foto (encargo §5): bloque `alterna` 4:5 con el número de acento enorme y el título en
 * condensada. Va debajo de la foto: se ve mientras carga y si la foto falta. Nunca un gris vacío.
 */
export function SinFoto({ numero, titulo, grande }: { numero: string; titulo?: string; grande?: boolean }) {
  return (
    <span aria-hidden="true" className="absolute inset-0 flex flex-col justify-between bg-alterna p-3">
      <span className={cn("ft numero leading-[0.8] [text-decoration-line:none]", grande ? "text-[clamp(8rem,4rem+12vw,16rem)]" : "text-[clamp(4.5rem,2.5rem+6vw,10rem)]")}>
        {numero}
      </span>
      {titulo && <span className="ft text-[clamp(1.25rem,1rem+0.8vw,2rem)] leading-[0.95] text-balance">{titulo}</span>}
    </span>
  );
}

function sizesTarjeta(k: number, total: number, mosaico: boolean): string {
  return mosaico && total >= 5 && k % 8 === 0 ? "(min-width: 1024px) 50vw, (min-width: 700px) 25vw, 50vw" : "(min-width: 700px) 25vw, 50vw";
}

/** Cuerpo de una tarjeta: foto 4:5 y, debajo de la línea negra, número de acento, título y ficha. */
function Cuerpo({ imagen, numero, titulo, ficha, decorativa, sizes, preload }: { imagen: Imagen; numero: string; titulo?: string; ficha?: string; decorativa: boolean; sizes: string; preload?: boolean }) {
  return (
    <>
      <Foto imagen={imagen} sizes={sizes} decorativa={decorativa} preload={preload} respaldo={<SinFoto numero={numero} titulo={titulo} />} />
      <span className="flex flex-col gap-[3px] border-t-2 border-borde pt-2">
        <span className="numero-pieza ft numero text-[clamp(1.5rem,1.1rem+1.2vw,2.25rem)] leading-none">N.º {numero}</span>
        {titulo && <span className="ft text-[clamp(1.125rem,1rem+0.5vw,1.5rem)] leading-none text-balance">{titulo}</span>}
        {ficha && <span className="pie-ficha text-texto-suave">{ficha}</span>}
      </span>
    </>
  );
}

type Props = {
  piezas: readonly PiezaNumerada[];
  /** Servicios (para las etiquetas del filtro). */
  servicios: readonly Pick<Servicio, "slug" | "titulo">[];
  /** Filtro por servicio: sale si se pide y hay 2 servicios o más con piezas (con 1, no hay filtro). */
  conFiltro?: boolean;
  /** `h2` con el recuento a la derecha («Piezas · 7 piezas»). */
  titulo?: string;
  /** Total de piezas del catálogo: con más de las que se ven, enlace «Ver las {n} piezas». */
  total?: number;
  /** Precarga la foto de la primera tarjeta (en /trabajos es la LCP). */
  precargar?: boolean;
  id?: string;
  className?: string;
};

/**
 * Sección estrella (encargo §5): rejilla compacta de piezas numeradas, 2 columnas a 375 px y 4 a
 * 1280, con la primera de cada bloque de 8 en 2×2 cuando hay 5 o más (`:has()`). Cada tarjeta es un
 * único enlace a su ficha.
 *
 * Filtro sin JS y con la página estática (excepción a la regla 16 del brief, encargo §5): radios
 * nativos en un `fieldset` con `legend` visible («Todas» marcado) y un `<style>` generado de los datos
 * que, con `:has(input[value=x]:checked)`, oculta las tarjetas de otros servicios y cambia el
 * recuento. Los trabajos sin `servicio` solo salen con «Todas». Con muchos servicios, la fila se
 * desplaza en horizontal.
 */
export function RejillaPiezas({ piezas, servicios, conFiltro, titulo, total, precargar, id, className }: Props) {
  if (piezas.length === 0) return null;
  const conPiezas = servicios
    .map((s) => ({ slug: s.slug, titulo: s.titulo, n: piezas.filter((p) => p.trabajo.servicio === s.slug).length }))
    .filter((s) => s.n > 0);
  const filtro = conFiltro && conPiezas.length >= 2;
  const idTitulo = id ? `${id}-titulo` : undefined;

  // Los slugs solo llevan [a-z0-9-] (lo valida core): seguros dentro del CSS.
  const css = filtro
    ? conPiezas
        .map(
          (s) =>
            `.piezas:has(.filtro input[value="${s.slug}"]:checked) .rejilla>.tarjeta:not([data-servicio="${s.slug}"]){display:none}` +
            `.piezas:has(.filtro input[value="${s.slug}"]:checked) [data-recuento="${s.slug}"]{display:inline}`,
        )
        .join("")
    : "";
  const recuentos = (
    <>
      <span data-recuento="todas">{piezasTexto(piezas.length)}</span>
      {filtro &&
        conPiezas.map((s) => (
          <span key={s.slug} data-recuento={s.slug}>
            {piezasTexto(s.n)}
          </span>
        ))}
    </>
  );

  return (
    <section id={id} aria-labelledby={titulo ? idTitulo : undefined} aria-label={titulo ? undefined : "Lista de piezas"} className={cn("piezas contenedor flex flex-col gap-[18px]", className)}>
      {titulo && (
        <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-borde pb-2.5">
          <h2 id={idTitulo} className="titulo-h2 m-0">
            {titulo}
          </h2>
          <span className="pie-ficha">{recuentos}</span>
        </div>
      )}
      {filtro && (
        <fieldset className="filtro m-0 min-w-0 border-0 p-0">
          <style>{css}</style>
          <legend className="pie-ficha mb-2.5 p-0 text-texto-suave">
            Tipo de pieza ·{" "}
            <span aria-live="polite" className="text-texto">
              {recuentos}
            </span>
          </legend>
          <div className="flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:thin]">
            {[{ slug: "todas", titulo: "Todas", n: piezas.length }, ...conPiezas].map((s) => (
              <label
                key={s.slug}
                className="ft relative flex min-h-11 flex-none cursor-pointer items-center gap-2 border-2 border-borde bg-transparent px-3.5 text-[1.0625rem] leading-none tracking-[0.03em] whitespace-nowrap text-texto"
              >
                <input
                  type="radio"
                  name={`filtro-${id ?? "piezas"}`}
                  value={s.slug}
                  defaultChecked={s.slug === "todas"}
                  className="absolute inset-0 m-0 size-full cursor-pointer opacity-0"
                />
                {s.titulo}
                <span className="text-sm">
                  <span className="sr-only">(</span>
                  {s.n}
                  <span className="sr-only">)</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}
      <ul className="rejilla rejilla-mosaico m-0 list-none p-0">
        {piezas.map(({ trabajo: t, indice }, k) => (
          <li key={t.slug} data-servicio={t.servicio} data-aparecer className="tarjeta flex min-w-0 flex-col">
            <Link href={`/trabajos/${t.slug}`} className="tarjeta-enlace flex min-w-0 flex-col gap-2 text-texto no-underline">
              <Cuerpo
                imagen={t.imagenes[0]}
                numero={numeroPieza(indice)}
                titulo={t.titulo}
                ficha={fichaPieza(t)}
                decorativa
                sizes={sizesTarjeta(k, piezas.length, true)}
                preload={precargar && k === 0}
              />
            </Link>
          </li>
        ))}
      </ul>
      {total !== undefined && total > piezas.length && (
        <Link
          href="/trabajos"
          className="ft flex min-h-12 items-center self-start border-2 border-borde px-[18px] text-lg tracking-[0.04em] text-texto no-underline [@media(hover:hover)]:hover:bg-hover-claro"
        >
          Ver las {total} piezas <span aria-hidden="true">&nbsp;→</span>
        </Link>
      )}
    </section>
  );
}

type PropsGaleria = {
  /** Fotos de `galeria` (o las de un servicio sin piezas). */
  fotos: readonly (Imagen & { titulo?: string })[];
  titulo?: string;
  /** Recuento a la derecha del `h2`. */
  recuento?: string;
  precargar?: boolean;
  className?: string;
};

/**
 * Sin trabajos: las fotos en la misma rejilla (encargo §7), sin ficha ni enlace, con su número y su
 * `titulo`. Sin `titulo`, solo el número: el `alt` describe la foto y no sirve de título.
 */
export function RejillaGaleria({ fotos, titulo, recuento, precargar, className }: PropsGaleria) {
  if (fotos.length === 0) return null;
  return (
    <section aria-labelledby={titulo ? "galeria-titulo" : undefined} aria-label={titulo ? undefined : "Fotos"} className={cn("contenedor flex flex-col gap-[18px]", className)}>
      {titulo && (
        <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-borde pb-2.5">
          <h2 id="galeria-titulo" className="titulo-h2 m-0">
            {titulo}
          </h2>
          {recuento && <span className="pie-ficha">{recuento}</span>}
        </div>
      )}
      <ul className="rejilla rejilla-mosaico m-0 list-none p-0">
        {fotos.map((g, k) => (
          <li key={g.src} data-aparecer className="tarjeta flex min-w-0 flex-col">
            <figure className="m-0 flex min-w-0 flex-col gap-2">
              <Cuerpo imagen={g} numero={numeroPieza(k)} titulo={g.titulo} decorativa={false} sizes={sizesTarjeta(k, fotos.length, true)} preload={precargar && k === 0} />
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Rejilla de la home o de /trabajos según los datos: trabajos (con filtro) o, sin trabajos, la galería. */
export function RejillaDelCatalogo({
  config,
  piezas,
  total,
  titulo,
  precargar,
  id,
  className,
  vacio,
}: {
  config: Pick<SiteConfig, "servicios" | "galeria">;
  piezas: readonly PiezaNumerada[];
  total?: number;
  titulo?: string;
  precargar?: boolean;
  id?: string;
  className?: string;
  vacio?: ReactNode;
}) {
  if (piezas.length > 0) {
    return <RejillaPiezas piezas={piezas} servicios={config.servicios} conFiltro titulo={titulo} total={total} precargar={precargar} id={id} className={className} />;
  }
  if (config.galeria.length > 0) {
    return <RejillaGaleria fotos={config.galeria} titulo={titulo} recuento={titulo ? piezasTexto(config.galeria.length) : undefined} precargar={precargar} className={className} />;
  }
  return vacio ?? null;
}

