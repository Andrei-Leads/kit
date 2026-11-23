import { mediaVisible, type Resena, type SiteConfig, type Trabajo } from "@andrei-leads/core";

/** Datos de una pareja de botones (WhatsApp + Llamar). */
export type DatosCta = {
  telefono: string;
  whatsapp?: string;
  mensaje: string;
};

/** Pie del hero: «{titulo} · {ubicacion} · {anio}». Lo que falta, se omite. */
export function pieTrabajo(t: Pick<Trabajo, "titulo" | "ubicacion" | "anio">): string {
  return [t.titulo, t.ubicacion, t.anio].filter(Boolean).join(" · ");
}

/** Trabajos con `antes` primero (encargo §6.3), en el orden de los datos. */
export function conAntesPrimero(trabajos: readonly Trabajo[]): Trabajo[] {
  return [...trabajos.filter((t) => t.antes), ...trabajos.filter((t) => !t.antes)];
}

/** Las reseñas más recientes primero (sin fecha, al final), como mucho `max`. */
export function resenasRecientes(resenas: readonly Resena[], max: number): Resena[] {
  return [...resenas].sort((a, b) => (b.fecha ?? "").localeCompare(a.fecha ?? "")).slice(0, max);
}

/** «reseña» o «reseñas». */
export function resenasTexto(n: number): string {
  return `${n} ${n === 1 ? "reseña" : "reseñas"}`;
}

export type Cifra = { valor: string; texto: string };

/**
 * Cifras de credibilidad (encargo §5), cada una solo con dato: años (desde `anioFundacion`),
 * valoración de Google, municipios y fachadas con antes (solo con 3 o más). Nunca inventadas.
 */
export function cifras(config: Pick<SiteConfig, "negocio" | "valoracion" | "zonas" | "trabajos">, anio: number): Cifra[] {
  const lista: Cifra[] = [];
  const { anioFundacion } = config.negocio;
  if (anioFundacion && anio - anioFundacion > 0) {
    const n = anio - anioFundacion;
    lista.push({ valor: `${n} ${n === 1 ? "año" : "años"}`, texto: `desde ${anioFundacion}` });
  }
  if (config.valoracion) {
    lista.push({ valor: mediaVisible(config.valoracion.media), texto: `${resenasTexto(config.valoracion.total)} en Google` });
  }
  if (config.zonas.length > 0) {
    lista.push({ valor: String(config.zonas.length), texto: config.zonas.length === 1 ? "municipio donde trabajamos" : "municipios donde trabajamos" });
  }
  const conAntes = config.trabajos.filter((t) => t.antes).length;
  if (conAntes >= 3) lista.push({ valor: String(conAntes), texto: "fachadas antes y después" });
  return lista;
}
