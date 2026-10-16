import type { Imagen } from "@andrei-leads/core";

import { Foto } from "@/components/Foto";
import { cn } from "@/lib/utils";

type Props = {
  /** Fotos restantes del servicio (`imagenes[1..]`); la primera ya está en la cabecera. */
  imagenes: Imagen[];
};

/**
 * Fotos restantes de la ficha (sin mockup: compuesta con los tokens): rejilla 3:2 con el `alt` de cada
 * una; 1 foto, a media columna; 2, en dos columnas; 3 o más, hasta 3 columnas. Sin fotos, no sale.
 */
export function FichaFotos({ imagenes }: Props) {
  if (imagenes.length === 0) return null;
  return (
    <div className="contenedor pb-14 lg:pb-16">
      <div
        className={cn(
          "grid grid-cols-1 gap-5",
          imagenes.length === 1 && "lg:max-w-[calc(50%-28px)]",
          imagenes.length === 2 && "sm:grid-cols-2",
          imagenes.length >= 3 && "sm:grid-cols-2 lg:grid-cols-3"
        )}
      >
        {imagenes.map((imagen, i) => (
          <Foto
            key={`${i}-${imagen.src}`}
            imagen={imagen}
            proporcion="3/2"
            sizes={imagenes.length === 1 ? "(min-width: 1024px) 560px, 100vw" : "(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"}
          />
        ))}
      </div>
    </div>
  );
}
