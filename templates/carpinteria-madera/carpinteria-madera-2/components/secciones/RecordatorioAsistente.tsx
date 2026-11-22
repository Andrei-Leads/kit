import { BotonLlamada, BotonWhatsApp, type SiteConfig } from "@andrei-leads/core";

import { IconoWhatsApp } from "@/components/Iconos";

type Props = { contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp">; mensaje: string };

/**
 * Recordatorio del asistente (encargo §6.8): no repite el componente. Bloque redondeado del campo
 * pleno con un enlace que sube al asistente (`#asistente`) y la pareja. Sin WhatsApp, no existe.
 */
export function RecordatorioAsistente({ contacto, mensaje }: Props) {
  if (!contacto.whatsapp) return null;
  return (
    <section aria-labelledby="h2-recordatorio" className="px-[clamp(12px,3vw,40px)] pb-[clamp(56px,8vw,96px)]">
      <div className="campo-pleno mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-6 rounded-[32px] p-[clamp(28px,5vw,56px)]">
        <div className="flex max-w-[30ch] flex-col gap-2">
          <h2 id="h2-recordatorio" className="font-titulo text-[clamp(1.6rem,1.2rem+1.6vw,2.6rem)] leading-[1.1] font-bold tracking-[-0.02em]">
            ¿Lo tienes claro? Configúralo en 3 pasos
          </h2>
          <a href="#asistente" className="enlace self-start">
            Volver al configurador ↑
          </a>
        </div>
        <div className="flex max-w-[520px] flex-[1_1_300px] flex-wrap gap-3">
          <BotonWhatsApp numero={contacto.whatsapp} mensaje={mensaje} className="boton boton-acento flex-[1_1_240px] px-6">
            <IconoWhatsApp />
            Escribir por WhatsApp
          </BotonWhatsApp>
          <BotonLlamada telefono={contacto.telefono} className="boton boton-contorno-pleno flex-[1_1_200px] px-6">
            Llamar
          </BotonLlamada>
        </div>
      </div>
    </section>
  );
}
