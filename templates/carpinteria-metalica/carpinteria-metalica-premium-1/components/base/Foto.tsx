import Image from "next/image";
import { ViewTransition, type ReactNode } from "react";
import { etiquetaOrigen, type Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

type Props = {
  imagen: Imagen;
  /** Atributo `sizes` de next/image: el ancho real de la foto en cada punto de corte. */
  sizes: string;
  /** Proporción CSS («4/5», «3/2», «4/1»…) o «relleno» (ocupa a su padre). */
  proporcion?: string;
  /** Solo la foto LCP (una por página): la precarga desde el `<head>`. */
  preload?: boolean;
  /** Foto dentro de un enlace que ya tiene texto: `alt=""`. */
  decorativa?: boolean;
  /**
   * Etiqueta de `imagen.origen`. «fuera»: pie de 12 px bajo la foto (sobre fondo).
   * «dentro»: placa arriba a la derecha (fotos a sangre, como el pano). «no»: la pone
   * quien la usa (p. ej. un pie común «Imágenes generadas con IA» bajo un collage).
   */
  etiqueta?: "fuera" | "dentro" | "no";
  /** Tono del pie de la etiqueta. */
  tono?: "claro" | "oscuro";
  calidad?: number;
  /** Nombre de View Transition: la foto pasa de la miniatura al hero de la ficha (mejora). */
  transicion?: string;
  className?: string;
  /** Clases de la caja de la foto (la que recorta). */
  claseCaja?: string;
  children?: ReactNode;
};

/**
 * Pieza base del registro (kit/registry/base/Foto.tsx), reestilada en «Marco» (encargo §8):
 * esquinas rectas, sin filtros ni sombras. La etiqueta de origen (AI Act, art. 50.4) va
 * fuera, como pie de 12 px, o dentro, en mayúsculas de 11 px sobre una placa grafito al
 * 72 % con desenfoque (contraste ≥ 4,5:1), lejos de textos y botones.
 */
export function Foto({
  imagen,
  sizes,
  proporcion = "4/5",
  preload,
  decorativa,
  etiqueta = "fuera",
  tono = "claro",
  calidad,
  transicion,
  className,
  claseCaja,
  children,
}: Props) {
  const texto = etiquetaOrigen(imagen);
  const relleno = proporcion === "relleno";
  const caja = (
    <div
      className={cn("relative overflow-hidden bg-alterna", relleno && "h-full", tono === "oscuro" && "bg-tinta-suave", claseCaja)}
      style={relleno ? undefined : { aspectRatio: proporcion }}
    >
      <Image src={imagen.src} alt={decorativa ? "" : imagen.alt} fill sizes={sizes} preload={preload} quality={calidad} className="object-cover" />
      {children}
      {texto && etiqueta === "dentro" && (
        <span className="etiqueta-dentro absolute top-3 right-3 z-[3] bg-[rgb(27_31_34/0.72)] px-[9px] py-[5px] text-[11px] leading-[1.3] font-medium tracking-[0.08em] text-sobre-tinta uppercase backdrop-blur-[6px]">
          {texto}
        </span>
      )}
    </div>
  );
  return (
    <figure className={cn("m-0", relleno && "h-full", className)}>
      {transicion ? (
        <ViewTransition name={transicion} share="morph" default="none">
          {caja}
        </ViewTransition>
      ) : (
        caja
      )}
      {texto && etiqueta === "fuera" && (
        <figcaption className={cn("mt-2 text-right text-xs leading-snug", tono === "oscuro" ? "text-sobre-tinta-suave" : "text-texto-suave")}>{texto}</figcaption>
      )}
    </figure>
  );
}
