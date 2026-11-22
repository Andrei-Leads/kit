import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { IconoTelefono, IconoWhatsApp } from "@/components/Iconos";
import { cn } from "@/lib/utils";

type Props = {
  telefono: string;
  /** Sin `whatsapp`, «Llamar» a todo el ancho. */
  whatsapp?: string;
  /** Mensaje general en todas las páginas. */
  mensaje: string;
};

const BOTON = "boton min-h-[52px] px-3 text-[17px]";

/**
 * Pieza base del registro, reestilada (encargo §3): variante `dos` de tipo proyecto,
 * [WhatsApp] [Llamar], en una bandeja sobre `superficie` con radios superiores de 20 px. Oculta
 * desde 1024 px. El `<body>` reserva su altura en móvil (layout.tsx).
 */
export function BarraMovil({ telefono, whatsapp, mensaje }: Props) {
  return (
    <nav
      aria-label="Contacto rápido"
      className={cn(
        "barra-bandeja fixed inset-x-0 bottom-0 z-40 grid gap-2.5 rounded-t-[20px] bg-superficie px-3 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom))] shadow-[0_-10px_30px_-16px_rgb(42_32_25/0.45)] lg:hidden",
        whatsapp ? "grid-cols-2" : "grid-cols-1",
      )}
    >
      {whatsapp && (
        <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(BOTON, "boton-guijarro")}>
          <IconoWhatsApp tamano={19} />
          WhatsApp
        </BotonWhatsApp>
      )}
      <BotonLlamada telefono={telefono} className={cn(BOTON, whatsapp ? "boton-tierra" : "boton-guijarro")}>
        <IconoTelefono />
        Llamar
        <span className="sr-only"> al {telefonoVisible(telefono)}</span>
      </BotonLlamada>
    </nav>
  );
}
