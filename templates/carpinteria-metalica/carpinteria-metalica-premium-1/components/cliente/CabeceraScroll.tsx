"use client";

import { useEffect } from "react";

/**
 * Cabecera inteligente (encargo §12, ≤ 1 KB). Con scroll pasivo y requestAnimationFrame
 * pone dos atributos en `<html>`: `data-scroll="abajo|arriba"` (sentido, a partir de
 * 200 px) y `data-tono="claro|oscuro"` (el `data-tono` de la sección que queda bajo la
 * cabecera). Todo lo demás (fondo, color, esconderse y la pareja flotante) es CSS.
 */
export function CabeceraScroll() {
  useEffect(() => {
    const h = document.documentElement;
    let y0 = scrollY;
    let raf = 0;
    const medir = () => {
      raf = 0;
      const y = scrollY;
      if (Math.abs(y - y0) > 6) {
        h.dataset.scroll = y > y0 && y > 200 ? "abajo" : "arriba";
        y0 = y;
      }
      const bajo = document.elementsFromPoint(innerWidth / 2, 40).find((e) => !e.closest("header,[popover]"));
      h.dataset.tono = bajo?.closest<HTMLElement>("[data-tono]")?.dataset.tono ?? "claro";
    };
    const alMover = () => {
      if (!raf) raf = requestAnimationFrame(medir);
    };
    medir();
    addEventListener("scroll", alMover, { passive: true });
    addEventListener("resize", alMover, { passive: true });
    return () => {
      removeEventListener("scroll", alMover);
      removeEventListener("resize", alMover);
    };
  }, []);
  return null;
}
