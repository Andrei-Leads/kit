import Link from "next/link";
import type { Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { dosCifras } from "@/lib/formato";

/** Casillas de contexto de un trabajo: Ref., año, lugar, duración, superficie (cada una solo con dato). */
export function casillasTrabajo(t: Trabajo, indice: number): { rotulo: string; valor: string }[] {
  return [
    { rotulo: "Ref.", valor: dosCifras(indice + 1) },
    ...(t.anio ? [{ rotulo: "Año", valor: String(t.anio) }] : []),
    ...(t.ubicacion ? [{ rotulo: "Lugar", valor: t.ubicacion }] : []),
    ...(t.duracion ? [{ rotulo: "Duración", valor: t.duracion }] : []),
    ...(t.superficie ? [{ rotulo: "Superficie", valor: t.superficie }] : []),
    ...(t.precio ? [{ rotulo: "Precio", valor: t.precio }] : []),
  ];
}

type Props = {
  trabajo: Trabajo;
  /** Posición en `config.trabajos` (número de referencia). */
  indice: number;
  nivel?: "h2" | "h3";
  /** Fondo de las casillas: papel (archivo) o superficie. */
  fondoCasillas?: "fondo" | "superficie";
  conEnlace?: boolean;
};

/**
 * Parte archivado: polaroid + casillas de contexto + título enlazado + descripción. Un solo enlace por
 * ficha (el título) que cubre toda la ficha con `after:inset-0`: zona táctil grande y un único tabulador;
 * «Abrir el parte →» es solo la pista visual.
 */
export function FichaTrabajo({ trabajo: t, indice, nivel = "h2", fondoCasillas = "superficie", conEnlace }: Props) {
  const Titulo = nivel;
  return (
    <article
      id={`t-${t.slug}`}
      data-servicio={t.servicio}
      className="relative grid scroll-mt-20 grid-cols-1 gap-5 border-b border-borde py-6 sm:grid-cols-[170px_minmax(0,1fr)]"
    >
      <div className={`w-[180px] sm:w-[170px] ${indice % 2 ? "giro-der" : "giro-izq"}`}>
        <Foto imagen={t.imagenes[0]} sizes="180px" />
      </div>
      <div className="min-w-0">
        <div className="casillas">
          {casillasTrabajo(t, indice).map((c) => (
            <div key={c.rotulo} className={`casilla flex-[1_1_90px] px-2 py-1 ${fondoCasillas === "fondo" ? "bg-fondo" : ""}`}>
              <div className="rotulo-sm">{c.rotulo}</div>
              <div className="font-titulo text-[0.8125rem] font-semibold">{c.valor}</div>
            </div>
          ))}
        </div>
        <Titulo className="mt-3.5 mb-1.5 font-titulo text-lg leading-snug font-semibold">
          <Link href={`/trabajos/${t.slug}`} className="underline underline-offset-4 after:absolute after:inset-0 after:content-['']">
            {t.titulo}
          </Link>
        </Titulo>
        <p className="max-w-[60ch] leading-normal">{t.descripcion}</p>
        {conEnlace && (
          <span className="enlace-parte mt-1" aria-hidden="true">
            Abrir el parte →
          </span>
        )}
      </div>
    </article>
  );
}
