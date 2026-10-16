import { BotonLlamada, BotonWhatsApp, type SiteConfig } from "@andrei-leads/core";
import { MessageCircle, Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { telefonoVisible } from "@/lib/formato";
import { mensajeGeneral } from "@/lib/mensajes";
import { textos } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp" | "mensajeWhatsapp" | "email">;
};

/**
 * Columna de acciones de /contacto (mockup 2g/2k, 520 px como máximo): `llamada-acento` grande (68 px, «Llámanos»
 * + número en 26 px), `whatsapp-linea` (56 px; solo con `whatsapp`, mensaje general) y el email como `mailto`
 * con subrayado primario (48 px de alto). Teléfono y WhatsApp, siempre por los botones de core.
 */
export function ContactoBotones({ contacto }: Props) {
  return (
    <div className="flex max-w-[520px] flex-col gap-2.5">
      <BotonLlamada telefono={contacto.telefono} className={buttonVariants({ variant: "llamadaAcentoGrande" })}>
        <Phone aria-hidden="true" strokeWidth={2} strokeLinejoin="round" className="size-6 flex-none" />
        <span className="text-lg font-semibold">{textos.llamanos}</span>
        <span className="text-[26px] font-bold whitespace-nowrap">{telefonoVisible(contacto.telefono)}</span>
      </BotonLlamada>
      {contacto.whatsapp && (
        <BotonWhatsApp
          numero={contacto.whatsapp}
          mensaje={mensajeGeneral(contacto)}
          className={cn(buttonVariants({ variant: "whatsappLinea" }), "min-h-14 text-lg")}
        >
          <MessageCircle aria-hidden="true" strokeWidth={1.75} strokeLinejoin="round" className="size-5 flex-none" />
          <span>{textos.whatsapp}</span>
        </BotonWhatsApp>
      )}
      <a
        href={`mailto:${contacto.email}`}
        className="inline-flex min-h-12 items-center self-start font-semibold text-tinta underline decoration-primario decoration-2 underline-offset-4 [overflow-wrap:anywhere] hover:decoration-4"
      >
        {contacto.email}
      </a>
    </div>
  );
}
