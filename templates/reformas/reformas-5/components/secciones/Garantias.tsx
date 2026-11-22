import type { SiteConfig } from "@andrei-leads/core";

type Props = Pick<SiteConfig, "garantias" | "acreditaciones"> & { anioFundacion?: number };

function Vineta() {
  return <span aria-hidden="true" className="mt-1 h-[18px] w-3.5 flex-none rounded-[7px_7px_2px_2px] bg-acento" />;
}

/**
 * Banda de arcilla con las garantías en dos columnas (viñeta de arco), las
 * acreditaciones y «Desde {año}». Se recompone con lo que haya; sin garantías ni
 * acreditaciones, no sale.
 */
export function Garantias({ garantias, acreditaciones, anioFundacion }: Props) {
  if (garantias.length === 0 && acreditaciones.length === 0) return null;
  const titulo = garantias.length > 0 ? "Nuestras garantías" : "Acreditaciones";
  return (
    <section aria-labelledby="titulo-garantias" className="mt-[clamp(4.5rem,3rem+6vw,8rem)] bg-alterna py-[clamp(4rem,2.5rem+6vw,7rem)]">
      <div className="contenedor grid items-start gap-x-16 gap-y-8 lg:grid-cols-2">
        <div>
          <h2 id="titulo-garantias" className="titulo-seccion">
            {titulo}
          </h2>
          {anioFundacion && <p className="remate m-0 mt-3.5 text-[28px] text-acento">Desde {anioFundacion}</p>}
        </div>
        <div className="flex flex-col gap-8">
          {garantias.length > 0 && (
            <ul className="m-0 grid list-none gap-x-8 gap-y-5 p-0 sm:grid-cols-2">
              {garantias.map((g) => (
                <li key={g} className="flex items-start gap-3.5 text-lg leading-[1.45]">
                  <Vineta />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          )}
          {acreditaciones.length > 0 && (
            <div>
              {garantias.length > 0 && <h3 className="remate m-0 mb-3 text-xl">Acreditaciones</h3>}
              <ul className="m-0 flex list-none flex-col gap-3 p-0">
                {acreditaciones.map((a) => (
                  <li key={a.nombre} className="flex items-start gap-3.5">
                    <Vineta />
                    <span>
                      {a.nombre}
                      {a.numero && <span className="text-texto-suave"> · nº {a.numero}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
