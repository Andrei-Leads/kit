import { CarFront, FileCheck, Gauge, PanelTop, Plug, Wrench, Zap, type LucideIcon } from "lucide-react";

/** Texto en minúsculas y sin acentos, para comparar títulos. */
function normalizar(texto: string): string {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

/**
 * Icono lucide (trazo 1,75: se aplica al pintarlo) según el título del servicio. Orden de prioridad:
 * boletín → FileCheck, potencia → Gauge, recarga → CarFront, avería/urgencia → Zap,
 * cuadro → PanelTop, reforma → Wrench; cualquier otro → Plug.
 */
export function iconoServicio(titulo: string): LucideIcon {
  const t = normalizar(titulo);
  if (t.includes("bolet")) return FileCheck;
  if (t.includes("potencia")) return Gauge;
  if (t.includes("recarga")) return CarFront;
  if (t.includes("aver") || t.includes("urgen")) return Zap;
  if (t.includes("cuadro")) return PanelTop;
  if (t.includes("reforma")) return Wrench;
  return Plug;
}
