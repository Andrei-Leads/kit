"use client";

import { useEffect, useState } from "react";
import { BotonLlamada } from "@andrei-leads/core";
import { Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { telefonoVisible } from "@/lib/formato";
import type { EntradaIndice } from "@/lib/secciones";
import { cn } from "@/lib/utils";

type Props = {
  /** Secciones presentes en la página, en orden (lib/secciones.ts). Cada `id` es el de una <section id>. */
  secciones: EntradaIndice[];
  telefono: string;
};

/** Alto de cada entrada: 44 px (zona táctil). El punto se coloca con este mismo valor. */
const ALTO = 44;

/**
 * Índice lateral (Specs §6): solo desde 1024 px, en el inicio y en /servicios. Columna sticky de 190 px
 * a la izquierda con las secciones que existen y, al final, el teléfono en 700 y la llamada-cabecera.
 *
 * Con JS, un IntersectionObserver (rootMargin "-40% 0px -55% 0px": una franja del 5 % a mitad de pantalla)
 * marca la sección visible: texto en --color-texto y un punto primario de 8 px con anillo borde-claro que
 * se desliza (transform, 200 ms; sin transición con «reducir movimiento»). Sin JS el punto no se pinta
 * (solo existe bajo `html.js`) y queda una lista de anclas normales en texto suave.
 *
 * El llamador lo pone junto al contenido en un contenedor `lg:flex` y las <section> llevan `id`.
 * Va fuera de la página móvil: `hidden lg:block`.
 */
export function IndiceLateral({ secciones, telefono }: Props) {
  const [activa, setActiva] = useState<string | undefined>(secciones[0]?.id);
  const clave = secciones.map((s) => s.id).join("|");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const ids = clave.split("|");
    const visibles = new Set<string>();
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) visibles.add(entrada.target.id);
          else visibles.delete(entrada.target.id);
        }
        // Si hay varias dentro de la franja, la última de la lista; si no hay ninguna, se queda la anterior.
        const ultima = [...ids].reverse().find((id) => visibles.has(id));
        if (ultima) setActiva(ultima);
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observador.observe(el);
    }
    return () => observador.disconnect();
  }, [clave]);

  const indice = secciones.findIndex((s) => s.id === activa);

  return (
    <aside
      aria-label="Índice de la página"
      className="sticky top-[65px] hidden w-[190px] flex-none self-start pt-11 pr-6 pb-10 lg:block"
    >
      <nav aria-label="Secciones de la página">
        <ul className="relative m-0 list-none p-0">
          {indice >= 0 && (
            <span
              aria-hidden="true"
              className="absolute top-0 left-0 hidden size-2 rounded-full bg-primario ring-1 ring-borde-claro transition-transform duration-200 ease-suave [.js_&]:block"
              style={{ transform: `translateY(${indice * ALTO + (ALTO - 8) / 2}px)` }}
            />
          )}
          {secciones.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={s.id === activa ? "location" : undefined}
                className={cn(
                  "flex h-11 items-center pl-5 text-base font-semibold whitespace-nowrap text-texto-suave no-underline transition-colors duration-200 hover:text-texto",
                  "[.js_&]:aria-[current]:text-texto"
                )}
              >
                {s.texto}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-6 flex flex-col items-start gap-3 border-t border-linea pt-5">
        <BotonLlamada
          telefono={telefono}
          className="flex min-h-11 items-center text-lg font-bold text-texto no-underline tabular-nums hover:underline hover:underline-offset-4"
        >
          {telefonoVisible(telefono)}
        </BotonLlamada>
        <BotonLlamada telefono={telefono} className={buttonVariants({ variant: "llamadaCabecera" })}>
          <Phone aria-hidden="true" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-[18px] flex-none" />
          <span>Llamar</span>
        </BotonLlamada>
      </div>
    </aside>
  );
}
