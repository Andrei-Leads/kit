import type { SiteConfig } from "@andrei-leads/core";
import { Award } from "lucide-react";

import { ContadorAnios } from "@/components/ContadorAnios";
import { Mancha } from "@/components/Mancha";
import { acreditacionVisible, aniosDeTrayectoria } from "@/lib/formato";
import { cn } from "@/lib/utils";

type Props = {
  anioFundacion?: number;
  /** Año del servidor (`anioActual()` de lib/anio.ts): nunca `new Date()` en el render. */
  anio: number;
  acreditaciones: SiteConfig["acreditaciones"];
  className?: string;
};

/** ¿Hay algo que pintar? La página no la llama si no (sin hueco). */
export function hayConfianza({ anioFundacion, anio, acreditaciones }: Omit<Props, "className">): boolean {
  return (aniosDeTrayectoria(anioFundacion, anio) ?? 0) > 0 || acreditaciones.length > 0;
}

/**
 * Franja de confianza (Specs §2): tarjeta de años con contador (valor final del servidor; 700 ms, Specs §8) y
 * una tarjeta por acreditación con su número (solo si el dato lo trae; nunca «Nº undefined»). Móvil: fila con
 * scroll horizontal que sale a sangre; escritorio: las tarjetas pasan a la línea siguiente si no caben.
 * Sin años ni acreditaciones, no se pinta.
 */
export function Confianza({ anioFundacion, anio, acreditaciones, className }: Props) {
  const anios = aniosDeTrayectoria(anioFundacion, anio);
  const conAnios = anios !== undefined && anios > 0;
  if (!conAnios && acreditaciones.length === 0) return null;
  // Con años y acreditaciones la fila desborda en móvil: la región con scroll recibe foco de teclado.
  const desborda = conAnios && acreditaciones.length > 0;

  return (
    <section aria-label="Confianza" className={cn("pt-11 lg:pt-16", className)}>
      <div
        tabIndex={desborda ? 0 : undefined}
        className="-mx-4 flex gap-2.5 overflow-x-auto px-4 [scrollbar-width:none] md:-mx-10 md:px-10 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0"
      >
        {conAnios && (
          <div className="flex flex-none flex-col justify-center rounded-tarjeta bg-superficie px-5 py-3.5">
            <span className="text-[30px] leading-[1.05] font-extrabold tabular-nums">
              <ContadorAnios valor={anios} /> {anios === 1 ? "año" : "años"}
            </span>
            <span className="text-[15px] text-texto-suave">Desde {anioFundacion}</span>
          </div>
        )}
        {acreditaciones.map((a, i) => {
          const { nombre, numero } = acreditacionVisible(a);
          return (
            <div
              key={`${i}-${nombre}`}
              className="flex w-[270px] flex-none items-start gap-3 rounded-tarjeta bg-superficie px-[18px] py-3.5 lg:flex-1 lg:basis-[260px]"
            >
              <span className="relative flex size-10 flex-none items-center justify-center">
                <Mancha forma="chica" className="inset-0" />
                <Award aria-hidden="true" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="relative z-10 size-5" />
              </span>
              <div className="min-w-0">
                <p className="m-0 text-[15px] leading-[1.3] font-semibold">{nombre}</p>
                {numero && <p className="m-0 mt-1 text-sm text-texto-suave tabular-nums">{numero}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
