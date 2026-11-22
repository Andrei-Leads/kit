import Link from "next/link";
import type { Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { dosCifras, lineaObra } from "@/lib/formato";

type Props = {
  trabajo: Trabajo;
  /** Posición en el diario (0, 1…): «Entrada 01». */
  indice: number;
  nivel?: "h2" | "h3";
};

/**
 * Entrada del diario (una obra), encargo §6.2: a la izquierda, en mono, «Entrada 01» y la línea
 * «2026 — Triana — 9 m² — 14 días»; a la derecha, título, descripción y la foto 3:2 con el «Antes» en
 * miniatura si existe. Separada por un filete de plano con cotas en los extremos que crece con el scroll.
 */
export function Entrada({ trabajo: t, indice, nivel = "h3" }: Props) {
  const Titulo = nivel;
  const linea = lineaObra(t);
  const [foto] = t.imagenes;
  return (
    <article data-aparecer className="relative pt-10 pb-12">
      <div aria-hidden="true" className="cota-anim absolute inset-x-0 top-0 h-px bg-cota" />
      <span aria-hidden="true" className="absolute -top-[5px] left-0 h-[11px] w-px bg-cota-marca" />
      <span aria-hidden="true" className="absolute -top-[5px] right-0 h-[11px] w-px bg-cota-marca" />
      <div className="flex flex-wrap gap-x-12 gap-y-5">
        <div className="mono flex-[1_1_200px] text-[12.5px] leading-[1.8] text-texto-suave">
          <div className="font-semibold text-primario-claro">Entrada {dosCifras(indice + 1)}</div>
          {linea && <div className="[overflow-wrap:anywhere]">{linea}</div>}
        </div>
        <div className="grid min-w-0 flex-[999_1_420px] justify-items-start gap-4">
          <Titulo className="mono text-[22px] leading-tight font-medium tracking-[-0.01em] text-texto">{t.titulo}</Titulo>
          <p className="max-w-[60ch] text-cuerpo leading-[1.65] text-texto-suave">{t.descripcion}</p>
          {foto && (
            <div className="relative mt-2 w-full max-w-[620px]">
              <Foto imagen={foto} sizes="(min-width: 1024px) 620px, calc(100vw - 40px)" />
              {t.antes && (
                <div className="absolute right-3 -bottom-5 z-[3] w-[clamp(96px,28%,150px)] shadow-[0_0_0_4px_var(--color-fondo)]">
                  <span className="mono absolute bottom-full left-0 z-[1] mb-1.5 bg-fondo px-1.5 py-0.5 text-[11px] text-texto">Antes</span>
                  <Foto imagen={t.antes} sizes="150px" mini />
                </div>
              )}
            </div>
          )}
          <Link href={`/trabajos/${t.slug}`} className="enlace-mono mt-3">
            <span>Leer la obra →</span>
            <span className="sr-only">: {t.titulo}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
