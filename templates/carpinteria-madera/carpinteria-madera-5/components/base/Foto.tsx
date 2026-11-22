import Image from "next/image";
import type { ReactNode } from "react";
import { etiquetaOrigen, type Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

/** "relleno": sin proporción propia; la fija quien la usa (p. ej. dentro de un arco con su `aspect`). */
export type Proporcion = "1/1" | "4/3" | "3/2" | "4/5" | "16/9" | "relleno";

const PROPORCION: Record<Proporcion, string> = {
  "1/1": "aspect-square",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "4/5": "aspect-[4/5]",
  "16/9": "aspect-video",
  relleno: "",
};

/** Etiqueta de origen y rótulos «Antes»/«Después»: píldora crema sobre el velo nogal al 75 % (≥ 7:1). */
export const ETIQUETA =
  "pointer-events-none absolute z-[2] rounded-boton bg-etiqueta px-[9px] py-1 text-[11px] leading-tight font-medium text-texto";

/** Dónde va la etiqueta de origen. «arco»: arriba a la derecha, por debajo de la curva del arco (y del velo de la cabecera). */
export type PosicionEtiqueta = "abajo-derecha" | "arriba-derecha" | "arco" | "ninguna";

export const POSICION_ETIQUETA: Record<Exclude<PosicionEtiqueta, "ninguna">, string> = {
  "abajo-derecha": "right-3 bottom-3",
  "arriba-derecha": "top-2.5 right-2.5",
  arco: "top-[26%] right-4",
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
  /** `fetchPriority`. Con `loading="eager"` y «low», React no mete `<link rel="preload">`. */
  prioridad?: "high" | "low" | "auto";
  /** Calidad de next/image (60 para el «antes»; por defecto, la de Next). */
  calidad?: number;
  /** Foto dentro de un enlace que ya tiene texto: `alt=""`. */
  decorativa?: boolean;
  posicionEtiqueta?: PosicionEtiqueta;
  className?: string;
  /** Capas extra («Antes»/«Después»…), colocadas por quien la usa. */
  children?: ReactNode;
};

/**
 * Pieza base del registro (kit/registry/base/Foto.tsx), reestilada en «Restauración» (encargo
 * §8): arco por defecto (`rounded-foto`), etiqueta de origen en píldora de 11 px sobre
 * `--color-etiqueta` y `loading`, `prioridad` y `calidad`. Foto con next/image y proporción
 * fija. Si `imagen.origen` es "ia" o "ficha-google", pinta la etiqueta de `etiquetaOrigen` (la de
 * IA es obligatoria: AI Act, art. 50.4). La etiqueta es texto visible y legible por lector de pantalla.
 *
 * Tokens: --radius-foto, --color-alterna (fondo mientras carga), --color-texto, --color-etiqueta.
 */
export function Foto({
  imagen,
  sizes,
  proporcion = "4/3",
  preload,
  loading,
  prioridad,
  calidad,
  decorativa,
  posicionEtiqueta = "abajo-derecha",
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
        fetchPriority={prioridad}
        quality={calidad}
        className="object-cover"
      />
      {children}
      {etiqueta && posicionEtiqueta !== "ninguna" && <span className={cn(ETIQUETA, POSICION_ETIQUETA[posicionEtiqueta])}>{etiqueta}</span>}
    </div>
  );
}
