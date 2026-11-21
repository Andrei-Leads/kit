import type { ReactNode } from "react";
import type { Servicio } from "@andrei-leads/core";

import { TarjetaServicio } from "./TarjetaServicio";

/** Servicios: rejilla compacta de 2 columnas (móvil) y 4 (escritorio); con 1 servicio, una tarjeta ancha. */
export function RejillaServicios({
  servicios,
  titulo = "Nuestros servicios",
  nivel = "h2",
  children,
  preloadPrimera,
}: {
  servicios: readonly Servicio[];
  titulo?: string;
  nivel?: "h2" | null;
  children?: ReactNode;
  /** La rejilla está en la primera pantalla: precarga la primera foto (una sola por página). */
  preloadPrimera?: boolean;
}) {
  const una = servicios.length === 1;
  const primeraConFoto = preloadPrimera ? servicios.findIndex((s) => s.imagenes.length > 0) : -1;
  return (
    <section className="contenedor px-4 lg:px-8 pt-9 pb-2 lg:pt-14 lg:pb-4">
      {nivel && <h2 className="m-0 mx-1 mb-4 font-titulo text-h2 leading-[1.1] font-bold tracking-[-0.02em] lg:mx-0 lg:mb-[22px]">{titulo}</h2>}
      <div className={una ? "max-w-3xl" : "grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-3.5"}>
        {servicios.map((s, i) => (
          <TarjetaServicio key={s.slug} servicio={s} indice={i} ancha={una} preload={i === primeraConFoto} />
        ))}
      </div>
      {children && <div className="mx-1 mt-5 lg:mx-0 lg:mt-7">{children}</div>}
    </section>
  );
}
