import type { ReactNode } from "react";
import { BotonLlamada, BotonWhatsApp } from "@andrei-leads/core";
import { MessageCircle, Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { telefonoVisible } from "@/lib/formato";
import { cn } from "@/lib/utils";

/*
 * Composiciones de las variantes de botón de la Specs §4 sobre BotonLlamada / BotonWhatsApp de core.
 * Core pone el enlace de llamada y el de WhatsApp (nunca `tel:` ni `wa.me` a mano en el template); aquí solo
 * van el contenido y la variante. Ningún botón lleva aria-label: el nombre accesible es el texto visible
 * (los iconos son aria-hidden).
 */

/**
 * llamada-luz: «Llamar ahora» + número en 800 (24 px; 26 en escritorio), luz con texto noche, ≥ 64 px.
 * Hero, CTA final y /contacto. NO se anima en el hero (LCP).
 */
export function LlamadaLuz({
  telefono,
  className,
  grande,
}: {
  telefono: string;
  className?: string;
  /** /contacto: número a 28 px. */
  grande?: boolean;
}) {
  return (
    <BotonLlamada telefono={telefono} className={cn(buttonVariants({ variant: "llamadaLuz" }), className)}>
      <Phone aria-hidden="true" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-6 flex-none" />
      <span className="flex flex-col items-start leading-[1.1]">
        <span className="text-[15px] font-semibold">Llamar ahora</span>
        <span className={cn("font-extrabold tracking-[0.01em] tabular-nums", grande ? "text-[28px]" : "text-2xl lg:text-[26px]")}>
          {telefonoVisible(telefono)}
        </span>
      </span>
    </BotonLlamada>
  );
}

/** llamada-precio: relleno primario a todo el ancho del tablero. Texto por defecto: «Llama y te decimos el precio de lo tuyo». */
export function LlamadaPrecio({
  telefono,
  className,
  children = "Llama y te decimos el precio de lo tuyo",
}: {
  telefono: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <BotonLlamada telefono={telefono} className={cn(buttonVariants({ variant: "llamadaPrecio" }), className)}>
      <Phone aria-hidden="true" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-[18px] flex-none" />
      <span>{children}</span>
    </BotonLlamada>
  );
}

type VarianteWhatsApp = "foto" | "servicio";

const VARIANTE_WHATSAPP = {
  /* whatsapp-foto: hero, CTA final, tablero sin precios y /contacto. */
  foto: "whatsappFoto",
  /* whatsapp-servicio: página de servicio y de trabajo. */
  servicio: "whatsappServicio",
} as const;

/**
 * BotonWhatsApp con icono y la variante pedida. El `mensaje` precargado lo decide la página (lib/mensajes.ts).
 * Sin `children`, «Envíanos una foto de la avería».
 */
export function WhatsApp({
  numero,
  mensaje,
  variante = "foto",
  className,
  children = "Envíanos una foto de la avería",
}: {
  numero: string;
  mensaje: string;
  variante?: VarianteWhatsApp;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <BotonWhatsApp
      numero={numero}
      mensaje={mensaje}
      className={cn(buttonVariants({ variant: VARIANTE_WHATSAPP[variante] }), className)}
    >
      <MessageCircle aria-hidden="true" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5 flex-none" />
      <span>{children}</span>
    </BotonWhatsApp>
  );
}
