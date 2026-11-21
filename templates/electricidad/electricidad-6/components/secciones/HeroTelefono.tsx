import type { SiteConfig } from "@andrei-leads/core";

import { TelefonoGigante } from "@/components/Botones";
import { Valoracion } from "@/components/Valoracion";
import { textosValoracion } from "@/lib/textos";

type Props = {
  sector: string;
  contacto: SiteConfig["contacto"];
  valoracion?: SiteConfig["valoracion"];
  mensaje: string;
};

/**
 * HeroTelefono (encargo §6.1): chips en paralelogramo («Urgencias 24 h», «Llegamos en X», solo con
 * dato), h1 «{sector} en {ciudad}» y el telefono-gigante, WhatsApp y la valoración. Sin foto: fondo
 * negro con el haz de linterna estático. Nada se anima. En escritorio, a la derecha, las cifras cortas
 * de la estrella (repiten chips y valoración: `aria-hidden`).
 */
export function HeroTelefono({ sector, contacto, valoracion, mensaje }: Props) {
  const { urgencias24h, tiempoLlegada } = contacto;
  const cortas = [
    urgencias24h && { valor: "24 h", etiqueta: "Urgencias" },
    tiempoLlegada && { valor: tiempoLlegada, etiqueta: "Llegada" },
    valoracion && { valor: `${textosValoracion(valoracion).media} ★`, etiqueta: textosValoracion(valoracion).total.replace(" en Google", "") },
  ].filter((c): c is { valor: string; etiqueta: string } => Boolean(c));

  return (
    <section className="bg-fondo [background-image:var(--haz)]">
      <div className="contenedor grid gap-8 pt-6 pb-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 lg:py-13">
        <div className="flex min-w-0 flex-col gap-4 lg:gap-5">
          {(urgencias24h || tiempoLlegada) && (
            <p className="m-0 flex flex-wrap gap-x-3 gap-y-2 ps-1.5">
              {urgencias24h && (
                <span className="chip">
                  <span aria-hidden="true" className="size-2 rounded-full bg-acento" />
                  Urgencias 24 h
                </span>
              )}
              {tiempoLlegada && <span className="chip">Llegamos en {tiempoLlegada}</span>}
            </p>
          )}
          <h1 className="titulo-h1 m-0">
            {sector} en {contacto.direccion.ciudad}
          </h1>
          <TelefonoGigante contacto={contacto} mensaje={mensaje} className="mt-1" />
          <Valoracion valoracion={valoracion} />
        </div>
        {cortas.length > 0 && (
          <div aria-hidden="true" className="hidden flex-col gap-5 border-s-2 border-borde/40 ps-7 lg:flex">
            {cortas.map((c) => (
              <div key={c.etiqueta}>
                <p className="condensada m-0 text-[4.25rem] leading-[0.95] whitespace-nowrap">{c.valor}</p>
                <p className="rotulo m-0 mt-1">{c.etiqueta}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
