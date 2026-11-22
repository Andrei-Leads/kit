import Link from "next/link";
import { etiquetaOrigen, type Servicio } from "@andrei-leads/core";

import { Foto, PieFigura } from "@/components/base/Foto";
import { dosCifras } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  servicios: readonly Servicio[];
};

/** Etiqueta de origen común a todas las miniaturas (si todas las fotos llevan la misma), para decirla una sola vez. */
function etiquetaComun(servicios: readonly Servicio[]): string | undefined {
  const fotos = servicios.map((s) => s.imagenes[0]).filter(Boolean);
  if (fotos.length === 0) return undefined;
  const etiquetas = new Set(fotos.map((f) => etiquetaOrigen(f) ?? ""));
  const [unica] = [...etiquetas];
  return etiquetas.size === 1 && unica ? unica : undefined;
}

/** La etiqueta de core en plural, para decirla una vez bajo la lista. */
const PLURAL: Record<string, string> = {
  "Imagen generada con IA": "imágenes generadas con IA",
  "Foto de tu ficha de Google": "fotos de tu ficha de Google",
};

/** Bloque rayado a 45° con la REF grande: la ficha sin foto (encargo §5). */
function SinFoto({ n, grande }: { n: string; grande?: boolean }) {
  return (
    <span aria-hidden="true" className="rayado flex aspect-square items-center justify-center border border-texto">
      <span className={cn("bg-fondo font-titulo font-semibold", grande ? "px-2 text-[64px] leading-none" : "px-1 text-[30px] leading-none")}>{n}</span>
    </span>
  );
}

/**
 * `Despiece` del inicio (encargo §6.4): fichas con miniatura 1:1 (o bloque rayado), REF numerada,
 * título, descripción y el precio en mono a la derecha (solo con `precioDesde`). Cada ficha enlaza a
 * su página. Como mucho 6 y «Ver los {n} servicios». Con 1 servicio, una ficha a todo el ancho.
 * La etiqueta de IA no cabe en una miniatura de 88 px: si todas la comparten, va una vez bajo la
 * lista; si no, cada ficha lleva la suya.
 */
export function DespieceInicio({ servicios }: Props) {
  const visibles = servicios.slice(0, 6);
  const comun = etiquetaComun(visibles);
  return (
    <>
      <ul className="ancho grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] gap-3">
        {visibles.map((s, i) => {
          const n = dosCifras(i + 1);
          const [foto] = s.imagenes;
          const propia = foto && !comun ? etiquetaOrigen(foto) : undefined;
          return (
            <li key={s.slug} className="flex">
              <Link
                href={`/servicios/${s.slug}`}
                className="grid w-full grid-cols-[88px_minmax(0,1fr)] gap-4 border border-borde bg-superficie p-3.5 no-underline hover:border-texto"
              >
                {foto ? <Foto imagen={foto} sizes="88px" proporcion="1/1" decorativa /> : <SinFoto n={n} />}
                <span className="flex min-w-0 flex-col gap-1.5">
                  <span className="etiqueta flex justify-between gap-3">
                    <span>REF. {n}</span>
                    {s.precioDesde && <span className="font-semibold">{s.precioDesde}</span>}
                  </span>
                  <span className="font-titulo text-base leading-[1.35] font-medium text-balance">{s.titulo}</span>
                  <span className="text-[15px] leading-normal text-texto-suave text-pretty">{s.descripcion}</span>
                  {propia && <PieFigura texto={propia} />}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      {comun && <PieFigura texto={`Miniaturas: ${PLURAL[comun] ?? comun}`} className="mt-3" />}
      {servicios.length > 6 && (
        <Link href="/servicios" className="enlace mt-5">
          Ver los {servicios.length} servicios&nbsp;<span className="flecha">→</span>
        </Link>
      )}
    </>
  );
}

/**
 * `/servicios` (encargo §7): fichas grandes con foto 1:1 y su pie de figura (o bloque rayado con la
 * REF grande). Con 7 servicios o más, «tabla de despiece» compacta: REF · pieza · desde · →.
 */
export function DespiecePagina({ servicios }: Props) {
  if (servicios.length >= 7) {
    return (
      <div className="max-w-[1000px] border-t-2 border-texto">
        <div aria-hidden="true" className="etiqueta grid grid-cols-[44px_minmax(0,1fr)_auto_20px] gap-4 border-b border-texto py-2.5 sm:grid-cols-[52px_minmax(0,1fr)_auto_20px]">
          <span>REF.</span>
          <span>PIEZA</span>
          <span>DESDE</span>
          <span />
        </div>
        <ul>
          {servicios.map((s, i) => (
            <li key={s.slug}>
              <Link
                href={`/servicios/${s.slug}`}
                className="grid min-h-14 grid-cols-[44px_minmax(0,1fr)_auto_20px] items-center gap-4 border-b border-borde py-3 no-underline hover:bg-superficie sm:grid-cols-[52px_minmax(0,1fr)_auto_20px]"
              >
                <span className="etiqueta">{dosCifras(i + 1)}</span>
                <span className="font-titulo text-[15px] leading-[1.35] font-medium text-balance">{s.titulo}</span>
                <span className="etiqueta whitespace-nowrap">
                  {s.precioDesde ?? <><span aria-hidden="true">—</span><span className="sr-only">Sin precio</span></>}
                </span>
                <span aria-hidden="true" className="flecha font-titulo">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <ul className="ancho grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-6 gap-y-8">
      {servicios.map((s, i) => {
        const n = dosCifras(i + 1);
        const [foto] = s.imagenes;
        return (
          <li key={s.slug} className={cn(servicios.length === 1 && "max-w-[560px]")}>
            <Link href={`/servicios/${s.slug}`} className="flex flex-col gap-2.5 no-underline">
              {foto ? (
                <>
                  <Foto imagen={foto} sizes="(min-width: 1024px) 300px, calc(100vw - 40px)" proporcion="1/1" decorativa />
                  <PieFigura texto={`FIG. ${n}${etiquetaOrigen(foto) ? ` · ${etiquetaOrigen(foto)}` : ""}`} />
                </>
              ) : (
                <SinFoto n={n} grande />
              )}
              <span className="etiqueta flex justify-between gap-3 border-t border-texto pt-2">
                <span>REF. {n}</span>
                {s.precioDesde && <span className="font-semibold">{s.precioDesde}</span>}
              </span>
              <span className="font-titulo text-lg leading-[1.3] font-medium text-balance">{s.titulo}</span>
              <span className="text-[15px] leading-[1.55] text-texto-suave">{s.descripcion}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
