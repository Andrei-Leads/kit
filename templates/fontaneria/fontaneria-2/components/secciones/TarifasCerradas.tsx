import type { SiteConfig } from "@andrei-leads/core";

import { h2Seccion } from "@/lib/estilos";
import type { PrecioTarjeta } from "@/lib/precios";
import { cn } from "@/lib/utils";

import { TarjetaPrecio } from "./TarjetaPrecio";

type Props = {
  precios: PrecioTarjeta[];
  nota?: string;
  contacto: Pick<SiteConfig["contacto"], "telefono" | "urgencias24h">;
};

/**
 * Sección estrella «Lo que cuesta, antes de ir» (encargo §5 y §6.2). Una tarjeta por precio; en
 * escritorio, 1 precio = tarjeta ancha, 2 o 4 = 2 columnas, el resto = 3; en móvil, apiladas. La
 * `nota` va una sola vez, visible y a 1 rem. Sin precios, la sección no existe.
 */
export function TarifasCerradas({ precios, nota, contacto }: Props) {
  if (precios.length === 0) return null;
  const n = precios.length;
  const columnas = n === 1 ? "" : n === 2 || n === 4 ? "lg:grid-cols-2" : "lg:grid-cols-3";
  return (
    <section aria-labelledby="titulo-tarifas" className="contenedor flex flex-col gap-[clamp(24px,3vw,40px)] bg-fondo py-[clamp(48px,6vw,96px)]">
      <div className="flex max-w-180 flex-col gap-2.5">
        <h2 id="titulo-tarifas" className={h2Seccion}>
          Lo que cuesta, antes de ir
        </h2>
        <p className="m-0 text-texto-suave">
          {precios.some((p) => p.etiqueta === "Precio cerrado")
            ? "Llama, cuéntanos qué te pasa y te confirmamos el precio antes de salir hacia tu casa."
            : "Precios orientativos. Llama, cuéntanos qué te pasa y te decimos lo que costaría lo tuyo."}
        </p>
      </div>
      <div className={cn("grid grid-cols-1 gap-4", columnas)}>
        {precios.map((p) => (
          <TarjetaPrecio key={p.concepto} precio={p} variante="seccion" contacto={contacto} />
        ))}
      </div>
      {nota && <p className="m-0 max-w-[72ch] text-base text-texto-suave">{nota}</p>}
    </section>
  );
}
