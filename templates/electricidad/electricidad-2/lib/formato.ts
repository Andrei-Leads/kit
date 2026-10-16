import { formatearHorario, type Acreditacion, type LineaHorario, type SiteConfig } from "@andrei-leads/core";

type Contacto = SiteConfig["contacto"];

/** "+34600000000" → "600 00 00 00". Si no son 9 dígitos, lo devuelve tal cual. */
export function telefonoVisible(telefono: string): string {
  const d = telefono.replace(/\D/g, "").replace(/^34(?=\d{9}$)/, "");
  return d.length === 9
    ? `${d.slice(0, 3)} ${d.slice(3, 5)} ${d.slice(5, 7)} ${d.slice(7)}`
    : telefono;
}

/** ["a", "b", "c"] → "a, b y c". */
export function listaY(lista: string[]): string {
  if (lista.length < 2) return lista.join("");
  return lista.slice(0, -1).join(", ") + " y " + lista[lista.length - 1];
}

/**
 * Líneas de horario para pintar: siempre `formatearHorario` (nunca las franjas a mano) y,
 * con `urgencias24h`, la fila «Urgencias: 24 h» al final (se pinta como «{dias}: {horas}»).
 */
export function horarioVisible(contacto: Pick<Contacto, "horario" | "urgencias24h">): LineaHorario[] {
  const lineas = formatearHorario(contacto.horario);
  if (contacto.urgencias24h) lineas.push({ dias: "Urgencias", horas: "24 h" });
  return lineas;
}

/**
 * Título en minúscula inicial para frases («Pide presupuesto de boletín eléctrico por WhatsApp»), salvo
 * que empiece por siglas («CIE para…», «LED»): si la segunda letra también es mayúscula, se deja igual.
 */
export function minusculaInicial(texto: string): string {
  if (texto.length > 1 && /[A-ZÁÉÍÓÚÑ]/.test(texto[1])) return texto;
  return texto.charAt(0).toLowerCase() + texto.slice(1);
}

/** 112 → "112 reseñas en Google"; 1 → "1 reseña en Google". */
export function totalResenas(total: number): string {
  return `${total} ${total === 1 ? "reseña" : "reseñas"} en Google`;
}

/** 112 → "reseñas en Google"; 1 → "reseña en Google" (sin la cifra: la pinta el contador). */
export function palabraResenas(total: number): string {
  return `${total === 1 ? "reseña" : "reseñas"} en Google`;
}

/** 4.9 → "4,9". */
export function mediaVisible(media: number): string {
  return media.toFixed(1).replace(".", ",");
}

/** "1 año" / "N años" (nunca «1 años»). */
export function textoAnios(n: number): string {
  return n === 1 ? "1 año" : `${n} años`;
}

/**
 * Años en el barrio desde `anioFundacion`. El año actual viene de `anioActual()` (lib/anio.ts):
 * aquí no se lee la hora. Devuelve `undefined` si no hay fecha de fundación o el resultado no es
 * positivo (nunca «0 años»).
 */
export function aniosEnElBarrio(anioFundacion: number | undefined, anioActual: number): number | undefined {
  if (anioFundacion === undefined) return undefined;
  const n = anioActual - anioFundacion;
  return n > 0 ? n : undefined;
}

const MESES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

/**
 * Fecha de reseña para la etiqueta oblicua: "2026-09-12" o "2026-09" → "septiembre de 2026".
 * Sin `Date`: no depende de la zona horaria ni rompe el prerender. Si el formato no se reconoce,
 * devuelve el texto original.
 */
export function fechaResena(fecha: string): string {
  const [anio, mes] = fecha.split("-");
  const nombreMes = MESES[Number(mes) - 1];
  return anio && nombreMes ? `${nombreMes} de ${anio}` : fecha;
}

/** Firma de una reseña: «Autor · septiembre de 2026»; sin fecha, solo el autor (nunca «Autor · »). */
export function firmaResena(resena: { autor: string; fecha?: string }): string {
  return resena.fecha ? `${resena.autor} · ${fechaResena(resena.fecha)}` : resena.autor;
}

/**
 * Precio «desde» (decisión de Ysst): si el texto empieza por «desde» (sin distinguir mayúsculas)
 * se pinta la etiqueta «desde» y el resto; si no, el texto tal cual y sin etiqueta.
 * "desde 45 €" → { desde: true, importe: "45 €" }; "unos 650 €" → { desde: false, importe: "unos 650 €" }.
 */
export function precioDesde(texto: string): { desde: boolean; importe: string } {
  const m = /^desde\b\s*/i.exec(texto.trim());
  if (!m) return { desde: false, importe: texto.trim() };
  return { desde: true, importe: texto.trim().slice(m[0].length) };
}

/**
 * Acreditación para pintar: el nombre COMPLETO, tal cual está en los datos (no se recorta en la primera
 * coma: no se manipulan los datos) y, solo si hay `numero`, «Nº {numero}». Sin número, sin línea «Nº»
 * (nunca «Nº undefined»).
 */
export function acreditacionVisible(a: Acreditacion): { nombre: string; numero?: string } {
  return { nombre: a.nombre, numero: a.numero ? `Nº ${a.numero}` : undefined };
}

export type Ancla = { href: string; texto: string };

/** Redes con URL, en orden fijo (Instagram, Facebook). */
export function listaRedes(redes: SiteConfig["redes"]): Ancla[] {
  const lista: Ancla[] = [];
  if (redes.instagram) lista.push({ href: redes.instagram, texto: "Instagram" });
  if (redes.facebook) lista.push({ href: redes.facebook, texto: "Facebook" });
  return lista;
}

/** "Carrer d'Exemple, 9, bajo, 46020 Valencia". */
export function direccionLinea(d: Contacto["direccion"]): string {
  return `${d.calle}, ${d.cp} ${d.ciudad}`;
}

/**
 * Enlace «Cómo llegar» a Google Maps. Siempre un enlace, nunca un iframe ni un mapa
 * incrustado (sin cookies de terceros).
 */
export function urlComoLlegar({ coordenadas, direccion }: Pick<Contacto, "coordenadas" | "direccion">): string {
  const base = "https://www.google.com/maps/dir/?api=1&destination=";
  if (coordenadas) return base + `${coordenadas.lat},${coordenadas.lng}`;
  const { calle, cp, ciudad, provincia } = direccion;
  return base + encodeURIComponent(`${calle}, ${cp} ${ciudad}, ${provincia}`);
}

/** Iniciales para el equipo sin foto: "Sergio Pérez" → "SP"; "Vicent" → "V". */
export function iniciales(nombre: string): string {
  return nombre
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p.charAt(0).toUpperCase())
    .join("");
}
