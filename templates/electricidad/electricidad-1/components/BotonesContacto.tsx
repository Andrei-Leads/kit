import type { ReactNode } from "react";
import { BotonLlamada, BotonWhatsApp } from "@andrei-leads/core";
import { MessageCircle, Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { telefonoVisible } from "@/lib/formato";
import { cn } from "@/lib/utils";

/*
 * Composiciones de las variantes de botón de la Specs §4 sobre BotonLlamada / BotonWhatsApp de core.
 * Core pone el enlace de llamada y el de WhatsApp; aquí solo van el contenido y la variante. Ningún botón lleva
 * aria-label: el nombre accesible es el texto visible (los iconos son aria-hidden).
 */

/**
 * llamada-campo: «LLAMAR» + número en mono (25 px), ≥ 72 px. En el hero y /contacto va sobre
 * primario; con `sobreTinta` es la `banda-cta` del CTA final (blanca sobre tinta).
 */
export function LlamadaCampo({
  telefono,
  sobreTinta,
  className,
}: {
  telefono: string;
  sobreTinta?: boolean;
  className?: string;
}) {
  return (
    <BotonLlamada
      telefono={telefono}
      className={cn(buttonVariants({ variant: sobreTinta ? "bandaCtaLlamar" : "llamadaCampo" }), className)}
    >
      <Phone aria-hidden="true" strokeWidth={2} strokeLinejoin="round" className="size-[26px] flex-none" />
      <span className="flex flex-col gap-[3px] leading-[1.05]">
        <span className="font-mono text-[11px] font-medium tracking-[0.18em]">LLAMAR</span>
        <span className="font-mono text-[25px] font-bold tracking-[-0.01em]">{telefonoVisible(telefono)}</span>
      </span>
    </BotonLlamada>
  );
}

/** llamada-linea: «Llamar al» + número en mono, con contorno. Destacado y guías. */
export function LlamadaLinea({ telefono, className }: { telefono: string; className?: string }) {
  return (
    <BotonLlamada telefono={telefono} className={cn(buttonVariants({ variant: "llamadaLinea" }), className)}>
      <span>Llamar al</span>
      <span className="font-mono">{telefonoVisible(telefono)}</span>
    </BotonLlamada>
  );
}

type VarianteWhatsApp = "foto" | "tramite" | "bandaCta";

const VARIANTE_WHATSAPP = {
  /* whatsapp-foto: contorno tinta (hero y /contacto). */
  foto: "whatsappFoto",
  /* whatsapp-tramite: relleno primario (destacado y guías). */
  tramite: "whatsappTramite",
  /* banda-cta: contorno blanco sobre tinta (CTA final). */
  bandaCta: "bandaCtaWhatsapp",
} as const;

/** BotonWhatsApp con icono y la variante pedida. El `mensaje` precargado lo decide la página (lib/mensajes.ts). */
export function WhatsApp({
  numero,
  mensaje,
  variante,
  className,
  children,
}: {
  numero: string;
  mensaje: string;
  variante: VarianteWhatsApp;
  className?: string;
  children: ReactNode;
}) {
  return (
    <BotonWhatsApp
      numero={numero}
      mensaje={mensaje}
      className={cn(buttonVariants({ variant: VARIANTE_WHATSAPP[variante] }), className)}
    >
      <MessageCircle aria-hidden="true" strokeWidth={2} strokeLinejoin="round" className="size-5 flex-none" />
      <span>{children}</span>
    </BotonWhatsApp>
  );
}
