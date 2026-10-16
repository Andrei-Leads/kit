import type { SiteConfig } from "@andrei-leads/core";

import { LlamadaLuz, WhatsApp } from "@/components/BotonesContacto";
import { Mancha } from "@/components/Mancha";
import { mensajeGeneral } from "@/lib/mensajes";
import { cn } from "@/lib/utils";

type Props = {
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp" | "mensajeWhatsapp">;
  /** h2. Por defecto «¿Sigue sin luz?» (en un trabajo: «¿Quieres algo parecido?»). */
  titulo?: string;
  /** Texto del botón de WhatsApp. Por defecto «Envíanos una foto de la avería». */
  etiquetaWhatsapp?: string;
  /** Mensaje de WhatsApp de la página; por defecto, el general del negocio. */
  mensaje?: string;
  className?: string;
};

/**
 * CTA final (Specs §2): mancha de luz grande (460 px móvil, 720 px escritorio) que crece una vez al
 * entrar en pantalla, h2 en 800 (36 → 52 px) y llamada-luz + whatsapp-foto (con fondo noche para que
 * el contorno se vea sobre la mancha). Sin WhatsApp, solo la llamada-luz. Texto centrado, ancho máx. 440 px.
 */
export function CtaFinal({ contacto, titulo = "¿Sigue sin luz?", etiquetaWhatsapp, mensaje, className }: Props) {
  return (
    <section className={cn("relative mt-11 overflow-hidden px-4 py-[60px] md:px-10 lg:mt-16 lg:py-20", className)}>
      <Mancha
        forma="cta"
        animada
        className="top-1/2 left-1/2 aspect-[1.3] w-[460px] -translate-x-1/2 -translate-y-1/2 lg:w-[720px]"
      />
      <div className="relative z-10 mx-auto flex max-w-[440px] flex-col items-stretch gap-3 text-center">
        <h2 className="m-0 mb-1.5 text-4xl leading-[1.05] font-extrabold tracking-[-0.02em] text-balance lg:text-[52px]">
          {titulo}
        </h2>
        <LlamadaLuz telefono={contacto.telefono} className="lg:w-full lg:pr-6 lg:pl-6" />
        {contacto.whatsapp && (
          <WhatsApp numero={contacto.whatsapp} mensaje={mensaje ?? mensajeGeneral(contacto)} className="bg-noche">
            {etiquetaWhatsapp}
          </WhatsApp>
        )}
      </div>
    </section>
  );
}
