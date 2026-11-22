import Image from "next/image";
import type { ReactNode } from "react";
import { etiquetaOrigen, type Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

/** "relleno": sin proporción propia; la fija quien la usa (p. ej. `absolute inset-0` en un hero a sangre). */
export type Proporcion = "4/5" | "3/2" | "16/9" | "4/1" | "1/1" | "relleno";

const PROPORCION: Record<Proporcion, string> = {
  "4/5": "aspect-[4/5]",
  "3/2": "aspect-[3/2]",
  "16/9": "aspect-video",
  "4/1": "aspect-[4/1]",
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
  /**
   * Dónde va la etiqueta de origen. "fuera": no la pinta (la pone quien la usa con
   * `EtiquetaOrigen`, p. ej. arriba a la derecha junto a la pausa en el hero).
   */
  posicionEtiqueta?: "abajo-izquierda" | "abajo-derecha" | "fuera";
  /** Recorte (object-position) por si la zona segura no está centrada. */
  encuadre?: string;
  calidad?: number;
  /** Fondo mientras carga: papel cálido (claro) o nogal (oscuro). */
  tono?: "claro" | "oscuro";
  className?: string;
  /** Clases del <img> (p. ej. `asentar`). */
  claseImagen?: string;
  /** Capas extra (velo, vídeo…), colocadas por quien la usa. */
  children?: ReactNode;
};

/** Etiqueta «Imagen generada con IA» / «Foto de tu ficha de Google» (AI Act, art. 50.4). Texto visible y legible. */
export function EtiquetaOrigen({ imagen, className }: { imagen: Imagen; className?: string }) {
  const etiqueta = etiquetaOrigen(imagen);
  if (!etiqueta) return null;
  return (
    <span className={cn("rounded-[2px] bg-tinta/60 px-2 py-1 text-[11px] leading-tight whitespace-nowrap text-fondo", className)}>{etiqueta}</span>
  );
}

/**
 * Pieza base del registro (kit/registry/base/Foto.tsx), reestilada en «Oficio»
 * (encargo §8.5): sin marco, sombra ni filtros; radio 0 salvo miniaturas; la
 * etiqueta de origen en 11 px papel sobre pastilla de tinta al 60 %, abajo a la
 * izquierda (en hero y pano, arriba a la derecha, la pone quien la usa).
 */
export function Foto({
  imagen,
  sizes,
  proporcion = "4/5",
  preload,
  decorativa,
  posicionEtiqueta = "abajo-izquierda",
  encuadre,
  calidad,
  tono = "claro",
  className,
  claseImagen,
  children,
}: Props) {
  return (
    <div className={cn("relative overflow-hidden", tono === "claro" ? "bg-alterna" : "bg-tinta-suave", PROPORCION[proporcion], className)}>
      <Image
        src={imagen.src}
        alt={decorativa ? "" : imagen.alt}
        fill
        sizes={sizes}
        preload={preload}
        quality={calidad}
        className={cn("object-cover", claseImagen)}
        style={encuadre ? { objectPosition: encuadre } : undefined}
      />
      {children}
      {posicionEtiqueta !== "fuera" && (
        <EtiquetaOrigen
          imagen={imagen}
          className={cn("absolute z-[2] bottom-2.5 max-w-[calc(100%-20px)] whitespace-normal", posicionEtiqueta === "abajo-izquierda" ? "left-2.5" : "right-2.5")}
        />
      )}
    </div>
  );
}
