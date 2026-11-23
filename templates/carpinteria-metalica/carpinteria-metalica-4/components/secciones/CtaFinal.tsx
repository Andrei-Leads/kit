import { BotonLlamada, horarioVisible, telefonoVisible, type SiteConfig } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { IconoTelefono } from "@/components/Iconos";

type Props = {
  contacto: SiteConfig["contacto"];
  /** Mensaje de WhatsApp de la página (el general salvo en las fichas). */
  mensaje: string;
  /** Texto del botón de WhatsApp. */
  textoWhatsapp?: string;
};

/**
 * `CtaFinal` (encargo §6.9): un cajetín grande en cianotipia con los dos botones y, a la derecha,
 * horario (`formatearHorario` vía `horarioVisible`), dirección del taller y teléfono. En todas las
 * páginas salvo las legales y la 404. Foco en blanco ([data-alterna]).
 */
export function CtaFinal({ contacto, mensaje, textoWhatsapp }: Props) {
  const d = contacto.direccion;
  const linea = "border-[color-mix(in_oklab,var(--color-acento)_35%,transparent)]";
  return (
    <section aria-labelledby="titulo-cta" className="gutter py-[clamp(48px,8vw,96px)]">
      <div data-alterna="" className="reticula-alterna ancho grid border border-alterna md:grid-cols-2">
        <div className={`flex flex-col gap-4 border-b p-[clamp(24px,4vw,48px)] md:border-r md:border-b-0 ${linea}`}>
          <span className="etiqueta text-sobre-alterna-suave">CAJETÍN · PEDIR MEDICIÓN</span>
          <h2 id="titulo-cta" className="font-titulo text-[clamp(1.75rem,1.3rem+1.8vw,2.75rem)] leading-[1.12] font-medium tracking-[-0.03em] text-balance">
            ¿Vamos a medir?
          </h2>
          <p className="max-w-[44ch] text-[17px] text-sobre-alterna-suave">
            {contacto.whatsapp
              ? "Envíanos una foto de cada hueco y una medida aproximada. Te decimos qué día podemos pasar."
              : "Llámanos, cuéntanos qué quieres cambiar y te decimos qué día podemos pasar."}
          </p>
          <Pareja contacto={contacto} mensaje={mensaje} textoWhatsapp={textoWhatsapp} textoLlamar="Llamar" className="pt-2" />
        </div>
        <div className="flex flex-col">
          <div className={`flex flex-col gap-2 border-b px-[clamp(24px,4vw,40px)] py-5 ${linea}`}>
            <span className="etiqueta text-sobre-alterna-suave">HORARIO</span>
            {horarioVisible(contacto).map((h) => (
              <p key={h.dias} className="leading-normal">
                {h.dias}
                <br />
                <span className="font-titulo text-[15px]">{h.horas}</span>
              </p>
            ))}
          </div>
          <div className={`flex flex-col gap-2 border-b px-[clamp(24px,4vw,40px)] py-5 ${linea}`}>
            <span className="etiqueta text-sobre-alterna-suave">TALLER</span>
            <p className="leading-normal">
              {d.calle}
              <br />
              {d.cp} {d.ciudad}
            </p>
          </div>
          <div className="flex items-center justify-between gap-3 px-[clamp(24px,4vw,40px)] py-4 font-titulo">
            <span className="text-[13px] text-sobre-alterna-suave">TELÉFONO</span>
            <BotonLlamada telefono={contacto.telefono} className="inline-flex min-h-11 items-center gap-2 text-lg font-semibold text-sobre-alterna no-underline">
              <IconoTelefono />
              {telefonoVisible(contacto.telefono)}
            </BotonLlamada>
          </div>
        </div>
      </div>
    </section>
  );
}
