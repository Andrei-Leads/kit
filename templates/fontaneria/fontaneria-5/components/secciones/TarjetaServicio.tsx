import Link from "next/link";
import { precioDesde, type Servicio } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { IconoPieza } from "@/components/Iconos";
import { cn } from "@/lib/utils";

/**
 * Tarjeta de servicio: superficie con borde tinta de 2 px y la esquina superior derecha cortada.
 * Con foto, duotono 3:2; sin foto, una banda de 96 px con una pieza de tubería (codo, T, llave,
 * manguito, por posición). Precio «desde» en una caja tinta cortada.
 */
export function TarjetaServicio({
  servicio,
  indice,
  ancha,
  preload,
}: {
  servicio: Servicio;
  indice: number;
  ancha?: boolean;
  /** Foto LCP de la página (solo la primera tarjeta con foto de /servicios). */
  preload?: boolean;
}) {
  const foto = servicio.imagenes[0];
  const precio = servicio.precioDesde ? precioDesde(servicio.precioDesde) : undefined;
  return (
    <Link
      href={`/servicios/${servicio.slug}`}
      className="tarjeta-corte corte block bg-tinta p-0.5 text-texto no-underline"
    >
      <div className={cn("corte-13 flex h-full flex-col bg-superficie", ancha && "sm:flex-row")}>
        {foto ? (
          <Foto
            imagen={foto}
            decorativa
            preload={preload}
            proporcion="3/2"
            sizes={ancha ? "(min-width: 1024px) 600px, 100vw" : "(min-width: 1024px) 300px, 50vw"}
            className={cn(ancha && "sm:w-1/2 sm:flex-none")}
          />
        ) : (
          <div className={cn("flex h-24 items-center bg-alterna pl-3 lg:pl-4", ancha && "sm:h-auto sm:w-40 sm:flex-none")}>
            <IconoPieza indice={indice} />
          </div>
        )}
        <div className="flex flex-1 flex-col gap-1 px-2.5 pt-2.5 pb-3 lg:gap-1.5 lg:px-4 lg:pt-3.5 lg:pb-4">
          <h3 className="m-0 font-titulo text-base leading-[1.2] font-semibold lg:text-[19px]">{servicio.titulo}</h3>
          <p className="m-0 text-sm leading-[1.4] text-texto-suave lg:text-[15px] lg:leading-[1.45]">{servicio.descripcion}</p>
          {precio && (
            <span className="corte-6 mt-auto self-start bg-tinta py-1 pr-3 pl-[7px] font-titulo text-[13px] leading-[1.2] font-bold text-sobre-tinta lg:py-[5px] lg:pr-3.5 lg:pl-2 lg:text-[15px]">
              {precio.desde ? `desde ${precio.importe}` : precio.importe}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
