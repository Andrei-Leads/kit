import type { Servicio } from "@andrei-leads/core";
import { Check } from "lucide-react";

import { parrafosServicio } from "@/lib/servicios";

type Props = {
  servicio: Pick<Servicio, "contenido" | "descripcion" | "incluye">;
};

/**
 * Texto de la ficha (Pantalla, segunda sección de `servTop`): `contenido` (un <p> por elemento; sin él, la
 * `descripcion`) y, al lado en escritorio, la tarjeta «Qué incluye» con checks sobre mancha. Sin `incluye`,
 * la tarjeta no sale y el texto queda solo.
 */
export function FichaContenido({ servicio }: Props) {
  const parrafos = parrafosServicio(servicio);
  const incluye = servicio.incluye;

  return (
    <section aria-label="Detalle del servicio" className="flex flex-wrap items-start gap-x-8 gap-y-5 pt-11 lg:pt-16">
      <div className="flex min-w-0 max-w-[64ch] flex-[1_1_320px] flex-col gap-3">
        {parrafos.map((p, i) => (
          <p key={`${i}-${p.slice(0, 16)}`} className="m-0 text-[17px] leading-[1.6] text-pretty">
            {p}
          </p>
        ))}
      </div>
      {incluye.length > 0 && (
        <div className="min-w-0 flex-[1_1_280px] rounded-tarjeta bg-superficie px-5 py-[18px]">
          <h2 className="m-0 mb-2.5 text-xl leading-[1.2] font-bold">Qué incluye</h2>
          <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
            {incluye.map((texto, i) => (
              <li key={`${i}-${texto}`} className="flex items-start gap-2.5 text-base leading-[1.4]">
                <span aria-hidden="true" className="flex size-6 flex-none items-center justify-center rounded-full bg-mancha">
                  <Check strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="size-3.5" />
                </span>
                {texto}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
