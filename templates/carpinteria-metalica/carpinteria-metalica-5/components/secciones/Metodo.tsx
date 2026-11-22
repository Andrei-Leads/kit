import type { Paso } from "@andrei-leads/core";

import { dosCifras } from "@/lib/textos";

/**
 * «Cómo *trabajamos*» (encargo §6.5): los pasos en una fila en escritorio (hasta 6) y en dos
 * columnas en móvil, con número en serif cursiva y filete anodizado encima.
 */
export function Metodo({ pasos }: { pasos: readonly Paso[] }) {
  if (pasos.length === 0) return null;
  return (
    <section aria-labelledby="titulo-metodo" className="contenedor seccion">
      <h2 id="titulo-metodo" className="titulo-h2">
        Cómo <em>trabajamos</em>
      </h2>
      <ol className="m-0 mt-[clamp(40px,5vw,72px)] grid list-none grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-x-6 gap-y-10 p-0">
        {pasos.map((p, i) => (
          <li key={p.titulo} className="border-t border-anodizado pt-5">
            <span aria-hidden="true" className="font-titulo text-[40px] leading-none text-anodizado italic">
              {dosCifras(i + 1)}
            </span>
            <h3 className="m-0 mt-4 mb-1.5 font-titulo text-[21px] leading-[1.2] font-normal">{p.titulo}</h3>
            <p className="m-0 text-[15px] leading-[1.55] text-texto-suave">{p.texto}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
