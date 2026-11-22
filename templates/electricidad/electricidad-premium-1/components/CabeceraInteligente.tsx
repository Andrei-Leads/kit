"use client";

import { useEffect } from "react";

/**
 * Isla de la cabecera inteligente (≤ 1 KB; encargo §12). Solo pone
 * `data-scroll="abajo|arriba"` en <html>: el CSS esconde la cabecera desde
 * 1024 px y saca la pareja flotante. Además cierra el menú a pantalla completa
 * al elegir un enlace (navegación de cliente) o si el foco sale de él (un
 * popover no atrapa el foco). Sin JS, la cabecera es fija y sólida.
 * No importa core ni site.config.
 */
export function CabeceraInteligente({ idMenu }: { idMenu: string }) {
  useEffect(() => {
    const html = document.documentElement;
    const menu = document.getElementById(idMenu);
    let antes = window.scrollY;
    const alMover = () => {
      const y = window.scrollY;
      if (Math.abs(y - antes) < 8) return;
      html.dataset.scroll = y > antes && y > 200 ? "abajo" : "arriba";
      antes = y;
    };
    const cerrar = () => {
      if (menu?.matches(":popover-open")) menu.hidePopover();
    };
    const alClic = (e: MouseEvent) => {
      if ((e.target as Element).closest("a")) cerrar();
    };
    const alSalir = (e: FocusEvent) => {
      if (e.relatedTarget instanceof Node && !menu?.contains(e.relatedTarget)) cerrar();
    };
    window.addEventListener("scroll", alMover, { passive: true });
    menu?.addEventListener("click", alClic);
    menu?.addEventListener("focusout", alSalir);
    return () => {
      window.removeEventListener("scroll", alMover);
      menu?.removeEventListener("click", alClic);
      menu?.removeEventListener("focusout", alSalir);
    };
  }, [idMenu]);
  return null;
}
