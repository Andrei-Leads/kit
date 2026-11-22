import type { CSSProperties } from "react";
import type { Paso } from "@andrei-leads/core";

/**
 * «Cómo trabajamos» (encargo §6.4): rima con el planificador. En escritorio, una pista horizontal
 * de segmentos redondeados (uno por paso) con número y título; en móvil, vertical. Los segmentos se
 * rellenan con el scroll (`view()`, globals.css); sin soporte o con «reducir movimiento», llenos.
 */
export function ProcesoPistas({ pasos }: { pasos: readonly Paso[] }) {
  return (
    <section aria-labelledby="h2-proceso" className="seccion">
      <div className="contenedor flex flex-col gap-7">
        <h2 id="h2-proceso" className="h2">
          Cómo trabajamos
        </h2>
        <ol className="grid grid-cols-1 lg:grid-cols-(--columnas) lg:gap-5" style={{ "--columnas": `repeat(${pasos.length}, minmax(0, 1fr))` } as CSSProperties}>
          {pasos.map((p, i) => (
            <li key={p.titulo} className="flex min-w-0 gap-3.5 lg:flex-col">
              <div aria-hidden="true" className="w-1.5 flex-none overflow-hidden rounded-full bg-(--color-pista) lg:h-2 lg:w-full">
                <div className="pista size-full rounded-full bg-primario" />
              </div>
              <div className="flex flex-col gap-1 pb-[22px] lg:pb-0">
                <span className="font-titulo text-sm font-semibold text-texto-suave">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-titulo text-[19px] leading-[1.2] font-semibold text-balance">{p.titulo}</h3>
                <p className="text-[15px] leading-[1.45] text-pretty text-texto-suave">{p.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
