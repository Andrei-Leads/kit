import { BotonLlamada, type SiteConfig } from "@andrei-leads/core";

import { IconoTelefono } from "@/components/Iconos";
import { boton, elevar, tarjeta } from "@/lib/estilos";
import { textoLlamarCorto } from "@/lib/formato";
import type { PrecioTarjeta } from "@/lib/precios";
import { cn } from "@/lib/utils";

type Props = {
  precio: PrecioTarjeta;
  /**
   * «hero»: sin botón ni animación (la del hero, solapada sobre la foto). «seccion»: con «Llamar
   * ahora» en contorno, título h3, aparición al hacer scroll y elevación al pasar.
   */
  variante: "hero" | "seccion";
  contacto?: Pick<SiteConfig["contacto"], "telefono" | "urgencias24h">;
  className?: string;
};

/**
 * Tarjeta de precio cerrado (encargo §5): concepto arriba, precio enorme en cifras tabulares (en
 * --color-texto, nunca en primario) y la píldora «Precio cerrado» / «Precio desde» en primario suave.
 * Si el precio empieza por «desde», la palabra va pequeña delante de la cifra.
 */
export function TarjetaPrecio({ precio, variante, contacto, className }: Props) {
  const seccion = variante === "seccion";
  const Concepto = seccion ? "h3" : "p";
  return (
    <div
      {...(seccion ? { "data-aparecer": "subir" } : {})}
      className={cn(
        tarjeta,
        "flex flex-wrap items-end gap-x-8 gap-y-5",
        seccion ? cn("p-[clamp(22px,2.6vw,32px)]", elevar) : "p-6",
        className,
      )}
    >
      <div className="flex min-w-0 flex-[1_1_240px] flex-col gap-3">
        {precio.concepto && <Concepto className="m-0 text-lg leading-[1.3] font-semibold">{precio.concepto}</Concepto>}
        <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2">
          <p className="m-0 flex items-baseline gap-2 tabular-nums">
            {precio.desde && <span className="text-lg font-semibold text-texto-suave">desde</span>}
            <span className={cn("font-extrabold", precio.cifra ? "text-precio" : "text-h2 leading-tight")}>{precio.importe}</span>
          </p>
          {precio.etiqueta && (
            <span className={cn("rounded-full bg-primario-suave px-3 py-2 text-sm leading-none font-bold text-texto", seccion && "pildora-precio")}>
              {precio.etiqueta}
            </span>
          )}
        </div>
      </div>
      {seccion && contacto && (
        <div className="flex flex-[1_1_200px]">
          <BotonLlamada telefono={contacto.telefono} className={boton.llamadaTarifa}>
            <IconoTelefono tamano={18} />
            <span>{textoLlamarCorto(contacto)}</span>
          </BotonLlamada>
        </div>
      )}
    </div>
  );
}
