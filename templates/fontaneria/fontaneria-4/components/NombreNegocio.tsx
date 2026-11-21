import Image from "next/image";
import type { Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

/**
 * Nombre del negocio en mono mayúsculas, con el logo (si hay) a 32 px a su izquierda y `alt=""`:
 * el nombre escrito ya lo dice. Se parte en las líneas que necesite; nunca «…».
 */
export function NombreNegocio({ nombre, logo, className }: { nombre: string; logo?: Imagen; className?: string }) {
  return (
    <span className={cn("flex min-w-0 items-center gap-2.5", className)}>
      {logo && <Image src={logo.src} alt="" width={32} height={32} className="size-8 flex-none object-contain" />}
      <span className="min-w-0 [overflow-wrap:break-word] [hyphens:none]">{nombre}</span>
    </span>
  );
}
