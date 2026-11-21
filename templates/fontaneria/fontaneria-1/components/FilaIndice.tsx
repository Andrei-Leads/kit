import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Tamaño del título de la fila. "indice": 1,5 rem en móvil y --text-display en escritorio (al 70 % con
 * 7 servicios o más). "pequena": 1,5 rem / 2,75 rem («Otros problemas», 404).
 */
export type TamFila = "indice" | "indice-70" | "pequena";

const TITULO: Record<TamFila, string> = {
  indice: "text-2xl lg:text-display",
  "indice-70": "text-2xl lg:text-[calc(var(--text-display)*0.7)]",
  pequena: "text-2xl lg:text-[2.75rem]",
};
const FLECHA: Record<TamFila, string> = {
  indice: "text-xl lg:text-[calc(var(--text-display)*0.5)]",
  "indice-70": "text-xl lg:text-[calc(var(--text-display)*0.35)]",
  pequena: "text-xl lg:text-[1.75rem]",
};

export const CLASE_FILA =
  "fila-indice grid min-h-14 grid-cols-[2rem_minmax(0,1fr)_auto] items-baseline gap-x-2 px-1 py-3 lg:grid-cols-[3rem_minmax(0,1fr)_auto] lg:gap-x-4 lg:pt-4 lg:pr-4 lg:pb-[18px] lg:pl-3";

type Props = {
  href: string;
  numero: string;
  titulo: ReactNode;
  /** Línea pequeña bajo el título (precio «desde»…), en primario-luz. */
  detalle?: ReactNode;
  tam?: TamFila;
};

/** Una fila del índice: número de orden, título en condensada y flecha. Toda la fila es el enlace. */
export function FilaIndice({ href, numero, titulo, detalle, tam = "indice" }: Props) {
  return (
    <li className="border-b border-borde">
      <Link href={href} className={CLASE_FILA}>
        <span className="numero text-[0.8125rem] font-semibold tabular-nums">{numero}</span>
        <span className="flex min-w-0 flex-col gap-1">
          <span className={cn("condensada text-balance", TITULO[tam], "leading-[1.02]")}>{titulo}</span>
          {detalle && <span className="detalle text-sm font-medium">{detalle}</span>}
        </span>
        <span aria-hidden="true" className={cn("flecha", FLECHA[tam], "leading-none")}>
          →
        </span>
      </Link>
    </li>
  );
}

/** Lista del índice con filetes de 3 px arriba y abajo. */
export function ListaIndice({ children, className }: { children: ReactNode; className?: string }) {
  return <ol className={cn("border-y-3 border-primario-luz", className)}>{children}</ol>;
}
