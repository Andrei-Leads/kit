import Image from "next/image";
import type { ReactNode } from "react";
import { etiquetaOrigen, type Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

/** "relleno": sin proporción propia; la fija quien la usa (p. ej. `absolute inset-0`). */
export type Proporcion = "1/1" | "4/3" | "3/2" | "4/5" | "4/1" | "16/9" | "relleno";

const PROPORCION: Record<Proporcion, string> = {
  "1/1": "aspect-square",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "4/5": "aspect-[4/5]",
  "4/1": "aspect-[4/1]",
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
  /**
   * Etiqueta de origen: "fuera" (debajo del marco, por defecto), "pastilla"
   * (dentro, con velo: el pano) o "ninguna" (la pone quien agrupa varias fotos).
   */
  etiqueta?: "fuera" | "pastilla" | "ninguna";
  /** Clases del marco (parallax: `px-grande`, `px-hero-grande`…). */
  className?: string;
  /** Clases del envoltorio (marco + etiqueta). */
  claseEnvoltorio?: string;
  children?: ReactNode;
};

/**
 * Pieza base del registro (kit/registry/base/Foto.tsx), reestilada para
 * «Tensión» (encargo §8): marco recto sin sombra con la imagen en un interior
 * que el parallax puede desplazar (`.marco` recorta), y la etiqueta de origen
 * **fuera** del marco, abajo a la izquierda, en mayúsculas de 11 px. La de IA
 * es obligatoria (AI Act, art. 50.4).
 */
export function Foto({
  imagen,
  sizes,
  proporcion = "4/5",
  preload,
  decorativa,
  etiqueta = "fuera",
  className,
  claseEnvoltorio,
  children,
}: Props) {
  const texto = etiquetaOrigen(imagen);
  const marco = (
    <div className={cn("marco rounded-foto", PROPORCION[proporcion], className)}>
      <div className="marco-interior">
        <Image src={imagen.src} alt={decorativa ? "" : imagen.alt} fill sizes={sizes} preload={preload} className="object-cover" />
      </div>
      {children}
      {texto && etiqueta === "pastilla" && (
        <span className="etiqueta absolute top-3 left-3 z-[2] bg-[var(--color-velo)] px-2.5 py-1.5 text-[11px] text-texto backdrop-blur-[6px]">
          {texto}
        </span>
      )}
    </div>
  );
  if (!texto || etiqueta !== "fuera") return claseEnvoltorio ? <div className={claseEnvoltorio}>{marco}</div> : marco;
  return (
    <div className={claseEnvoltorio}>
      {marco}
      <p className="etiqueta m-0 mt-3 text-[11px] text-texto-suave">{texto}</p>
    </div>
  );
}
