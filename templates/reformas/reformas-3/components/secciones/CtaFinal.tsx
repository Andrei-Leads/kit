import type { SiteConfig } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";

type Props = { contacto: SiteConfig["contacto"]; mensaje: string; textoWhatsapp?: string };

/** Banda primario «¿Tu piso es la próxima obra?» con la pareja (WhatsApp en negro). No va en /contacto ni en la 404. */
export function CtaFinal({ contacto, mensaje, textoWhatsapp }: Props) {
  return (
    <section aria-labelledby="titulo-cta" className="sobre-primario mt-(--seccion) bg-primario py-10 text-sobre-primario">
      <div className="contenedor">
        <h2 id="titulo-cta" className="titulo-h2 m-0">
          ¿Tu piso es la próxima obra?
        </h2>
        <p className="m-0 mt-3 max-w-[52ch] text-[17px] leading-[1.45]">
          {/* «Por partidas» es una promesa del negocio: va en sus datos (proceso, garantías), no aquí. */}
          {contacto.whatsapp
            ? "Mándanos fotos por WhatsApp y, si lo tienes, el plano. Vamos a medir y te damos el presupuesto por escrito."
            : "Llámanos y quedamos para ir a medir. Te damos el presupuesto por escrito."}
        </p>
        <Pareja telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensaje} textoWhatsapp={textoWhatsapp} tono="banda" className="mt-5" />
      </div>
    </section>
  );
}
