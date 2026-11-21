import Image from "next/image";
import type { Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

/**
 * `ancho`: en móvil, sin tope de ancho (la cabecera lo pone en su propia fila).
 *
 * Nombre del negocio a 20 px, en 2 líneas (220 px en móvil; con más de 24 caracteres, a 15 px), nunca cortado con «…». Con
 * `logo`: logo de 36 px a la izquierda con `alt=""` (el nombre ya está escrito).
 * El nombre se ve siempre (regla del kit: sin variante «solo logo»).
 */
export function Nombre({ nombre, logo, ancho }: { nombre: string; logo?: Imagen; ancho?: boolean }) {
  const largo = nombre.length > 24;
  return (
    <span className="inline-flex min-w-0 items-center gap-2.5">
      {logo && <Image src={logo.src} alt="" width={36} height={36} className="size-9 flex-none rounded-lg bg-superficie object-contain" />}
      <span className={cn("font-titulo leading-[1.1] font-bold tracking-[-0.02em] text-balance sm:max-w-[300px]", ancho ? "max-sm:max-w-none" : "max-w-[220px]", largo ? "text-[1.0625rem] sm:text-lg" : "text-xl")}>
        {nombre}
      </span>
    </span>
  );
}
