import type { ReactNode } from "react";
import type { Imagen } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { cn } from "@/lib/utils";

type Props = {
  grande: Imagen;
  mini?: Imagen;
  /** `sizes` de la foto grande (la miniatura usa el suyo, fijo). */
  sizes: string;
  /** Esquina de la miniatura. */
  lado?: "izquierda" | "derecha";
  /** Parallax (recurso 3). Nunca en la primera pantalla: los heros interiores lo llevan apagado. */
  paralaje?: boolean;
  preload?: boolean;
  /** Envoltorio de la foto grande (p. ej. el `<ViewTransition>` de la obra). */
  envolver?: (foto: ReactNode) => ReactNode;
  className?: string;
};

/**
 * Collage 4:5 a dos escalas (encargo §5.2): la grande y una miniatura que se solapa
 * por una esquina inferior con un marco del color del fondo. Sin miniatura, la grande
 * ocupa su sitio.
 */
export function Collage({ grande, mini, sizes, lado = "izquierda", paralaje, preload, envolver, className }: Props) {
  const foto = <Foto imagen={grande} sizes={sizes} proporcion="4/5" paralaje={paralaje} preload={preload} />;
  return (
    <div className={cn("relative", mini && "pb-[14%]", className)}>
      <div className={cn(mini && "w-[78%]", mini && lado === "izquierda" && "ml-auto")}>{envolver ? envolver(foto) : foto}</div>
      {mini && (
        <div
          className={cn(
            "absolute bottom-0 z-[1] w-[40%] outline-8 outline-[var(--marco,var(--color-fondo))]",
            lado === "izquierda" ? "left-0" : "right-0",
            paralaje && (lado === "izquierda" ? "paralaje-mini" : "paralaje-mini-inversa"),
          )}
        >
          <Foto imagen={mini} sizes="(min-width: 1024px) 260px, 32vw" proporcion="4/5" etiqueta="mini" />
        </div>
      )}
    </div>
  );
}
