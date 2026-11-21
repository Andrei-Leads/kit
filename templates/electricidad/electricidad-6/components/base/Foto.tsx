import Image from "next/image";
import type { ReactNode } from "react";
import { etiquetaOrigen, type Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

/** "relleno": sin proporción propia; la fija quien la usa (p. ej. `absolute inset-0` en un hero a sangre). */
export type Proporcion = "1/1" | "4/3" | "3/2" | "4/5" | "16/9" | "relleno";

const PROPORCION: Record<Proporcion, string> = {
  "1/1": "aspect-square",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "4/5": "aspect-[4/5]",
  "16/9": "aspect-video",
  relleno: "",
};

type Props = {
  imagen: Imagen;
  /** Atributo `sizes` de next/image: el ancho real de la foto en cada punto de corte. */
  sizes: string;
  proporcion?: Proporcion;
  /** Solo la foto LCP (una por página): la precarga desde el `<head>`. */
  preload?: boolean;
  /** Foto dentro de un enlace que ya tiene texto: `alt=""`. */
  decorativa?: boolean;
  /** «Apagón»: recorte en paralelogramo (por defecto, sí). */
  corte?: boolean;
  /** Miniatura de 64 px: la etiqueta se reduce a «IA» abajo a la izquierda (el texto completo, para lector de pantalla). */
  miniatura?: boolean;
  className?: string;
  /** Capas extra («Antes»/«Después»…), colocadas por quien la usa. */
  children?: ReactNode;
};

/**
 * Pieza base del registro (kit/registry/base/Foto.tsx), reestilada para «Apagón» (encargo §8): recorte
 * en paralelogramo (`clip-path`, nunca a sangre) y etiqueta de origen en cinta negra al 85 % con texto
 * blanco cálido de 12 px, arriba a la izquierda dentro de la zona no recortada. La de IA es obligatoria
 * (AI Act, art. 50.4).
 *
 * Tokens: --radius-foto, --color-alterna (fondo mientras carga), --color-fondo, --color-texto; --corte.
 */
export function Foto({ imagen, sizes, proporcion = "4/3", preload, decorativa, corte = true, miniatura, className, children }: Props) {
  const etiqueta = etiquetaOrigen(imagen);
  return (
    <div className={cn("relative overflow-hidden rounded-foto bg-alterna", PROPORCION[proporcion], corte && "corte", className)}>
      <Image src={imagen.src} alt={decorativa ? "" : imagen.alt} fill sizes={sizes} preload={preload} className="object-cover" />
      {children}
      {etiqueta &&
        (miniatura ? (
          // Dentro de un enlace (foto decorativa), la etiqueta no entra en el nombre del enlace.
          <span aria-hidden={decorativa || undefined} className="absolute bottom-1 left-1 z-[2] bg-fondo/85 px-1 text-[11px] leading-4 font-bold text-texto">
            <span aria-hidden="true">{etiqueta === "Imagen generada con IA" ? "IA" : "Google"}</span>
            {!decorativa && <span className="sr-only">{etiqueta}</span>}
          </span>
        ) : (
          <span
            className={cn(
              "absolute top-2 z-[2] bg-fondo/85 px-2 py-0.5 text-xs leading-snug font-medium text-texto",
              corte ? "left-[calc(var(--corte)+0.5rem)]" : "left-2",
            )}
          >
            {etiqueta}
          </span>
        ))}
    </div>
  );
}
