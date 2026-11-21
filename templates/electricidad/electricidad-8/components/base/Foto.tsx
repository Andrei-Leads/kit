import Image from "next/image";
import type { ReactNode } from "react";
import { etiquetaOrigen, type Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

/** "relleno": sin proporción propia; la fija quien la usa con `claseFoto` (p. ej. 3:2 en móvil y 4:5 en escritorio). */
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
  /** Carga inmediata sin precarga (la capa «antes» del comparador, que está en la primera pantalla). */
  eager?: boolean;
  /** Foto dentro de un enlace que ya tiene texto: `alt=""`. */
  decorativa?: boolean;
  /** Lámina enmarcada: filete de 1 px separado de la foto (encargo §10, «Tratamiento en la web»). */
  marco?: "lamina" | "miniatura" | false;
  /** Sin pie de origen (quien la usa lo pone una sola vez, como en AntesDespues). */
  sinEtiqueta?: boolean;
  /** Pie propio tras la etiqueta de origen (p. ej. `galeria[].titulo`). */
  pie?: string;
  /** Clases del contenedor exterior (lámina + pie). */
  className?: string;
  /** Clases de la caja de la foto (proporción responsive, `object-position`…). */
  claseFoto?: string;
  claseImagen?: string;
  /** Capas extra sobre la foto («Antes»/«Después»…). */
  children?: ReactNode;
};

/**
 * Pieza base del registro (kit/registry/base/Foto.tsx), reestilada para «Comunidades y fincas»:
 * la etiqueta de origen sale **fuera de la foto**, como pie de lámina en versalitas de 12 px en
 * `--color-texto-suave` («Imagen generada con IA»; AI Act, art. 50.4). Con `marco`, la foto va
 * dentro de un filete de 1 px separado 12 px (8 px en miniatura), como una lámina enmarcada.
 */
export function Foto({
  imagen,
  sizes,
  proporcion = "3/2",
  preload,
  eager,
  decorativa,
  marco = false,
  sinEtiqueta,
  pie,
  className,
  claseFoto,
  claseImagen,
  children,
}: Props) {
  const etiqueta = sinEtiqueta ? undefined : etiquetaOrigen(imagen);
  const pies = [etiqueta, pie].filter(Boolean).join(" · ");
  return (
    <div className={className}>
      <div
        className={cn(
          marco === "lamina" && "border border-linea-plano bg-fondo p-2 sm:p-3",
          marco === "miniatura" && "border border-linea-plano bg-fondo p-1.5",
        )}
      >
        <div className={cn("relative overflow-hidden rounded-foto bg-alterna", PROPORCION[proporcion], claseFoto)}>
          <Image
            src={imagen.src}
            alt={decorativa ? "" : imagen.alt}
            fill
            sizes={sizes}
            preload={preload}
            loading={eager ? "eager" : undefined}
            className={cn("object-cover", claseImagen)}
          />
          {children}
        </div>
      </div>
      {pies && <p className="versalitas mt-2 text-texto-suave">{pies}</p>}
    </div>
  );
}
