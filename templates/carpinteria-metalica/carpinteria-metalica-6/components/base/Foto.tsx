import Image from "next/image";
import type { ReactNode } from "react";
import { etiquetaOrigen, type Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

/** "relleno": sin proporción propia; la fija quien la usa. */
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
  /** «eager» para la foto «antes» del hero: se pide enseguida, sin precarga (encargo §8). */
  loading?: "eager" | "lazy";
  /** Calidad de next/image (60 para el «antes»; por defecto, 75). */
  calidad?: number;
  /** `fetchPriority`. Con `loading="eager"` y «low», React no mete `<link rel="preload">`. */
  prioridad?: "high" | "low" | "auto";
  /** Foto dentro de un enlace que ya tiene texto, o miniatura que repite otra: `alt=""`. */
  decorativa?: boolean;
  /** «ninguna»: sin etiqueta de origen (miniaturas que repiten una foto ya etiquetada). */
  sinEtiqueta?: boolean;
  className?: string;
  /** Capas extra («Antes», «Después», «Terminado», precio…), colocadas por quien la usa. */
  children?: ReactNode;
};

/** Pastilla de origen (entrega §6): blanco al 92 %, texto `texto` de 12 px, abajo a la izquierda. */
export const ETIQUETA =
  "pointer-events-none absolute bottom-2.5 left-2.5 z-[2] rounded-pastilla bg-velo-etiqueta px-2.5 py-1.5 font-texto text-xs leading-none font-normal text-texto";

/**
 * Pieza base del registro (kit/registry/base/Foto.tsx), reestilada en «Fachada nueva»: radio de
 * 16 px y la etiqueta de `imagen.origen` en una pastilla blanca abajo a la izquierda (encargo §8).
 * La de IA es obligatoria (AI Act, art. 50.4) y se lee también con lector de pantalla.
 */
export function Foto({
  imagen,
  sizes,
  proporcion = "4/3",
  preload,
  loading,
  calidad,
  prioridad,
  decorativa,
  sinEtiqueta,
  className,
  children,
}: Props) {
  const etiqueta = sinEtiqueta ? undefined : etiquetaOrigen(imagen);
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
      {etiqueta && <span className={ETIQUETA}>{etiqueta}</span>}
    </div>
  );
}
