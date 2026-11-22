"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Cabecera inteligente (≤ 1 KB, anexo P2.3 y encargo §5.2). No pinta nada: pone
 * `data-scroll="abajo|arriba"` en <html> (el CSS esconde la cabecera al bajar,
 * solo en escritorio) y en la cabecera el `data-tono` de la sección que queda
 * debajo. Compactar y ganar fondo es CSS (`animation-timeline: scroll()`).
 */
export function CabeceraInteligente() {
  const ruta = usePathname();
  useEffect(() => {
    const html = document.documentElement;
    const cab = document.querySelector<HTMLElement>(".cabecera");
    let antes = scrollY;
    let pendiente = 0;
    const medir = () => {
      pendiente = 0;
      const y = scrollY;
      if (Math.abs(y - antes) > 4 || y < 200) {
        html.dataset.scroll = y > antes && y > 200 ? "abajo" : "arriba";
        antes = y;
      }
      if (!cab) return;
      for (const s of document.querySelectorAll<HTMLElement>("#contenido [data-tono], footer[data-tono]")) {
        const r = s.getBoundingClientRect();
        if (r.top <= 32 && r.bottom > 32) cab.dataset.tono = s.dataset.tono;
      }
    };
    const alMover = () => {
      if (!pendiente) pendiente = requestAnimationFrame(medir);
    };
    medir();
    addEventListener("scroll", alMover, { passive: true });
    return () => {
      removeEventListener("scroll", alMover);
      cancelAnimationFrame(pendiente);
    };
  }, [ruta]);
  return null;
}
