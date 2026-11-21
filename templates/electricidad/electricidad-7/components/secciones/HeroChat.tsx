import type { SiteConfig } from "@andrei-leads/core";

import { ParCta } from "@/components/Botones";
import { ChatWhatsApp } from "@/components/secciones/ChatWhatsApp";
import { IndiceSintomas } from "@/components/secciones/IndiceSintomas";
import { mensajeInicio } from "@/lib/mensajes";
import { valoracionLinea } from "@/lib/textos";

type Props = Pick<SiteConfig, "negocio" | "contacto" | "servicios" | "valoracion">;

/**
 * Hero (sección estrella): h1 «{sector} en {ciudad}», línea fija, llamada-burbuja (lo más grande
 * de la página) y «Mándanos una foto» debajo (al lado en escritorio), valoración y chips. A la
 * derecha (abajo en móvil) el chat. Sin WhatsApp, el índice por síntomas. Nada animado aquí.
 */
export function HeroChat({ negocio, contacto, servicios, valoracion }: Props) {
  const valor = valoracionLinea(valoracion);
  const chips = [contacto.urgencias24h ? "Urgencias 24 h" : null, contacto.tiempoLlegada ? `Llegamos en ${contacto.tiempoLlegada}` : null].filter(
    (c): c is string => !!c,
  );
  return (
    <section aria-labelledby="h1-inicio" className="contenedor pt-7 pb-[clamp(48px,2rem+4vw,104px)]">
      <div className="flex flex-wrap items-center gap-x-[clamp(32px,5vw,72px)] gap-y-7">
        <div className="flex min-w-0 flex-[6_1_320px] flex-col gap-4">
          <h1 id="h1-inicio" className="m-0 text-display leading-[1.02] font-black tracking-[-0.02em]">
            {negocio.sector} en {contacto.direccion.ciudad}
          </h1>
          <p className="m-0 text-entrada leading-snug text-texto-suave">
            {contacto.whatsapp ? "Mándanos una foto y te decimos qué es" : "Llámanos y cuéntanos qué te pasa"}
          </p>
          <ParCta contacto={contacto} mensaje={mensajeInicio(contacto)} className="mt-1" />
          {(valor || chips.length > 0) && (
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2">
              {valor && (
                <p className="m-0 text-base font-bold">
                  <span aria-hidden="true">★ </span>
                  {valor}
                </p>
              )}
              {chips.map((c) => (
                <span
                  key={c}
                  className="inline-flex min-h-[30px] items-center rounded-[14px_14px_14px_4px] border border-linea-fuerte bg-superficie px-3 text-sm font-extrabold"
                >
                  {c}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex min-w-0 flex-[6_1_400px] justify-end">
          <div className="w-full max-w-(--container-chat)">
            {contacto.whatsapp ? <ChatWhatsApp negocio={negocio} contacto={contacto} servicios={servicios} /> : <IndiceSintomas servicios={servicios} />}
          </div>
        </div>
      </div>
    </section>
  );
}
