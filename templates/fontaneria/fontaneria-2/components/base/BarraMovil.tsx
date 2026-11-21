import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

type Props = {
  telefono: string;
  /** Sin `whatsapp`, solo sale Llamar (y el menú en la combinada). */
  whatsapp?: string;
  /** Mensaje precargado (el mensaje general en todas las páginas). */
  mensaje: string;
  /**
   * "dos": dos botones. "combinada": [Menú] [Llamar] [WhatsApp], solo urgencias
   * (el menú abre el `MenuPopover` con `id={idMenu}` y `sinBoton`).
   */
  variante: "dos" | "combinada";
  /** Botón principal a la izquierda: "llamar" (urgencias, obra técnica) o "whatsapp" (proyecto). */
  primero?: "llamar" | "whatsapp";
  /** Texto visible del botón de llamada («Llamar ahora» o «Llamar 24 h»). */
  textoLlamar?: string;
  idMenu?: string;
  className?: string;
};

const BOTON =
  "foco flex min-h-14 items-center justify-center gap-2 rounded-boton px-3 text-[1.0625rem] font-bold whitespace-nowrap no-underline transition-transform duration-100 active:scale-[.98] motion-reduce:transition-none";

function IconoTelefono() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-none">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconoMensaje() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-none">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

/**
 * Pieza base del registro (kit/registry/base/BarraMovil.tsx). Barra fija abajo
 * en móvil. Usa `BotonLlamada` y `BotonWhatsApp` de core. Deja sitio con el área
 * segura del iPhone; el template reserva su altura al final del `<body>`.
 *
 * Reestilada en fontaneria-2 (revisión de CTAs v2): barra blanca con sombra
 * suave hacia arriba y dos píldoras de 56 px en proporción 1,25 : 1 («Llamar
 * ahora» relleno | «Escribir» con contorno y «por WhatsApp» para el lector de
 * pantalla). Oculta desde 960 px (`lg`), donde la cabecera lleva los dos botones.
 * Sin animación de entrada: el botón de llamada está visible desde el primer pintado.
 * Va en un `<nav aria-label="Contacto rápido">` para que sea un punto de referencia.
 *
 * Tokens: --color-primario, --color-sobre-primario, --color-fondo,
 * --color-texto, --color-borde, --color-foco, --radius-boton.
 */
export function BarraMovil({
  telefono,
  whatsapp,
  mensaje,
  variante,
  primero = "llamar",
  textoLlamar = "Llamar ahora",
  idMenu = "menu",
  className,
}: Props) {
  const llamar = (
    <BotonLlamada
      key="llamar"
      telefono={telefono}
      className={cn(BOTON, "flex-[1.25] bg-primario text-sobre-primario tabular-nums")}
    >
      <IconoTelefono />
      <span>{textoLlamar}</span>
      <span className="sr-only"> al {telefonoVisible(telefono)}</span>
    </BotonLlamada>
  );
  const wa = whatsapp && (
    <BotonWhatsApp
      key="wa"
      numero={whatsapp}
      mensaje={mensaje}
      className={cn(BOTON, "flex-1 border-2 border-texto bg-fondo text-texto")}
    >
      <IconoMensaje />
      <span>Escribir</span>
      <span className="sr-only"> por WhatsApp</span>
    </BotonWhatsApp>
  );
  const botones = primero === "llamar" ? [llamar, wa] : [wa, llamar];

  return (
    <nav
      aria-label="Contacto rápido"
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-borde bg-fondo px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-barra lg:hidden",
        className,
      )}
    >
      {variante === "combinada" && (
        <button type="button" popoverTarget={idMenu} className={cn(BOTON, "flex-none border border-borde bg-fondo text-texto")}>
          Menú
        </button>
      )}
      {botones}
    </nav>
  );
}
