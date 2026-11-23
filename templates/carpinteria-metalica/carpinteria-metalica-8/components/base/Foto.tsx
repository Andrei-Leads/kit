import Image from "next/image";
import type { ReactNode } from "react";
import { etiquetaOrigen, type Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

/** "relleno": sin proporción propia; la fija quien la usa. */
export type Proporcion = "1/1" | "4/3" | "3/2" | "4/5" | "relleno";

const PROPORCION: Record<Proporcion, string> = {
  "1/1": "aspect-square",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "4/5": "aspect-[4/5]",
  relleno: "",
};

type Props = {
  imagen: Imagen;
  /** Atributo `sizes` de next/image: el ancho real de la foto en cada punto de corte. */
  sizes: string;
  proporcion?: Proporcion;
  /** Solo la foto LCP (una por página): la precarga desde el `<head>`. */
  preload?: boolean;
  /** Primera pantalla sin precarga (foto B del collage). */
  eager?: boolean;
  /** Foto dentro de un enlace que ya tiene texto: `alt=""`. */
  decorativa?: boolean;
  /** Quien la usa pinta un pie común (collage, tarjetas): aquí no sale la etiqueta. */
  sinEtiqueta?: boolean;
  /** Clases de la caja de la foto (máscara, radio, proporción…). */
  className?: string;
  /** Clases del envoltorio con el pie (solo si hay etiqueta). */
  claseFigura?: string;
  /** Alineación del pie. */
  pieDerecha?: boolean;
  calidad?: 60 | 75;
  children?: ReactNode;
};

/**
 * Pieza base del registro, reestilada (encargo §8): la etiqueta de `origen` («Imagen generada con
 * IA») va como pie bajo la foto, en cursiva a 13 px y en `texto-suave`, porque con las máscaras de
 * guijarro una etiqueta encima quedaría cortada. Sin etiqueta, solo la caja de la foto.
 */
export function Foto({
  imagen,
  sizes,
  proporcion = "4/3",
  preload,
  eager,
  decorativa,
  sinEtiqueta,
  className,
  claseFigura,
  pieDerecha,
  calidad,
  children,
}: Props) {
  const etiqueta = sinEtiqueta ? undefined : etiquetaOrigen(imagen);
  const caja = (
    <div className={cn("relative overflow-hidden rounded-foto bg-alterna", PROPORCION[proporcion], className)}>
      <Image
        src={imagen.src}
        alt={decorativa ? "" : imagen.alt}
        fill
        sizes={sizes}
        preload={preload}
        loading={eager && !preload ? "eager" : undefined}
        // Con «low», React no mete un segundo `<link rel="preload">` para la foto eager.
        fetchPriority={eager && !preload ? "low" : undefined}
        quality={calidad}
        className="object-cover"
      />
      {children}
    </div>
  );
  if (!etiqueta) return caja;
  return (
    <div className={claseFigura}>
      {caja}
      <p className={cn("pie-foto mt-2.5", pieDerecha && "text-right")}>{etiqueta}</p>
    </div>
  );
}
