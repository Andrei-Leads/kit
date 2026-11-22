import type { ReactNode } from "react";
import type { Ancla, Imagen } from "@andrei-leads/core";

import { Migas } from "@/components/base/Migas";
import type { Pagina } from "@/lib/navegacion";
import { cn } from "@/lib/utils";

import { Collage } from "./Collage";

type Props = {
  migas: readonly Ancla[];
  etiqueta?: string;
  /** El `h1`, con su palabra destacada. */
  titulo: ReactNode;
  frase?: ReactNode;
  /** La pareja de CTAs (y lo que vaya con ella). */
  children?: ReactNode;
  grande?: Imagen;
  mini?: Imagen;
  /** Marca la página actual en el menú sin JS. */
  pagina?: Pagina;
  /** Sin fotos: filete y franja 4:1 con la espiga. `false` en /contacto (sin collage). */
  franja?: boolean;
};

/**
 * Hero interior común (encargo §7, `data-tono="claro"`): migas, etiqueta, `h1` corto con
 * la palabra destacada, una frase, las dos píldoras y el collage 4:5 a dos escalas (en
 * móvil, debajo de los botones). Sin parallax: es primera pantalla. La foto grande es el
 * LCP (`preload`).
 */
export function HeroInterior({ migas, etiqueta, titulo, frase, children, grande, mini, pagina, franja = true }: Props) {
  return (
    <section data-tono="claro" data-pagina={pagina} className="bg-fondo pt-[clamp(24px,4vw,56px)] pb-[clamp(56px,6vw,112px)]">
      <div className={cn("contenedor grid items-end gap-x-12 gap-y-12", grande && "lg:grid-cols-12")}>
        <div className={cn(grande ? "lg:col-span-6" : "max-w-[820px]")}>
          <Migas migas={migas} className="mb-[clamp(28px,4vw,56px)]" />
          {etiqueta && <p className="etiqueta mb-4 text-texto-suave">{etiqueta}</p>}
          <h1 className="titulo-display">{titulo}</h1>
          {frase && <div className="m-0 mt-6 max-w-[44ch] text-entradilla text-texto-suave">{frase}</div>}
          {children && <div className="mt-8">{children}</div>}
        </div>
        {grande && (
          <Collage grande={grande} mini={mini} sizes="(min-width: 1024px) 420px, 78vw" preload className="lg:col-span-5 lg:col-start-8" />
        )}
      </div>
      {!grande && franja && (
        <div className="contenedor mt-[clamp(48px,5vw,88px)]">
          <div aria-hidden="true" className="espiga aspect-[2/1] border-t border-borde md:aspect-[4/1]" />
        </div>
      )}
    </section>
  );
}
