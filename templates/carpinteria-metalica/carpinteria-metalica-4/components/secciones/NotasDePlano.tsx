import type { SiteConfig } from "@andrei-leads/core";

import { lineaMarcas } from "@/lib/textos";

type Props = Pick<SiteConfig, "garantias" | "acreditaciones" | "marcas">;

/** Hay algo que pintar en las notas (si no, la sección entera desaparece). */
export function hayNotas({ garantias, acreditaciones, marcas }: Props): boolean {
  return garantias.length > 0 || acreditaciones.length > 0 || marcas.length > 0;
}

/** Título de la sección: «Nuestras garantías» si las hay (regla de Ysst); si no, «Notas del plano». */
export function tituloNotas({ garantias }: Pick<Props, "garantias">): string {
  return garantias.length > 0 ? "Nuestras garantías" : "Notas del plano";
}

/**
 * `NotasDePlano` (encargo §6.6): como las notas de un plano, «NOTA 1 — Presupuesto cerrado antes de
 * empezar»; las acreditaciones con su `numero` en mono si existe; las marcas en una línea. Cada
 * bloque se oculta sin datos. La sección (cabecera incluida) la pone quien la usa.
 */
export function NotasDePlano({ garantias, acreditaciones, marcas }: Props) {
  if (!hayNotas({ garantias, acreditaciones, marcas })) return null;
  const fila = "grid grid-cols-[96px_minmax(0,1fr)] gap-3 border-b border-borde px-4 py-3.5 last:border-b-0";
  return (
    <div className="max-w-[880px] border border-texto bg-superficie">
      <ul>
        {garantias.map((g, i) => (
          <li key={g} className={fila}>
            <span className="etiqueta pt-0.5">NOTA {i + 1} —</span>
            <span className="leading-normal">{g}</span>
          </li>
        ))}
        {acreditaciones.map((a) => (
          <li key={a.nombre} className={fila}>
            <span className="etiqueta pt-0.5">ACRED. —</span>
            <span className="leading-normal">
              {a.nombre}
              {a.numero && <span className="font-titulo text-sm"> · {a.numero}</span>}
            </span>
          </li>
        ))}
      </ul>
      {marcas.length > 0 && <p className="border-t border-borde bg-fondo px-4 py-3.5 font-titulo text-sm leading-normal">{lineaMarcas(marcas)}</p>}
    </div>
  );
}
