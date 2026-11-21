import { BotonLlamada, telefonoVisible, type SiteConfig } from "@andrei-leads/core";

import { MarcasCorte } from "@/components/Marcas";
import { Pareja } from "@/components/Pareja";

type Props = {
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp" | "urgencias24h">;
  /** Línea de confianza (lineaConfianza) calculada en la página. */
  confianza?: string;
  titulo?: string;
  /** Mensaje de WhatsApp de la página. */
  mensaje: string;
  textoWhatsapp?: string;
};

/**
 * CtaFinal (encargo §6.9): hoja de papel de calco azul («Copia para el cliente») con el teléfono a
 * --text-telefono (`llamada-cta`), la pareja de botones y la línea «Firma del cliente: ____» como
 * detalle gráfico (`aria-hidden`, sin campo).
 */
export function CtaFinal({ contacto, confianza, titulo = "¿Tienes una avería ahora?", mensaje, textoWhatsapp }: Props) {
  const { telefono } = contacto;
  return (
    <section id="abrir-aviso" aria-labelledby="h2-cta" className="px-(--pad) py-(--sec)">
      <div className="relative border border-sobre-calco bg-calco px-5 pt-7 pb-6 text-sobre-calco">
        <MarcasCorte inset={6} />
        <div className="font-titulo text-xs font-bold tracking-[0.06em] uppercase">Copia para el cliente</div>
        <h2 id="h2-cta" className="h2-parte mt-2.5 mb-4.5">
          {titulo}
        </h2>
        <BotonLlamada
          telefono={telefono}
          className="inline-block max-w-full border-b border-sobre-calco pb-2 font-titulo text-telefono-cta leading-none font-semibold tracking-[-0.02em] text-sobre-calco no-underline [font-stretch:75%]"
        >
          {telefonoVisible(telefono)}
        </BotonLlamada>
        <Pareja contacto={contacto} mensaje={mensaje} textoWhatsapp={textoWhatsapp} fondo="calco" confianza={confianza} className="mt-6" />
        <div aria-hidden="true" className="mt-8 flex items-end gap-2.5 font-titulo text-xs tracking-[0.06em] uppercase">
          <span className="flex-none">Firma del cliente:</span>
          <span className="h-px max-w-[260px] flex-1 border-b border-sobre-calco" />
        </div>
      </div>
    </section>
  );
}
