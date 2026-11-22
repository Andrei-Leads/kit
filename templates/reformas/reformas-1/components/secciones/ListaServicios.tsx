import Link from "next/link";
import { minusculaInicial, type Servicio } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { cn } from "@/lib/utils";

type Props = { servicios: readonly Servicio[]; nivel?: "h2" | "h3" };

/**
 * Lista de servicios entre filetes (encargo §6.3): número en serif cursiva, título,
 * descripción, «desde» y enlace; miniatura 4:3 de 120 px a la derecha si hay foto. Sin foto,
 * el número crece a 48 px. Con un solo servicio, una fila ancha.
 */
export function ListaServicios({ servicios, nivel = "h3" }: Props) {
  const Titulo = nivel;
  return (
    <ul className="border-b border-filete">
      {servicios.map((s, i) => {
        const foto = s.imagenes[0];
        return (
          <li
            key={s.slug}
            data-aparecer
            className="fila-servicio grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-[18px] gap-y-1 border-t border-filete py-5 lg:grid-cols-[96px_minmax(0,1.1fr)_minmax(0,1fr)_auto] lg:items-center lg:gap-x-10 lg:py-7"
          >
            <span
              aria-hidden="true"
              className={cn(
                "col-start-1 row-start-1 font-titulo text-acento italic lg:row-span-2",
                // leading-none después del tamaño: tailwind-merge quita el leading anterior a un text-*.
                foto ? "text-[28px] leading-none" : "text-5xl leading-none",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <Titulo className="col-start-2 row-start-1 font-titulo text-[clamp(1.375rem,1.1rem+1.1vw,1.75rem)] leading-[1.15] font-normal lg:self-end">
              {s.titulo}
            </Titulo>
            <div className="col-start-2 row-start-2 mt-1 lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:mt-0">
              <p className="text-[15px] leading-[1.55] text-texto-suave">{s.descripcion}</p>
              {s.precioDesde && <p className="mt-1 font-titulo text-lg">{s.precioDesde}</p>}
            </div>
            <div className="col-start-2 row-start-3 lg:row-start-2 lg:self-start">
              <Link href={`/servicios/${s.slug}`} className="enlace inline-flex min-h-11 items-center text-[15px]">
                Ver {minusculaInicial(s.titulo)}
              </Link>
            </div>
            {foto && (
              <div className="miniatura col-start-3 row-span-3 row-start-1 w-[120px] overflow-hidden lg:col-start-4 lg:row-span-2">
                <Foto imagen={foto} sizes="120px" decorativa etiquetaCorta />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
