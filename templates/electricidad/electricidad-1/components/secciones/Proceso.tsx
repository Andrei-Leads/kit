import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";

import { Regla } from "@/components/Regla";
import { buttonVariants } from "@/components/ui/button";
import { h2 } from "@/lib/estilos";
import { minusculaInicial } from "@/lib/formato";
import type { Paso } from "@/lib/proceso";
import { cn } from "@/lib/utils";

type Props = {
  /** «02» ya recalculado. */
  numero: string;
  /** Pasos (≤ 6): `proceso` del cliente o los pasos por defecto (`pasosProceso`). */
  pasos: Paso[];
  /** Servicio al que apunta «Ver todo sobre {titulo}» (el destacado, servicios[0]). */
  servicio: { titulo: string; slug: string };
};

/** Columnas en escritorio: hasta 4 pasos, una fila; con 5–6, dos filas de 3. */
function columnas(n: number): number {
  return n <= 4 ? Math.max(1, n) : 3;
}
const COLUMNAS_ESCRITORIO: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

/**
 * «Cómo es el trámite» (Specs §5): la sección estrella, sobre `primario-tinte`.
 *
 * Una sola lista `<ol>` para móvil y escritorio (el HTML no se duplica):
 *  - móvil: columna de 52 px con el número (mono 28 px, primario) y la regla vertical de 2 px que une
 *    los pasos; a la derecha, título y texto. El paso 1 lleva el punto `aviso` (decorativo).
 *  - escritorio (md): cada paso es un bloque con el número y una regla horizontal hasta el siguiente
 *    paso de su fila.
 * Animación (Specs §8, solo CSS bajo `html.js`): la lista lleva `data-anim="tramite"` y `--n` (número
 * de tramos); cada regla es `data-tramo` y cada paso `data-paso`, con su índice en `--i`.
 */
export function Proceso({ numero, pasos, servicio }: Props) {
  const cols = columnas(pasos.length);
  const tramos = Math.max(1, pasos.length - 1);

  return (
    <section aria-labelledby="titulo-tramite" className="bg-primario-tinte">
      <div className="contenedor seccion-y">
        <Regla numero={numero} etiqueta="El trámite" />
        <h2 id="titulo-tramite" className={cn(h2, "mt-5")}>
          Cómo es el trámite
        </h2>
        <p className="m-0 mt-3 max-w-[52ch] text-base text-tinta-cuerpo text-pretty md:text-[19px]">
          Sin papeleo para ti: lo hacemos nosotros de principio a fin.
        </p>

        <ol
          data-anim="tramite"
          style={{ "--n": tramos } as CSSProperties}
          className={cn(
            "m-0 mt-9 grid list-none grid-cols-1 p-0 md:mt-14 md:gap-y-10",
            COLUMNAS_ESCRITORIO[cols]
          )}
        >
          {pasos.map((paso, i) => {
            const ultimo = i === pasos.length - 1;
            const finDeFila = (i + 1) % cols === 0;
            const indice = { "--i": i } as CSSProperties;
            return (
              <li
                key={`${i}-${paso.titulo}`}
                className="grid grid-cols-[52px_minmax(0,1fr)] gap-x-3 md:block md:pr-7"
              >
                <div className="flex flex-col items-start">
                  <div className="flex w-full items-center gap-1.5 md:gap-2.5">
                    <span
                      aria-hidden="true"
                      className="font-mono text-[28px] leading-none font-bold text-primario md:text-4xl"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {i === 0 && (
                      <span
                        aria-hidden="true"
                        className="size-[9px] flex-none bg-aviso outline outline-1 outline-tinta md:size-2.5"
                      />
                    )}
                    {!ultimo && !finDeFila && (
                      <span
                        aria-hidden="true"
                        data-tramo="h"
                        style={indice}
                        className="-mr-[18px] hidden h-0.5 flex-1 bg-tinta md:block"
                      />
                    )}
                  </div>
                  {!ultimo && (
                    <span
                      aria-hidden="true"
                      data-tramo="v"
                      style={indice}
                      className="mt-2.5 mb-2.5 ml-[15px] min-h-6 w-0.5 flex-1 bg-tinta md:hidden"
                    />
                  )}
                </div>

                <div data-paso style={indice} className="pt-0.5 pb-7 md:pt-5 md:pb-0">
                  <h3 className="m-0 mb-1.5 text-lg leading-[1.3] font-bold md:mb-2 md:text-[19px]">
                    <span className="sr-only">{i + 1}. </span>
                    {paso.titulo}
                  </h3>
                  <p className="m-0 max-w-[34ch] text-tinta-cuerpo text-pretty md:max-w-[34ch]">{paso.texto}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <Link
          href={`/servicios/${servicio.slug}`}
          className={cn(buttonVariants({ variant: "enlaceFlecha" }), "mt-2 md:mt-12")}
        >
          <span>Ver todo sobre {minusculaInicial(servicio.titulo)}</span>
          <ArrowRight aria-hidden="true" strokeWidth={2} className="size-[18px] flex-none" />
        </Link>
      </div>
    </section>
  );
}
