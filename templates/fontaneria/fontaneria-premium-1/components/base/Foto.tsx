import Image from "next/image";
import type { ReactNode } from "react";
import { etiquetaOrigen, type Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

/** "relleno": sin proporción propia; la fija quien la usa (p. ej. `absolute inset-0` en un hero a sangre). */
export type Proporcion = "4/5" | "3/2" | "4/3" | "4/1" | "16/9" | "1/1" | "relleno";

const PROPORCION: Record<Proporcion, string> = {
  "4/5": "aspect-[4/5]",
  "3/2": "aspect-[3/2]",
  "4/3": "aspect-[4/3]",
  "4/1": "aspect-[4/1]",
  "16/9": "aspect-video",
  "1/1": "aspect-square",
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
  /** Dónde va la etiqueta de origen: abajo a la derecha; en el hero, arriba a la derecha bajo la cabecera. */
  posicionEtiqueta?: "abajo-derecha" | "hero" | "ninguna";
  /** `object-position` (hero en móvil: 68% center). */
  encuadre?: string;
  className?: string;
  /** Capas extra (velo, rótulos…), colocadas por quien la usa. */
  children?: ReactNode;
};

/**
 * Pieza base del registro (kit/registry/base/Foto.tsx), reestilada en «Caudal»:
 * radio de 4 px y etiqueta de `imagen.origen` en píldora tinta al 70 % con
 * desenfoque, texto blanco de 11 px (anexo P5). La de IA es obligatoria (AI
 * Act, art. 50.4) y es texto visible y legible por lector de pantalla.
 * `posicionEtiqueta="ninguna"` solo cuando quien la usa ya pinta la etiqueta
 * en otro sitio (pano, a la vista sobre la escena).
 *
 * Tokens: --radius-foto, --color-tinta-suave (fondo mientras carga).
 */
export function Foto({
  imagen,
  sizes,
  proporcion = "4/5",
  preload,
  decorativa,
  posicionEtiqueta = "abajo-derecha",
  encuadre,
  className,
  children,
}: Props) {
  const etiqueta = posicionEtiqueta === "ninguna" ? undefined : etiquetaOrigen(imagen);
  return (
    <div className={cn("relative overflow-hidden rounded-foto bg-tinta-suave", PROPORCION[proporcion], className)}>
      <Image
        src={imagen.src}
        alt={decorativa ? "" : imagen.alt}
        fill
        sizes={sizes}
        preload={preload}
        className="object-cover"
        style={encuadre ? { objectPosition: encuadre } : undefined}
      />
      {children}
      {etiqueta && <EtiquetaOrigen texto={etiqueta} enHero={posicionEtiqueta === "hero"} />}
    </div>
  );
}

/** La píldora de origen (también la usa el pano, que la pone sobre la escena). */
export function EtiquetaOrigen({ texto, enHero, className }: { texto: string; enHero?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "absolute z-[3] rounded-full bg-tinta/70 px-2.5 py-[5px] text-[11px] leading-[1.2] font-medium whitespace-nowrap text-white backdrop-blur-[8px]",
        enHero ? "top-[calc(var(--alto-cabecera)+12px)] right-[var(--margen)] lg:right-10" : "right-2.5 bottom-2.5",
        className,
      )}
    >
      {texto}
    </span>
  );
}
