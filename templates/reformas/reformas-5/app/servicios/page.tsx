import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { CabeceraPagina } from "@/components/secciones/CabeceraPagina";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { EstanciasDesde } from "@/components/secciones/EstanciasDesde";
import { ResenasTestimonio } from "@/components/secciones/ResenasTestimonio";
import { datosCta } from "@/lib/cta";
import { mensajeInicio } from "@/lib/mensajes";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/servicios", titulo: "Servicios" });

/** /servicios: h1 «Por estancias», la rejilla de arcos completa, las reseñas y el CTA. */
export default function Page() {
  return (
    <>
      <span data-pagina="servicios" hidden />
      <CabeceraPagina
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/servicios", texto: "Servicios" },
        ]}
        titulo="Por estancias"
        entrada="Elige la parte de tu casa que quieres cambiar. Cada estancia tiene su página con lo que incluye y casas parecidas."
      />
      <EstanciasDesde servicios={config.servicios} conTitulo={false} nivel="h2" className="pt-12" />
      <ResenasTestimonio resenas={config.resenas} valoracion={config.valoracion} trabajos={config.trabajos} fichaGoogle={config.contacto.fichaGoogle} />
      <CtaFinal cta={datosCta(config.contacto, mensajeInicio(config.contacto))} />
    </>
  );
}
