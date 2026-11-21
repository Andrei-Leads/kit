import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { CabeceraPagina } from "@/components/secciones/CabeceraPagina";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { MigasPagina } from "@/components/secciones/MigasPagina";
import { ResenasVecinos } from "@/components/secciones/ResenasVecinos";
import { Servicios } from "@/components/secciones/Servicios";
import { datosCta } from "@/lib/textos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/servicios", titulo: "Servicios" });

/** /servicios: cabecera arena, tarjetas, todas las reseñas sin recortes (`#resenas`) y CTA. */
export default function Page() {
  const cta = datosCta(config);
  return (
    <>
      <span data-pagina="servicios" hidden />
      <MigasPagina migas={[{ href: "/", texto: "Inicio" }, { texto: "Servicios" }]} />
      <CabeceraPagina titulo="Servicios" entrada={config.negocio.descripcionCorta} />
      <Servicios servicios={config.servicios} titulo="Todos los servicios" tituloOculto precargar />
      <ResenasVecinos
        resenas={config.resenas}
        valoracion={config.valoracion}
        fichaGoogle={config.contacto.fichaGoogle}
        cta={cta}
        variante="completa"
      />
      <CtaFinal cta={cta} />
    </>
  );
}
