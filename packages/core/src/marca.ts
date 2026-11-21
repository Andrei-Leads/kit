/*
 * Color de marca (desde 0.6.0). Si `site.config` trae `marca.colorPrimario`,
 * core calcula el color del texto que va encima (`--color-sobre-primario`):
 * blanco o casi negro, el que más contraste dé. Así un amarillo de furgoneta
 * no deja el texto ilegible. No rompe el build: si ninguno llega a 4,5:1,
 * avisa en la consola al compilar.
 */
import type { CSSProperties } from "react";

/** Texto claro y oscuro posibles sobre el primario. */
export const TEXTO_CLARO = "#ffffff";
export const TEXTO_OSCURO = "#111111";

/** Contraste mínimo de WCAG AA para texto normal. */
const CONTRASTE_MINIMO = 4.5;

function luminancia(hex: string): number {
  const canal = (i: number) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * canal(1) + 0.7152 * canal(3) + 0.0722 * canal(5);
}

/** Contraste WCAG entre dos colores `#rrggbb` (de 1 a 21). */
export function contraste(a: string, b: string): number {
  const [l1, l2] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

/** El texto (blanco o casi negro) que más contrasta con `fondo` (`#rrggbb`). */
export function colorSobre(fondo: string): string {
  return contraste(fondo, TEXTO_CLARO) >= contraste(fondo, TEXTO_OSCURO) ? TEXTO_CLARO : TEXTO_OSCURO;
}

/** Avisa al compilar si el primario no llega a 4,5:1 ni con texto blanco ni con casi negro. */
export function avisarContraste(colorPrimario: string | undefined): void {
  if (!colorPrimario) return;
  const mejor = contraste(colorPrimario, colorSobre(colorPrimario));
  if (mejor < CONTRASTE_MINIMO) {
    console.warn(
      `site.config: marca.colorPrimario ${colorPrimario} da un contraste de ${mejor.toFixed(2)}:1 con su texto ` +
        `(mínimo ${CONTRASTE_MINIMO}:1). La web compila, pero el texto sobre ese color se leerá mal.`,
    );
  }
}

/**
 * Estilo del `<html>` del layout: `--color-primario` y `--color-sobre-primario`
 * del cliente. Sin `marca.colorPrimario`, `{}` (se quedan los del template).
 *
 * `<html lang="es" style={estiloMarca(config)}>`
 */
export function estiloMarca(config: { marca: { colorPrimario?: string } }): CSSProperties {
  const color = config.marca.colorPrimario;
  if (!color) return {};
  return { "--color-primario": color, "--color-sobre-primario": colorSobre(color) } as CSSProperties;
}
