import type { Imagen } from "@andrei-leads/core";

import { Foto } from "@/components/Foto";
import { cn } from "@/lib/utils";

type Props = {
  /** Las fotos que quedan después de la primera (`fotosRestantes`). Vacío: no se pinta. */
  imagenes: Imagen[];
  /** Nombre del servicio, para el título accesible de la sección. */
  titulo: string;
  className?: string;
};

/**
 * Resto de fotos del servicio (encargo §5): rejilla recta de 16 px, 2 columnas en móvil y 3 en escritorio,
 * foto 4:3. Sin título visible; el h2 es solo para lectores de pantalla.
 */
export function FichaFotos({ imagenes, titulo, className }: Props) {
  if (imagenes.length === 0) return null;
  return (
    <section aria-labelledby="ficha-fotos-titulo" className={cn("pt-11 lg:pt-16", className)}>
      <h2 id="ficha-fotos-titulo" className="sr-only">
        Más fotos de {titulo}
      </h2>
      <ul className="m-0 grid list-none grid-cols-2 gap-2.5 p-0 lg:grid-cols-3 lg:gap-4">
        {imagenes.map((imagen, i) => (
          <li key={`${i}-${imagen.src}`}>
            <Foto imagen={imagen} proporcion="4/3" forma="recta" compacta sizes="(min-width: 1280px) 400px, (min-width: 1024px) 28vw, 50vw" />
          </li>
        ))}
      </ul>
    </section>
  );
}
