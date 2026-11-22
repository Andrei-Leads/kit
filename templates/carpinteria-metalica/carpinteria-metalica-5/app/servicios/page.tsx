import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Resenas } from "@/components/secciones/Resenas";
import { Soluciones } from "@/components/secciones/Soluciones";
import { mensajeInicio, TEXTO_WA } from "@/lib/mensajes";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/servicios", titulo: "Soluciones" });

/** /servicios (encargo §7): «Soluciones» con todas las fichas alternas, reseñas y CTA final. */
export default function Page() {
  const c = config;
  const cta = { telefono: c.contacto.telefono, whatsapp: c.contacto.whatsapp, mensaje: mensajeInicio(c.contacto) };
  return (
    <>
      <Soluciones
        servicios={c.servicios}
        fichas={c.servicios.length}
        nivel="h2"
        titulo={
          <h1 id="titulo-soluciones" className="titulo-display">
            Soluciones
          </h1>
        }
      />
      <Resenas resenas={c.resenas} valoracion={c.valoracion} fichaGoogle={c.contacto.fichaGoogle} />
      <CtaFinal cta={cta} textoWhatsapp={TEXTO_WA} />
    </>
  );
}
