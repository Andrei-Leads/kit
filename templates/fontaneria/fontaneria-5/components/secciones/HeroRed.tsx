import type { SiteConfig } from "@andrei-leads/core";

import { LlamadaHero, WhatsappContorno } from "@/components/Botones";
import { calcularRed } from "@/lib/red";
import { ramasZonas, valoracionLinea } from "@/lib/formato";
import { Montante } from "./Montante";
import { RedZonas } from "./RedZonas";

type Props = {
  sector: string;
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp" | "urgencias24h" | "tiempoLlegada" | "direccion">;
  zonas: readonly string[];
  valoracion: SiteConfig["valoracion"];
  mensaje: string;
};

/**
 * HeroRed: «{sector} en {ciudad} y alrededores» («y alrededores» solo con zonas distintas de la ciudad) sobre la banda clara del primario cortada en
 * diagonal (6°). Móvil: h1, llamada-hero, whatsapp-hero, valoración y el montante con los 6
 * primeros municipios + «y N más ↓». Escritorio: 6/6, el tiempo de llegada a tamaño display a la
 * izquierda y la red (SVG estático, 5 ramas por vuelta cada 104 px) a la derecha.
 * Nada se anima aquí (LCP: el h1).
 */
export function HeroRed({ sector, contacto, zonas, valoracion, mensaje }: Props) {
  const ciudad = contacto.direccion.ciudad;
  const ramas = ramasZonas(ciudad, zonas);
  const red = calcularRed({ ciudad, zonas, paso: 104, porFila: 5 });
  const lineaValoracion = valoracionLinea(valoracion);
  return (
    <section className="banda-abajo -mt-[72px] bg-banda px-5 pt-24 pb-[72px] lg:-mt-[74px] lg:px-8 lg:pt-[136px] lg:pb-[170px]">
      <div className="mx-auto grid max-w-(--container-contenido) items-start gap-10 lg:grid-cols-2">
        <div>
          {contacto.urgencias24h && (
            <span className="corte-8 inline-flex h-7 items-center bg-tinta pr-4 pl-2.5 font-titulo text-[13px] leading-none font-bold tracking-[0.06em] text-sobre-tinta uppercase lg:h-[30px] lg:text-sm">
              Urgencias 24 h
            </span>
          )}
          <h1 className="mt-3.5 mb-0 font-titulo text-[40px] leading-[1.02] font-bold tracking-[-0.025em] lg:mt-[18px] lg:text-[56px] lg:tracking-[-0.03em]">
            {sector} en {ciudad}
            {ramas.length > 0 && " y alrededores"}
          </h1>
          {contacto.tiempoLlegada && (
            <p className="mt-6 mb-0 hidden lg:block">
              <span className="block text-[19px] leading-[1.2] font-semibold">Llegamos en</span>
              <strong className="block font-titulo text-display leading-[0.95] font-extrabold tracking-[-0.035em] tabular-nums">
                {contacto.tiempoLlegada}
              </strong>
            </p>
          )}
          <div className="mt-5 flex flex-col gap-2.5 lg:mt-7 lg:flex-row lg:flex-wrap lg:items-stretch lg:gap-3">
            <LlamadaHero contacto={contacto} />
            {contacto.whatsapp && (
              <WhatsappContorno numero={contacto.whatsapp} mensaje={mensaje} className="lg:[&>span>span]:pr-7">
                Envíanos una foto por WhatsApp
              </WhatsappContorno>
            )}
          </div>
          {lineaValoracion && <p className="mt-3 mb-0 text-[15px] leading-[1.3] font-semibold lg:mt-3.5 lg:text-base">{lineaValoracion}</p>}
          <Montante ciudad={ciudad} ramas={ramas} max={6} className="mt-[22px] lg:hidden" />
        </div>
        <div className="hidden min-w-0 pt-2 lg:block">
          <RedZonas red={red} />
          {ramas.length > 0 && (
            <ol aria-label="Municipios donde trabajamos" className="sr-only">
              {ramas.map((z) => (
                <li key={z}>{z}</li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}
