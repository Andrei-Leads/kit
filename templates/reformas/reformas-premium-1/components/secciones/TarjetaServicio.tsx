import Link from "next/link";
import type { Servicio } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";

/**
 * Tarjeta a otro servicio (fichas de servicio). Con foto, 4:5; sin foto, el estado vacío
 * de la línea: tinta con la espiga y la primera palabra del título en cursiva.
 */
export function TarjetaServicio({ servicio, i = 0 }: { servicio: Servicio; i?: number }) {
  const foto = servicio.imagenes[0];
  const [primera, ...resto] = servicio.titulo.split(" ");
  return (
    <Link href={`/servicios/${servicio.slug}`} data-aparecer style={{ "--i": i } as React.CSSProperties} className="tarjeta-obra group block no-underline">
      {foto ? (
        <Foto imagen={foto} sizes="(min-width: 1024px) 340px, 80vw" proporcion="4/5" decorativa className="foto-zoom" />
      ) : (
        <div data-tono="oscuro" aria-hidden="true" className="espiga flex aspect-[4/5] items-end rounded-foto p-6 text-fondo">
          <span className="text-[clamp(1.75rem,1.2rem+2vw,2.5rem)] leading-[1.05]">
            <span className="destacada">{primera}</span> {resto.join(" ")}
          </span>
        </div>
      )}
      <h3 className="m-0 mt-4 text-h3">{servicio.titulo}</h3>
      <p className="m-0 mt-1.5 text-[15px] text-texto-suave">{servicio.descripcion}</p>
    </Link>
  );
}
