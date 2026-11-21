import type { CSSProperties } from "react";
import Link from "next/link";
import { precioDesde, trabajosDelServicio, type Servicio, type Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { IconoCheck, IconoFlecha } from "@/components/Iconos";
import { trabajosTexto } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  servicios: readonly Servicio[];
  /** Para contar los trabajos de cada servicio (`trabajos[].servicio`). */
  trabajos: readonly Trabajo[];
  /** En el inicio, 6: se ven 6 y una tarjeta final «Ver los {N} servicios». */
  limite?: number;
  titulo?: string;
  entrada?: string;
  /** En /servicios: sin título de sección (los títulos de las tarjetas pasan a h2). */
  sinTitulo?: boolean;
  /** En /servicios, la primera foto queda en la primera pantalla: se precarga. */
  preloadPrimera?: boolean;
};

/** Cifra de la tarjeta: `precioDesde` o, si no, «N trabajos» contados de los datos. Sin ninguna, nada. */
function Cifra({ servicio, trabajos, grande, compacta }: { servicio: Servicio; trabajos: readonly Trabajo[]; grande?: boolean; compacta?: boolean }) {
  const n = trabajosDelServicio(trabajos, servicio).length;
  if (!servicio.precioDesde && n === 0) return null;
  // Compacta (móvil, media columna): más pequeña y en una línea, para que no se parta junto a la flecha.
  const tam = grande ? "text-[clamp(1.75rem,1.4rem+1.4vw,2.25rem)]" : compacta ? "text-[1.125rem] lg:text-[1.5rem]" : "text-[1.5rem]";
  let contenido;
  if (servicio.precioDesde) {
    const { desde, importe } = precioDesde(servicio.precioDesde);
    contenido = desde ? (
      <>
        <span className="text-[0.6em] font-bold tracking-normal">desde</span>{" "}
        {importe}
      </>
    ) : (
      importe
    );
  } else {
    contenido = trabajosTexto(n);
  }
  return (
    <span className="flex flex-col">
      <span data-cifra-sube className={cn("font-titulo leading-none font-[750] tracking-[-0.03em] whitespace-nowrap tabular-nums", tam)}>
        <span>{contenido}</span>
      </span>
      <span aria-hidden="true" className="raya-acento mt-1.5" />
    </span>
  );
}

function Flecha({ claro }: { claro?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn("grid size-10 flex-none place-items-center rounded-full", claro ? "bg-superficie text-texto" : "bg-primario text-sobre-primario")}
    >
      <IconoFlecha className="size-[18px]" />
    </span>
  );
}

/** Tarjeta sin foto: alterna, título a 28 px y un círculo grande de primario-suave en la esquina. */
function Circulo() {
  return <span aria-hidden="true" className="pointer-events-none absolute -top-10 -right-10 size-40 rounded-full bg-primario-suave" />;
}

type Forma = "grande" | "ancha" | "normal";

/** Celda de la rejilla: forma y columnas en escritorio (4 columnas) y en móvil (2 columnas). */
type Celda = { forma: Forma; lg: 1 | 2 | 4; movil: 1 | 2 };

const LG: Record<1 | 2 | 4, string> = { 1: "lg:col-span-1", 2: "lg:col-span-2", 4: "lg:col-span-4" };

/**
 * Reparto de la rejilla, calculado en el servidor (regla del diseño, TensaSitio.dc.html): el
 * primero grande (2×2), el segundo ancho (2×1; con 2 servicios, también grande), dos normales
 * al lado del grande y, en la última fila, las tarjetas se ensanchan para no dejar huecos (con
 * la tarjeta «Ver los N» de 2 columnas). En móvil (2 columnas): las dos primeras a todo el
 * ancho, el resto en parejas y la última impar a todo el ancho.
 */
function repartir(n: number, ver: boolean): { celdas: Celda[]; verLg: 1 | 2 | 4 } {
  const celdas: Celda[] = Array.from({ length: n }, (_, i) => ({
    forma: i === 0 ? "grande" : i === 1 ? (n > 2 ? "ancha" : "grande") : "normal",
    lg: i < 2 ? 2 : 1,
    movil: i < 2 ? 2 : 1,
  }));
  let verLg: 1 | 2 | 4 = 4;
  const pequenas = celdas.filter((c) => c.forma === "normal");
  if (pequenas.length > 0) {
    if (pequenas.length === 1 && !ver) pequenas[0].lg = 2;
    const resto: { celda?: Celda; u: number }[] = pequenas.slice(2).map((c) => ({ celda: c, u: 1 }));
    if (ver) resto.push({ u: 2 });
    const usado = resto.reduce((a, r) => a + r.u, 0) % 4;
    if (resto.length > 0 && usado) {
      const fila: typeof resto = [];
      let acc = 0;
      for (let i = resto.length - 1; i >= 0; i--) {
        acc += resto[i].u;
        fila.unshift(resto[i]);
        if (acc >= usado) break;
      }
      if (fila.length === 1) fila[0].u = 4;
      else if (fila.length === 2) fila.forEach((r) => (r.u = 2));
      else fila[fila.length - 1].u += 4 - usado;
    }
    resto.forEach((r) => {
      const u = (r.u >= 4 ? 4 : r.u >= 2 ? 2 : 1) as 1 | 2 | 4;
      if (r.celda) r.celda.lg = u;
      else verLg = u;
    });
    if (pequenas.length % 2 === 1) pequenas[pequenas.length - 1].movil = 2;
  }
  return { celdas, verLg };
}

function Tarjeta({
  servicio,
  trabajos,
  celda,
  i,
  nivel,
  preload,
}: {
  servicio: Servicio;
  trabajos: readonly Trabajo[];
  celda: Celda;
  i: number;
  nivel: "h2" | "h3";
  preload?: boolean;
}) {
  const Titulo = nivel;
  const foto = servicio.imagenes[0];
  const { forma } = celda;
  const grande = forma === "grande";
  // Horizontal en escritorio: la ancha y las normales que ocupan 2 columnas o más.
  const horizontal = !grande && celda.lg >= 2;
  // Compacta en móvil: foto 1:1, título a 17 px y sin descripción.
  const compacta = forma === "normal" && celda.movil === 1;
  return (
    <li
      data-aparecer
      style={{ "--i": i } as CSSProperties}
      className={cn(celda.movil === 2 && "col-span-2", LG[celda.lg], grande && "lg:row-span-2")}
    >
      <Link
        href={`/servicios/${servicio.slug}`}
        className={cn(
          "tarjeta-enlace relative flex h-full flex-col overflow-hidden rounded-tarjeta p-2.5 text-texto no-underline",
          foto ? "bg-superficie" : "bg-alterna",
          horizontal && foto && "lg:flex-row lg:items-stretch",
        )}
      >
        {foto ? (
          <Foto
            imagen={foto}
            decorativa
            preload={preload}
            sizes={
              grande
                ? "(min-width: 1024px) 45vw, 100vw"
                : celda.movil === 2
                  ? "(min-width: 1024px) 45vw, 100vw"
                  : "(min-width: 1024px) 22vw, 50vw"
            }
            proporcion="relleno"
            className={cn(
              compacta ? "aspect-square lg:aspect-[4/3]" : "aspect-[4/3]",
              horizontal && "lg:aspect-auto lg:w-[46%] lg:flex-none",
              grande && "lg:aspect-auto lg:min-h-[300px] lg:flex-1",
            )}
          />
        ) : (
          <Circulo />
        )}
        <div className={cn("relative flex flex-1 flex-col px-3.5 pt-4 pb-3", compacta && "max-lg:px-1.5 max-lg:pt-3 max-lg:pb-1", !foto && "min-h-[180px] pt-6 lg:min-h-[220px]")}>
          <Titulo
            className={cn(
              "m-0 font-titulo leading-[1.08] font-bold tracking-[-0.025em] text-balance",
              grande || !foto ? "text-[1.625rem] lg:text-[2rem]" : compacta ? "text-[1.0625rem] lg:text-[1.375rem]" : "text-[1.5rem] lg:text-[1.75rem]",
            )}
          >
            {servicio.titulo}
          </Titulo>
          <p className={cn("m-0 mt-2 text-[0.9375rem] leading-snug text-texto-suave", compacta && "max-lg:hidden")}>{servicio.descripcion}</p>
          <span className={cn("mt-auto flex items-end justify-between gap-3 pt-5", compacta && "max-lg:pt-3")}>
            <Cifra servicio={servicio} trabajos={trabajos} grande={grande} compacta={compacta} />
            <span className="ms-auto">
              <Flecha />
              <span className="sr-only">Ver servicio</span>
            </span>
          </span>
        </div>
      </Link>
    </li>
  );
}

/** Un solo servicio: tarjeta ancha con descripción, «incluye» y su botón. */
function Unico({ servicio, trabajos, nivel, preload }: { servicio: Servicio; trabajos: readonly Trabajo[]; nivel: "h2" | "h3"; preload?: boolean }) {
  const foto = servicio.imagenes[0];
  const Titulo = nivel;
  return (
    <div className={cn("relative grid overflow-hidden rounded-tarjeta p-2.5 md:grid-cols-2", foto ? "bg-superficie" : "bg-alterna")}>
      {foto ? <Foto imagen={foto} sizes="(min-width: 768px) 50vw, 100vw" proporcion="4/3" preload={preload} /> : <Circulo />}
      <div className="relative flex flex-col p-4 md:p-8">
        <Titulo className="m-0 font-titulo text-[1.75rem] leading-tight font-bold tracking-[-0.025em] lg:text-[2.25rem]">{servicio.titulo}</Titulo>
        <p className="m-0 mt-3 text-texto-suave">{servicio.descripcion}</p>
        {servicio.incluye.length > 0 && (
          <ul className="m-0 mt-5 flex list-none flex-col gap-2.5 p-0">
            {servicio.incluye.map((x) => (
              <li key={x} className="flex items-center gap-3 font-semibold">
                <span aria-hidden="true" className="grid size-8 flex-none place-items-center rounded-full bg-primario-suave">
                  <IconoCheck className="size-4" />
                </span>
                {x}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-6">
          <Cifra servicio={servicio} trabajos={trabajos} grande />
          <Link
            href={`/servicios/${servicio.slug}`}
            className="boton inline-flex min-h-[52px] items-center gap-3 rounded-boton bg-primario py-1.5 pr-1.5 pl-6 font-bold text-sobre-primario no-underline hover:bg-pleno-hover"
          >
            Ver servicio
            <Flecha claro />
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * Sección estrella: bento de servicios con cifras (encargo §6, 4). Primer
 * servicio en tarjeta grande (2×2 en escritorio), el segundo ancho (2×1) y el
 * resto normales. Tarjeta sin foto: alterna + círculo, nunca un hueco gris.
 * 1 servicio: tarjeta ancha. Más del límite: se ven `limite` y «Ver los N servicios».
 */
export function ServiciosBento({ servicios, trabajos, limite, titulo = "Instalaciones y averías", entrada, sinTitulo, preloadPrimera }: Props) {
  const corta = limite !== undefined && servicios.length > limite;
  const visibles = corta ? servicios.slice(0, limite) : servicios;
  const { celdas, verLg } = repartir(visibles.length, corta);
  // En /servicios no hay h2 encima: las tarjetas son h2 (sin saltos desde el h1).
  const nivel = sinTitulo ? "h2" : "h3";
  return (
    <section aria-labelledby={sinTitulo ? undefined : "titulo-servicios"} className="seccion">
      <div className="contenedor">
        {!sinTitulo && (
          <>
            <h2 id="titulo-servicios" className="titulo-seccion">
              {titulo}
            </h2>
            {entrada && <p className="m-0 mt-2 text-texto-suave">{entrada}</p>}
          </>
        )}
        <div className={cn(!sinTitulo && "mt-7")}>
          {servicios.length === 1 ? (
            <Unico servicio={servicios[0]} trabajos={trabajos} nivel={nivel} preload={preloadPrimera} />
          ) : (
            <ul className="m-0 grid list-none grid-cols-2 grid-flow-dense gap-(--hueco-bento) p-0 lg:grid-cols-4">
              {visibles.map((s, i) => (
                <Tarjeta key={s.slug} servicio={s} trabajos={trabajos} celda={celdas[i]} i={i} nivel={nivel} preload={preloadPrimera && i === 0} />
              ))}
              {corta && (
                <li data-aparecer className={cn("col-span-2", LG[verLg])}>
                  <Link
                    href="/servicios"
                    className="tarjeta-enlace sobre-pleno flex h-full min-h-[160px] items-end justify-between gap-4 rounded-tarjeta bg-pleno p-6 text-sobre-primario no-underline"
                  >
                    <span className="font-titulo text-[1.75rem] leading-tight font-bold tracking-[-0.025em]">Ver los {servicios.length} servicios</span>
                    <span aria-hidden="true" className="grid size-12 flex-none place-items-center rounded-full bg-superficie text-texto">
                      <IconoFlecha />
                    </span>
                  </Link>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
