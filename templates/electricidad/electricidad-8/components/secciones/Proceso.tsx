import { pasosProceso, type SiteConfig } from "@andrei-leads/core";

import { H2, Rotulo } from "@/components/Rotulo";
import { cn } from "@/lib/utils";

/**
 * `Proceso` (encargo §6.3): `proceso` o los pasos por defecto de urgencias (Llamas → Vamos → Lo
 * arreglamos). Columnas separadas por filetes verticales con el número en la serif a 64 px; en
 * móvil, en vertical con filetes horizontales.
 */
export function Proceso({ proceso, n }: { proceso: SiteConfig["proceso"]; n: string }) {
  const pasos = pasosProceso(proceso, "urgencias");
  const columnas = pasos.length >= 3 ? "md:grid-cols-3" : pasos.length === 2 ? "md:grid-cols-2" : "";
  return (
    <section aria-labelledby="h2-proceso" className="contenedor py-14 lg:py-20">
      <Rotulo n={n} texto="Cómo trabajamos" />
      <h2 id="h2-proceso" className={cn(H2, "mt-4")}>
        Cómo trabajamos
      </h2>
      <ol className={cn("mt-8 grid border-y border-linea-plano md:divide-x md:divide-linea-plano", columnas)}>
        {pasos.map((p, i) => (
          <li key={p.titulo} data-aparecer="" className="border-t border-linea-plano py-6 first:border-t-0 md:border-t-0 md:px-8 md:py-8 md:first:pl-0 lg:px-8 lg:first:pl-8">
            <p aria-hidden="true" className="cifras-antiguas font-titulo text-[4rem] leading-none font-light">
              {i + 1}
            </p>
            <h3 className="mt-4 font-titulo text-[1.3125rem] leading-snug">{p.titulo}</h3>
            <p className="mt-2 text-[0.9375rem] text-texto-suave">{p.texto}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
