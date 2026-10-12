import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Contenedor común de las secciones: ancho máximo y márgenes del diseño. */
export const contenedor = "mx-auto w-full max-w-[1296px] px-[clamp(16px,4vw,48px)]";
export const contenedorSeccion = cn(contenedor, "py-[clamp(48px,7vw,104px)]");

/** Barra de 44×8 px + h2 condensado en mayúsculas. */
export function TituloSeccion({
  id,
  children,
  claro = false,
}: {
  id?: string;
  children: ReactNode;
  /** Barra blanca (sobre fondo primario) en vez de primario. */
  claro?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3.5">
      <span aria-hidden="true" className={cn("h-2 w-11", claro ? "bg-white" : "bg-primario")} />
      <h2
        id={id}
        className="m-0 text-[clamp(42px,5.6vw,80px)] leading-[0.9] font-extrabold text-balance uppercase font-stretch-66%"
      >
        {children}
      </h2>
    </div>
  );
}
