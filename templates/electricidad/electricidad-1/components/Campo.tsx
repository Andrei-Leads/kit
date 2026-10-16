import type { ReactNode } from "react";

import { etiquetaCampo } from "@/lib/estilos";
import { cn } from "@/lib/utils";

type Props = {
  /** Etiqueta de campo (mono 11 px, mayúsculas por CSS): «N.º RII», «Años»… */
  etiqueta: string;
  /** Valor en mono 700. Sin dato no se pinta el campo (lo decide el llamador). */
  children: ReactNode;
  /** Texto pequeño bajo el valor (p. ej. el nombre de la acreditación). */
  detalle?: ReactNode;
  /** Dentro de una rejilla con huecos de 1 px (`CamposRejilla`): sin borde propio. */
  agrupado?: boolean;
  /** Fondo: `papel-2` (por defecto) o `papel` (sobre el pie, que ya es papel-2). */
  fondo?: "papel-2" | "papel";
  className?: string;
};

/**
 * Campo de documento (Specs §7): etiqueta mono 11 px + valor debajo. Los números largos
 * parten con overflow-wrap, nunca se salen de la caja.
 */
export function Campo({ etiqueta, children, detalle, agrupado, fondo = "papel-2", className }: Props) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-1 px-4 py-3.5",
        fondo === "papel" ? "bg-papel" : "bg-papel-2",
        !agrupado && "border border-regla",
        className
      )}
    >
      <span className={etiquetaCampo}>{etiqueta}</span>
      <span className="font-mono text-[17px] leading-[1.3] font-bold [overflow-wrap:anywhere]">{children}</span>
      {detalle && <span className="text-[13px] leading-[1.4] text-tinta-suave">{detalle}</span>}
    </div>
  );
}

/** Grupo de campos: rejilla con huecos de 1 px que hacen de reglas (2 columnas en móvil, 4 en escritorio). */
export function CamposRejilla({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 gap-px border border-regla bg-regla md:grid-cols-4", className)}>
      {children}
    </div>
  );
}
