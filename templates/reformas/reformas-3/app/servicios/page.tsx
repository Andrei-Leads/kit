import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { CabeceraPagina } from "@/components/CabeceraPagina";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { ResenasCatalogo } from "@/components/secciones/ResenasCatalogo";
import { ServiciosIndice } from "@/components/secciones/ServiciosIndice";
import { mensajeInicio } from "@/lib/mensajes";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/servicios", titulo: "Servicios" });

/** /servicios: `h1` gigante, índice de servicios, reseñas y CTA. */
export default function Page() {
  return (
    <>
      <CabeceraPagina
        pagina="servicios"
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/servicios", texto: "Servicios" },
        ]}
        titulo="Servicios"
      />
      <div className="contenedor pt-8">
        <ServiciosIndice servicios={config.servicios} trabajos={config.trabajos} nivel="h2" />
      </div>
      <ResenasCatalogo resenas={config.resenas} valoracion={config.valoracion} trabajos={config.trabajos} fichaGoogle={config.contacto.fichaGoogle} />
      <CtaFinal contacto={config.contacto} mensaje={mensajeInicio(config.contacto)} />
    </>
  );
}
