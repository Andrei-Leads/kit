import Link from "next/link";
import type { Servicio } from "@andrei-leads/core";

import { IconoFlecha, IconoVentana } from "@/components/Iconos";
import { Foto } from "@/components/base/Foto";
import { cn } from "@/lib/utils";

type Props = {
  servicios: readonly Servicio[];
  nivel?: "h2" | "h3";
};

const PRECIO = "absolute top-3 left-3 z-[3] rounded-pastilla bg-white px-3 py-2 text-sm leading-none font-extrabold text-texto shadow-[0_1px_3px_rgb(0_0_0/0.15)]";

/**
 * Tarjetas de servicio (encargo §6.5 y entrega §5): toda la tarjeta enlaza a su página; foto 4:3
 * con la pastilla del precio («desde 290 €», tal cual el dato) solo si hay `precioDesde`. Sin foto:
 * bloque `primario-suave` con una ventana de trazo (si otros sí tienen foto) o un círculo con la
 * ventana (si ninguno la tiene). 1 servicio → tarjeta ancha; más de 6 → 2 columnas en móvil.
 * Suben 3 px al pasar o tocar (globals.css).
 */
export function TarjetasServicios({ servicios, nivel = "h3" }: Props) {
  const Titulo = nivel;
  const algunaFoto = servicios.some((s) => s.imagenes.length > 0);
  const muchos = servicios.length > 6;
  const una = servicios.length === 1;
  return (
    <ul
      className={cn(
        "grid gap-5",
        muchos ? "grid-cols-2 gap-2.5 sm:gap-5 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-3",
        una && "sm:grid-cols-1 lg:grid-cols-1",
      )}
    >
      {servicios.map((s) => {
        const foto = s.imagenes[0];
        const precio = s.precioDesde && <span className={PRECIO}>{s.precioDesde}</span>;
        return (
          <li key={s.slug} className="flex">
            <Link
              href={`/servicios/${s.slug}`}
              className={cn(
                "tarjeta-servicio flex w-full flex-col overflow-hidden rounded-tarjeta border border-borde bg-fondo no-underline",
                una && "lg:flex-row",
              )}
            >
              {foto ? (
                <Foto
                  imagen={foto}
                  decorativa
                  sizes={una ? "(min-width: 1024px) 460px, 100vw" : "(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw"}
                  className={cn("rounded-none", una && "lg:w-[460px] lg:flex-none")}
                >
                  {precio}
                </Foto>
              ) : (
                algunaFoto && (
                  <div className={cn("relative flex aspect-[4/3] items-center justify-center bg-primario-suave", una && "lg:w-[460px] lg:flex-none")}>
                    <IconoVentana tamano={56} className="text-texto" />
                    {precio}
                  </div>
                )
              )}
              <div className={cn("flex flex-1 flex-col gap-2 px-[22px] pt-5 pb-[22px]", muchos && "max-sm:px-3.5 max-sm:pt-4 max-sm:pb-4")}>
                {!algunaFoto && (
                  <span className="mb-1 flex size-[52px] items-center justify-center rounded-full bg-primario-suave">
                    <IconoVentana tamano={26} className="text-texto" />
                  </span>
                )}
                <Titulo className={cn("text-xl leading-[1.25] font-extrabold", muchos && "max-sm:text-[17px]")}>{s.titulo}</Titulo>
                {!algunaFoto && s.precioDesde && <p className="font-extrabold">{s.precioDesde}</p>}
                <p className={cn("text-base leading-normal text-texto-suave", muchos && "max-sm:hidden")}>{s.descripcion}</p>
                <span className="mt-auto flex items-center gap-1.5 pt-2 text-base font-bold">
                  Ver servicio
                  <IconoFlecha />
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
