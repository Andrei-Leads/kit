import type { Acreditacion } from "@andrei-leads/core";

type Props = {
  garantias: readonly string[];
  acreditaciones: readonly Acreditacion[];
  anioFundacion?: number;
};

const ROMBO = <span aria-hidden="true" className="rombo size-[7px] border-[1.5px] border-current" />;

/**
 * Garantías (encargo §6): etiquetas tipo chapa grabada, en contorno sobre el óxido, con
 * `garantias` y `acreditaciones` («Nombre · número»). «En el oficio desde {año}» solo con
 * `anioFundacion`. Sin nada, no se pinta. Título «Nuestras garantías» (regla de Ysst); sin garantías (solo
 * acreditaciones o el año), «Nuestro oficio», para no llamar garantía a lo que no lo es.
 */
export function Garantias({ garantias, acreditaciones, anioFundacion }: Props) {
  const items = [...garantias, ...acreditaciones.map((a) => (a.numero ? `${a.nombre} · ${a.numero}` : a.nombre))];
  if (items.length === 0 && !anioFundacion) return null;
  return (
    <section aria-labelledby="titulo-garantias" className="py-[clamp(36px,5vw,72px)]">
      <div className="contenedor">
        <h2 id="titulo-garantias" className="h2">
          {garantias.length > 0 ? "Nuestras garantías" : "Nuestro oficio"}
        </h2>
        {anioFundacion && (
          <p className="mt-1.5 font-titulo text-[clamp(1.25rem,1rem+1vw,1.75rem)] font-bold tracking-[0.04em] text-texto-suave uppercase">
            En el oficio desde {anioFundacion}
          </p>
        )}
        {items.length > 0 && (
          <ul className="mt-[18px] flex flex-wrap gap-2.5">
            {items.map((g) => (
              <li
                key={g}
                className="flex min-h-12 items-center gap-3 border-2 border-sobre-primario px-4 py-2.5 font-titulo text-lg leading-[1.1] font-bold tracking-[0.04em] uppercase"
              >
                {ROMBO}
                {g}
                {ROMBO}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
