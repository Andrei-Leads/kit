import type { CSSProperties } from "react";
import { contraste, estiloMarca, type SiteConfig } from "@andrei-leads/core";

/** --color-superficie: el borde de respuesta-rapida se mide contra ella. */
const SUPERFICIE = "#fffdf8";

/**
 * Estilo del <html>: el de core (`--color-primario` y `--color-sobre-primario`) y, si el primario
 * del cliente no llega a 3:1 sobre la superficie (un amarillo como #facc15), el borde de las
 * respuestas rápidas pasa a --color-borde. Sin `marca.colorPrimario`, `{}`.
 */
export function estiloHtml(config: Pick<SiteConfig, "marca">): CSSProperties {
  const estilo = estiloMarca(config) as Record<string, string>;
  const color = config.marca.colorPrimario;
  if (color && contraste(color, SUPERFICIE) < 3) estilo["--color-borde-respuesta"] = "var(--color-borde)";
  return estilo as CSSProperties;
}
