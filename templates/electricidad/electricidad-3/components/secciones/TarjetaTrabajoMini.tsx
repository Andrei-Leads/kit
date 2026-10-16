import Link from "next/link";
import type { Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/Foto";
import { metaTrabajo } from "@/lib/servicios";

/**
 * Tarjeta pequeña de un trabajo (ficha de servicio): foto 4:3 recta de 16 px, título y, si existe, ubicación ·
 * año. Entera enlazada a `/trabajos/{slug}` (la foto va con `alt=""`: el título ya nombra el enlace).
 */
export function TarjetaTrabajoMini({ trabajo }: { trabajo: Trabajo }) {
  const meta = metaTrabajo(trabajo);
  return (
    <Link
      href={`/trabajos/${trabajo.slug}`}
      className="tarjeta-servicio flex h-full flex-col gap-2.5 rounded-tarjeta bg-superficie p-2.5 text-texto no-underline"
    >
      <Foto
        imagen={trabajo.imagenes[0]}
        proporcion="4/3"
        forma="recta"
        decorativa
        compacta
        sizes="(min-width: 1280px) 380px, (min-width: 1024px) 28vw, 50vw"
      />
      <div className="flex min-w-0 flex-col gap-1 px-1 pb-1">
        <span className="text-base leading-[1.25] font-semibold text-pretty">{trabajo.titulo}</span>
        {meta && <span className="text-[15px] leading-[1.3] text-texto-suave">{meta}</span>}
      </div>
    </Link>
  );
}
