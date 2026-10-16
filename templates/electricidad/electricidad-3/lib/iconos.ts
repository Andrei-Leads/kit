import { FileText, LayoutGrid, Plug, ToggleRight, Wind, Zap, type LucideIcon } from "lucide-react";

/** Texto en minúsculas y sin acentos, para comparar títulos. */
function normalizar(texto: string): string {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

/**
 * Icono lucide (trazo 2) según el título del servicio, como en el diseño (Pantalla, `icoServ`).
 * Orden de prioridad: diferencial → ToggleRight, enchufe/interruptor → Plug, aire → Wind,
 * cuadro → LayoutGrid, boletín → FileText; cualquier otro (averías incluidas) → Zap.
 */
export function iconoServicio(titulo: string): LucideIcon {
  const t = normalizar(titulo);
  if (t.includes("diferencial")) return ToggleRight;
  if (t.includes("enchufe") || t.includes("interruptor")) return Plug;
  if (t.includes("aire")) return Wind;
  if (t.includes("cuadro")) return LayoutGrid;
  if (t.includes("bolet")) return FileText;
  return Zap;
}
