import Link from "next/link";
import type { Servicio } from "@andrei-leads/core";

import { TarjetaServicio } from "@/components/secciones/TarjetaServicio";
import { buttonVariants } from "@/components/ui/button";
import { h2 } from "@/lib/estilos";
import { textos } from "@/lib/textos";
import { cn } from "@/lib/utils";

/** Servicios que salen en el inicio; si hay más, «Ver todos los servicios». */
export const SERVICIOS_EN_INICIO = 6;

type Props = {
  servicios: Servicio[];
};

/**
 * Servicios (Specs §2), en una banda piedra-2: h2, hasta 6 tarjetas aireadas (1 columna en móvil, 3 en
 * escritorio; `auto-fit`) y, con más de 6, «Ver todos los servicios». Con 1 servicio, una tarjeta ancha.
 * Siempre hay al menos 1 servicio (lo exige el contrato), así que la sección sale siempre.
 */
export function Servicios({ servicios }: Props) {
  const visibles = servicios.slice(0, SERVICIOS_EN_INICIO);
  const unico = visibles.length === 1;
  return (
    <section aria-labelledby="titulo-servicios" className="bg-piedra-2 pt-4 pb-16 lg:pt-6 lg:pb-[104px]">
      <div className="contenedor">
        <h2 id="titulo-servicios" className={cn(h2, "mb-7")}>
          {textos.servicios}
        </h2>
        <div
          className={cn(
            "grid gap-5",
            unico ? "grid-cols-1" : "grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))]"
          )}
        >
          {visibles.map((s) => (
            <TarjetaServicio key={s.slug} servicio={s} ancha={unico} nivel="h3" />
          ))}
        </div>
        {servicios.length > SERVICIOS_EN_INICIO && (
          <Link href="/servicios" className={cn(buttonVariants({ variant: "enlace" }), "mt-5")}>
            {textos.verTodosServicios}
          </Link>
        )}
      </div>
    </section>
  );
}
