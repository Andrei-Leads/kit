import { BotonLlamada, BotonWhatsApp } from "@andrei-leads/core";

import { IconoTelefono, IconoWhatsApp } from "@/components/Iconos";
import { cn } from "@/lib/utils";

type Props = {
  telefono: string;
  /** Sin `whatsapp`, Llamar ocupa todo el ancho. */
  whatsapp?: string;
  /** Mensaje general (el mismo en todas las páginas). */
  mensaje: string;
  /** «Llamar 24 h» o «Llamar». */
  textoLlamar: string;
  className?: string;
};

const CELDA =
  "flex min-h-14 items-center justify-center gap-2.5 px-3 font-titulo text-[0.9375rem] font-bold whitespace-nowrap focus-visible:-outline-offset-4";

/**
 * Pieza base del registro (kit/registry/base/BarraMovil.tsx), variante `dos` reestilada en casillas
 * (encargo §3): Llamar en --color-primario y WhatsApp en tinta, separadas por un filete. Es `sticky` y
 * va la última del <body>: al final de la página queda debajo del pie y no tapa nada. Oculta desde
 * 1024 px, donde el índice lateral lleva los dos botones.
 */
export function BarraMovil({ telefono, whatsapp, mensaje, textoLlamar, className }: Props) {
  return (
    <div
      className={cn(
        "barra-parte sticky bottom-0 z-40 grid gap-0.5 border-t-2 border-texto bg-texto pb-[env(safe-area-inset-bottom)] lg:hidden",
        whatsapp ? "grid-cols-2" : "grid-cols-1",
        className,
      )}
    >
      <BotonLlamada telefono={telefono} className={cn(CELDA, "bg-primario text-sobre-primario")}>
        <IconoTelefono />
        <span>{textoLlamar}</span>
      </BotonLlamada>
      {whatsapp && (
        <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(CELDA, "bg-texto text-superficie")}>
          <IconoWhatsApp />
          <span>WhatsApp</span>
        </BotonWhatsApp>
      )}
    </div>
  );
}
