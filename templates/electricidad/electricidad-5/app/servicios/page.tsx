import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { BandaInterior } from "@/components/secciones/BandaInterior";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Resenas } from "@/components/secciones/Resenas";
import { ServiciosBento } from "@/components/secciones/ServiciosBento";
import { datosCta } from "@/lib/textos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/servicios", titulo: "Servicios" });

/** /servicios: banda pleno corta con el h1, el bento de servicios completo, reseñas y CTA. */
export default function Page() {
  const cta = datosCta(config);
  return (
    <>
      <span data-pagina="servicios" hidden />
      <BandaInterior
        migas={[{ href: "/", texto: "Inicio" }, { href: "/servicios", texto: "Servicios" }]}
        titulo="Servicios"
        entrada={<p>Instalaciones nuevas y averías. Toca un servicio para ver qué incluye.</p>}
      />
      <ServiciosBento servicios={config.servicios} trabajos={config.trabajos} sinTitulo preloadPrimera />
      <Resenas resenas={config.resenas} valoracion={config.valoracion} fichaGoogle={config.contacto.fichaGoogle} cta={cta} />
      <CtaFinal cta={cta} contacto={config.contacto} />
    </>
  );
}
