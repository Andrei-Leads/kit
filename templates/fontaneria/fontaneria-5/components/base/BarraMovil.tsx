import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { cn } from "@/lib/utils";
import { IconoTelefono, IconoWhatsApp } from "@/components/Iconos";

type Props = {
  telefono: string;
  /** Sin `whatsapp`, Llamar ocupa todo el ancho con el número. */
  whatsapp?: string;
  /** Mensaje general (el mismo en todas las páginas). */
  mensaje: string;
  /** «Llamar 24 h» o «Llamar ahora». */
  textoLlamar: string;
  className?: string;
};

const CELDA =
  "flex min-h-14 flex-1 items-center justify-center gap-2 font-titulo text-[17px] leading-none font-bold no-underline focus-visible:outline-3 focus-visible:-outline-offset-4";

/**
 * Pieza base del registro (kit/registry/base/BarraMovil.tsx), variante `dos` reestilada para
 * «Llegamos»: Llamar en primario a la izquierda y WhatsApp en tinta, separados por un corte en
 * diagonal (barra-llamar | barra-whatsapp). Fija abajo por debajo de 1024 px. Sin animación de
 * entrada (está desde el primer pintado). Va en un `<nav aria-label="Contacto rápido">`; el foco de
 * Llamar va hacia dentro porque el corte en diagonal (clip-path) recortaría el anillo. Sin WhatsApp, Llamar a todo el ancho con el número.
 */
export function BarraMovil({ telefono, whatsapp, mensaje, textoLlamar, className }: Props) {
  return (
    <nav
      aria-label="Contacto rápido"
      className={cn(
        "sobre-tinta fixed inset-x-0 bottom-0 z-40 flex pb-[env(safe-area-inset-bottom)] lg:hidden",
        className,
      )}
    >
      {whatsapp ? (
        <>
          <BotonLlamada
            telefono={telefono}
            className={cn(
              CELDA,
              "-mr-4 bg-primario pr-4 text-sobre-primario [clip-path:polygon(0_0,100%_0,calc(100%-16px)_100%,0_100%)] [--color-foco:var(--color-tinta)] focus-visible:outline-offset-[-5px]",
            )}
          >
            <IconoTelefono />
            {textoLlamar}
            <span className="sr-only"> al {telefonoVisible(telefono)}</span>
          </BotonLlamada>
          <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(CELDA, "bg-tinta pl-4 text-sobre-tinta")}>
            <IconoWhatsApp />
            WhatsApp
          </BotonWhatsApp>
        </>
      ) : (
        <BotonLlamada
          telefono={telefono}
          className={cn(CELDA, "bg-primario text-lg text-sobre-primario tabular-nums [--color-foco:var(--color-tinta)]")}
        >
          <IconoTelefono />
          {textoLlamar} · {telefonoVisible(telefono)}
        </BotonLlamada>
      )}
    </nav>
  );
}
