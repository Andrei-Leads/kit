import type { Servicio } from "@andrei-leads/core";

import { TarjetaServicio } from "@/components/secciones/TarjetaServicio";
import { cn } from "@/lib/utils";

type Props = {
  servicios: Servicio[];
};

/**
 * Todas las tarjetas de servicio de /servicios, sin tope (el inicio se queda en 6). 1 columna en móvil y hasta
 * 3 en escritorio (`auto-fit`); con 1 servicio, una tarjeta ancha. Los títulos son h2 (bajo el h1 de la
 * página). Siempre hay al menos 1 servicio (lo exige el contrato).
 */
export function RejillaServicios({ servicios }: Props) {
  const unico = servicios.length === 1;
  return (
    <div className="contenedor pb-16 lg:pb-[88px]">
      <div
        className={cn(
          "grid gap-5",
          unico ? "grid-cols-1" : "grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))]"
        )}
      >
        {servicios.map((s, i) => (
          <TarjetaServicio key={s.slug} servicio={s} ancha={unico} prioritaria={i === 0} />
        ))}
      </div>
    </div>
  );
}
