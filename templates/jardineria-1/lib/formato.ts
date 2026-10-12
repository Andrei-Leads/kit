import type { SiteConfig } from "@andrei-leads/core";

type Contacto = SiteConfig["contacto"];
type Resena = SiteConfig["resenas"][number];

/** "+34600000000" → "600 00 00 00". Si no son 9 dígitos, lo devuelve tal cual. */
export function telefonoVisible(telefono: string): string {
  const d = telefono.replace(/\D/g, "").replace(/^34(?=\d{9}$)/, "");
  return d.length === 9
    ? `${d.slice(0, 3)} ${d.slice(3, 5)} ${d.slice(5, 7)} ${d.slice(7)}`
    : telefono;
}

/** Enlace "Cómo llegar" a Google Maps (un enlace, no un iframe: sin cookies de terceros). */
export function enlaceMaps(direccion: Contacto["direccion"]): string {
  const { calle, cp, ciudad, provincia } = direccion;
  return (
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(`${calle}, ${cp} ${ciudad}, ${provincia}`)
  );
}

/** ["a", "b", "c"] → "a, b y c". */
export function listaY(lista: string[]): string {
  if (lista.length < 2) return lista.join("");
  return lista.slice(0, -1).join(", ") + " y " + lista[lista.length - 1];
}

/** Línea del hero: "Trabajamos en Silla, Almussafes, Sollana y 3 municipios más". */
export function resumenZonas(zonas: string[]): string {
  if (zonas.length <= 3) return `Trabajamos en ${listaY(zonas)}`;
  const resto = zonas.length - 3;
  return `Trabajamos en ${zonas.slice(0, 3).join(", ")} y ${resto} ${
    resto === 1 ? "municipio" : "municipios"
  } más`;
}

/** "Lunes a viernes 8:00–18:00 · Sábados 9:00–13:00". */
export function horarioCorto(horario: Contacto["horario"]): string {
  return horario.map((h) => `${h.dias} ${h.horas}`).join(" · ");
}

/** "★★★★☆" para una puntuación de 1 a 5. */
export function estrellas(puntuacion: number): string {
  const n = Math.max(0, Math.min(5, Math.round(puntuacion)));
  return "★".repeat(n) + "☆".repeat(5 - n);
}

/** Nota media ("4,7"), estrellas redondeadas y "3 opiniones". */
export function resumenResenas(resenas: Resena[]) {
  const media = resenas.length
    ? resenas.reduce((total, r) => total + r.puntuacion, 0) / resenas.length
    : 0;
  return {
    nota: media.toFixed(1).replace(".", ","),
    estrellas: estrellas(media),
    total: resenas.length === 1 ? "1 opinión" : `${resenas.length} opiniones`,
  };
}

/** Número de servicio con dos cifras: 0 → "01". */
export function numeroServicio(indice: number): string {
  return String(indice + 1).padStart(2, "0");
}

/** Nombres de más de 22 caracteres usan el tamaño reducido del h1. */
export function esNombreLargo(nombre: string): boolean {
  return nombre.length > 22;
}

export type FotoHero = { src: string; alt: string };

/** Foto del hero: imagenesHero[0] → galeria[0] → primera imagen de servicio → ninguna. */
export function fotoHero(
  config: Pick<SiteConfig, "imagenesHero" | "galeria" | "servicios">
): FotoHero | null {
  const propia = config.imagenesHero[0];
  if (propia) return { src: propia.src, alt: propia.alt };
  const galeria = config.galeria[0];
  if (galeria) return { src: galeria.src, alt: galeria.alt };
  const servicio = config.servicios.find((s) => s.imagen);
  if (servicio?.imagen) return { src: servicio.imagen, alt: servicio.titulo };
  return null;
}

export type Ancla = { href: string; texto: string };

/** Menú de escritorio: solo secciones que se renderizan. */
export function anclasMenu(
  config: Pick<SiteConfig, "resenas" | "galeria" | "zonas" | "preguntas">
): Ancla[] {
  const anclas: (Ancla | false)[] = [
    config.resenas.length > 0 && { href: "#opiniones", texto: "Opiniones" },
    { href: "#servicios", texto: "Servicios" },
    config.galeria.length > 0 && { href: "#trabajos", texto: "Trabajos" },
    config.zonas.length > 0 && { href: "#zonas", texto: "Zonas" },
    config.preguntas.length > 0 && { href: "#preguntas", texto: "Preguntas" },
    { href: "#contacto", texto: "Contacto" },
  ];
  return anclas.filter((a): a is Ancla => a !== false);
}

/** Redes con URL, en orden fijo. */
export function listaRedes(redes: SiteConfig["redes"]): Ancla[] {
  const lista: Ancla[] = [];
  if (redes.instagram) lista.push({ href: redes.instagram, texto: "Instagram" });
  if (redes.facebook) lista.push({ href: redes.facebook, texto: "Facebook" });
  return lista;
}
