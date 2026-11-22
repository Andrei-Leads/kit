import type { ReactNode } from "react";
import type { Ancla } from "@andrei-leads/core";

import { Migas } from "@/components/base/Migas";

type Props = {
  /** Marcador de la página actual para el menú (ver globals.css). */
  pagina?: "inicio" | "trabajos" | "servicios" | "empresa" | "contacto";
  migas?: readonly Ancla[];
  /** «Servicio 01 · 2 obras», «Obra 01 · Reforma integral». */
  antetitulo?: string;
  titulo: string;
  entrada?: ReactNode;
  children?: ReactNode;
};

/** Cabecera de las páginas interiores: migas, antetítulo, `h1` gigante en condensada, entrada y CTA. */
export function CabeceraPagina({ pagina, migas, antetitulo, titulo, entrada, children }: Props) {
  return (
    <section className="contenedor pt-4">
      {pagina && <span data-pagina={pagina} hidden />}
      {migas && <Migas migas={migas} />}
      {antetitulo && <p className="etiqueta m-0 mt-3 text-[15px] leading-[1.2] text-texto-suave">{antetitulo}</p>}
      <h1 className="titulo-display m-0 mt-2.5">{titulo}</h1>
      {entrada && <div className="mt-4 max-w-[60ch] text-[clamp(1.0625rem,1rem+0.3vw,1.25rem)] leading-[1.45] [&_p]:m-0">{entrada}</div>}
      {children && <div className="mt-5">{children}</div>}
    </section>
  );
}
