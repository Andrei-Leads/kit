import type { CSSProperties } from "react";
import type { SiteConfig } from "@andrei-leads/core";

import { IconoCheck } from "@/components/Iconos";

type Props = { garantias: readonly string[]; acreditaciones: SiteConfig["acreditaciones"] };

/**
 * Resto de la confianza (la primera acreditación ya está en el hero): garantías
 * y acreditaciones a partir de la segunda, en pastillas grandes con un check.
 * Sin datos, no existe.
 */
export function Garantias({ garantias, acreditaciones }: Props) {
  const items = [...garantias, ...acreditaciones.map((a) => (a.numero ? `${a.nombre} · n.º ${a.numero}` : a.nombre))];
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="titulo-garantias" className="seccion">
      <div className="contenedor">
        <h2 id="titulo-garantias" className="titulo-seccion">
          {acreditaciones.length > 0 ? "Garantías y habilitaciones" : "Lo que te prometemos"}
        </h2>
        <ul className="m-0 mt-7 flex list-none flex-col gap-2.5 p-0 md:flex-row md:flex-wrap">
          {items.map((t, i) => (
            <li
              key={t}
              data-aparecer
              style={{ "--i": i } as CSSProperties}
              className="flex min-h-16 items-center gap-3.5 rounded-boton bg-superficie py-2.5 pr-6 pl-2.5 text-lg leading-snug font-semibold"
            >
              <span aria-hidden="true" className="grid size-11 flex-none place-items-center rounded-full bg-primario-suave text-texto">
                <IconoCheck />
              </span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
