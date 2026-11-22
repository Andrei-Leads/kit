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
  /** «eager» para la foto «antes» del hero: se pide enseguida, sin precarga (encargo §8, riesgo 1). */
  loading?: "eager" | "lazy";
  /** Miniaturas (120 px): la etiqueta se ve como «IA» y el texto entero queda para el lector de pantalla. */
  etiquetaCorta?: boolean;
  /** Calidad de next/image (por defecto, la de Next). */
  calidad?: number;
  /** `fetchPriority`. Con `loading="eager"` y «low», React no mete `<link rel="preload">` (la foto «antes» del hero). */
  prioridad?: "high" | "low" | "auto";
  /** Foto dentro de un enlace que ya tiene texto: `alt=""`. */
  decorativa?: boolean;
  /** Dónde va la etiqueta de origen. Por defecto, abajo a la derecha. «ninguna»: la pinta quien la usa. */
  posicionEtiqueta?: "abajo-derecha" | "abajo-izquierda" | "arriba-derecha" | "ninguna";
  className?: string;
  /** Capas extra (degradado, «Antes»/«Después»…), colocadas por quien la usa. */
  children?: ReactNode;
};

/** Etiqueta de origen de «Antes y después»: versalitas de 11 px sobre el velo blanco al 90 %. */
export const ETIQUETA =
  "pointer-events-none absolute z-[2] bg-velo-etiqueta px-[7px] py-1 font-texto text-[11px] leading-none font-medium tracking-[0.08em] text-texto uppercase";

/**
 * Pieza base del registro (kit/registry/base/Foto.tsx), reestilada en «Antes y después»:
 * etiqueta abajo a la derecha en versalitas (encargo §8), `loading` y `calidad`. Foto con next/image y
 * proporción fija. Si `imagen.origen` es "ia" o "ficha-google", pinta la
 * etiqueta de `etiquetaOrigen` (la de IA es obligatoria: AI Act, art. 50.4).
 * La etiqueta es texto visible y legible por lector de pantalla.
 *
 * Tokens: --radius-foto, --color-alterna (fondo mientras carga), --color-texto,
 * --color-fondo.
 */
export function Foto({
  imagen,
  sizes,
  proporcion = "4/3",
  preload,
  decorativa,
  posicionEtiqueta = "abajo-derecha",
  loading,
  calidad,
  prioridad,
  etiquetaCorta,
  className,
  children,
}: Props) {
  const etiqueta = etiquetaOrigen(imagen);
  return (
    <div className={cn("relative overflow-hidden rounded-foto bg-alterna", PROPORCION[proporcion], className)}>
      <Image
        src={imagen.src}
        alt={decorativa ? "" : imagen.alt}
        fill
        sizes={sizes}
        preload={preload}
        loading={loading}
        quality={calidad}
        fetchPriority={prioridad}
        className="object-cover"
      />
      {children}
      {etiqueta && posicionEtiqueta !== "ninguna" && (
        <span
          className={cn(
            ETIQUETA,
            posicionEtiqueta === "abajo-derecha" && "right-2 bottom-2",
            posicionEtiqueta === "abajo-izquierda" && "bottom-2 left-2",
            posicionEtiqueta === "arriba-derecha" && "top-2 right-2",
          )}
        >
          {etiquetaCorta && imagen.origen === "ia" ? (
            <>
              <span aria-hidden="true">IA</span>
              <span className="sr-only">{etiqueta}</span>
            </>
          ) : (
            etiqueta
          )}
        </span>
      )}
    </div>
  );
}
