import { FileText, LayoutGrid, Plug, ToggleRight, Wind, Zap, type LucideIcon } from "lucide-react";

/** Texto en minúsculas y sin acentos, para comparar títulos. */
function normalizar(texto: string): string {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

type ClaveIcono = "diferencial" | "enchufe" | "aire" | "cuadro" | "boletin" | "averia";

/** Un icono lucide (trazo 2) por tipo de servicio. Tabla fija a nivel de módulo (los componentes no se crean al renderizar). */
export const ICONOS: Record<ClaveIcono, LucideIcon> = {
  diferencial: ToggleRight,
  enchufe: Plug,
  aire: Wind,
  cuadro: LayoutGrid,
  boletin: FileText,
  averia: Zap,
};

/**
 * Clave del icono según el título del servicio, como en el diseño (Pantalla, `icoServ`). Orden de prioridad:
 * diferencial, enchufe/interruptor, aire, cuadro, boletín; cualquier otro (averías incluidas) → Zap.
 */
export function claveIcono(titulo: string): ClaveIcono {
  const t = normalizar(titulo);
  if (t.includes("diferencial")) return "diferencial";
  if (t.includes("enchufe") || t.includes("interruptor")) return "enchufe";
  if (t.includes("aire")) return "aire";
  if (t.includes("cuadro")) return "cuadro";
  if (t.includes("bolet")) return "boletin";
  return "averia";
}

/** Icono lucide del servicio (para quien lo necesite como valor; en JSX, `ICONOS[claveIcono(titulo)]`). */
export function iconoServicio(titulo: string): LucideIcon {
  return ICONOS[claveIcono(titulo)];
}
