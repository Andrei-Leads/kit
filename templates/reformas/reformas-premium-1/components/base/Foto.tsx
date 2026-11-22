import Image from "next/image";
import type { ReactNode } from "react";
import { etiquetaOrigen, type Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

/** "relleno": sin proporción propia; la fija quien la usa (p. ej. `absolute inset-0` en un hero a sangre). */
export type Proporcion = "4/5" | "3/2" | "4/3" | "4/1" | "16/9" | "relleno";

const PROPORCION: Record<Proporcion, string> = {
  "4/5": "aspect-[4/5]",
  "3/2": "aspect-[3/2]",
  "4/3": "aspect-[4/3]",
  "4/1": "aspect-[2/1] md:aspect-[4/1]",
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
  /** Calidad de next/image (60 en el pano; 75 por defecto). */
  calidad?: 60 | 75;
  /** Foto dentro de un enlace que ya tiene texto: `alt=""`. */
  decorativa?: boolean;
  /**
   * Etiqueta de origen: "normal" (esquina inferior derecha, 11 px, yeso al 90 %),
   * "mini" (10 px, para fotos de menos de 160 px) o "ninguna" (quien la usa la
   * integra en otro sitio, como la línea de portada del hero). La de IA es
   * obligatoria (AI Act, art. 50.4): "ninguna" solo si se pinta en otro lado.
   */
  etiqueta?: "normal" | "mini" | "ninguna";
  /** Parallax grande (recurso 3): la imagen al 120 % se desplaza dentro de su marco. Nunca en la primera pantalla. */
  paralaje?: boolean;
  className?: string;
  /** Capas extra (velo, «Antes»/«Después»…), colocadas por quien la usa. */
  children?: ReactNode;
};

/**
 * Pieza base del registro (kit/registry/base/Foto.tsx), reestilada para «Estancia»:
 * etiqueta de origen en la esquina inferior derecha sobre pastilla de yeso, y
 * parallax opcional por CSS (`.marco-paralaje` + `.paralaje-grande`, globals.css).
 *
 * Tokens: --radius-foto, --color-alterna (fondo mientras carga), --color-superficie,
 * --color-texto.
 */
export function Foto({
  imagen,
  sizes,
  proporcion = "4/5",
  preload,
  calidad,
  decorativa,
  etiqueta = "normal",
  paralaje,
  className,
  children,
}: Props) {
  const texto = etiqueta === "ninguna" ? undefined : etiquetaOrigen(imagen);
  const img = (
    <Image
      src={imagen.src}
      alt={decorativa ? "" : imagen.alt}
      fill
      sizes={sizes}
      preload={preload}
      quality={calidad}
      className="object-cover"
    />
  );
  return (
    <div className={cn("relative overflow-hidden rounded-foto bg-alterna", PROPORCION[proporcion], paralaje && "marco-paralaje", className)}>
      {paralaje ? <div className="paralaje-grande absolute inset-x-0 -inset-y-[10%]">{img}</div> : img}
      {children}
      {texto && (
        <span
          className={cn(
            "absolute right-2 bottom-2 z-[2] rounded-[2px] bg-superficie/90 px-1.5 py-0.5 leading-snug text-texto",
            etiqueta === "mini" ? "text-[10px]" : "text-[11px]",
          )}
        >
          {texto}
        </span>
      )}
    </div>
  );
}
