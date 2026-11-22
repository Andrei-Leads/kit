import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import type { SiteConfig, Servicio, Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { metaObra, numeroObra, obrasTexto } from "@/lib/obras";
import { cn } from "@/lib/utils";

export type ObraNumerada = { trabajo: Trabajo; indice: number };

type Cierre =
  | { tipo: "ver"; total: number }
  | { tipo: "cta"; titulo: string; children: ReactNode };

type Props = {
  obras: readonly ObraNumerada[];
  /** Servicios (para las pestañas del filtro). */
  servicios: readonly Pick<Servicio, "slug" | "titulo">[];
  /** El filtro sale solo si se pide, hay 2 servicios o más con obras y 6 obras o más. */
  conFiltro?: boolean;
  /** Mosaico 2×2 (1, 9, 17…) en escritorio con 5 obras o más. */
  mosaico?: boolean;
  cierre?: Cierre;
  /** Encabezado con filete: «Obras» + «6 obras». */
  encabezado?: { titulo: string; sub: string };
  id?: string;
  /** Precarga la foto de la primera tarjeta (en /trabajos es la LCP). */
  precargar?: boolean;
  className?: string;
};

/** Huecos que deja la última fila con `columnas` columnas (0 = fila completa). */
function hueco(celdas: number, columnas: number): string {
  const resto = (columnas - (celdas % columnas)) % columnas;
  return resto > 0 ? `span ${resto}` : "1 / -1";
}

/**
 * Sección estrella: rejilla de obras numeradas en blanco y negro (2 / 3 / 4
 * columnas). Cada tarjeta es un enlace a su ficha con la etiqueta en dos
 * líneas («03 — Cocina Parlament» / «Sant Antoni · 2025 · 10 m²»); al pasar o
 * enfocar, solo el subrayado bermellón y un `scale(1.02)` de la foto.
 *
 * Filtro por servicio sin JS y con la página estática (excepción a la regla
 * 16 del brief, encargo §5): radios nativos en un `fieldset` y un `<style>`
 * generado de los datos que, con `:has(input[value=x]:checked)`, oculta las
 * tarjetas de otros servicios y muestra su recuento.
 */
export function RejillaObras({ obras, servicios, conFiltro, mosaico, cierre, encabezado, id, precargar, className }: Props) {
  if (obras.length === 0) return null;
  const conObras = servicios
    .map((s) => ({ ...s, n: obras.filter((o) => o.trabajo.servicio === s.slug).length }))
    .filter((s) => s.n > 0);
  const filtro = conFiltro && conObras.length >= 2 && obras.length >= 6;

  // Celdas ocupadas (las grandes del mosaico cuentan 4 en escritorio) para que la celda de cierre rellene la fila.
  const grandes = mosaico && obras.length >= 5 ? Math.floor((obras.length - 1) / 8) + 1 : 0;
  const estiloCierre = {
    "--cierre-sm": hueco(obras.length, 3),
    "--cierre-lg": hueco(obras.length + grandes * 3, 4),
  } as CSSProperties;

  // Los slugs solo llevan [a-z0-9-] (lo valida core): seguros dentro del CSS.
  const css = filtro
    ? conObras
        .map(
          (s) =>
            `.rejilla-obras:has(.filtro input[value="${s.slug}"]:checked) .rejilla>.tarjeta:not([data-servicio="${s.slug}"]){display:none}` +
            `.rejilla-obras:has(.filtro input[value="${s.slug}"]:checked) [data-recuento="${s.slug}"]{display:inline}` +
            // La celda de cierre rellena la última fila también con el filtro (sin mosaico), como en el diseño.
            `@media (min-width:640px){.rejilla-obras.rejilla-obras:has(.filtro input[value="${s.slug}"]:checked) .celda-cierre{grid-column:${hueco(s.n, 3)}}}` +
            `@media (min-width:1024px){.rejilla-obras.rejilla-obras:has(.filtro input[value="${s.slug}"]:checked) .celda-cierre{grid-column:${hueco(s.n, 4)}}}`,
        )
        .join("")
    : "";

  return (
    <section id={id} aria-label={encabezado ? undefined : "Obras"} aria-labelledby={encabezado && id ? `${id}-titulo` : undefined} className={cn("rejilla-obras contenedor scroll-mt-4", className)}>
      {encabezado && (
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-t-2 border-borde pt-3.5">
          <h2 id={id ? `${id}-titulo` : undefined} className="titulo-h2 m-0">
            {encabezado.titulo}
          </h2>
          <span className="etiqueta text-[15px] text-texto-suave">{encabezado.sub}</span>
        </div>
      )}
      {filtro && (
        <fieldset className="filtro m-0 mt-4 min-w-0 border-0 p-0">
          <style>{css}</style>
          <legend className="etiqueta mb-2 p-0 text-[13px] text-texto-suave">Filtrar obras por servicio</legend>
          <div className="flex flex-wrap gap-1.5">
            {[{ slug: "todas", titulo: "Todas", n: obras.length }, ...conObras].map((s) => (
              <label
                key={s.slug}
                className="etiqueta relative flex min-h-11 cursor-pointer items-center border-2 border-borde bg-fondo px-3.5 text-[15px] leading-none text-texto"
              >
                <input
                  type="radio"
                  name="filtro-obras"
                  value={s.slug}
                  defaultChecked={s.slug === "todas"}
                  className="absolute inset-0 m-0 size-full cursor-pointer opacity-0"
                />
                {s.titulo} ({s.n})
              </label>
            ))}
          </div>
          <p aria-live="polite" className="m-0 mt-2.5 text-[13px] text-texto-suave">
            <span data-recuento="todas">{obrasTexto(obras.length)}</span>
            {conObras.map((s) => (
              <span key={s.slug} data-recuento={s.slug}>
                {obrasTexto(s.n)} de {s.titulo.toLowerCase()}
              </span>
            ))}
          </p>
        </fieldset>
      )}
      <ul className={cn("rejilla m-0 mt-4 list-none p-0", mosaico && "rejilla-mosaico")}>
        {obras.map(({ trabajo: t, indice }, k) => (
          <li key={t.slug} data-servicio={t.servicio} data-aparecer className="tarjeta flex min-w-0 flex-col">
            <Link href={`/trabajos/${t.slug}`} className="tarjeta-enlace flex min-w-0 flex-1 flex-col text-texto no-underline">
              <Foto
                imagen={t.imagenes[0]}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                proporcion="4/5"
                archivo
                decorativa
                calidad={60}
                preload={precargar && k === 0}
              />
              <span className="sr-only">Ver la obra </span>
              <span className="etiqueta relative mt-1.5 self-start text-[15px] leading-[1.1]">
                {numeroObra(indice)} — {t.titulo}
                <span aria-hidden="true" className="subrayado absolute inset-x-0 -bottom-[3px] h-0.5 bg-primario" />
              </span>
              {metaObra(t) && <span className="mt-[5px] block text-[13px] leading-[1.3] text-texto-suave">{metaObra(t)}</span>}
            </Link>
          </li>
        ))}
        {cierre?.tipo === "ver" && (
          <li className="celda-cierre" style={estiloCierre}>
            <Link
              href="/trabajos"
              className="flex h-full min-h-[140px] items-end justify-between gap-3 border-2 border-borde p-4 text-texto no-underline hover:bg-negro hover:text-sobre-negro"
            >
              <span className="condensada text-[clamp(1.75rem,1.3rem+1.6vw,2.75rem)] leading-[0.9] tracking-[-0.01em]">Ver las {cierre.total} obras</span>
              <span aria-hidden="true" className="condensada text-[32px] leading-[0.8]">
                →
              </span>
            </Link>
          </li>
        )}
        {cierre?.tipo === "cta" && (
          <li className="celda-cierre flex min-h-[140px] flex-col justify-between gap-4 border-2 border-borde p-4" style={estiloCierre}>
            <p className="condensada m-0 text-[clamp(1.75rem,1.3rem+1.6vw,2.75rem)] leading-[0.9] tracking-[-0.01em]">{cierre.titulo}</p>
            {cierre.children}
          </li>
        )}
      </ul>
    </section>
  );
}

/** Sin trabajos: la `galeria` en la misma rejilla, con su `titulo` como etiqueta (o «Foto {n}»). */
export function RejillaGaleria({ galeria, encabezado, className }: { galeria: SiteConfig["galeria"]; encabezado?: { titulo: string; sub: string }; className?: string }) {
  if (galeria.length === 0) return null;
  return (
    <section aria-label={encabezado ? undefined : "Galería"} aria-labelledby={encabezado ? "galeria-titulo" : undefined} className={cn("contenedor", className)}>
      {encabezado && (
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-t-2 border-borde pt-3.5">
          <h2 id="galeria-titulo" className="titulo-h2 m-0">
            {encabezado.titulo}
          </h2>
          <span className="etiqueta text-[15px] text-texto-suave">{encabezado.sub}</span>
        </div>
      )}
      <ul className="rejilla m-0 mt-4 list-none p-0">
        {galeria.map((g, i) => (
          <li key={g.src} data-aparecer className="flex min-w-0 flex-col">
            <figure className="m-0 flex flex-col">
              <Foto imagen={g} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw" proporcion="4/5" archivo calidad={60} />
              <figcaption className="etiqueta mt-1.5 text-[15px] leading-[1.1]">
                {g.titulo ?? `Foto ${i + 1}`}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function numerar(trabajos: readonly Trabajo[]): ObraNumerada[] {
  return trabajos.map((trabajo, indice) => ({ trabajo, indice }));
}
