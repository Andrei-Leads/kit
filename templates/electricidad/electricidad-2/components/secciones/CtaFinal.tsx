import { BotonLlamada, BotonWhatsApp, type SiteConfig } from "@andrei-leads/core";
import { MessageCircle, Phone } from "lucide-react";

import { Corte, type Fondo } from "@/components/Corte";
import { buttonVariants } from "@/components/ui/button";
import { h2 } from "@/lib/estilos";
import { telefonoVisible } from "@/lib/formato";
import { mensajeGeneral } from "@/lib/mensajes";
import { textos } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp" | "mensajeWhatsapp">;
  /** Mensaje de WhatsApp de la página; por defecto, el general del negocio. */
  mensaje?: string;
  /** Texto del botón de WhatsApp (por defecto «WhatsApp»; el CTA del trabajo usa «Escríbenos por WhatsApp»). */
  etiquetaWhatsapp?: string;
  /** Fondo de la banda de arriba, para el corte (piedra por defecto). */
  desde?: Fondo;
  titulo?: string;
  texto?: string;
  /** Contenido extra bajo los botones (p. ej. la lista «Otros servicios»). */
  children?: React.ReactNode;
  className?: string;
};

/**
 * CTA final: corte diagonal + bloque tinta con el h2 y la `banda-cta` (llamada blanca de 60 px con
 * «Llamar» + número, y WhatsApp con contorno blanco si hay `contacto.whatsapp`). Foco en blanco.
 * La clase `cta-final` es la marca que usa globals.css para que el pie no repita el corte.
 */
export function CtaFinal({
  contacto,
  mensaje,
  etiquetaWhatsapp = textos.whatsapp,
  desde = "piedra",
  titulo = textos.ctaTitulo,
  texto = textos.ctaTexto,
  children,
  className,
}: Props) {
  return (
    <>
      <Corte de={desde} a="tinta" />
      <section className={cn("cta-final sobre-tinta -mt-px", className)}>
        <div className="contenedor pt-6 pb-14 lg:pt-8 lg:pb-[72px]">
          <h2 className={cn(h2, "mb-2.5")}>{titulo}</h2>
          <p className="mt-0 mb-6 text-lg text-linea">{texto}</p>
          <div className="flex max-w-[600px] flex-wrap gap-3">
            <BotonLlamada telefono={contacto.telefono} className={buttonVariants({ variant: "bandaCtaLlamar" })}>
              <Phone aria-hidden="true" strokeWidth={2} strokeLinejoin="round" className="size-[22px] flex-none" />
              <span className="text-lg font-semibold">{textos.llamar}</span>
              <span className="text-[23px] font-bold whitespace-nowrap">{telefonoVisible(contacto.telefono)}</span>
            </BotonLlamada>
            {contacto.whatsapp && (
              <BotonWhatsApp
                numero={contacto.whatsapp}
                mensaje={mensaje ?? mensajeGeneral(contacto)}
                className={buttonVariants({ variant: "bandaCtaWhatsapp" })}
              >
                <MessageCircle aria-hidden="true" strokeWidth={1.75} strokeLinejoin="round" className="size-5 flex-none" />
                <span>{etiquetaWhatsapp}</span>
              </BotonWhatsApp>
            )}
          </div>
          {children}
        </div>
      </section>
    </>
  );
}
