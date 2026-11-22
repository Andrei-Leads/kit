import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { ListaServicios } from "@/components/secciones/ListaServicios";
import { Resenas } from "@/components/secciones/Resenas";
import { mensajeInicio } from "@/lib/mensajes";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/servicios", titulo: "Servicios" });

/** /servicios (encargo §7; no dibujado en la entrega): h1 display, la lista completa, reseñas y CTA. */
export default function Page() {
  const { contacto, servicios } = config;
  return (
    <>
      <span data-pagina="servicios" hidden />
      <section className="contenedor pt-[clamp(32px,5vw,72px)] pb-[clamp(48px,7vw,104px)]">
        <h1 className="titulo-display">Servicios</h1>
        <p className="mt-5 max-w-[46ch] text-texto-suave">{config.negocio.descripcionCorta}</p>
        <div className="mt-[clamp(32px,5vw,72px)]">
          <ListaServicios servicios={servicios} nivel="h2" />
        </div>
      </section>
      <Resenas resenas={config.resenas} valoracion={config.valoracion} trabajos={[]} fichaGoogle={contacto.fichaGoogle} />
      <CtaFinal
        compacto
        cta={{ telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje: mensajeInicio(contacto) }}
        titulo={
          <>
            ¿Hablamos de tu <em>reforma</em>?
          </>
        }
      />
    </>
  );
}
