import { mediaVisible, telefonoVisible, type SiteConfig, type Trabajo } from "@andrei-leads/core";

const ROMANOS: [number, string][] = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"],
  [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
];

/** 1 → «I», 4 → «IV», 12 → «XII» (número de cada ficha de solución). */
export function romano(n: number): string {
  let resto = n;
  let r = "";
  for (const [v, s] of ROMANOS) {
    while (resto >= v) {
      r += s;
      resto -= v;
    }
  }
  return r;
}

/** «01», «02»… */
export function dosCifras(n: number): string {
  return String(n).padStart(2, "0");
}

/** «Llamar · 600 00 05 02» (parejas y cabecera en escritorio). */
export function llamarLargo(telefono: string): string {
  return `Llamar · ${telefonoVisible(telefono)}`;
}

/** «O llama al 600 00 05 02» (hero, encargo §3). Solo junto al botón de WhatsApp: sin él, «Llamar · tel». */
export function llamarHero(telefono: string): string {
  return `O llama al ${telefonoVisible(telefono)}`;
}

/** «4,9 · 41 reseñas en Google». */
export function textoValoracion(v: NonNullable<SiteConfig["valoracion"]>): string {
  return `${mediaVisible(v.media)} · ${v.total} ${v.total === 1 ? "reseña" : "reseñas"} en Google`;
}

/** Pie de obra: «La Moraleja, Alcobendas · 2025 · 18 m²» (cada dato que falta se va con su separador). */
export function metaObra(t: Pick<Trabajo, "ubicacion" | "anio" | "superficie">): string {
  return [t.ubicacion, t.anio, t.superficie].filter(Boolean).join(" · ");
}

/** Antetítulo del inicio y de /empresa: «Desde 2009 · Taller en Alcobendas». */
export function lineaTaller(negocio: SiteConfig["negocio"], ciudad: string): string {
  return [negocio.anioFundacion && `Desde ${negocio.anioFundacion}`, `Taller en ${ciudad}`].filter(Boolean).join(" · ");
}
