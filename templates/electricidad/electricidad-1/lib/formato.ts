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
 * con `urgencias24h`, la fila «Urgencias · 24 h» al final.
 */
export function horarioVisible(contacto: Pick<Contacto, "horario" | "urgencias24h">): LineaHorario[] {
  const lineas = formatearHorario(contacto.horario);
  if (contacto.urgencias24h) lineas.push({ dias: "Urgencias", horas: "24 h" });
  return lineas;
}

/** "Lunes a viernes 8:00–20:00 · Sábado 9:00–14:00". */
export function horarioCorto(horario: LineaHorario[]): string {
  return horario.map((h) => `${h.dias} ${h.horas}`).join(" · ");
}

/**
 * Título en minúscula inicial para frases («Pide presupuesto de boletín eléctrico por WhatsApp»), salvo
 * que empiece por siglas («CIE para…», «LED»): si la segunda letra también es mayúscula, se deja igual.
 */
export function minusculaInicial(texto: string): string {
  if (texto.length > 1 && /[A-ZÁÉÍÓÚÑ]/.test(texto[1])) return texto;
  return texto.charAt(0).toLowerCase() + texto.slice(1);
}

/** 64 → "64 reseñas en Google"; 1 → "1 reseña en Google". */
export function totalResenas(total: number): string {
  return `${total} ${total === 1 ? "reseña" : "reseñas"} en Google`;
}

/** 4.8 → "4,8". */
export function mediaVisible(media: number): string {
  return media.toFixed(1).replace(".", ",");
}

/** "★★★★☆" para una puntuación de 1 a 5. */
export function estrellas(puntuacion: number): string {
  const n = Math.max(0, Math.min(5, Math.round(puntuacion)));
  return "★".repeat(n) + "☆".repeat(5 - n);
}

const MESES_CORTOS = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];

/**
 * Fecha de reseña en etiqueta de documento: "2026-09-29" → "29 SEP 2026"; "2026-09" → "SEP 2026".
 * Sin `Date`: no depende de la zona horaria ni rompe el prerender.
 */
export function fechaResena(fecha: string): string {
  const [anio, mes, dia] = fecha.split("-");
  const nombreMes = MESES_CORTOS[Number(mes) - 1];
  if (!anio || !nombreMes) return fecha;
  return dia ? `${Number(dia)} ${nombreMes} ${anio}` : `${nombreMes} ${anio}`;
}

/**
 * Precio «desde» (decisión de Ysst): si el texto empieza por «desde» (sin distinguir mayúsculas)
 * se pinta la etiqueta DESDE y el resto; si no, el texto tal cual y sin etiqueta.
 * "desde 160 € + IVA" → { desde: true, importe: "160 € + IVA" }; "unos 650 €" → { desde: false, importe: "unos 650 €" }.
 */
export function precioDesde(texto: string): { desde: boolean; importe: string } {
  const m = /^desde\b\s*/i.exec(texto.trim());
  if (!m) return { desde: false, importe: texto.trim() };
  return { desde: true, importe: texto.trim().slice(m[0].length) };
}

/**
 * Campo de documento de una acreditación. La etiqueta sale del nombre: «RII» o «instaladora»
 * → «N.º RII»; cualquier otra → «N.º registro». Sin `numero` solo se pinta el nombre
 * (nunca «n.º undefined»).
 */
export function campoAcreditacion(a: Acreditacion): { etiqueta: string; valor: string; detalle?: string } {
  if (!a.numero) return { etiqueta: "Acreditación", valor: a.nombre };
  const etiqueta = /RII|instaladora/i.test(a.nombre) ? "N.º RII" : "N.º registro";
  return { etiqueta, valor: a.numero, detalle: a.nombre };
}

export type Ancla = { href: string; texto: string };

/** Redes con URL, en orden fijo. */
export function listaRedes(redes: SiteConfig["redes"]): Ancla[] {
  const lista: Ancla[] = [];
  if (redes.instagram) lista.push({ href: redes.instagram, texto: "Instagram" });
  if (redes.facebook) lista.push({ href: redes.facebook, texto: "Facebook" });
  return lista;
}

/** "Calle de Ejemplo, 18, local, 28020 Madrid". */
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

/** Iniciales para el equipo sin foto: "Sergio Pérez" → "SP"; "Sergio" → "S". */
export function iniciales(nombre: string): string {
  return nombre
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p.charAt(0).toUpperCase())
    .join("");
}
