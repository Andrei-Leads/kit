import Link from "next/link";
import { precioDesde, type Servicio } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { Flecha } from "@/components/Iconos";
import { dosCifras } from "@/lib/formato";
import { cn } from "@/lib/utils";

/**
 * Lista editorial numerada de servicios (encargo §6.4): «01», título en la serif a 26 px,
 * descripción, «desde» si hay precio y «Leer más →». La foto es una miniatura 4:3 de 160 px a la
 * derecha solo en escritorio; sin foto, nada cambia. Con 10 servicios, dos columnas en escritorio
 * (`dosColumnas`).
 */
export function ListaServicios({ servicios, nivel = "h3", className }: { servicios: readonly Servicio[]; nivel?: "h2" | "h3"; className?: string }) {
  const Titulo = nivel;
  const dosColumnas = servicios.length > 7;
  return (
    <ol className={cn("border-t border-linea-plano", dosColumnas && "lg:grid lg:grid-cols-2 lg:gap-x-12", className)}>
      {servicios.map((s, i) => {
        const precio = s.precioDesde ? precioDesde(s.precioDesde) : undefined;
        const [foto] = s.imagenes;
        return (
          <li key={s.slug} className="flex gap-4 border-b border-linea-plano py-6 sm:gap-8 lg:py-7">
            <span aria-hidden="true" className="cifras-antiguas w-8 shrink-0 pt-1 font-titulo text-[1.0625rem] text-texto-suave sm:w-16">
              {dosCifras(i + 1)}
            </span>
            <div className="min-w-0 flex-1">
              <Titulo className="font-titulo text-[clamp(1.375rem,1.2rem+0.6vw,1.625rem)] leading-tight font-normal">
                <Link href={`/servicios/${s.slug}`} className="hover:underline hover:decoration-1 hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-foco">
                  {s.titulo}
                </Link>
              </Titulo>
              <p className="mt-2 text-[1rem] text-texto-suave">{s.descripcion}</p>
              {precio && (
                <p className="mt-2 flex items-baseline gap-2">
                  {precio.desde && <span className="versalitas text-texto-suave">Desde</span>}{" "}
                  <span className="cifras-antiguas font-titulo text-[1.25rem]">{precio.importe}</span>
                </p>
              )}
              <Link
                href={`/servicios/${s.slug}`}
                tabIndex={-1}
                aria-hidden="true"
                className="mt-3 inline-flex min-h-11 items-center gap-1.5 font-semibold text-acento underline decoration-1 underline-offset-[5px]"
              >
                Leer más <Flecha />
              </Link>
            </div>
            {foto && !dosColumnas && (
              <Foto imagen={foto} sizes="160px" proporcion="4/3" decorativa marco="miniatura" className="hidden w-[10.5rem] shrink-0 lg:block" />
            )}
          </li>
        );
      })}
    </ol>
  );
}
