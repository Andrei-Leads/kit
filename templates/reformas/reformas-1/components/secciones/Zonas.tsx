import { listaY } from "@andrei-leads/core";

/** Zonas (encargo §6.8): una frase en serif con el formateador de listas de core. */
export function Zonas({ zonas }: { zonas: readonly string[] }) {
  if (zonas.length === 0) return null;
  return (
    <section aria-labelledby="titulo-zonas">
      <div className="contenedor py-[clamp(40px,6vw,88px)]">
        <h2 id="titulo-zonas" className="versalitas mb-3.5">
          Zonas
        </h2>
        <p className="max-w-[30ch] font-titulo text-[clamp(1.5rem,1.1rem+1.8vw,2.5rem)] leading-[1.2] tracking-[-0.01em] text-balance">
          Trabajamos en {listaY(zonas)}.
        </p>
      </div>
    </section>
  );
}
