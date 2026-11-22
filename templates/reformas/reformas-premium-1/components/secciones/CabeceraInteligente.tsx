"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Cabecera inteligente (encargo §5.5, ≤ 1 KB). No pinta nada: escucha el scroll en
 * pasivo y, en un `requestAnimationFrame`, pone en `<html>`:
 * - `data-scroll="abajo|arriba"` (abajo solo a partir de 200 px): CSS esconde la
 *   cabecera y muestra la pareja flotante.
 * - `data-cabecera="claro|oscuro"`: el tono (`data-tono`) de la sección que queda bajo la cabecera
 *   (`elementsFromPoint` a 64 px), para cambiar el fondo con `opacity`.
 * Además, cierra el menú a pantalla completa al pulsar uno de sus enlaces (la
 * navegación de Next no recarga la página).
 */
export function CabeceraInteligente() {
  // Al cambiar de página se vuelve a medir el tono (la nueva puede empezar en claro).
  const ruta = usePathname();
  useEffect(() => {
    const html = document.documentElement;
    let ultimo = scrollY;
    let pendiente = false;

    const medir = () => {
      pendiente = false;
      const y = scrollY;
      if (Math.abs(y - ultimo) > 4) {
        html.dataset.scroll = y > ultimo && y > 200 ? "abajo" : "arriba";
        ultimo = y;
      }
      const tono = document
        .elementsFromPoint(innerWidth / 2, 64)
        .find((e) => !e.closest(".cabecera") && e.closest("[data-tono]"))
        ?.closest<HTMLElement>("[data-tono]")?.dataset.tono;
      if (tono) html.dataset.cabecera = tono;
    };
    const alMover = () => {
      if (!pendiente) {
        pendiente = true;
        requestAnimationFrame(medir);
      }
    };
    const alPulsar = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.("a");
      a?.closest<HTMLElement>("[popover]")?.hidePopover();
    };

    medir();
    addEventListener("scroll", alMover, { passive: true });
    addEventListener("resize", alMover, { passive: true });
    document.addEventListener("click", alPulsar);
    return () => {
      removeEventListener("scroll", alMover);
      removeEventListener("resize", alMover);
      document.removeEventListener("click", alPulsar);
    };
  }, [ruta]);

  return null;
}
