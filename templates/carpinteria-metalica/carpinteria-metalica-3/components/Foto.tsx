import Image from "next/image";
import type { ReactNode } from "react";
import type { Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

type Props = {
  imagen: Imagen;
  proporcion: "4/3" | "1/1";
  /** Atributo `sizes` de next/image (ancho real de la foto según el breakpoint). */
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Miniatura dentro de un enlace: `alt=""` (el enlace ya tiene su texto) y etiqueta más pequeña. */
  decorativa?: boolean;
  /** Etiquetas extra (p. ej. «Antes»), colocadas por el llamador. */
  children?: ReactNode;
};

/** Foto con next/image. Si es de ejemplo (`/ejemplo/…`) lleva la etiqueta «Foto de ejemplo». */
export function Foto({ imagen, proporcion, sizes, priority, className, decorativa, children }: Props) {
  const deEjemplo = imagen.src.startsWith("/ejemplo/");
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-linea",
        proporcion === "4/3" ? "aspect-[4/3]" : "aspect-square",
        className
      )}
    >
      <Image
        src={imagen.src}
        alt={decorativa ? "" : imagen.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
      {deEjemplo && (
        <span
          aria-hidden={decorativa || undefined}
          className={cn(
            "absolute rounded-sm bg-tinta leading-none font-semibold text-white",
            decorativa
              ? "bottom-1 left-1 px-[5px] py-1 text-[11px]"
              : "bottom-2 left-2 px-[7px] py-[5px] text-xs"
          )}
        >
          Foto de ejemplo
        </span>
      )}
      {children}
    </div>
  );
}
