import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { Bocadillo, Hamburguesa, Telefono } from "@/components/Iconos";
import { cn } from "@/lib/utils";

type Props = {
  telefono: string;
  /** Sin `whatsapp`: [Menú] + Llamar en el ancho restante. */
  whatsapp?: string;
  /** Mensaje precargado (`mensajeBase(config.contacto)` en todas las páginas). */
  mensaje: string;
  /** «Llamar 24 h» solo con `urgencias24h`; si no, «Llamar». */
  textoLlamar: string;
  /** `id` del `MenuPopover` que abre «Menú». */
  idMenu?: string;
  className?: string;
};

const BOTON = "foco flex min-h-13 items-center justify-center gap-2 px-2 text-[0.9375rem] font-bold";

/**
 * Pieza base del registro (kit/registry/base/BarraMovil.tsx), variante `combinada` reestilada para
 * «Apagón» (encargo §3): [Menú] en superficie · [Llamar] placa primario, la más ancha · [WhatsApp] en
 * superficie con borde. Fija abajo por debajo de 1024 px (`lg:hidden`), con el área segura del iPhone.
 * El `<body>` reserva su altura. Entra desde abajo al cargar (clase `barra`, solo CSS).
 */
export function BarraMovil({ telefono, whatsapp, mensaje, textoLlamar, idMenu = "menu", className }: Props) {
  return (
    <nav
      aria-label="Contacto rápido"
      className={cn(
        "barra fixed inset-x-0 bottom-0 z-40 flex gap-1.5 border-t border-borde/50 bg-fondo px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] lg:hidden",
        className,
      )}
    >
      <button type="button" popoverTarget={idMenu} className={cn(BOTON, "flex-none flex-col gap-0.5 bg-superficie px-3 text-xs")}>
        <Hamburguesa />
        Menú
      </button>
      <BotonLlamada telefono={telefono} className={cn("placa min-h-13 flex-[1.6] px-3 text-[1.0625rem]", "foco")}>
        {/* A 320 px los iconos se quitan para que quepan los tres botones. */}
        <Telefono className="size-[18px] max-[359px]:hidden" />
        {textoLlamar}
        <span className="sr-only"> al {telefonoVisible(telefono)}</span>
      </BotonLlamada>
      {whatsapp && (
        <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(BOTON, "flex-1 border-2 border-borde bg-superficie text-texto")}>
          <Bocadillo className="size-4 max-[359px]:hidden" />
          WhatsApp
        </BotonWhatsApp>
      )}
    </nav>
  );
}
