import Link from "next/link";
import type { Servicio } from "@andrei-leads/core";
import { ArrowRight } from "lucide-react";

import { IconoServicio } from "@/components/IconoServicio";
import { etiquetaCampo } from "@/lib/estilos";
import { precioDesde } from "@/lib/formato";

/** Precio de la fila: con «desde», etiqueta DESDE + importe; sin él, el texto tal cual. */
function Precio({ texto }: { texto: string }) {
  const { desde, importe } = precioDesde(texto);
  return (
    <>
      {desde && <span className={`${etiquetaCampo} mr-2`}>Desde</span>}
      {importe}
    </>
  );
}

/**
 * Fila de servicio (Specs §2): icono, título, descripción en una línea (móvil) o completa (escritorio),
 * «desde» en mono y flecha. TODA la fila es el enlace a `/servicios/{slug}` (≥ 44 px).
 * Al pasar, enfocar o tocar, una capa de `papel-2` sube de opacity y la flecha avanza 4 px
 * (CSS en globals.css: `.fila-servicio`); solo transform y opacity.
 */
export function FilaServicio({ servicio }: { servicio: Servicio }) {
  return (
    <li className="border-t border-regla">
      <Link
        href={`/servicios/${servicio.slug}`}
        className="fila-servicio relative isolate grid min-h-14 grid-cols-[24px_minmax(0,1fr)_20px] items-center gap-4 px-2 py-[18px] text-tinta no-underline md:grid-cols-[24px_minmax(0,1fr)_auto_20px]"
      >
        <span aria-hidden="true" className="fila-tinte absolute inset-0 -z-10 bg-papel-2" />
        <IconoServicio titulo={servicio.titulo} className="size-6 text-primario" />
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="text-[17px] leading-[1.3] font-bold">{servicio.titulo}</span>
          <span className="truncate text-[15px] text-tinta-suave md:overflow-visible md:whitespace-normal">
            {servicio.descripcion}
          </span>
          {servicio.precioDesde && (
            <span className="font-mono text-[13px] font-medium md:hidden">
              <Precio texto={servicio.precioDesde} />
            </span>
          )}
        </span>
        {servicio.precioDesde && (
          <span className="hidden font-mono text-[15px] font-medium whitespace-nowrap md:block">
            <Precio texto={servicio.precioDesde} />
          </span>
        )}
        <ArrowRight
          aria-hidden="true"
          strokeWidth={2}
          className="fila-flecha col-start-3 size-5 md:col-start-4"
        />
      </Link>
    </li>
  );
}
