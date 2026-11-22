import { etiquetaOrigen, type Imagen } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { cn } from "@/lib/utils";

type Props = {
  imagenes: readonly Imagen[];
  /** "hero": geometría del inicio (tercera 1:1 en escritorio, parallax con scroll(root)). */
  modo?: "hero" | "normal";
  /** La grande es la LCP (solo en el hero del inicio y en el de una página interior). */
  preload?: boolean;
  /** Ancho de la grande. */
  sizes: string;
  className?: string;
};

/**
 * Collage de precisión (encargo §5.2): una foto 4:5 grande, una miniatura 4:5
 * que se solapa sobre su borde y, en el hero de escritorio, una tercera 1:1.
 * Marcos rectos con filete de fondo de 6 px; una sola etiqueta de origen fuera
 * del marco. Parallax solo con CSS (globals.css).
 */
export function Collage({ imagenes, modo = "normal", preload, sizes, className }: Props) {
  const [grande, mini, tercera] = imagenes;
  if (!grande) return null;
  const hero = modo === "hero";
  const ia = imagenes.slice(0, hero ? 3 : 2).filter((i) => etiquetaOrigen(i) === "Imagen generada con IA").length;
  const otra = imagenes.slice(0, hero ? 3 : 2).map((i) => etiquetaOrigen(i)).find((e) => e && e !== "Imagen generada con IA");
  const etiqueta = ia > 1 ? "Imágenes generadas con IA" : ia === 1 ? "Imagen generada con IA" : otra;

  if (!mini) {
    return (
      <div className={className}>
        <Foto imagen={grande} sizes={sizes} preload={preload} etiqueta="ninguna" className={hero ? "px-hero-grande" : "px-grande"} />
        {etiqueta && <p className="etiqueta m-0 mt-3 text-[11px] text-texto-suave">{etiqueta}</p>}
      </div>
    );
  }

  return (
    <div className={className}>
      <div className={cn("relative aspect-[4/5] w-full", hero && "lg:aspect-[470/600]")}>
        <Foto
          imagen={grande}
          sizes={sizes}
          preload={preload}
          etiqueta="ninguna"
          proporcion="relleno"
          className={cn(
            "absolute top-0 left-0 h-[78%] w-[78%]",
            hero && "px-hero-grande lg:top-[6.7%] lg:left-[15%] lg:h-[83.3%] lg:w-[85%]",
            !hero && "px-grande",
          )}
        />
        <Foto
          imagen={mini}
          sizes="(min-width: 1024px) 200px, 44vw"
          etiqueta="ninguna"
          proporcion="relleno"
          className={cn(
            "absolute right-0 bottom-0 h-[44%] w-[44%] outline-6 outline-fondo",
            hero && "px-hero-mini lg:top-[56.7%] lg:right-auto lg:bottom-auto lg:left-0 lg:h-[41.7%] lg:w-[42.5%]",
            !hero && "px-mini",
          )}
        />
        {hero && tercera && (
          <Foto
            imagen={tercera}
            sizes="140px"
            etiqueta="ninguna"
            proporcion="relleno"
            className="px-hero-tercera absolute top-0 left-[70.2%] hidden aspect-square w-[29.8%] outline-6 outline-fondo lg:block"
          />
        )}
      </div>
      {etiqueta && <p className={cn("etiqueta m-0 mt-4 text-[11px] text-texto-suave", hero && "lg:text-right")}>{etiqueta}</p>}
    </div>
  );
}
