import { mediaVisible, type SiteConfig } from "@andrei-leads/core";

type Contacto = Pick<SiteConfig["contacto"], "urgencias24h">;

/** Texto de la placa grande (telefono-gigante): «Llamar 24 h» solo si es verdad; si no, «Llamar ahora». */
export function textoLlamar(contacto: Contacto): string {
  return contacto.urgencias24h ? "Llamar 24 h" : "Llamar ahora";
}

/** Texto corto (cabecera, barra, parejas): «Llamar 24 h» o «Llamar». */
export function textoLlamarCorto(contacto: Contacto): string {
  return contacto.urgencias24h ? "Llamar 24 h" : "Llamar";
}

/** «4,9» y «211 reseñas en Google» (o «1 reseña en Google»). */
export function textosValoracion(valoracion: NonNullable<SiteConfig["valoracion"]>) {
  const { media, total } = valoracion;
  return {
    media: mediaVisible(media),
    total: `${total} ${total === 1 ? "reseña" : "reseñas"} en Google`,
  };
}

/** «15 años» / «1 año». */
export function anios(n: number): string {
  return `${n} ${n === 1 ? "año" : "años"}`;
}
