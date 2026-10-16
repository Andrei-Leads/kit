import Link from "next/link";
import type { Servicio, SiteConfig } from "@andrei-leads/core";
import { ArrowRight, Check } from "lucide-react";

import { LlamadaLinea, WhatsApp } from "@/components/BotonesContacto";
import { buttonVariants } from "@/components/ui/button";
import { cabeceraCaja, etiquetaCampo, h3 } from "@/lib/estilos";
import { minusculaInicial, precioDesde } from "@/lib/formato";
import { mensajeServicio } from "@/lib/mensajes";
import { cn } from "@/lib/utils";

type Props = {
  /** `servicios[0]`: el cliente elige cuál destaca poniéndolo el primero. */
  servicio: Servicio;
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp">;
  className?: string;
};

/**
 * Servicio destacado (Specs §5): bloque con aspecto de documento sobre `primario-tinte` y borde primario.
 * Móvil: info → «Qué incluye» → botones. Escritorio: dos columnas (info y botones a la izquierda,
 * «Qué incluye» a la derecha). Sin `incluye` ni `precioDesde`, se reduce a título, descripción,
 * botones y enlace; nunca hay campos vacíos. Sin `whatsapp`, solo la llamada-linea.
 * El título es el h3 de la sección «Servicios».
 */
export function ServicioDestacado({ servicio, contacto, className }: Props) {
  const precio = servicio.precioDesde ? precioDesde(servicio.precioDesde) : null;
  const hayIncluye = servicio.incluye.length > 0;

  return (
    <article className={cn("border border-primario bg-primario-tinte", className)}>
      <p className="m-0 border-b border-primario px-5 py-2.5 font-mono text-xs leading-none font-bold tracking-[0.14em] text-primario uppercase">
        Servicio destacado
      </p>
      <div
        className={cn(
          "grid gap-7 p-5 md:gap-x-12 md:p-8",
          hayIncluye && "md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:grid-rows-[auto_1fr]"
        )}
      >
        <div className="flex min-w-0 flex-col gap-3.5 md:col-start-1 md:row-start-1">
          <h3 className={cn(h3, "text-balance")}>{servicio.titulo}</h3>
          <p className="m-0 max-w-[52ch] text-[17px] text-tinta-cuerpo text-pretty">{servicio.descripcion}</p>
          {precio && (
            <div className="flex flex-col gap-0.5 self-start border border-regla bg-papel px-4 py-2.5">
              {precio.desde && <span className={etiquetaCampo}>Desde</span>}
              <span className="font-mono text-2xl leading-[1.2] font-bold">{precio.importe}</span>
            </div>
          )}
        </div>

        {hayIncluye && (
          <div className="self-start border border-regla bg-papel px-5 py-[18px] md:col-start-2 md:row-span-2 md:row-start-1">
            <h4 className={cn(cabeceraCaja, "m-0")}>Qué incluye</h4>
            <ul className="m-0 list-none p-0">
              {servicio.incluye.map((punto) => (
                <li
                  key={punto}
                  className="flex items-start gap-3 border-b border-regla py-[11px] leading-[1.4] last:border-b-0"
                >
                  <span
                    aria-hidden="true"
                    className="mt-px flex size-[18px] flex-none items-center justify-center bg-primario text-sobre-primario"
                  >
                    <Check strokeWidth={4} className="size-3" />
                  </span>
                  <span>{punto}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col gap-3 md:col-start-1 md:row-start-2 md:self-start">
          <div className="flex flex-col gap-2.5 md:flex-row md:flex-wrap">
            {contacto.whatsapp && (
              <WhatsApp numero={contacto.whatsapp} mensaje={mensajeServicio(servicio)} variante="tramite">
                Pide presupuesto de {minusculaInicial(servicio.titulo)} por WhatsApp
              </WhatsApp>
            )}
            <LlamadaLinea telefono={contacto.telefono} />
          </div>
          <Link
            href={`/servicios/${servicio.slug}`}
            className={cn(buttonVariants({ variant: "enlaceFlecha" }), "self-start")}
          >
            <span>Ver la guía completa</span>
            <ArrowRight aria-hidden="true" strokeWidth={2} className="size-[18px] flex-none" />
          </Link>
        </div>
      </div>
    </article>
  );
}
