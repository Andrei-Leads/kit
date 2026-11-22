import { listaY, mediaVisible, minusculaInicial, telefonoVisible, formatearHorario, type SiteConfig, type Trabajo } from "@andrei-leads/core";

/** Datos de una pareja de botones (WhatsApp + Llamar) con el mensaje de la página. */
export type DatosCta = {
  telefono: string;
  whatsapp?: string;
  mensaje: string;
};

export function datosCta(contacto: SiteConfig["contacto"], mensaje: string): DatosCta {
  return { telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje };
}

/** Textos fijos de interfaz de «Estancia» (encargo §3 y §5.2). */
export const TEXTOS = {
  lema: { antes: "Reformar es", destacada: "volver", despues: "a casa." },
  whatsappPortada: "Enséñanos tu casa por WhatsApp",
  whatsappCierre: "Enséñanos tu casa",
  whatsappTrabajo: "Quiero algo parecido",
  whatsappContacto: "Escribir por WhatsApp",
  confianzaWhatsapp: "Respuesta por WhatsApp en horario de trabajo",
} as const;

/** «Llamar al 910 00 00 00». */
export const llamarAl = (telefono: string) => `Llamar al ${telefonoVisible(telefono)}`;
/** «Llamar · 910 00 00 00» (cabecera y pareja flotante: número entero para copiarlo). */
export const llamarPunto = (telefono: string) => `Llamar · ${telefonoVisible(telefono)}`;
/** «Pide presupuesto de reforma de baño». */
export const pidePresupuesto = (titulo: string) => `Pide presupuesto de ${minusculaInicial(titulo)}`;

/** «4,9 · 96 reseñas en Google». */
export function textoValoracion(v: NonNullable<SiteConfig["valoracion"]>): string {
  return `${mediaVisible(v.media)} · ${v.total} reseñas en Google`;
}

/**
 * Línea de confianza bajo cada pareja (encargo §3), solo con datos: la valoración,
 * o el horario, o «Respuesta por WhatsApp en horario de trabajo». Nunca «Abierto ahora».
 */
export function lineaConfianza(config: Pick<SiteConfig, "valoracion" | "contacto">, prefiere: "valoracion" | "horario" = "valoracion"): string {
  const horario = formatearHorario(config.contacto.horario)
    .map((l) => `${l.dias}, ${l.horas}`)
    .join(" · ");
  if (prefiere === "valoracion" && config.valoracion) return `★ ${textoValoracion(config.valoracion)}`;
  if (horario) return horario;
  if (config.valoracion) return `★ ${textoValoracion(config.valoracion)}`;
  return TEXTOS.confianzaWhatsapp;
}

/** Ficha de una obra en filas (Superficie, Plazo, Año, Precio aproximado): solo lo que haya. */
export function fichaObra(t: Pick<Trabajo, "superficie" | "duracion" | "anio" | "precio">, conBarrio?: string): { k: string; v: string }[] {
  const filas: { k: string; v: string | undefined }[] = [
    { k: "Barrio", v: conBarrio },
    { k: "Superficie", v: t.superficie },
    { k: "Plazo", v: t.duracion },
    { k: "Año", v: t.anio?.toString() },
    { k: "Precio aproximado", v: t.precio },
  ];
  return filas.filter((f): f is { k: string; v: string } => Boolean(f.v));
}

/** «Chamberí · 2026 · 112 m²» (tarjetas y sumario). */
export function metaObra(t: Pick<Trabajo, "ubicacion" | "anio" | "superficie">): string {
  return [t.ubicacion, t.anio, t.superficie].filter(Boolean).join(" · ");
}

/** «Piso de 1925 en Chamberí · 112 m² · 14 semanas ·»: sin separadores colgando ni la ubicación repetida. */
export function textoMarquesina(t: Pick<Trabajo, "titulo" | "ubicacion" | "superficie" | "duracion">): string {
  const ubicacion = t.ubicacion && !t.titulo.includes(t.ubicacion) ? t.ubicacion : undefined;
  return [t.titulo, ubicacion, t.superficie, t.duracion].filter(Boolean).join(" · ") + " ·";
}

/** «Obras en Madrid, Pozuelo de Alarcón y Majadahonda» (las tres primeras zonas). */
export function obrasEn(zonas: readonly string[]): string | undefined {
  return zonas.length > 0 ? `Obras en ${listaY(zonas.slice(0, 3))}` : undefined;
}

/** Número de dos cifras: 1 → «01». */
export const num = (n: number) => String(n).padStart(2, "0");

/**
 * Reseña larga (encargo §6.8: más de unas 6 líneas): parte visible y resto para «Leer más».
 * Corta en el final de frase más cercano a ~200 caracteres.
 */
export function partirResena(texto: string, limite = 240): { inicio: string; resto?: string } {
  if (texto.length <= limite) return { inicio: texto };
  const frases = texto.match(/[^.!?]+[.!?]+(\s+|$)/g) ?? [texto];
  let inicio = "";
  for (const f of frases) {
    if (inicio && (inicio + f).length > 200) break;
    inicio += f;
  }
  const resto = texto.slice(inicio.length).trim();
  return resto ? { inicio: inicio.trim(), resto } : { inicio: texto };
}

/**
 * Título de obra con la ubicación destacada: «Piso de 1925 en Chamberí» → antes «Piso de
 * 1925 en», destacada «Chamberí». Sin « en », sin palabra destacada (nunca una elegida a mano).
 */
export function partirTitulo(titulo: string): { antes: string; destacada?: string } {
  const i = titulo.lastIndexOf(" en ");
  if (i < 0) return { antes: titulo };
  return { antes: titulo.slice(0, i + 3), destacada: titulo.slice(i + 4) };
}
