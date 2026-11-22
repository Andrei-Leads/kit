import type { SiteConfig } from "@andrei-leads/core";

type Props = Pick<SiteConfig, "garantias" | "acreditaciones" | "marcas"> & { anioFundacion?: number };

/** Línea de acreditaciones en versalitas: «REA · n.º …». */
export function lineaAcreditaciones(acreditaciones: SiteConfig["acreditaciones"]): string {
  return acreditaciones.map((a) => (a.numero ? `${a.nombre} · ${a.numero}` : a.nombre)).join(" · ");
}

/**
 * Garantías (encargo §6.5): «Desde {año}» en display a la izquierda; garantías entre filetes,
 * acreditaciones y marcas a la derecha. Se recompone con lo que haya; sin nada, no existe.
 */
export function Garantias({ garantias, acreditaciones, marcas, anioFundacion }: Props) {
  if (garantias.length === 0 && acreditaciones.length === 0 && marcas.length === 0 && !anioFundacion) return null;
  return (
    <section aria-labelledby="titulo-garantias" className="border-t border-filete bg-alterna">
      <div className="contenedor seccion grid items-start gap-[clamp(24px,4vw,72px)] lg:grid-cols-[5fr_7fr]">
        <div>
          <h2 id="titulo-garantias" className="versalitas mb-3.5">
            {garantias.length > 0 ? "Garantías" : "Quiénes somos"}
          </h2>
          {anioFundacion && <p className="titulo-display text-acento italic">Desde {anioFundacion}</p>}
        </div>
        <div>
          {garantias.length > 0 && (
            <ul className="border-b border-filete">
              {garantias.map((g) => (
                <li key={g} className="border-t border-filete py-4 font-titulo text-[clamp(1.25rem,1rem+1vw,1.625rem)] leading-[1.25]">
                  {g}
                </li>
              ))}
            </ul>
          )}
          {acreditaciones.length > 0 && <p className="versalitas mt-5">{lineaAcreditaciones(acreditaciones)}</p>}
          {marcas.length > 0 && <p className="versalitas mt-1.5">Trabajamos con {marcas.join(" · ")}</p>}
        </div>
      </div>
    </section>
  );
}
