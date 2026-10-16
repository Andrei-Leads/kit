import { cn } from "@/lib/utils";

/** Formas de mancha (radios de globals.css): una por uso del diseño. */
export type FormaMancha = "a" | "b" | "servicio" | "cta" | "chica";

const FORMA: Record<FormaMancha, string> = {
  a: "rounded-mancha", // hero con foto, tablero de precios
  b: "rounded-mancha-b", // hero sin foto
  servicio: "rounded-mancha-servicio", // servicio sin foto
  cta: "rounded-mancha-cta", // CTA final
  chica: "rounded-mancha-chica", // iconos y números de 38–40 px
};

type Props = {
  forma?: FormaMancha;
  /**
   * Con `animada`, la mancha crece una vez al entrar en pantalla (scale .9→1, 600 ms; Specs §8).
   * Solo fuera del hero: la mancha del hero NO se anima (LCP). La posición y el tamaño los pone el
   * llamador con `className` (absolute + top/left/size). Una mancha animada no lleva `transform`
   * propio: para centrarla usa `-translate-x-1/2` (propiedad `translate`, que no choca).
   */
  animada?: boolean;
  className?: string;
};

/**
 * Mancha de luz: forma orgánica plana en `--color-mancha` (un tono del primario sobre noche). Solo decorativa
 * (aria-hidden), sin blur ni backdrop-filter. Nunca detrás de texto pequeño de modo que baje el contraste.
 * Va en un contenedor `relative`; el envoltorio del layout (`overflow-x-clip`) recorta las que salen del viewport.
 */
export function Mancha({ forma = "a", animada, className }: Props) {
  return (
    <span
      aria-hidden="true"
      data-anim={animada ? "mancha" : undefined}
      data-umbral={animada ? "0.05" : undefined}
      className={cn("pointer-events-none absolute z-0 block bg-mancha", FORMA[forma], className)}
    />
  );
}
