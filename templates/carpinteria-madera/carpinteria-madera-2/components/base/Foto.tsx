import Image from "next/image";
import type { ReactNode } from "react";
import { etiquetaOrigen, type Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

/** "relleno": sin proporción propia; la fija quien la usa. */
export type Proporcion = "1/1" | "4/3" | "3/2" | "4/5" | "16/9" | "relleno";

const PROPORCION: Record<Proporcion, string> = {
  "1/1": "aspect-square",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "4/5": "aspect-[4/5]",
  "16/9": "aspect-video",
  relleno: "",
};

/** Texto corto de la etiqueta para fotos pequeñas (96 px, rejilla de 2 en móvil). */
const CORTA: Record<string, string> = { "Imagen generada con IA": "IA", "Foto de tu ficha de Google": "Google" };

type Props = {
  imagen: Imagen;
  /** Atributo `sizes` de next/image: el ancho real de la foto en cada punto de corte. */
  sizes: string;
  proporcion?: Proporcion;
  /** Solo la foto LCP (una por página): la precarga desde el `<head>`. */
  preload?: boolean;
  /** Foto dentro de un enlace que ya tiene texto: `alt=""`. */
  decorativa?: boolean;
  /** Foto pequeña: la etiqueta se reduce a «IA» (o «Google») y el texto completo queda para el lector de pantalla. */
  compacta?: boolean;
  /** Calidad de next/image (60 en miniaturas; next.config.ts las admite). */
  calidad?: 60 | 75;
  className?: string;
  /** Capas extra («Antes»/«Después»…), colocadas por quien la usa. */
  children?: ReactNode;
};

/**
 * Pieza base del registro (kit/registry/base/Foto.tsx), reestilada para «A medida»: etiqueta de
 * origen en píldora blanca de 11 px arriba a la derecha (la de IA es obligatoria: AI Act, art.
 * 50.4). En fotos pequeñas, «IA» con el texto completo para el lector de pantalla (encargo §8).
 *
 * Tokens: --radius-foto, --color-alterna (fondo mientras carga), --color-superficie, --color-texto.
 */
export function Foto({ imagen, sizes, proporcion = "4/5", preload, decorativa, compacta, calidad, className, children }: Props) {
  const etiqueta = etiquetaOrigen(imagen);
  return (
    <div className={cn("relative overflow-hidden rounded-foto bg-alterna", PROPORCION[proporcion], className)}>
      <Image src={imagen.src} alt={decorativa ? "" : imagen.alt} fill sizes={sizes} preload={preload} quality={calidad} className="object-cover" />
      {children}
      {etiqueta && (
        <span
          className={cn(
            "absolute z-[2] rounded-full bg-superficie leading-[1.3] text-texto",
            compacta ? "top-1.5 right-1.5 px-[7px] py-0.5 text-[10px] font-bold" : "top-2.5 right-2.5 px-2.5 py-1 text-[11px] font-semibold",
          )}
        >
          {compacta ? (
            <>
              <span aria-hidden="true">{CORTA[etiqueta] ?? etiqueta}</span>
              <span className="sr-only">{etiqueta}</span>
            </>
          ) : (
            etiqueta
          )}
        </span>
      )}
    </div>
  );
}
