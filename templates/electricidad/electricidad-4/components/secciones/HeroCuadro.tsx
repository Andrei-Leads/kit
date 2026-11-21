import type { ReactNode } from "react";
import type { Acreditacion, Servicio, SiteConfig } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { Cuadro } from "@/components/Cuadro";
import { valoracionCorta } from "@/lib/formato";

/**
 * Hero del inicio (encargo §6.1): a la izquierda (5/12), chips, h1 «{sector} en {ciudad}»,
 * descripción, pulsador + WhatsApp y valoración; a la derecha (7/12), el cuadro. Es a la vez el
 * hero y la entrada a los servicios. Sin chips, valoración o WhatsApp, cada pieza desaparece.
 * Nada se anima entre el h1 y el pulsador.
 */
export function HeroCuadro({
  negocio,
  contacto,
  valoracion,
  servicios,
  acreditacion,
  mensaje,
}: {
  negocio: Pick<SiteConfig["negocio"], "sector" | "descripcionCorta" | "nombre">;
  contacto: SiteConfig["contacto"];
  valoracion?: SiteConfig["valoracion"];
  servicios: readonly Servicio[];
  acreditacion?: Acreditacion;
  mensaje: string;
}) {
  const chips = [
    contacto.urgencias24h && { texto: "Urgencias 24 h", punto: true },
    contacto.tiempoLlegada && { texto: `Llegamos en ${contacto.tiempoLlegada}`, punto: false },
  ].filter((c): c is { texto: string; punto: boolean } => Boolean(c));

  return (
    <MarcoHero cuadro={<Cuadro servicios={servicios} nombre={negocio.nombre} acreditacion={acreditacion} />}>
      {chips.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {chips.map((c) => (
            <li key={c.texto} className="inline-flex items-center gap-2 border border-borde bg-superficie px-2.5 py-1 text-sm font-medium">
              {c.punto && <span aria-hidden="true" className="size-2 bg-acento" />}
              {c.texto}
            </li>
          ))}
        </ul>
      )}
      <h1 className="text-display leading-[1.02] font-semibold tracking-[-0.01em]">
        {negocio.sector} en {contacto.direccion.ciudad}
      </h1>
      <p className="max-w-[44ch] text-[17px] leading-[1.45] text-texto-suave">{negocio.descripcionCorta}</p>
      <Pareja contacto={contacto} mensaje={mensaje} className="mt-1" />
      {valoracion && (
        <p className="cifras font-medium">
          <span aria-hidden="true">★ </span>
          {valoracionCorta(valoracion)}
        </p>
      )}
    </MarcoHero>
  );
}

/** Dos columnas: texto (5/12) y cuadro (7/12); en móvil, una debajo de otra. */
export function MarcoHero({ children, cuadro }: { children: ReactNode; cuadro: ReactNode }) {
  return (
    <section className="contenedor flex flex-wrap items-start gap-[clamp(28px,4vw,48px)] pt-[clamp(20px,4vw,56px)] pb-[clamp(36px,5vw,64px)]">
      <div className="flex min-w-0 flex-[5_1_320px] flex-col gap-4">{children}</div>
      <div className="min-w-0 flex-[7_1_640px]">{cuadro}</div>
    </section>
  );
}
