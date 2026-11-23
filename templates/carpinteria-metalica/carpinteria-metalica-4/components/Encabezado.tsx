import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Props = {
  /** Número de la sección en el inicio («03»). Sin él, solo la etiqueta. */
  n?: string;
  /** Etiqueta en mono a la derecha del filete («OBRAS»). */
  etiqueta: string;
  titulo: string;
  id?: string;
  /** Algo bajo el h2 (valoración, enlace a Google…). */
  children?: ReactNode;
  className?: string;
};

/** Cabeza de sección: «03 ——— PROCESO» y el h2 en mono. */
export function Encabezado({ n, etiqueta, titulo, id, children, className }: Props) {
  return (
    <div className={cn("ancho mb-8 flex flex-col gap-3", className)}>
      <div aria-hidden="true" className="etiqueta flex items-center gap-3">
        {n && <span>{n}</span>}
        <span className="h-px flex-1 bg-texto" />
        <span>{etiqueta}</span>
      </div>
      <h2 id={id} className="h2">
        {titulo}
      </h2>
      {children}
    </div>
  );
}
