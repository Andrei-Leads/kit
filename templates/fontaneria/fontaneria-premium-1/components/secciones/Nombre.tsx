import Image from "next/image";
import Link from "next/link";
import type { Imagen } from "@andrei-leads/core";

import { partirNombre } from "@/lib/textos";
import { cn } from "@/lib/utils";

/**
 * Nombre del negocio (cabecera, menú y pie): la primera palabra en Inter Tight
 * 400 y el resto en etiqueta («Olmedo» / «INSTALACIONES»). Con logo, a 32 px a
 * la izquierda con `alt=""` (el nombre ya está escrito). Nunca se corta con «…».
 */
export function Nombre({ nombre, logo, className }: { nombre: string; logo?: Imagen; className?: string }) {
  const { principal, resto } = partirNombre(nombre);
  return (
    <Link href="/" className={cn("nombre flex min-h-11 min-w-0 items-center gap-2.5 no-underline", className)}>
      {logo && <Image src={logo.src} alt="" width={32} height={32} className="size-8 flex-none object-contain" />}
      <span className="flex min-w-0 flex-col gap-0.5 lg:flex-row lg:items-baseline lg:gap-2.5">
        <span className="font-titulo text-[22px] leading-none font-normal tracking-[-0.01em] [overflow-wrap:anywhere]">{principal}</span>
        {resto && (
          <span className="text-[9px] leading-tight font-medium tracking-[0.14em] text-[var(--cab-suave,var(--color-sobre-tinta-suave))] uppercase lg:text-[10px]">
            {resto}
          </span>
        )}
      </span>
    </Link>
  );
}
