import { mediaVisible } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { Estrellas } from "@/components/Estrellas";
import { anioActual } from "@/lib/anio";
import type { Bento, Celda } from "@/lib/bento";
import { piedra } from "@/lib/textos";
import { cn } from "@/lib/utils";

// Clases estáticas (Tailwind solo genera las que lee).
const COL_M: Record<number, string> = { 1: "col-span-1", 2: "col-span-2" };
const ROW_M: Record<number, string> = { 1: "row-span-1", 2: "row-span-2" };
const COL_D: Record<number, string> = { 1: "md:col-span-1", 2: "md:col-span-2", 3: "md:col-span-3", 4: "md:col-span-4" };
const ROW_D: Record<number, string> = { 1: "md:row-span-1", 2: "md:row-span-2" };
const COLS_D: Record<number, string> = { 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-4" };

const ETIQUETA = "text-[0.9375rem] font-bold";
const CIFRA = "font-titulo text-[clamp(2.5rem,2rem+2vw,3.75rem)] leading-[0.9] tracking-[-0.02em]";

function Contenido({ celda, anio }: { celda: Celda; anio: number }) {
  switch (celda.tipo) {
    case "valoracion": {
      const media = mediaVisible(celda.media);
      return (
        <>
          <span className={ETIQUETA}>Valoración en Google</span>
          <span>
            <span className="block font-titulo text-[clamp(4.5rem,2.5rem+8vw,9rem)] leading-[0.85] font-medium tracking-[-0.04em]">{media}</span>
            <Estrellas puntuacion={celda.media} etiqueta={`${media} de 5 estrellas`} className="mt-2 block text-2xl" claseVacias="opacity-30" />
            <span className="mt-1 block font-semibold">{celda.total} reseñas de vecinos</span>
          </span>
        </>
      );
    }
    case "anios":
      return (
        <>
          <span className={ETIQUETA}>Desde</span>
          <span>
            <span className={cn(CIFRA, "block")}>{celda.anio}</span>
            {anio > celda.anio && <span className="mt-1.5 block text-[0.9375rem]">{anio - celda.anio} años de oficio</span>}
          </span>
        </>
      );
    case "llegada":
      return (
        <>
          <span className={ETIQUETA}>Llegamos en</span>
          <span className={CIFRA}>{celda.valor}</span>
        </>
      );
    case "urgencias":
      return (
        <>
          <span className={ETIQUETA}>Urgencias</span>
          <span className={cn(CIFRA, "italic")}>24 h</span>
        </>
      );
    case "acreditacion":
      return (
        <>
          <span className="text-[0.9375rem] leading-snug font-semibold">{celda.nombre}</span>
          {celda.numero && <span className="font-titulo text-[clamp(1.375rem,1.2rem+0.8vw,1.875rem)] leading-[1.05]">{celda.numero}</span>}
        </>
      );
    case "foto":
      return (
        <Foto
          imagen={celda.imagen}
          sizes="(min-width: 768px) 50vw, 50vw"
          proporcion="relleno"
          className="absolute inset-0 rounded-none"
        >
          {celda.imagen.titulo && (
            <span className="absolute top-3.5 left-3.5 z-[2] rounded-piedra-4 bg-superficie px-3 py-1 text-sm font-bold text-texto">
              {celda.imagen.titulo}
            </span>
          )}
        </Foto>
      );
    case "garantia":
      return (
        <>
          <span aria-hidden="true" className="size-3.5 rounded-[45%_55%_40%_60%] bg-primario-texto" />
          <span className="font-titulo text-[clamp(1.25rem,1.1rem+0.6vw,1.625rem)] leading-[1.12] text-balance">{celda.texto}</span>
        </>
      );
  }
}

/**
 * Bento de confianza en piedras: tarjetas de radios asimétricos y tamaños
 * desiguales alrededor de la valoración (2×2). Cada piedra existe solo con su
 * dato; la rejilla se recompone (lib/bento.ts). Con menos de 2, no se pinta.
 */
export async function BentoPiedras({ datos, titulo = "Por qué nos llaman" }: { datos: Bento | null; titulo?: string }) {
  if (!datos) return null;
  const anio = await anioActual();
  return (
    <section aria-labelledby="titulo-bento" className="seccion">
      <div className="contenedor">
        <h2 id="titulo-bento" className="titulo-seccion mb-[clamp(1.5rem,1rem+2vw,3rem)]">
          {titulo}
        </h2>
        <ul
          className={cn(
            "m-0 grid list-none auto-rows-[minmax(clamp(8.5rem,7rem+4vw,12rem),auto)] grid-flow-dense grid-cols-2 gap-[clamp(0.625rem,0.4rem+1vw,1.25rem)] p-0",
            COLS_D[datos.columnasEscritorio],
          )}
        >
          {datos.celdas.map((celda, i) => (
            <li
              key={i}
              data-piedra
              className={cn(
                "piedra-hover relative flex flex-col justify-between gap-3 overflow-hidden leading-snug",
                COL_M[celda.m.c],
                ROW_M[celda.m.r],
                COL_D[celda.d.c],
                ROW_D[celda.d.r],
                celda.tipo === "foto" ? "min-h-[17rem] p-0" : "p-[clamp(1.25rem,1rem+1vw,2rem)]",
                celda.tipo === "valoracion"
                  ? "rounded-tarjeta border-2 border-texto bg-superficie"
                  : celda.tipo === "urgencias"
                    ? cn("bg-tinta text-sobre-tinta", piedra(i))
                    : celda.tipo === "garantia"
                      ? cn("bg-alterna", piedra(i))
                      : cn("bg-superficie", piedra(i)),
              )}
            >
              <Contenido celda={celda} anio={anio} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
