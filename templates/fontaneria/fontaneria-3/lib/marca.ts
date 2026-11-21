import type { CSSProperties } from "react";
import { colorSobre, estiloMarca, TEXTO_CLARO } from "@andrei-leads/core";

/**
 * Estilo del <html>: el de core (`--color-primario` y `--color-sobre-primario`
 * del cliente) y, si el primario es claro (core pone texto oscuro encima),
 * `--color-primario-texto` oscurecido. Así un amarillo de furgoneta no deja
 * ilegibles sobre la arena los números del proceso, las capitulares, las
 * iniciales ni la ciudad en cursiva (token propio de la entrega, §2).
 */
export function estiloTemplate(config: { marca: { colorPrimario?: string } }): CSSProperties {
  const estilo = estiloMarca(config);
  const color = config.marca.colorPrimario;
  if (color && colorSobre(color) !== TEXTO_CLARO) {
    return { ...estilo, "--color-primario-texto": `color-mix(in oklch, ${color} 40%, var(--color-texto))` } as CSSProperties;
  }
  return estilo;
}
