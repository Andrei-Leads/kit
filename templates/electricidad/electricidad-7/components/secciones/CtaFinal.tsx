import { horarioVisible, type SiteConfig } from "@andrei-leads/core";

import { LlamadaBurbuja, WhatsappCta } from "@/components/Botones";

/**
 * CTA final: burbuja grande «¿Nos mandas la foto?» (sin WhatsApp, «¿Nos llamas?») con la
 * llamada-burbuja y «Abrir WhatsApp y adjuntar la foto», y el horario.
 */
export function CtaFinal({ contacto, mensaje, titulo }: { contacto: SiteConfig["contacto"]; mensaje: string; titulo?: string }) {
  return (
    <section aria-labelledby="h-cta" className="contenedor py-[clamp(56px,3rem+3vw,112px)]">
      <div className="mx-auto flex max-w-[880px] flex-col gap-[18px] rounded-[40px_40px_40px_10px] bg-superficie p-[clamp(28px,5vw,56px)] shadow-chat">
        <h2 id="h-cta" className="m-0 text-[clamp(2rem,1.5rem+2vw,3.25rem)] leading-[1.05] font-black tracking-[-0.02em]">
          {titulo ?? (contacto.whatsapp ? "¿Nos mandas la foto?" : "¿Nos llamas?")}
        </h2>
        <div className="flex flex-wrap gap-x-3 gap-y-2.5">
          <LlamadaBurbuja contacto={contacto} className="flex-[1_1_240px]" />
          {contacto.whatsapp && <WhatsappCta numero={contacto.whatsapp} mensaje={mensaje} className="flex-[1_1_280px]" />}
        </div>
        {horarioVisible(contacto).map((h) => (
          <p key={h.dias} className="m-0 text-[15.5px] text-texto-suave">
            <strong className="text-texto">{h.dias}</strong> · {h.horas}
          </p>
        ))}
      </div>
    </section>
  );
}
