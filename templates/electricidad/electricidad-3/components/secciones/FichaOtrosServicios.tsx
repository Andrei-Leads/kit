import Link from "next/link";
import type { Servicio } from "@andrei-leads/core";

import { PastillaPrecio } from "@/components/PastillaPrecio";
import { h2 } from "@/lib/estilos";
import { cn } from "@/lib/utils";

type Props = {
  /** El resto de servicios (`otrosServicios`). Vacío: no se pinta. */
  servicios: Servicio[];
  className?: string;
};

/**
 * «Otros servicios» (Pantalla, `otrosServ`): rejilla compacta de 2 columnas en móvil y 3 en escritorio, sin
 * fotos: título y pastilla de `precioDesde` si hay. Tarjeta entera enlazada, con el hover de `.tarjeta-servicio`.
 */
export function FichaOtrosServicios({ servicios, className }: Props) {
  if (servicios.length === 0) return null;
  return (
    <section aria-labelledby="otros-servicios-titulo" className={cn("pt-11 pb-11 lg:pt-16 lg:pb-16", className)}>
      <h2 id="otros-servicios-titulo" className={cn(h2, "mb-4")}>
        Otros servicios
      </h2>
      <ul className="m-0 grid list-none grid-cols-2 gap-2 p-0 lg:grid-cols-3">
        {servicios.map((s) => (
          <li key={s.slug} className="flex *:w-full">
            <Link
              href={`/servicios/${s.slug}`}
              className="tarjeta-servicio flex flex-col items-start gap-2 rounded-tarjeta bg-superficie px-3.5 py-3 text-texto no-underline"
            >
              <span className="text-base leading-[1.25] font-semibold text-pretty">{s.titulo}</span>
              {s.precioDesde && <PastillaPrecio precio={s.precioDesde} className="max-w-full px-[11px] py-[5px] text-sm" />}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
