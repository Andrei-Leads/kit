"use client";

import { useEffect } from "react";

/**
 * Isla mínima de mejora progresiva para el menú móvil (popover
 * nativo), la misma que carpinteria-madera-1 y -4, reformas-3 y fontanería-3. Lo cierra (1) si el foco
 * sale del menú con Tab (un popover no atrapa el foco y el panel tapa la página
 * de debajo) y (2) al pulsar un enlace: con navegación de cliente el layout
 * no se vuelve a pintar y el panel seguiría abierto. Sin JavaScript el menú
 * funciona igual (los enlaces cargan la página entera).
 *
 * No importa core ni site.config (no arrastra zod al navegador).
 */
export function CerrarMenu({ idMenu }: { idMenu: string }) {
  useEffect(() => {
    const menu = document.getElementById(idMenu);
    if (!menu) return;
    const cerrar = () => {
      if (menu.matches(":popover-open")) menu.hidePopover();
    };
    const alSalir = (e: FocusEvent) => {
      const destino = e.relatedTarget;
      // El botón «Menú/Cerrar» está fuera del panel: si el foco va a él, lo cierra su propio clic
      // (cerrarlo aquí haría que ese clic lo volviera a abrir).
      if (destino instanceof Element && destino.closest(`[popovertarget="${idMenu}"]`)) return;
      if (destino instanceof Node && !menu.contains(destino)) cerrar();
    };
    const alPulsar = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest("a")) cerrar();
    };
    menu.addEventListener("focusout", alSalir);
    menu.addEventListener("click", alPulsar);
    return () => {
      menu.removeEventListener("focusout", alSalir);
      menu.removeEventListener("click", alPulsar);
    };
  }, [idMenu]);
  return null;
}
