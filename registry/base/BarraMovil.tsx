import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

type Props = {
  telefono: string;
  /** Sin `whatsapp`, solo sale Llamar (y el menú en la combinada). */
  whatsapp?: string;
  /** Mensaje precargado (`mensajeGeneral(config.contacto)` en todas las páginas). */
  mensaje: string;
  /**
   * "dos": dos botones. "combinada": [Menú] [Llamar] [WhatsApp], solo urgencias
   * (el menú abre el `MenuPopover` con `id={idMenu}` y `sinBoton`).
   */
  variante: "dos" | "combinada";
  /** Botón principal a la izquierda: "llamar" (urgencias, obra técnica) o "whatsapp" (proyecto). */
  primero?: "llamar" | "whatsapp";
  idMenu?: string;
  className?: string;
};

const BOTON =
  "flex min-h-14 flex-1 items-center justify-center gap-2 px-3 text-base font-semibold focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-foco";

/**
 * Pieza base del registro (kit/registry/base/BarraMovil.tsx). Barra fija abajo
 * en móvil (oculta desde `md`). Usa `BotonLlamada` y `BotonWhatsApp` de core.
 * Deja sitio con el área segura del iPhone. El template reserva su altura al
 * final del `<body>` (p. ej. `pb-[calc(3.5rem+env(safe-area-inset-bottom))]` en móvil).
 *
 * Tokens: --color-primario, --color-sobre-primario, --color-fondo,
 * --color-texto, --color-borde, --color-foco.
 */
export function BarraMovil({ telefono, whatsapp, mensaje, variante, primero = "llamar", idMenu = "menu", className }: Props) {
  const llamar = (
    <BotonLlamada key="llamar" telefono={telefono} className={cn(BOTON, primero === "llamar" ? "bg-primario text-sobre-primario" : "bg-fondo text-texto")}>
      Llamar
      <span className="sr-only"> al {telefonoVisible(telefono)}</span>
    </BotonLlamada>
  );
  const wa = whatsapp && (
    <BotonWhatsApp key="wa" numero={whatsapp} mensaje={mensaje} className={cn(BOTON, primero === "whatsapp" ? "bg-primario text-sobre-primario" : "bg-fondo text-texto")}>
      WhatsApp
    </BotonWhatsApp>
  );
  const botones = primero === "llamar" ? [llamar, wa] : [wa, llamar];

  return (
    <nav
      aria-label="Contacto rápido"
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 flex divide-x divide-borde border-t border-borde bg-fondo pb-[env(safe-area-inset-bottom)] md:hidden",
        className,
      )}
    >
      {variante === "combinada" && (
        <button type="button" popoverTarget={idMenu} className={cn(BOTON, "flex-none bg-fondo text-texto")}>
          Menú
        </button>
      )}
      {botones}
    </nav>
  );
}
