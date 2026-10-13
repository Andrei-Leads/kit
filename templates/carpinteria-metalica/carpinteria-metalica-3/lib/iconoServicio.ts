import {
  AppWindow,
  Blinds,
  Fence,
  Flame,
  KeyRound,
  SquareSplitHorizontal,
  Umbrella,
  Warehouse,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/** Minúsculas y sin acentos, para comparar títulos. */
export function normalizar(texto: string): string {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

// Reglas en orden: la primera que coincide gana.
const REGLAS: { palabras: string[]; icono: LucideIcon }[] = [
  { palabras: ["persiana", "motoriz"], icono: Blinds },
  { palabras: ["cristal", "vidrio", "luna"], icono: SquareSplitHorizontal },
  { palabras: ["garaje", "puerta automatica", "porton"], icono: Warehouse },
  { palabras: ["cerradura", "bombin", "llave"], icono: KeyRound },
  { palabras: ["reja", "barandilla", "verja", "valla"], icono: Fence },
  { palabras: ["ventana", "cerramiento", "aluminio", "pvc"], icono: AppWindow },
  { palabras: ["toldo"], icono: Umbrella },
  { palabras: ["soldadura", "herreria"], icono: Flame },
];

/** Icono de síntoma según el título del servicio. Sin coincidencia: llave inglesa. */
export function iconoServicio(titulo: string): LucideIcon {
  const t = normalizar(titulo);
  return REGLAS.find((r) => r.palabras.some((p) => t.includes(p)))?.icono ?? Wrench;
}
