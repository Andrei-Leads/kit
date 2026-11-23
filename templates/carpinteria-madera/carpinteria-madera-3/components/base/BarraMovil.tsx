import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { IconoTelefono, IconoWhatsApp } from "@/components/Iconos";
import { cn } from "@/lib/utils";

type Props = {
  telefono: string;
  /** Sin `whatsapp`, solo sale Llamar, a todo el ancho y en primario. */
  whatsapp?: string;
  /** Mensaje precargado (el general del taller, en todas las páginas). */
  mensaje: string;
};

const BOTON =
  "flex min-h-14 flex-[1_1_50%] items-center justify-center gap-2 px-3 font-titulo text-[13px] font-semibold tracking-[0.05em] uppercase no-underline active:translate-y-px focus-visible:outline-3 focus-visible:-outline-offset-[5px] focus-visible:outline-fondo";

/**
 * Pieza base del registro (kit/registry/base/BarraMovil.tsx), reestilada como la «barra-ancho» del
 * diseño: variante `dos` de proyecto, [WhatsApp | Llamar], fija abajo por debajo de 1024 px, con
 * icono y texto, 56 px más el área segura. WhatsApp en primario y Llamar en tinta; sin WhatsApp,
 * Llamar en primario a todo el ancho. Entra desde abajo al cargar (`.barra-banco`, globals.css).
 * El `<body>` reserva su altura (layout.tsx).
 */
export function BarraMovil({ telefono, whatsapp, mensaje }: Props) {
  return (
    <nav aria-label="Contacto rápido" className="barra-banco fixed inset-x-0 bottom-0 z-40 flex bg-texto pb-[env(safe-area-inset-bottom)] lg:hidden">
      {whatsapp && (
        <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(BOTON, "bg-primario text-sobre-primario hover:text-sobre-primario")}>
          <IconoWhatsApp />
          <span>WhatsApp</span>
        </BotonWhatsApp>
      )}
      <BotonLlamada
        telefono={telefono}
        className={cn(BOTON, whatsapp ? "bg-texto text-fondo hover:text-fondo" : "bg-primario text-sobre-primario hover:text-sobre-primario")}
      >
        <IconoTelefono />
        <span>Llamar</span>
        <span className="sr-only"> al {telefonoVisible(telefono)}</span>
      </BotonLlamada>
    </nav>
  );
}
