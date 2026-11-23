import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { etiquetaOrigen, type Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

type Props = {
  imagen: Imagen;
  /** Atributo `sizes` de next/image: el ancho real de la foto en cada punto de corte. */
  sizes: string;
  /** Proporción CSS («3/2», «4/5»…) o «relleno» (ocupa a su padre, que fija el tamaño). */
  proporcion?: string;
  /** Solo la foto LCP (una por página): la precarga desde el `<head>`. */
  preload?: boolean;
  /** Foto dentro de un enlace que ya tiene texto: `alt=""`. */
  decorativa?: boolean;
  /** Etiqueta de `imagen.origen`: abajo a la izquierda (por defecto) o la pone quien la usa. */
  etiqueta?: "abajo" | "no";
  calidad?: number;
  className?: string;
  /** Clases de la `<img>` (p. ej. `grayscale-[.6]` en /empresa). */
  claseImagen?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

/** Etiqueta de origen (AI Act, art. 50.4): versalitas de 12 px sobre una placa al 75 %. */
export const CLASE_ETIQUETA =
  "absolute z-[3] bg-[rgb(13_14_15/0.75)] px-2 py-[5px] text-xs leading-none font-medium tracking-[0.1em] text-texto uppercase";

/**
 * Pieza base del registro (kit/registry/base/Foto.tsx), reestilada en «Perfil» (encargo §8):
 * esquinas rectas, sin marcos ni sombras, fondo `alterna` mientras carga. La etiqueta de
 * `origen` va dentro de la foto, abajo a la izquierda (contraste ≥ 4,5:1 sobre la placa).
 */
export function Foto({ imagen, sizes, proporcion = "3/2", preload, decorativa, etiqueta = "abajo", calidad, className, claseImagen, style, children }: Props) {
  const texto = etiquetaOrigen(imagen);
  const relleno = proporcion === "relleno";
  return (
    <div
      className={cn("relative overflow-hidden rounded-foto bg-alterna", relleno && "h-full", className)}
      style={relleno ? style : { aspectRatio: proporcion, ...style }}
    >
      <Image src={imagen.src} alt={decorativa ? "" : imagen.alt} fill sizes={sizes} preload={preload} quality={calidad} className={cn("object-cover", claseImagen)} />
      {children}
      {texto && etiqueta === "abajo" && <span className={cn(CLASE_ETIQUETA, "bottom-3 left-3")}>{texto}</span>}
    </div>
  );
}
