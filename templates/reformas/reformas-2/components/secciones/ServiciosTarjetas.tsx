import Link from "next/link";
import { minusculaInicial, type Servicio } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import type { ReactNode } from "react";

/**
 * Tarjetas de servicio (encargo §6.3): 2 columnas en móvil y 4 en escritorio. Foto 4:3, título,
 * descripción a 2 líneas, «desde» si existe y «Planificar {servicio} →», que lleva a la ficha (con
 * el planificador corto). Sin foto, un bloque tintado con el título grande dentro.
 */
export function ServiciosTarjetas({
  servicios,
  titulo,
  pie,
  conPlanificador = true,
}: {
  servicios: readonly Servicio[];
  titulo?: string;
  pie?: ReactNode;
  /** Sin WhatsApp la ficha no lleva planificador: el enlace dice «Ver el servicio». */
  conPlanificador?: boolean;
}) {
  const Titulo = titulo ? "h3" : "h2";
  return (
    <section aria-labelledby={titulo ? "h2-servicios" : undefined} aria-label={titulo ? undefined : "Servicios"} className="seccion">
      <div className="contenedor flex flex-col gap-6">
        {titulo && (
          <h2 id="h2-servicios" className="h2">
            {titulo}
          </h2>
        )}
        <ul className="grid grid-cols-2 gap-x-[clamp(12px,2vw,20px)] gap-y-7 lg:grid-cols-4">
          {servicios.map((s) => {
            const foto = s.imagenes[0];
            return (
              <li key={s.slug} className="min-w-0" data-aparecer="">
                <Link href={`/servicios/${s.slug}`} className="flex h-full flex-col gap-2.5 text-texto no-underline">
                  {foto ? (
                    <>
                      <Foto imagen={foto} decorativa sizes="(min-width: 1024px) 280px, calc(50vw - 24px)" />
                      <Titulo className="font-titulo text-[clamp(1.0625rem,0.95rem+0.4vw,1.3rem)] leading-[1.2] font-semibold tracking-[-0.01em] text-balance">
                        {s.titulo}
                      </Titulo>
                    </>
                  ) : (
                    <div className="flex aspect-[4/3] items-end rounded-foto bg-alterna p-[clamp(12px,2vw,20px)]">
                      <Titulo className="font-titulo text-[clamp(1.25rem,1rem+1vw,1.75rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-balance [overflow-wrap:anywhere]">
                        {s.titulo}
                      </Titulo>
                    </div>
                  )}
                  <p className="line-clamp-2 text-[15px] leading-[1.4] text-texto-suave">{s.descripcion}</p>
                  {s.precioDesde && <span className="self-start rounded-full bg-alterna px-3 py-1 text-sm font-semibold">{s.precioDesde}</span>}
                  <span className="mt-auto text-[15px] leading-[1.3] font-semibold underline decoration-primario decoration-2 underline-offset-4">
                    {conPlanificador ? `Planificar ${minusculaInicial(s.titulo)}` : "Ver el servicio"}&nbsp;→
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        {pie}
      </div>
    </section>
  );
}
