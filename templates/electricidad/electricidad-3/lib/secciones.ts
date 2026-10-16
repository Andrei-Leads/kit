import type { SiteConfig } from "@andrei-leads/core";

/** Entrada del índice lateral: id de la sección en la página y texto fijo (Specs §9). */
export type EntradaIndice = { id: string; texto: string };

type DatosIndice = Pick<SiteConfig, "resenas" | "zonas" | "preguntas">;

/**
 * Entradas del índice lateral del inicio, en el orden de la página: Precios · Servicios · Cómo trabajamos ·
 * Opiniones · Zonas · Preguntas. «Precios» sale siempre (decisión 7: la etiqueta es «Precios» aunque el
 * bloque sea «¿Cuánto me costará?»); «Servicios» y «Cómo trabajamos» también (el proceso usa sus pasos por
 * defecto); las demás, solo con datos. Los ids son los de las secciones del inicio (fase 2).
 */
export function indiceInicio(config: DatosIndice): EntradaIndice[] {
  const lista: EntradaIndice[] = [
    { id: "precios", texto: "Precios" },
    { id: "servicios", texto: "Servicios" },
    { id: "proceso", texto: "Cómo trabajamos" },
  ];
  if (config.resenas.length > 0) lista.push({ id: "opiniones", texto: "Opiniones" });
  if (config.zonas.length > 0) lista.push({ id: "zonas", texto: "Zonas" });
  if (config.preguntas.length > 0) lista.push({ id: "preguntas", texto: "Preguntas" });
  return lista;
}

/**
 * Entradas del índice lateral de /servicios (orden del encargo §5: rejilla → «Lo que cuesta» → reseñas):
 * Servicios · Precios · Opiniones (solo con reseñas).
 */
export function indiceServicios(config: Pick<SiteConfig, "resenas">): EntradaIndice[] {
  const lista: EntradaIndice[] = [
    { id: "servicios", texto: "Servicios" },
    { id: "precios", texto: "Precios" },
  ];
  if (config.resenas.length > 0) lista.push({ id: "opiniones", texto: "Opiniones" });
  return lista;
}
