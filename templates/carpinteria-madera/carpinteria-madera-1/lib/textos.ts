import { formatearHorario, mediaVisible, type Imagen, type Resena, type Servicio, type SiteConfig, type Trabajo } from "@andrei-leads/core";

/** Datos de una pareja de botones (WhatsApp + Llamar). */
export type DatosCta = { telefono: string; whatsapp?: string; mensaje: string };

/** Pie de un trabajo (encargo §6.2): «{titulo} · {ubicacion} · {anio} · {superficie} · {duracion}», sin huecos. */
export function pieTrabajo(t: Pick<Trabajo, "titulo" | "ubicacion" | "anio" | "superficie" | "duracion">): string {
  return [t.titulo, t.ubicacion, t.anio, t.superficie, t.duracion].filter(Boolean).join(" · ");
}

/** Ficha de un trabajo en una línea (encargo §7): ubicación, año, superficie, plazo y precio. */
export function fichaTrabajo(t: Pick<Trabajo, "ubicacion" | "anio" | "superficie" | "duracion" | "precio">): string {
  return [t.ubicacion, t.anio, t.superficie, t.duracion, t.precio].filter(Boolean).join(" · ");
}

/** «4,9 · 86 reseñas en Google» / «5,0 · 1 reseña en Google». */
export function lineaValoracion(v: NonNullable<SiteConfig["valoracion"]>): string {
  return `${mediaVisible(v.media)} · ${totalResenas(v.total)} en Google`;
}

/** «86 reseñas» / «1 reseña». */
export function totalResenas(total: number): string {
  return `${total.toLocaleString("es-ES")} ${total === 1 ? "reseña" : "reseñas"}`;
}

/** «Lunes a viernes 8:00–14:00 y 16:00–19:00 · Sábado 9:00–13:00» (línea bajo el CTA final). */
export function lineaHorario(horario: SiteConfig["contacto"]["horario"]): string {
  return formatearHorario(horario)
    .map((h) => `${h.dias} ${h.horas}`)
    .join(" · ");
}

/** Las reseñas más recientes primero (sin fecha, al final). */
export function resenasRecientes(resenas: readonly Resena[]): Resena[] {
  return [...resenas].sort((a, b) => (b.fecha ?? "").localeCompare(a.fecha ?? ""));
}

/** «★★★★☆» para una puntuación de 1 a 5 (redondeada). */
export function estrellas(puntuacion: number): string {
  const n = Math.max(1, Math.min(5, Math.round(puntuacion)));
  return "★".repeat(n) + "☆".repeat(5 - n);
}

/** «01», «02»… */
export function numero(i: number): string {
  return String(i + 1).padStart(2, "0");
}

/** «1 trabajo» / «3 trabajos». */
export function cuentaTrabajos(n: number): string {
  return `${n} ${n === 1 ? "trabajo" : "trabajos"}`;
}

/** Una foto de un grupo de estancia, con el trabajo al que enlaza y su pie. */
export type FotoEstancia = { imagen: Imagen; trabajo: Trabajo; pie: string };

/** Un grupo de «Trabajos por estancia»: un servicio (o «Otros trabajos») y sus trabajos. */
export type Estancia = {
  id: string;
  titulo: string;
  servicio?: Servicio;
  trabajos: Trabajo[];
  grande: FotoEstancia;
  pequenas: FotoEstancia[];
};

/**
 * Trabajos por estancia (encargo §6.2): agrupados por `trabajos[].servicio`; los grupos, por el
 * trabajo más reciente (`anio`); los trabajos sin servicio, al final en «Otros trabajos». Foto
 * grande: `imagenes[0]` del más reciente. Dos pequeñas: `imagenes[0]` de los dos siguientes; si
 * faltan, `imagenes[1]` y `imagenes[2]` del grande; si tampoco hay, ninguna.
 */
export function estancias(trabajos: readonly Trabajo[], servicios: readonly Servicio[]): Estancia[] {
  const grupos = new Map<string, Trabajo[]>();
  for (const t of trabajos) {
    const clave = t.servicio && servicios.some((s) => s.slug === t.servicio) ? t.servicio : "";
    grupos.set(clave, [...(grupos.get(clave) ?? []), t]);
  }
  const reciente = (lista: Trabajo[]) => Math.max(...lista.map((t) => t.anio ?? 0));
  const claves = [...grupos.keys()]
    .filter((k) => k !== "")
    .sort((a, b) => reciente(grupos.get(b)!) - reciente(grupos.get(a)!));
  if (grupos.has("")) claves.push("");
  return claves.map((clave) => {
    const lista = [...grupos.get(clave)!].sort((a, b) => (b.anio ?? 0) - (a.anio ?? 0));
    const servicio = servicios.find((s) => s.slug === clave);
    const [primero] = lista;
    const pequenas: FotoEstancia[] = lista.slice(1, 3).map((t) => ({ imagen: t.imagenes[0], trabajo: t, pie: pieTrabajo(t) }));
    for (let j = 1; pequenas.length < 2 && j < Math.min(3, primero.imagenes.length); j++) {
      pequenas.push({ imagen: primero.imagenes[j], trabajo: primero, pie: `${primero.imagenes[j].alt} · ${primero.titulo}` });
    }
    return {
      id: `estancia-${servicio ? servicio.slug : "otros"}`,
      titulo: servicio ? servicio.titulo : "Otros trabajos",
      servicio,
      trabajos: lista,
      grande: { imagen: primero.imagenes[0], trabajo: primero, pie: pieTrabajo(primero) },
      pequenas,
    };
  });
}
