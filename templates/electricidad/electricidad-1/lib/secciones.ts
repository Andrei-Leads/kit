/**
 * Numeración de secciones «NN —» (Specs §7): se recalcula según las secciones visibles.
 * El hero es siempre la 01; la primera sección numerada de debajo es la 02. Las franjas sin
 * número (Confianza) no cuentan.
 */
export function numerarSecciones<T extends string>(visibles: readonly T[], primero = 2): Record<T, string> {
  const numeros = {} as Record<T, string>;
  visibles.forEach((clave, i) => {
    numeros[clave] = String(primero + i).padStart(2, "0");
  });
  return numeros;
}

export type SeccionInicio = "proceso" | "servicios" | "tarifas" | "resenas" | "zonas" | "preguntas" | "cta";

type DatosInicio = {
  tarifas?: unknown;
  resenas: readonly unknown[];
  zonas: readonly unknown[];
  preguntas: readonly unknown[];
};

/**
 * Secciones del inicio que se pintan, en el orden del encargo §5: trámite, servicios, tarifas,
 * reseñas, zonas, preguntas y CTA final. Trámite, servicios y CTA salen siempre (el trámite usa
 * sus pasos por defecto; `servicios` tiene al menos 1). Las demás, solo con datos.
 * Es la única fuente de verdad: la página decide qué pinta con esta lista, así que la numeración
 * y lo que se ve no pueden desincronizarse.
 */
export function seccionesInicio(config: DatosInicio): SeccionInicio[] {
  const lista: SeccionInicio[] = ["proceso", "servicios"];
  if (config.tarifas) lista.push("tarifas");
  if (config.resenas.length > 0) lista.push("resenas");
  if (config.zonas.length > 0) lista.push("zonas");
  if (config.preguntas.length > 0) lista.push("preguntas");
  lista.push("cta");
  return lista;
}
