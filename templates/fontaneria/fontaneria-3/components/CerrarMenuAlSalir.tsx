"use client";

import { useEffect } from "react";

/**
 * Isla mínima de mejora progresiva para el menú a pantalla completa (popover
 * nativo): si el foco sale del menú abierto con Tab (el popover no atrapa el
 * foco y la página de debajo queda tapada), lo cierra. Sin JavaScript el menú
 * funciona igual: abre, cierra con «Cerrar» y con Esc.
 *
 * No importa core ni site.config (no arrastra zod al navegador): solo recibe el
 * id del menú.
 */
export function CerrarMenuAlSalir({ idMenu }: { idMenu: string }) {
  useEffect(() => {
    const menu = document.getElementById(idMenu);
    if (!menu) return;
    const alSalir = (e: FocusEvent) => {
      const destino = e.relatedTarget;
      if (destino instanceof Node && !menu.contains(destino) && menu.matches(":popover-open")) {
        menu.hidePopover();
      }
    };
    menu.addEventListener("focusout", alSalir);
    return () => menu.removeEventListener("focusout", alSalir);
  }, [idMenu]);
  return null;
}
