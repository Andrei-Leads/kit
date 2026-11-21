import type { SiteConfig } from "@andrei-leads/core";

import { TelefonoGigante } from "@/components/Botones";

type Props = {
  contacto: SiteConfig["contacto"];
  mensaje: string;
  titulo?: string;
  textoWhatsapp?: string;
};

/** CtaFinal (encargo §6.8): cinta arriba y el telefono-gigante sobre negro, con whatsapp-linea. */
export function CtaFinal({ contacto, mensaje, titulo = "¿Sin luz ahora?", textoWhatsapp }: Props) {
  return (
    <section aria-labelledby="titulo-cta" className="bg-fondo">
      <div aria-hidden="true" className="cinta" />
      <div className="contenedor flex flex-col gap-6 py-10 lg:py-16">
        <h2 id="titulo-cta" className="titulo-h2 m-0">
          {titulo}
        </h2>
        <TelefonoGigante contacto={contacto} mensaje={mensaje} textoWhatsapp={textoWhatsapp} />
      </div>
    </section>
  );
}
