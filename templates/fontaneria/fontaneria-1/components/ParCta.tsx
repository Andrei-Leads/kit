import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

import { IconoTelefono, IconoWhatsApp } from "./Iconos";

type Props = {
  telefono: string;
  whatsapp?: string;
  /** Mensaje precargado de WhatsApp de esta página. */
  mensaje: string;
  /** «Llamar 24 h» o «Llamar ahora» (lib/textos.ts). */
  textoLlamar: string;
  textoWhatsapp?: string;
  /** Línea de confianza bajo la pareja (valoración, horario…). */
  confianza?: string;
  /**
   * true: `llamada-hero` (64 px, rótulo en mayúsculas y número debajo) + `whatsapp-hero` (56 px).
   * false: `llamada-par` + `whatsapp-par` (56 px, en una línea).
   */
  grande?: boolean;
  className?: string;
};

/**
 * La pareja de CTAs de «Qué te pasa» (v2): manda LLAMAR, en latón y más ancho; WhatsApp en contorno
 * debajo (móvil) o al lado (cuando cabe). Sin WhatsApp, la llamada ocupa todo el ancho.
 */
export function ParCta({ telefono, whatsapp, mensaje, textoLlamar, textoWhatsapp = "Envíanos una foto por WhatsApp", confianza, grande, className }: Props) {
  const numero = telefonoVisible(telefono);
  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      <div className="flex flex-wrap gap-2.5">
        <BotonLlamada
          telefono={telefono}
          className={cn(
            "boton-laton flex px-[18px] py-2",
            grande
              ? "min-h-16 flex-[1_1_200px] flex-col items-start justify-center gap-1"
              : "min-h-14 flex-[1.3_1_220px] flex-row items-center justify-center gap-2.5",
          )}
        >
          <span className="flex items-center gap-2">
            <IconoTelefono />
            <span
              className={cn(
                grande ? "text-[0.8125rem] tracking-[0.08em] uppercase" : "condensada text-[1.375rem] tracking-normal",
                "leading-none font-extrabold whitespace-nowrap",
              )}
            >
              {textoLlamar}
            </span>
          </span>
          <span className={cn("condensada tracking-normal whitespace-nowrap tabular-nums", grande ? "text-[28px]" : "text-[1.375rem]", "leading-none")}>
            {grande ? numero : `· ${numero}`}
          </span>
        </BotonLlamada>
        {whatsapp && (
          <BotonWhatsApp
            numero={whatsapp}
            mensaje={mensaje}
            className={cn(
              "boton-contorno flex min-h-14 items-center justify-center gap-2.5 px-4 py-1.5 text-center text-[0.9375rem] leading-tight font-bold text-texto",
              grande ? "flex-[1.6_1_150px]" : "flex-[1_1_150px]",
            )}
          >
            <IconoWhatsApp />
            <span>{textoWhatsapp}</span>
          </BotonWhatsApp>
        )}
      </div>
      {confianza && <p className="text-sm leading-snug text-texto-suave">{confianza}</p>}
    </div>
  );
}
