"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Cabecera inteligente (≤ 1 KB, encargo §5.2). Pone en <html>:
 * - `data-scroll="abajo|arriba"` (umbral de 8 px, con requestAnimationFrame):
 *   en escritorio, la cabecera se esconde al bajar y sale la pareja flotante.
 * - `data-sobre="claro|oscuro"`: el `data-tono` de la sección bajo la cabecera.
 * Además cierra el menú a pantalla completa al navegar o si el foco sale de él.
 * Sin props de datos: nunca importa core ni site.config.
 */
export function CabeceraScroll({ idMenu }: { idMenu: string }) {
  // Al cambiar de página se vuelve a medir (el scroll puede seguir en 0 y no avisar).
  const ruta = usePathname();
  useEffect(() => {
    const html = document.documentElement;
    const menu = document.getElementById(idMenu);
    let ultimo = scrollY;
    let pendiente = false;
    const medir = () => {
      pendiente = false;
      const y = scrollY;
      if (Math.abs(y - ultimo) > 8) {
        html.dataset.scroll = y > ultimo && y > 200 ? "abajo" : "arriba";
        ultimo = y;
      }
      const alto = document.querySelector(".cabecera")?.getBoundingClientRect().height ?? 60;
      const bajo = document
        .elementsFromPoint(innerWidth / 2, alto + 1)
        .find((e) => e instanceof HTMLElement && e.dataset.tono && !e.closest(".cabecera"));
      if (bajo instanceof HTMLElement) html.dataset.sobre = bajo.dataset.tono;
    };
    const alMover = () => {
      if (!pendiente) {
        pendiente = true;
        requestAnimationFrame(medir);
      }
    };
    const cerrar = (e: Event) => {
      const t = e.type === "click" ? (e.target as Element).closest("a") : (e as FocusEvent).relatedTarget;
      if (menu?.matches(":popover-open") && t instanceof Node && (e.type === "click" || !menu.contains(t))) menu.hidePopover();
    };
    requestAnimationFrame(medir);
    addEventListener("scroll", alMover, { passive: true });
    menu?.addEventListener("click", cerrar);
    menu?.addEventListener("focusout", cerrar);
    return () => {
      removeEventListener("scroll", alMover);
      menu?.removeEventListener("click", cerrar);
      menu?.removeEventListener("focusout", cerrar);
    };
  }, [idMenu, ruta]);
  return null;
}
