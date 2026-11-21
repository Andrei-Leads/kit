/*
 * Ayudantes de contenido y de rutas (desde 0.6.0): qué páginas existen, qué
 * servicio o trabajo toca en una página `[slug]` y qué se relaciona con qué.
 * Lógica pura: `notFound()` y `ensureStatic` siguen en el template, porque son
 * API de Next y core no depende de `next`.
 */
import type { Servicio, SiteConfig, Trabajo } from "./site-config";

/** Slug de relleno: con `cacheComponents`, `generateStaticParams` no puede devolver []. */
export const SLUG_RELLENO = "_";

/** `/trabajos` existe si hay trabajos o, al menos, fotos en la galería. */
export function hayTrabajos(config: Pick<SiteConfig, "trabajos" | "galeria">): boolean {
  return config.trabajos.length > 0 || config.galeria.length > 0;
}

function parametros(lista: readonly { slug: string }[]): { slug: string }[] {
  return lista.length > 0 ? lista.map(({ slug }) => ({ slug })) : [{ slug: SLUG_RELLENO }];
}

/**
 * Para `generateStaticParams` de `app/servicios/[slug]/page.tsx`. Hay siempre
 * al menos un servicio, pero se usa el mismo relleno que en trabajos.
 */
export function parametrosServicios(config: Pick<SiteConfig, "servicios">): { slug: string }[] {
  return parametros(config.servicios);
}

/**
 * Para `generateStaticParams` de `app/trabajos/[slug]/page.tsx`. Sin trabajos,
 * devuelve `[{ slug: "_" }]`, que `buscarTrabajo` no encuentra: la página hace
 * `notFound()`.
 */
export function parametrosTrabajos(config: Pick<SiteConfig, "trabajos">): { slug: string }[] {
  return parametros(config.trabajos);
}

/** El servicio de ese slug, o `undefined` (el template hace `notFound()`). */
export function buscarServicio(config: Pick<SiteConfig, "servicios">, slug: string): Servicio | undefined {
  return config.servicios.find((s) => s.slug === slug);
}

/** El trabajo de ese slug, o `undefined` (el template hace `notFound()`). */
export function buscarTrabajo(config: Pick<SiteConfig, "trabajos">, slug: string): Trabajo | undefined {
  return config.trabajos.find((t) => t.slug === slug);
}

/** Los demás servicios, en el orden de los datos. */
export function otrosServicios(servicios: readonly Servicio[], servicio: Pick<Servicio, "slug">): Servicio[] {
  return servicios.filter((s) => s.slug !== servicio.slug);
}

/** Trabajos de este servicio (`trabajos[].servicio` es su slug), en el orden de los datos. */
export function trabajosDelServicio(trabajos: readonly Trabajo[], servicio: Pick<Servicio, "slug">): Trabajo[] {
  return trabajos.filter((t) => t.servicio === servicio.slug);
}

/** Los demás trabajos, en el orden de los datos (opcionalmente, como mucho `max`). */
export function otrosTrabajos(trabajos: readonly Trabajo[], trabajo: Pick<Trabajo, "slug">, max?: number): Trabajo[] {
  const otros = trabajos.filter((t) => t.slug !== trabajo.slug);
  return max === undefined ? otros : otros.slice(0, max);
}

/** El servicio al que pertenece un trabajo (`trabajo.servicio`), si existe. */
export function servicioDelTrabajo(servicios: readonly Servicio[], trabajo: Pick<Trabajo, "servicio">): Servicio | undefined {
  return trabajo.servicio ? servicios.find((s) => s.slug === trabajo.servicio) : undefined;
}

/** Un paso de «Cómo trabajamos». */
export type Paso = { titulo: string; texto: string };

/** Tipos de negocio con pasos por defecto. */
export type TipoNegocio = "urgencias" | "proyecto" | "obra-tecnica";

/**
 * Pasos por defecto de cada tipo, para cuando `proceso` está vacío. Sin
 * tiempos ni promesas: lo concreto solo puede venir de los datos. Un template
 * puede pasar los suyos a `pasosProceso`.
 */
export const PASOS_POR_DEFECTO: Record<TipoNegocio, readonly Paso[]> = {
  urgencias: [
    { titulo: "Llamas", texto: "Te cogemos el teléfono nosotros." },
    { titulo: "Vamos", texto: "Te decimos a qué hora llegamos." },
    { titulo: "Lo arreglamos", texto: "Y te explicamos qué ha pasado." },
  ],
  proyecto: [
    { titulo: "Nos cuentas qué necesitas", texto: "Por WhatsApp, por teléfono o en persona." },
    { titulo: "Medimos", texto: "Vamos a verlo y tomamos las medidas reales." },
    { titulo: "Presupuesto por escrito", texto: "Con el detalle de lo que incluye." },
    { titulo: "Lo hacemos", texto: "Y lo dejamos terminado y limpio." },
  ],
  "obra-tecnica": [
    { titulo: "Visita técnica", texto: "Vemos el problema en el sitio." },
    { titulo: "Diagnóstico", texto: "Te explicamos qué pasa y por qué." },
    { titulo: "Presupuesto por escrito", texto: "Por partidas, para que se pueda comparar." },
    { titulo: "Obra", texto: "Con seguimiento hasta el final." },
  ],
};

/** `proceso` del cliente o, si está vacío, los pasos por defecto (del tipo o los que pase el template). */
export function pasosProceso(proceso: SiteConfig["proceso"], porDefecto: TipoNegocio | readonly Paso[]): readonly Paso[] {
  if (proceso.length > 0) return proceso;
  return typeof porDefecto === "string" ? PASOS_POR_DEFECTO[porDefecto] : porDefecto;
}
