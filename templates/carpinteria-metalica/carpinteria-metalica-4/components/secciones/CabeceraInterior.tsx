import type { ReactNode } from "react";
import type { Ancla } from "@andrei-leads/core";

import { Migas } from "@/components/base/Migas";
import { cn } from "@/lib/utils";

type Props = {
  migas: readonly Ancla[];
  /** «LÁMINA 02.03 · FICHA DE SERVICIO». */
  lamina: string;
  titulo: string;
  /** Títulos largos (servicio, trabajo): `max-width: 22ch` y `wdth` 87 en móvil. */
  largo?: boolean;
  children?: ReactNode;
};

/** Cabecera de las páginas interiores (encargo §7): retícula, migas en mono, la lámina y el h1. */
export function CabeceraInterior({ migas, lamina, titulo, largo, children }: Props) {
  return (
    <header className="reticula gutter flex flex-col gap-3.5 border-b border-texto pt-3 pb-9">
      <Migas migas={migas} />
      <span className="etiqueta text-texto-suave">{lamina}</span>
      <h1 className={cn("h1-plano", largo ? "max-w-[22ch]" : "leading-[1.05]")}>{titulo}</h1>
      {children}
    </header>
  );
}
