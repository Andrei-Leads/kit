import type { Imagen, SiteConfig } from "@andrei-leads/core";

/** Una piedra del bento de confianza. Cada una existe solo con su dato. */
export type Piedra =
  | { tipo: "valoracion"; media: number; total: number }
  | { tipo: "anios"; anio: number }
  | { tipo: "llegada"; valor: string }
  | { tipo: "urgencias" }
  | { tipo: "acreditacion"; nombre: string; numero?: string }
  | { tipo: "foto"; imagen: Imagen & { titulo?: string } }
  | { tipo: "garantia"; texto: string };

/** Piedra con sus tramos de rejilla en móvil (2 columnas) y desde 768 px. */
export type Celda = Piedra & { m: { c: number; r: number }; d: { c: number; r: number } };

export type Bento = { celdas: Celda[]; columnasEscritorio: number };

type Datos = Pick<SiteConfig, "valoracion" | "negocio" | "contacto" | "acreditaciones" | "garantias" | "galeria" | "empresa">;

/** Piedras en orden: valoración, años, llegada, urgencias, acreditaciones, foto y garantías. */
export function piedrasBento(c: Datos): Piedra[] {
  const lista: Piedra[] = [];
  if (c.valoracion) lista.push({ tipo: "valoracion", ...c.valoracion });
  if (c.negocio.anioFundacion) lista.push({ tipo: "anios", anio: c.negocio.anioFundacion });
  if (c.contacto.tiempoLlegada) lista.push({ tipo: "llegada", valor: c.contacto.tiempoLlegada });
  if (c.contacto.urgencias24h) lista.push({ tipo: "urgencias" });
  c.acreditaciones.forEach((a) => lista.push({ tipo: "acreditacion", nombre: a.nombre, numero: a.numero }));
  const foto = c.galeria[0] ?? c.empresa.imagenes[0];
  if (foto) lista.push({ tipo: "foto", imagen: foto });
  c.garantias.forEach((g) => lista.push({ tipo: "garantia", texto: g }));
  return lista;
}

/** Tramos de cada piedra para un número de columnas; la última fila se rellena ensanchando la última piedra de una fila. */
function tramos(piedras: Piedra[], columnas: number, movil: boolean, pocas: boolean): { c: number; r: number }[] {
  const t = piedras.map((p) => {
    if (pocas) return { c: movil && p.tipo === "valoracion" ? 2 : 1, r: 1 };
    if (p.tipo === "valoracion") return { c: 2, r: movil ? 1 : 2 };
    if (p.tipo === "foto") return { c: movil ? 1 : 2, r: 2 };
    return { c: 1, r: 1 };
  });
  const celdas = t.reduce((s, x) => s + x.c * x.r, 0);
  const sobra = celdas % columnas;
  if (sobra) {
    const i = [...t.keys()].reverse().find((k) => t[k].r === 1 && piedras[k].tipo !== "foto");
    if (i !== undefined) t[i].c = Math.min(columnas, t[i].c + columnas - sobra);
  }
  return t;
}

/** Con menos de 2 piedras, el bento no se pinta (`null`). Con 3 o menos, una sola fila en escritorio. */
export function bento(datos: Datos): Bento | null {
  const piedras = piedrasBento(datos);
  if (piedras.length < 2) return null;
  const pocas = piedras.length <= 3;
  const columnasEscritorio = pocas ? piedras.length : 4;
  const m = tramos(piedras, 2, true, pocas);
  const d = tramos(piedras, columnasEscritorio, false, pocas);
  return { celdas: piedras.map((p, i) => ({ ...p, m: m[i], d: d[i] })), columnasEscritorio };
}
