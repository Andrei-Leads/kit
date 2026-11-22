import { pasosProceso, type SiteConfig } from "@andrei-leads/core";

import { numeroObra } from "@/lib/obras";
import { cn } from "@/lib/utils";

/** Cuántas de las 6 columnas ocupa cada paso para que cada fila se reparta (5 pasos = 3 + 2; 4 = 2 + 2). */
function columnas(total: number, k: number): string {
  if (total <= 3) return ["", "lg:col-span-6", "lg:col-span-3", "lg:col-span-2"][total];
  if (total === 4) return "lg:col-span-3";
  if (total === 5) return k < 3 ? "lg:col-span-2" : "lg:col-span-3";
  return "lg:col-span-2";
}

/** «Cómo trabajamos»: celdas de borde negro (3×2 en escritorio, lista en móvil), número en primario a 32 px. */
export function ProcesoTabla({ proceso }: Pick<SiteConfig, "proceso">) {
  const pasos = pasosProceso(proceso, "proyecto");
  return (
    <section aria-labelledby="titulo-proceso" className="contenedor pt-(--seccion)">
      <h2 id="titulo-proceso" className="titulo-h2 m-0 mb-4">
        Cómo trabajamos
      </h2>
      <ol className="m-0 grid list-none border-t-2 border-l-2 border-borde p-0 lg:grid-cols-6">
        {pasos.map((p, k) => (
          <li key={p.titulo} className={cn("flex gap-x-4 gap-y-2.5 border-r-2 border-b-2 border-borde p-4 lg:flex-col", columnas(pasos.length, k))}>
            <span aria-hidden="true" className="condensada w-11 flex-none text-[32px] leading-[0.9] text-primario">
              {numeroObra(k)}
            </span>
            <div>
              <h3 className="condensada m-0 text-[22px] leading-none">{p.titulo}</h3>
              <p className="m-0 mt-1.5 text-[15px] leading-[1.45] text-texto-suave">{p.texto}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
