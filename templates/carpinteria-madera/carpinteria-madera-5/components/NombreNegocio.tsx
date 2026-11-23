import Image from "next/image";
import type { Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

/** Nombre largo: a partir de aquí la cabecera móvil baja el cuerpo y el menú se queda en icono. */
export const NOMBRE_LARGO = 28;

/**
 * Nombre del negocio de la cabecera: logo de 32 px a la izquierda (alt="", el nombre va escrito)
 * y el nombre en sans de 17 px (20 px en escritorio), en 2 líneas como máximo. Un nombre largo
 * baja a 14 px en móvil y puede ocupar 3 líneas; nunca se corta con «…».
 */
export function NombreNegocio({ nombre, logo }: { nombre: string; logo?: Imagen }) {
  const largo = nombre.length > NOMBRE_LARGO;
  return (
    <span className="flex min-w-0 items-center gap-2">
      {logo && <Image src={logo.src} alt="" width={32} height={32} className="h-8 w-auto max-w-16 flex-none object-contain" />}
      <span
        className={cn(
          "min-w-0 leading-[1.15] font-[650] text-balance text-texto",
          largo ? "text-sm lg:max-w-[260px] lg:text-[17px]" : "text-[17px] lg:max-w-[220px] lg:text-xl",
        )}
      >
        {nombre}
      </span>
    </span>
  );
}
