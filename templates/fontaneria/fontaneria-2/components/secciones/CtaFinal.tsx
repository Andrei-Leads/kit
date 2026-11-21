import { BotonLlamada, BotonWhatsApp, type SiteConfig } from "@andrei-leads/core";

import { IconoMensaje, IconoTelefono } from "@/components/Iconos";
import { boton } from "@/lib/estilos";
import { lineaCierre, textoLlamar } from "@/lib/formato";

type Props = {
  contacto: SiteConfig["contacto"];
  valoracion: SiteConfig["valoracion"];
  /** Los datos traen precios: solo entonces se promete el precio antes de ir. */
  conPrecios: boolean;
  mensaje: string;
  /** Texto del botón de WhatsApp («Envíanos una foto por WhatsApp» o «Quiero precio para algo parecido»). */
  textoWhatsapp?: string;
};

/**
 * CTA final (encargo §6.9): bloque de radio 32 px en --color-primario con 16 px de margen lateral (no a
 * sangre). «Te decimos el precio por teléfono» (solo con precios en los datos; si no, un texto neutro), `llamada-cta` invertida y WhatsApp con contorno en
 * --color-sobre-primario. Sin WhatsApp, solo la llamada.
 */
export function CtaFinal({ contacto, valoracion, conPrecios, mensaje, textoWhatsapp = "Envíanos una foto por WhatsApp" }: Props) {
  return (
    <section aria-labelledby="titulo-cta" className="px-4 pt-[clamp(8px,2vw,24px)] pb-[clamp(40px,6vw,80px)]">
      <div className="mx-auto flex max-w-312 flex-wrap items-center justify-between gap-x-10 gap-y-6 rounded-bloque bg-primario px-[clamp(24px,6vw,80px)] py-[clamp(32px,6vw,80px)] text-sobre-primario">
        <div className="flex flex-[1_1_320px] flex-col gap-2.5">
          <h2 id="titulo-cta" className="m-0 text-h2 leading-[1.05] font-extrabold text-sobre-primario">
            {conPrecios ? "Te decimos el precio por teléfono" : "Cuéntanos qué te pasa"}
          </h2>
          <p className="m-0 text-sobre-primario">
            {conPrecios
              ? "Cuéntanos qué te pasa. Antes de ir, ya sabes lo que vas a pagar."
              : "Llámanos o escríbenos y te decimos cómo lo resolvemos."}
          </p>
        </div>
        <div className="flex max-w-110 flex-[1_1_300px] flex-col gap-3">
          <BotonLlamada telefono={contacto.telefono} className={boton.llamadaCta}>
            <IconoTelefono />
            <span>{textoLlamar(contacto)}</span>
          </BotonLlamada>
          {contacto.whatsapp && (
            <BotonWhatsApp numero={contacto.whatsapp} mensaje={mensaje} className={boton.whatsappCta}>
              <IconoMensaje />
              <span>{textoWhatsapp}</span>
            </BotonWhatsApp>
          )}
          <p className="m-0 text-center text-[.9375rem] text-sobre-primario">{lineaCierre({ contacto, valoracion })}</p>
        </div>
      </div>
    </section>
  );
}
