import { listaY, type SiteConfig } from "@andrei-leads/core";

import { anioActual } from "@/lib/anio";

type Props = Pick<SiteConfig, "garantias" | "marcas" | "acreditaciones"> & { anioFundacion?: number };

const COLUMNA = "border-b border-filete py-7 pr-7";

/**
 * Garantías (encargo §6.5): columnas de texto separadas por filetes (una columna en móvil). Año
 * de fundación en cursiva grande, garantías, acreditaciones y marcas («Trabajamos con A, B y C»).
 * Cada columna existe solo con su dato; sin ninguno, la sección se oculta.
 */
export async function Garantias({ garantias, marcas, acreditaciones, anioFundacion }: Props) {
  if (!anioFundacion && garantias.length === 0 && marcas.length === 0 && acreditaciones.length === 0) return null;
  const anios = anioFundacion ? (await anioActual()) - anioFundacion : 0;
  return (
    <section aria-label="Garantías" className="marco seccion">
      <div data-aparecer className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] border-t border-filete">
        {anioFundacion && (
          <div className={COLUMNA}>
            <p className="font-titulo text-[clamp(3.5rem,2.5rem+3.5vw,6rem)] leading-none italic">{anioFundacion}</p>
            {anios > 0 && <p className="mt-3 text-texto-suave">{anios === 1 ? "1 año" : `${anios} años`} de taller.</p>}
          </div>
        )}
        {garantias.length > 0 && (
          <div className={COLUMNA}>
            <h2 className="titulo-columna">Nuestras garantías</h2>
            <ul className="grid gap-2">
              {garantias.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </div>
        )}
        {acreditaciones.length > 0 && (
          <div className={COLUMNA}>
            <h2 className="titulo-columna">Acreditaciones</h2>
            <ul className="grid gap-2">
              {acreditaciones.map((a) => (
                <li key={a.nombre}>
                  {a.nombre}
                  {a.numero && <span className="text-texto-suave"> · {a.numero}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
        {marcas.length > 0 && (
          <div className={COLUMNA}>
            <h2 className="titulo-columna">Marcas</h2>
            <p>Trabajamos con {listaY(marcas)}.</p>
          </div>
        )}
      </div>
    </section>
  );
}
