"use client";

import { useEffect, useRef } from "react";

/**
 * Total de reseñas del resumen con contador (Specs §8: 0→n en 800 ms, ease-out cúbica, al entrar en pantalla).
 *
 * El servidor ya pinta el valor final (`valor`): sin JavaScript, o con «reducir movimiento», la cifra es fija y
 * no hay conteo. Con JS, al montar se pone a 0 y un IntersectionObserver lanza el conteo escribiendo
 * directamente en el nodo (sin estado de React: ni re-renders ni diferencias de hidratación). Solo cambia
 * texto. Para lectores de pantalla va la cifra final en un `sr-only` y el contador es `aria-hidden`.
 */
export function ContadorTotal({ valor }: { valor: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    el.textContent = "0";
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada?.isIntersecting) return;
        observador.disconnect();
        const inicio = performance.now();
        const paso = (ahora: number) => {
          const k = Math.min(1, (ahora - inicio) / 800);
          el.textContent = String(Math.round(valor * (1 - Math.pow(1 - k, 3))));
          if (k < 1) raf = requestAnimationFrame(paso);
        };
        raf = requestAnimationFrame(paso);
      },
      { threshold: 0.2 }
    );
    observador.observe(el);

    return () => {
      observador.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = String(valor);
    };
  }, [valor]);

  return (
    <>
      <span ref={ref} aria-hidden="true" suppressHydrationWarning>
        {valor}
      </span>
      <span className="sr-only">{valor}</span>
    </>
  );
}
