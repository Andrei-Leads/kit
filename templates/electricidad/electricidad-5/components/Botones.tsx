import type { ReactNode } from "react";
import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { IconoTelefono, IconoWhatsapp } from "@/components/Iconos";
import type { DatosCta } from "@/lib/textos";
import { TEXTO_WHATSAPP } from "@/lib/textos";
import { cn } from "@/lib/utils";

/*
 * Variantes de botón de «Casa al día» (encargo §3; especificación §5). Todas son
 * `className` de BotonLlamada / BotonWhatsApp de core. `.boton` (globals.css)
 * añade el pulsado (scale .98) y la transición del color.
 */

/** llamada-pleno: pastilla de 60 px en superficie sobre el pleno, icono en círculo primario. */
export const llamadaPleno =
  "boton inline-flex min-h-[60px] w-full items-center gap-3.5 rounded-boton bg-superficie py-1.5 pr-7 pl-1.5 text-texto no-underline hover:bg-alterna sm:w-auto";
/** whatsapp-pleno: borde 2 px en sobre-primario, fondo transparente. */
export const whatsappPleno =
  "boton inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-boton border-2 border-sobre-primario px-6 py-2 font-semibold text-sobre-primario no-underline hover:bg-sobre-primario/12 sm:w-auto";
/** llamada-suave: pastilla primario con sobre-primario (fuera del pleno). */
export const llamadaSuave =
  "boton inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-boton bg-primario px-6 py-2 font-bold text-sobre-primario no-underline tabular-nums hover:bg-pleno-hover sm:w-auto";
/** whatsapp-suave: superficie con borde 2 px en texto. */
export const whatsappSuave =
  "boton inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-boton border-2 border-texto bg-superficie px-6 py-2 font-semibold text-texto no-underline hover:bg-alterna sm:w-auto";

/** Icono de teléfono en el círculo primario de 48 px (llamada-pleno). */
export function CirculoTelefono({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("grid size-12 flex-none place-items-center rounded-full bg-primario text-sobre-primario", className)}>
      <IconoTelefono />
    </span>
  );
}

/** Contenido de llamada-pleno: «Llamar 24 h» y el número debajo. */
export function ContenidoLlamadaPleno({ texto, telefono }: { texto: string; telefono: string }) {
  return (
    <>
      <CirculoTelefono />
      <span className="flex flex-col text-left leading-tight">
        <span className="text-lg font-bold">{texto}</span>
        <span className="tabular-nums">{telefonoVisible(telefono)}</span>
      </span>
    </>
  );
}

type PropsPareja = {
  cta: DatosCta;
  /** "pleno": sobre la banda de color; "claro": sobre el fondo o una tarjeta. */
  tono: "pleno" | "claro";
  textoWhatsapp?: ReactNode;
  className?: string;
};

/**
 * Pareja Llamar + WhatsApp. En móvil, una debajo de otra a todo el ancho;
 * desde 640 px, en fila. Sin WhatsApp, solo Llamar (sin hueco).
 */
export function Pareja({ cta, tono, textoWhatsapp = TEXTO_WHATSAPP, className }: PropsPareja) {
  const { telefono, whatsapp, mensaje, textoLlamada } = cta;
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center", className)}>
      {tono === "pleno" ? (
        <BotonLlamada telefono={telefono} className={llamadaPleno}>
          <ContenidoLlamadaPleno texto={textoLlamada} telefono={telefono} />
        </BotonLlamada>
      ) : (
        <BotonLlamada telefono={telefono} className={llamadaSuave}>
          <IconoTelefono />
          <span>
            {textoLlamada} <span aria-hidden="true">·</span> {telefonoVisible(telefono)}
          </span>
        </BotonLlamada>
      )}
      {whatsapp && (
        <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={tono === "pleno" ? whatsappPleno : whatsappSuave}>
          <IconoWhatsapp />
          {textoWhatsapp}
        </BotonWhatsApp>
      )}
    </div>
  );
}
