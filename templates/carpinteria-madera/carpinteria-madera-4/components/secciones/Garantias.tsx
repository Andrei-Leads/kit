import { listaY, type SiteConfig } from "@andrei-leads/core";

type Props = Pick<SiteConfig, "garantias" | "acreditaciones" | "marcas"> & { anioFundacion?: number };

/**
 * Franja negra de garantías (encargo §6.5): «Desde 2011 · Presupuesto cerrado con plano · … ·
 * Herrajes Blum y Salice» en condensada blanca. Se recompone con lo que haya; sin nada, no sale.
 */
export function Garantias({ garantias, acreditaciones, marcas, anioFundacion }: Props) {
  const partes = [
    ...(anioFundacion ? [`Desde ${anioFundacion}`] : []),
    ...garantias,
    ...acreditaciones.map((a) => a.nombre),
    ...(marcas.length > 0 ? [`Herrajes ${listaY(marcas)}`] : []),
  ];
  if (partes.length === 0) return null;
  return (
    <section aria-label="Garantías" className="contenedor mt-(--seccion) bg-negro py-[clamp(1.5rem,1rem+2vw,3rem)] text-sobre-negro">
      <ul className="ft m-0 max-w-[1400px] list-none p-0 text-[clamp(1.625rem,1rem+2.6vw,3.75rem)] leading-none text-balance">
        {partes.map((p, i) => (
          <li key={p} className="inline">
            {i > 0 && <span aria-hidden="true"> · </span>}
            {p}
          </li>
        ))}
      </ul>
    </section>
  );
}
