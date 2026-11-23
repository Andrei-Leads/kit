import type { SiteConfig } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

type Props = Pick<SiteConfig, "garantias" | "acreditaciones" | "marcas"> & {
  anioFundacion?: number;
  /** En el inicio es una sección con su propio margen; en /empresa va dentro de la página. */
  className?: string;
};

/** ¿Hay algo que pintar? (si no, la sección no existe, ni su pareja). */
export function hayCompromisos(p: Pick<Props, "garantias" | "acreditaciones" | "marcas" | "anioFundacion">): boolean {
  return p.garantias.length > 0 || p.acreditaciones.length > 0 || p.marcas.length > 0 || Boolean(p.anioFundacion);
}

/**
 * Compromisos (encargo §6.6): garantías en serif de 24 px con filetes, acreditaciones (número
 * solo si existe), marcas en versalitas («Sistemas: Cortizo · Technal») y «Desde {año}». Cada
 * bloque vacío se oculta; sin ninguno, la sección entera. Título «Nuestras garantías» (Ysst).
 */
export function Compromisos({ garantias, acreditaciones, marcas, anioFundacion, className }: Props) {
  if (!hayCompromisos({ garantias, acreditaciones, marcas, anioFundacion })) return null;
  const titulo = garantias.length > 0 ? (
    <>
      Nuestras <em>garantías</em>
    </>
  ) : (
    <>
      Nuestro <em>oficio</em>
    </>
  );
  return (
    <section aria-labelledby="titulo-compromisos" className={cn("contenedor flex flex-wrap gap-x-[clamp(40px,6vw,112px)] gap-y-10", className ?? "seccion")}>
      <div className="flex-[1_1_280px]">
        <h2 id="titulo-compromisos" className="titulo-h2">
          {titulo}
        </h2>
        {anioFundacion && <p className="versalitas mt-6">Desde {anioFundacion}</p>}
      </div>
      {(garantias.length > 0 || acreditaciones.length > 0 || marcas.length > 0) && (
        <div className="flex flex-[2_1_480px] flex-col gap-8">
          {garantias.length > 0 && (
            <ul className="m-0 list-none border-t border-anodizado p-0">
              {garantias.map((g) => (
                <li key={g} className="border-b border-borde py-5 font-titulo text-2xl leading-[1.3] font-[350] text-balance">
                  {g}
                </li>
              ))}
            </ul>
          )}
          {acreditaciones.length > 0 && (
            <ul className="m-0 flex list-none flex-wrap gap-x-8 gap-y-3 p-0">
              {acreditaciones.map((a) => (
                <li key={a.nombre} className="text-[15px]">
                  {a.nombre}
                  {a.numero && <span className="text-texto-suave"> {a.numero}</span>}
                </li>
              ))}
            </ul>
          )}
          {marcas.length > 0 && <p className="versalitas tracking-[0.18em]">Sistemas: {marcas.join(" · ")}</p>}
        </div>
      )}
    </section>
  );
}
