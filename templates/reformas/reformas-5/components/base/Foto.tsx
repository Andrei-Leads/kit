import Image from "next/image";
import type { ReactNode } from "react";
import { etiquetaOrigen, type Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

/** "relleno": sin proporción propia; la fija quien la usa (p. ej. `absolute inset-0` en un hero a sangre). */
export type Proporcion = "3/4" | "4/5" | "1/1" | "4/3" | "16/9" | "relleno";

const PROPORCION: Record<Proporcion, string> = {
  "3/4": "aspect-[3/4]",
  "4/5": "aspect-[4/5]",
  "1/1": "aspect-square",
  "4/3": "aspect-[4/3]",
  "16/9": "aspect-video",
  relleno: "",
};

type Props = {
  imagen: Imagen;
  /** Atributo `sizes` de next/image: el ancho real de la foto en cada punto de corte. */
  sizes: string;
  proporcion?: Proporcion;
  /** Variante `arco` de «Tu casa»: medio círculo arriba (3:4 o 4:5) y etiqueta centrada en la base recta. */
  arco?: boolean;
  /** Solo la foto LCP (una por página): la precarga desde el `<head>`. */
  preload?: boolean;
  /** Foto dentro de un enlace que ya tiene texto: `alt=""`. */
  decorativa?: boolean;
  /** Dónde va la etiqueta de origen. Por defecto, centrada abajo (zona recta del arco). */
  posicionEtiqueta?: "abajo-centro" | "abajo-derecha";
  /** Calidad de next/image (encargo §8: 60 en las rejillas de arcos). */
  calidad?: number;
  className?: string;
  /** Capas extra (velo, rótulos…), colocadas por quien la usa. */
  children?: ReactNode;
};

/**
 * Pieza base del registro (kit/registry/base/Foto.tsx), reestilada en «Tu casa»:
 * variante `arco` y etiqueta de `imagen.origen` en píldora pequeña de superficie
 * al 90 % (11 px) centrada en la base, donde no corta la curva. La etiqueta de IA es
 * obligatoria (AI Act, art. 50.4) y es texto visible y legible por lector de pantalla.
 *
 * Tokens: --radius-foto, --color-alterna (fondo mientras carga), --color-superficie, --color-texto.
 */
export function Foto({
  imagen,
  sizes,
  proporcion = "3/4",
  arco,
  preload,
  decorativa,
  posicionEtiqueta = "abajo-centro",
  calidad,
  className,
  children,
}: Props) {
  const etiqueta = etiquetaOrigen(imagen);
  const forma = arco ? (proporcion === "4/5" ? "arco-4x5" : "arco") : "rounded-foto";
  return (
    <div className={cn("relative overflow-hidden bg-alterna", forma, PROPORCION[proporcion], className)}>
      <Image
        src={imagen.src}
        alt={decorativa ? "" : imagen.alt}
        fill
        sizes={sizes}
        preload={preload}
        quality={calidad}
        className="object-cover"
      />
      {children}
      {etiqueta && (
        <span
          className={cn(
            "absolute z-[2] rounded-full bg-superficie/90 px-2.5 py-[5px] text-[11px] leading-none whitespace-nowrap text-texto",
            posicionEtiqueta === "abajo-centro" ? "bottom-2.5 left-1/2 -translate-x-1/2" : "right-[14%] bottom-[22px] max-lg:right-[18%] max-lg:bottom-3.5",
          )}
        >
          {etiqueta}
        </span>
      )}
    </div>
  );
}
