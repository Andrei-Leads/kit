import { listaY, type SiteConfig } from "@andrei-leads/core";

type Props = Pick<SiteConfig, "garantias" | "acreditaciones" | "marcas"> & { anioFundacion?: number };

/**
 * Garantías (encargo §6.5): «Restaurando desde {año}» a tamaño display, las garantías en
 * píldoras grandes con el punto pátina, las acreditaciones (con número si lo hay) y «Trabajamos
 * con {marcas}». Cada línea solo con datos; con todo vacío, no existe.
 */
export function Garantias({ garantias, acreditaciones, marcas, anioFundacion }: Props) {
  if (!anioFundacion && garantias.length === 0 && acreditaciones.length === 0 && marcas.length === 0) return null;
  const titulo = anioFundacion
    ? `Restaurando desde ${anioFundacion}`
    : garantias.length > 0
      ? "Lo que te garantizamos"
      : "Con qué trabajamos";
  return (
    <section aria-labelledby="titulo-garantias" className="bg-alterna">
      <div className="contenedor seccion">
        <h2 id="titulo-garantias" className="titulo-display font-[640]">
          {titulo}
        </h2>
        {garantias.length > 0 && (
          <ul className="mt-[clamp(28px,4vw,44px)] flex flex-wrap gap-3">
            {garantias.map((g) => (
              <li
                key={g}
                className="flex items-center gap-3 rounded-boton border-[1.5px] border-borde bg-superficie px-6 py-4 text-[clamp(1.0625rem,1rem+0.3vw,1.25rem)] font-[560]"
              >
                <span aria-hidden="true" className="punto size-2.5" />
                {g}
              </li>
            ))}
          </ul>
        )}
        {acreditaciones.length > 0 && (
          <ul className="mt-6 flex flex-col gap-1 text-texto-suave">
            {acreditaciones.map((a) => (
              <li key={a.nombre}>
                {a.nombre}
                {a.numero && <span className="text-texto"> · {a.numero}</span>}
              </li>
            ))}
          </ul>
        )}
        {marcas.length > 0 && <p className="mt-6 text-texto-suave">Trabajamos con {listaY(marcas)}.</p>}
      </div>
    </section>
  );
}
