import { formatearHorario, type Acreditacion, type LineaHorario, type SiteConfig } from "@andrei-leads/core";

type Contacto = SiteConfig["contacto"];

/** Espacio duro (no se parte en dos líneas). */
const NBSP = "\u00a0";

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
 * con `urgencias24h`, la fila «Urgencias: 24 h» al final.
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

/** "4,6 · 58 reseñas en Google" (hero, reseñas). */
export function valoracionTexto(v: { media: number; total: number }): string {
  return `${mediaVisible(v.media)} · ${totalResenas(v.total)}`;
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
 * Fecha de reseña en texto: "2026-09-26" y "2026-09" → "septiembre de 2026" (el día no se muestra).
 * Sin `Date`: no depende de la zona horaria ni rompe el prerender.
 */
export function fechaResena(fecha: string): string {
  const [anio, mes] = fecha.split("-");
  const nombreMes = MESES[Number(mes) - 1];
  if (!anio || !nombreMes) return fecha;
  return `${nombreMes} de ${anio}`;
}

/**
 * Precio sin partir (Specs §5, informe de revisión): espacio duro entre la cifra y su símbolo
 * («35 €», «+50 %», «38 €/h») y tras «desde» / «unos» / «hasta». Solo los precios largos
 * («desde 150 € + IVA») pasan a 2 líneas, y por los espacios normales que quedan.
 * Decisión 3: el texto se pinta tal cual (con «desde» si el dato lo trae); no se añade etiqueta.
 */
export function precioNoPartido(texto: string): string {
  return texto
    .trim()
    .replace(/(\d) (?=[€%/])/g, `$1${NBSP}`)
    .replace(/\b(desde|unos|unas|hasta) (?=[\d+])/gi, `$1${NBSP}`);
}

/**
 * Acreditación para pintar: el nombre y, si lo hay, «Nº {numero}». Sin `numero` solo el nombre
 * (nunca «Nº undefined»).
 */
export function acreditacionVisible(a: Acreditacion): { nombre: string; numero?: string } {
  return { nombre: a.nombre, numero: a.numero ? `Nº${NBSP}${a.numero}` : undefined };
}

export type Ancla = { href: string; texto: string };

/** Redes con URL, en orden fijo. */
export function listaRedes(redes: SiteConfig["redes"]): Ancla[] {
  const lista: Ancla[] = [];
  if (redes.instagram) lista.push({ href: redes.instagram, texto: "Instagram" });
  if (redes.facebook) lista.push({ href: redes.facebook, texto: "Facebook" });
  return lista;
}

/** "Calle Ejemplo, 42, 41005 Sevilla". */
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

/**
 * Años de trayectoria («11 años») a partir de `anioFundacion` y del año del servidor (`anioActual()`
 * de lib/anio.ts; nunca `new Date()` en el render). Sin año de fundación o con un año futuro: `undefined`.
 */
export function aniosDeTrayectoria(anioFundacion: number | undefined, anio: number): number | undefined {
  if (anioFundacion === undefined || anioFundacion > anio) return undefined;
  return Math.max(anio - anioFundacion, 0);
}
