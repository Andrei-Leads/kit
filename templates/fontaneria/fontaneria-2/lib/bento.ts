import { listaY, type SiteConfig } from "@andrei-leads/core";

import { textoResenas } from "@/lib/formato";

/** Una tarjeta del bento de confianza. Cada una existe solo con su dato. */
export type TarjetaBento =
  | { tipo: "valoracion"; media: number; texto: string }
  | { tipo: "cifra"; antes: string; cifra: string; sub?: string }
  | { tipo: "texto"; antes: string; texto: string; sub?: string }
  | { tipo: "garantia"; texto: string };

export type TarjetaConAncho = TarjetaBento & { movil: 1 | 2; escritorio: 1 | 2 | 3 | 4 };

type Datos = Pick<SiteConfig, "valoracion" | "negocio" | "contacto" | "acreditaciones" | "garantias" | "zonas">;

/**
 * Tarjetas del bento en orden de lectura (encargo §5): valoración (2×1), años, llegada, cada
 * acreditación, cada garantía y zonas. `anio` es el año actual (de `lib/anio.ts`).
 * La rejilla es de 2 columnas en móvil y 4 en escritorio; la última tarjeta se ensancha para
 * cerrar la fila (lo que el encargo pedía con `:has()`, resuelto aquí con los datos).
 */
export function tarjetasBento(d: Datos, anio: number): TarjetaConAncho[] {
  const t: { tarjeta: TarjetaBento; base: 1 | 2 }[] = [];
  if (d.valoracion) t.push({ tarjeta: { tipo: "valoracion", media: d.valoracion.media, texto: textoResenas(d.valoracion.total) }, base: 2 });
  if (d.negocio.anioFundacion) {
    const anos = anio - d.negocio.anioFundacion;
    t.push({
      tarjeta: { tipo: "cifra", antes: "Desde", cifra: String(d.negocio.anioFundacion), sub: anos > 1 ? `${anos} años en el oficio` : undefined },
      base: 1,
    });
  }
  if (d.contacto.tiempoLlegada) t.push({ tarjeta: { tipo: "cifra", antes: "Llegamos en", cifra: d.contacto.tiempoLlegada }, base: 1 });
  for (const a of d.acreditaciones) t.push({ tarjeta: { tipo: "texto", antes: "Acreditación", texto: a.nombre, sub: a.numero }, base: 1 });
  for (const g of d.garantias) t.push({ tarjeta: { tipo: "garantia", texto: g }, base: 1 });
  const zonas = textoZonas(d.zonas, d.contacto.direccion.ciudad);
  if (zonas) t.push({ tarjeta: { tipo: "texto", antes: "Trabajamos en", texto: zonas }, base: 1 });

  const cerrar = (columnas: number) => {
    const anchos = t.map((x) => Math.min(x.base, columnas));
    const total = anchos.reduce((a, b) => a + b, 0);
    if (anchos.length && total % columnas) anchos[anchos.length - 1] = Math.min(columnas, anchos[anchos.length - 1] + columnas - (total % columnas));
    return anchos;
  };
  const movil = cerrar(2);
  const escritorio = cerrar(4);
  return t.map((x, i) => ({ ...x.tarjeta, movil: movil[i] as 1 | 2, escritorio: escritorio[i] as 1 | 2 | 3 | 4 }));
}

/** «Madrid y 9 municipios más» si la ciudad está en la lista; si no, hasta 3 nombres. */
function textoZonas(zonas: readonly string[], ciudad: string): string {
  if (zonas.length === 0) return "";
  const otras = zonas.filter((z) => z !== ciudad).length;
  if (zonas.includes(ciudad) && otras > 0) return `${ciudad} y ${otras} ${otras === 1 ? "municipio" : "municipios"} más`;
  if (zonas.length <= 3) return listaY(zonas);
  return `${zonas.slice(0, 2).join(", ")} y ${zonas.length - 2} municipios más`;
}

