import type { SiteConfig } from "@andrei-leads/core";

import { estrellas, fechaVisible, marcarZonas, resenasRecientes } from "@/lib/resenas";
import { valoracionCorta, valoracionLinea } from "@/lib/formato";
import { cn } from "@/lib/utils";

type Props = {
  resenas: SiteConfig["resenas"];
  valoracion: SiteConfig["valoracion"];
  fichaGoogle?: string;
  zonas: readonly string[];
};

/**
 * Reseñas: las 6 más recientes (4 en móvil) en tarjetas con la esquina cortada. Si el texto nombra
 * un municipio de `zonas`, va en <mark> con el primario suave (comparación en el servidor).
 * «Ver todas en Google» solo con `fichaGoogle`. Sin reseñas, no existe.
 */
export function Resenas({ resenas, valoracion, fichaGoogle, zonas }: Props) {
  const lista = resenasRecientes(resenas, 6);
  if (lista.length === 0) return null;
  const linea = valoracionLinea(valoracion);
  const corta = valoracionCorta(valoracion);
  const enlace = fichaGoogle && (
    <a
      href={fichaGoogle}
      className="inline-flex min-h-11 items-center font-titulo text-base leading-none font-semibold text-texto underline decoration-2 underline-offset-4 lg:text-[17px] lg:underline-offset-[5px]"
    >
      Ver todas en Google <span aria-hidden="true">&nbsp;→</span>
    </a>
  );
  return (
    <section className="contenedor px-4 lg:px-8 pt-9 pb-2 lg:pt-14 lg:pb-4">
      <div className="mx-1 mb-3.5 flex items-baseline justify-between gap-3 lg:mx-0 lg:mb-[22px] lg:gap-6">
        <h2 className="m-0 font-titulo text-h2 leading-[1.1] font-bold tracking-[-0.02em]">Reseñas</h2>
        {linea && (
          <div className="flex items-baseline gap-6">
            <p className="m-0 font-titulo text-lg leading-none font-bold lg:text-[22px]">
              <span className="lg:hidden" aria-hidden="true">
                {corta}
              </span>
              <span className="sr-only lg:not-sr-only">{linea}</span>
            </p>
            <span className="hidden lg:inline">{enlace}</span>
          </div>
        )}
      </div>
      <div className="grid items-start gap-2.5 lg:grid-cols-3 lg:gap-3.5">
        {lista.map((r, i) => {
          const fecha = fechaVisible(r);
          return (
            <article key={`${r.autor}-${i}`} data-aparecer="" className={cn("corte bg-tinta p-0.5", i >= 4 && "max-lg:hidden")}>
              <div className="corte-13 bg-superficie px-4 pt-3 pb-3.5 lg:px-5 lg:pt-4 lg:pb-[18px]">
                <div className="flex items-center justify-between gap-2 text-[13px] lg:text-sm">
                  <span role="img" aria-label={`${r.puntuacion} de 5 estrellas`} className="text-[15px] tracking-[2px] lg:text-base">
                    {estrellas(r.puntuacion)}
                  </span>
                  {fecha && <span>{fecha}</span>}
                </div>
                <p className="mt-1.5 mb-2 text-base leading-normal lg:mt-2 lg:mb-2.5">
                  {marcarZonas(r.texto, zonas).map((t, j) =>
                    t.zona ? (
                      <mark key={j} className="bg-primario-suave px-[3px] font-semibold text-texto">
                        {t.texto}
                      </mark>
                    ) : (
                      t.texto
                    ),
                  )}
                </p>
                <p className="m-0 font-titulo text-[15px] leading-[1.2] font-semibold lg:text-base">{r.autor}</p>
              </div>
            </article>
          );
        })}
      </div>
      {enlace && <div className={cn("mx-1 mt-3", linea && "lg:hidden")}>{enlace}</div>}
    </section>
  );
}
