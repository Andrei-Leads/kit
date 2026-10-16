import Link from "next/link";
import type { Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/Foto";

/**
 * Tarjeta sencilla de un trabajo (guías de servicio): foto 4:3 y título, todo dentro de un único
 * enlace a `/trabajos/{slug}`. La foto es decorativa (`alt=""`): el título ya nombra el enlace.
 * Una línea mono con ubicación y año, solo con dato.
 */
export function TarjetaTrabajoMini({ trabajo, sizes }: { trabajo: Trabajo; sizes: string }) {
  const meta = [trabajo.ubicacion, trabajo.anio].filter(Boolean).join(" · ");
  return (
    <Link
      href={`/trabajos/${trabajo.slug}`}
      className="flex flex-col gap-3 text-tinta no-underline [&:hover_.titulo-trabajo]:decoration-2"
    >
      <Foto imagen={trabajo.imagenes[0]} sizes={sizes} decorativa />
      <span className="titulo-trabajo text-lg leading-[1.3] font-bold underline decoration-1 underline-offset-[3px]">
        {trabajo.titulo}
      </span>
      {meta && <span className="font-mono text-[13px] font-medium text-tinta-suave">{meta}</span>}
    </Link>
  );
}
