import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { IconoTelefono, IconoWhatsApp } from "@/components/Iconos";

type Props = {
  telefono: string;
  whatsapp?: string;
  mensaje: string;
  textoLlamar: string;
  /** Línea bajo los botones (el horario). */
  horario: string;
};

/**
 * CTA final (v2): bloque superficie con filete de 3 px, «¿Sigue goteando?» y `llamada-cta` (el número a
 * tamaño display sobre latón) + `whatsapp-par` en contorno. Sin WhatsApp, solo el número.
 */
export function CtaFinal({ telefono, whatsapp, mensaje, textoLlamar, horario }: Props) {
  return (
    <section className="border-t-3 border-primario-luz bg-superficie">
      <div className="contenedor py-[clamp(48px,7vw,104px)]">
        <h2 className="condensada text-[clamp(2.25rem,1.4rem+3.6vw,5rem)] leading-[0.95]">¿Sigue goteando?</h2>
        <div className="mt-5 flex flex-wrap items-stretch gap-2.5">
          <BotonLlamada telefono={telefono} className="boton-laton block flex-[3_1_300px] px-[18px] pt-3 pb-3.5">
            <span className="rotulo flex items-center gap-2">
              <IconoTelefono tam={18} />
              {textoLlamar}
            </span>
            <span className="condensada mt-1 block text-[clamp(2.75rem,1.4rem+5.4vw,6.5rem)] leading-[0.95] tracking-normal whitespace-nowrap tabular-nums">
              {telefonoVisible(telefono)}
            </span>
          </BotonLlamada>
          {whatsapp && (
            <BotonWhatsApp
              numero={whatsapp}
              mensaje={mensaje}
              className="boton-contorno flex min-h-14 flex-[1_1_240px] items-center justify-center gap-2.5 px-[18px] py-2 text-center text-[0.9375rem] leading-tight font-bold text-texto"
            >
              <IconoWhatsApp />
              Envíanos una foto por WhatsApp
            </BotonWhatsApp>
          )}
        </div>
        <p className="mt-2.5 text-sm text-texto-suave">{horario}</p>
      </div>
    </section>
  );
}
