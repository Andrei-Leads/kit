import Image from "next/image";
import type { Imagen } from "@andrei-leads/core";

import { partirNombre } from "@/lib/textos";
import { cn } from "@/lib/utils";

/**
 * Nombre del negocio en dos niveles (prefijo pequeño + dos últimas palabras en
 * Fraunces) con el logo opcional de 32 px a la izquierda (`alt=""`: el nombre
 * ya está escrito). Nunca se corta con «…».
 */
export function Nombre({ nombre, logo, className }: { nombre: string; logo?: Imagen; className?: string }) {
  const { prefijo, principal } = partirNombre(nombre);
  return (
    <span className={cn("flex min-w-0 items-center gap-2.5", className)}>
      {logo && <Image src={logo.src} alt="" width={32} height={32} className="size-8 flex-none object-contain" />}
      <span className="flex min-w-0 flex-col gap-0.5 leading-[1.1]">
        {prefijo && <span className="text-[clamp(0.6875rem,0.62rem+0.3vw,0.875rem)] font-semibold tracking-[0.01em]">{prefijo}</span>}
        <span className="font-titulo text-[clamp(1.25rem,1rem+1.1vw,1.875rem)] font-semibold tracking-[-0.01em] text-balance">
          {principal}
        </span>
      </span>
    </span>
  );
}
