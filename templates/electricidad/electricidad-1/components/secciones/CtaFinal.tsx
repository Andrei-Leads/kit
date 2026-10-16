import type { SiteConfig } from "@andrei-leads/core";

import { LlamadaCampo, WhatsApp } from "@/components/BotonesContacto";
import { h2, numeroSeccion } from "@/lib/estilos";
import { mensajeGeneral } from "@/lib/mensajes";
import { cn } from "@/lib/utils";

type Props = {
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp" | "mensajeWhatsapp">;
  /** Número de sección ya recalculado («09»). Sin él, no se pinta «NN —». */
  numero?: string;
  /** Mensaje de WhatsApp de la página; por defecto, el general del negocio. */
  mensaje?: string;
  className?: string;
};

/**
 * CTA final: cinta de aviso (6 px, decorativa) + bloque tinta con el h2 y la banda-cta
 * (llamada blanca de 72 px y, si hay WhatsApp, botón con contorno blanco). Foco en blanco.
 */
export function CtaFinal({ contacto, numero, mensaje, className }: Props) {
  return (
    <section className={cn("mt-14 md:mt-24", className)}>
      <div aria-hidden="true" className="cinta-aviso" />
      <div className="sobre-tinta">
        <div className="contenedor py-12 md:py-[72px]">
          {numero && <div className={cn(numeroSeccion, "text-regla")}>{numero} —</div>}
          <h2 className={cn(h2, "mt-4 max-w-[22ch]")}>¿Te quedas sin luz o necesitas el boletín?</h2>
          <div className="mt-7 flex flex-col gap-2.5 md:flex-row md:items-center">
            <LlamadaCampo telefono={contacto.telefono} sobreTinta />
            {contacto.whatsapp && (
              <WhatsApp
                numero={contacto.whatsapp}
                mensaje={mensaje ?? mensajeGeneral(contacto)}
                variante="bandaCta"
              >
                Escríbenos por WhatsApp
              </WhatsApp>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
