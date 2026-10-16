"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Mecanismo de las animaciones de aparición (Specs §8). No pinta nada.
 *
 * En cada página observa los elementos con `data-anim` y, al entrar en pantalla, les añade la
 * clase `en-vista` una sola vez; las animaciones en sí son CSS (globals.css) y solo existen bajo
 * `html.js`. El umbral por defecto es 0,2; un elemento puede pedir otro con `data-umbral`
 * (mancha 0,05; contador de años 0,6). Sin IntersectionObserver o con «reducir movimiento»
 * se marcan todos de golpe: el CSS ya anula el movimiento, pero así nada queda a medias.
 */
export function Animaciones() {
  const pathname = usePathname();

  useEffect(() => {
    const elementos = Array.from(document.querySelectorAll<HTMLElement>("[data-anim]:not(.en-vista)"));
    if (elementos.length === 0) return;

    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducir || typeof IntersectionObserver === "undefined") {
      elementos.forEach((el) => el.classList.add("en-vista"));
      return;
    }

    // Un observador por umbral distinto.
    const porUmbral = new Map<number, HTMLElement[]>();
    for (const el of elementos) {
      const umbral = Number(el.dataset.umbral) || 0.2;
      porUmbral.set(umbral, [...(porUmbral.get(umbral) ?? []), el]);
    }
    const observadores = Array.from(porUmbral, ([umbral, lista]) => {
      const observador = new IntersectionObserver(
        (entradas) => {
          for (const entrada of entradas) {
            if (!entrada.isIntersecting) continue;
            entrada.target.classList.add("en-vista");
            observador.unobserve(entrada.target);
          }
        },
        { threshold: umbral }
      );
      lista.forEach((el) => observador.observe(el));
      return observador;
    });

    return () => observadores.forEach((o) => o.disconnect());
  }, [pathname]);

  return null;
}
