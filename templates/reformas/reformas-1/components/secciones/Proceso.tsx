import type { CSSProperties } from "react";
import { pasosProceso, type SiteConfig } from "@andrei-leads/core";

import { numeroEnLetra } from "@/lib/textos";

/**
 * Proceso (encargo §6.4): `proceso` o los pasos por defecto de core para «proyecto» (sin
 * promesas). Columnas en escritorio que se reparten el ancho; lista en móvil. Número en serif
 * cursiva de 56 px y filete de tinta encima de cada paso.
 */
export function Proceso({ proceso }: { proceso: SiteConfig["proceso"] }) {
  const pasos = pasosProceso(proceso, "proyecto");
  return (
    <section aria-labelledby="titulo-proceso" className="border-t border-filete">
      <div className="contenedor seccion">
        <p className="versalitas mb-3.5">Cómo trabajamos</p>
        <h2 id="titulo-proceso" className="titulo-seccion filete-h2">
          {numeroEnLetra(pasos.length)} {pasos.length === 1 ? "paso" : "pasos"}, de principio a fin.
        </h2>
        <ol
          className="mt-[clamp(28px,4vw,56px)] grid gap-[clamp(20px,2vw,32px)] lg:grid-cols-(--columnas)"
          style={{ "--columnas": `repeat(${pasos.length}, minmax(0, 1fr))` } as CSSProperties}
        >
          {pasos.map((p, i) => (
            <li key={p.titulo} data-aparecer className="border-t border-texto pt-4">
              <span aria-hidden="true" className="mb-3 block font-titulo text-[56px] leading-none text-acento italic">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mb-2 font-titulo text-[22px] leading-[1.15] font-normal">{p.titulo}</h3>
              <p className="text-[15px] leading-[1.55] text-texto-suave">{p.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
