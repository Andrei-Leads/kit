/*
 * Formato de datos para pintar (desde 0.6.0). Lógica pura, sin diseño: el
 * template decide dónde y cómo se ve cada texto. Antes vivía copiada en el
 * `lib/formato.ts` de cada template.
 */
import { formatearHorario, type LineaHorario } from "./horario";
import type { SiteConfig } from "./site-config";

type Contacto = SiteConfig["contacto"];

/** Un enlace: `{ href, texto }`. */
export type Ancla = { href: string; texto: string };

/** "+34600000000" → "600 00 00 00". Si no son 9 dígitos, lo devuelve tal cual. */
export function telefonoVisible(telefono: string): string {
  const d = telefono.replace(/\D/g, "").replace(/^34(?=\d{9}$)/, "");
  return d.length === 9 ? `${d.slice(0, 3)} ${d.slice(3, 5)} ${d.slice(5, 7)} ${d.slice(7)}` : telefono;
}

/** ["a", "b", "c"] → "a, b y c". */
export function listaY(lista: readonly string[]): string {
  if (lista.length < 2) return lista.join("");
  return lista.slice(0, -1).join(", ") + " y " + lista[lista.length - 1];
}

/** 4.9 → "4,9". */
export function mediaVisible(media: number): string {
  return media.toFixed(1).replace(".", ",");
}

/**
 * "Carrer d'Exemple, 9, 46020 Valencia". Con `{ provincia: true }`:
 * "Carrer d'Exemple, 9, 46020 Valencia (Valencia)".
 */
export function direccionLinea(d: Contacto["direccion"], opciones: { provincia?: boolean } = {}): string {
  const linea = `${d.calle}, ${d.cp} ${d.ciudad}`;
  return opciones.provincia ? `${linea} (${d.provincia})` : linea;
}

/**
 * Enlace «Cómo llegar» a Google Maps: con `coordenadas` si las hay; si no, con
 * la dirección. Siempre un enlace, nunca un iframe (sin cookies de terceros).
 */
export function urlComoLlegar({ coordenadas, direccion }: Pick<Contacto, "coordenadas" | "direccion">): string {
  const base = "https://www.google.com/maps/dir/?api=1&destination=";
  if (coordenadas) return base + `${coordenadas.lat},${coordenadas.lng}`;
  const { calle, cp, ciudad, provincia } = direccion;
  return base + encodeURIComponent(`${calle}, ${cp} ${ciudad}, ${provincia}`);
}

/** Redes con URL, en orden fijo (Instagram, Facebook). */
export function listaRedes(redes: SiteConfig["redes"]): Ancla[] {
  const lista: Ancla[] = [];
  if (redes.instagram) lista.push({ href: redes.instagram, texto: "Instagram" });
  if (redes.facebook) lista.push({ href: redes.facebook, texto: "Facebook" });
  return lista;
}

/**
 * Horario para pintar: `formatearHorario` y, con `urgencias24h`, una última
 * fila `{ dias: "Urgencias", horas: textoUrgencias }` (por defecto "24 h").
 */
export function horarioVisible(
  contacto: Pick<Contacto, "horario" | "urgencias24h">,
  textoUrgencias = "24 h",
): LineaHorario[] {
  const lineas = formatearHorario(contacto.horario);
  if (contacto.urgencias24h) lineas.push({ dias: "Urgencias", horas: textoUrgencias });
  return lineas;
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

/**
 * Minúscula inicial para meter un título en una frase («Pide presupuesto de
 * boletín eléctrico»), salvo si empieza por siglas («CIE», «LED»): si la
 * segunda letra también es mayúscula, se deja igual.
 */
export function minusculaInicial(texto: string): string {
  if (texto.length > 1 && /[A-ZÁÉÍÓÚÑ]/.test(texto[1])) return texto;
  return texto.charAt(0).toLowerCase() + texto.slice(1);
}

/** Nombres de los meses, en minúscula. */
export const MESES = [
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
] as const;

/**
 * Fecha de reseña ("2026-09" o "2026-09-14") → "septiembre de 2026". Sin
 * `Date`: no depende de la zona horaria ni rompe el prerender. Si el formato no
 * se reconoce, devuelve el texto tal cual.
 */
export function fechaResena(fecha: string): string {
  const [anio, mes] = fecha.split("-");
  const nombreMes = MESES[Number(mes) - 1];
  return anio && nombreMes ? `${nombreMes} de ${anio}` : fecha;
}

/**
 * Precio «desde»: "desde 45 €" → `{ desde: true, importe: "45 €" }`;
 * "unos 650 €" → `{ desde: false, importe: "unos 650 €" }`. Así el template
 * puede pintar la palabra «desde» con otro estilo.
 */
export function precioDesde(texto: string): { desde: boolean; importe: string } {
  const limpio = texto.trim();
  const m = /^desde\b\s*/i.exec(limpio);
  return m ? { desde: true, importe: limpio.slice(m[0].length) } : { desde: false, importe: limpio };
}
