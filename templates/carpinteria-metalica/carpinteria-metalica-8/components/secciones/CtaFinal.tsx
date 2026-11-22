import type { SiteConfig } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";

type Props = {
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp">;
  mensaje: string;
  textoWhatsapp?: string;
};

/**
 * CTA final (encargo §6.10): un guijarro grande en primario con «¿Pasamos a verlo?» y los dos
 * botones en `--color-sobre-primario`. El texto no promete WhatsApp si el negocio no lo tiene.
 */
export function CtaFinal({ contacto, mensaje, textoWhatsapp = "Cuéntanos qué necesitas" }: Props) {
  return (
    <section aria-labelledby="titulo-cta" className="px-[clamp(12px,3vw,40px)] pt-[clamp(24px,4vw,48px)] pb-[clamp(56px,7vw,96px)]">
      <div
        data-sobre-primario
        className="mx-auto flex max-w-[1180px] flex-col items-center gap-[18px] rounded-[56px_72px_48px_80px/48px_64px_72px_56px] bg-primario px-[22px] py-14 text-center text-sobre-primario lg:rounded-[160px_200px_140px_220px/140px_170px_190px_150px] lg:px-16 lg:py-[104px]"
      >
        <h2 id="titulo-cta" className="font-titulo text-[clamp(2.25rem,1.6rem+3vw,4.25rem)] leading-[1.02] font-medium tracking-[-0.02em]">
          ¿Pasamos a verlo?
        </h2>
        <p className="max-w-[40ch]">
          {contacto.whatsapp ? "Mándanos un par de fotos por WhatsApp o llámanos." : "Llámanos y cuéntanos qué necesitas."}
        </p>
        <Pareja contacto={contacto} mensaje={mensaje} textoWhatsapp={textoWhatsapp} tono="sobre" grande className="mt-2 justify-center max-lg:w-full" />
      </div>
    </section>
  );
}
