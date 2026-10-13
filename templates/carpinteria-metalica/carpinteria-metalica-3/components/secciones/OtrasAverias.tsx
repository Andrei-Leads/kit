import type { Servicio } from "@andrei-leads/core";

import { FilaAveria } from "./FilaAveria";
import { seccion } from "@/lib/estilos";

type Props = {
  /** Los demás servicios (sin el actual). */
  servicios: Servicio[];
};

/** Lista compacta de otros servicios al pie de /servicios/[slug]. */
export function OtrasAverias({ servicios }: Props) {
  if (servicios.length === 0) return null;
  return (
    <section className={seccion}>
      <div className="contenedor">
        <div className="mx-auto flex max-w-[880px] flex-col gap-3.5">
          <h2 className="m-0 text-2xl leading-[1.15] font-extrabold md:text-[32px]">Otras averías</h2>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {servicios.map((s) => (
              <li key={s.slug}>
                <FilaAveria servicio={s} nivelTitulo="h3" variante="compacta" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
