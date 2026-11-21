import type { Tarifas as DatosTarifas } from "@andrei-leads/core";

/** Tarifas: una piedra grande con concepto y precio unidos por puntos guía; la nota debajo. Sin `tarifas`, no existe. */
export function Tarifas({ tarifas }: { tarifas?: DatosTarifas }) {
  if (!tarifas) return null;
  return (
    <section aria-labelledby="titulo-tarifas" className="seccion">
      <div className="contenedor">
        <div className="max-w-[760px] rounded-tarjeta bg-superficie p-[clamp(1.5rem,1rem+2.5vw,3.5rem)]">
          <h2 id="titulo-tarifas" className="titulo-seccion">
            Tarifas
          </h2>
          <ul className="m-0 mt-6 flex list-none flex-col gap-3.5 p-0">
            {tarifas.items.map((t) => (
              <li key={t.concepto} className="flex items-baseline gap-2">
                <span>{t.concepto}</span>
                <span aria-hidden="true" className="flex-1 -translate-y-[0.3em] border-b-2 border-dotted border-borde" />
                <strong className="font-titulo font-semibold whitespace-nowrap">{t.precio}</strong>
              </li>
            ))}
          </ul>
          {tarifas.nota && <p className="mt-5 mb-0 text-[0.9375rem] text-texto-suave">{tarifas.nota}</p>}
        </div>
      </div>
    </section>
  );
}
