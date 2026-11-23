import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { Pareja } from "@/components/Botones";
import { CabeceraPagina } from "@/components/CabeceraPagina";
import { Catalogo } from "@/components/secciones/Catalogo";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { mensajeInicio } from "@/lib/mensajes";
import { serviciosTexto } from "@/lib/piezas";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/servicios", titulo: "Servicios" });

/** /servicios (entrega §07): `h1` display con el recuento, el catálogo numerado con miniaturas (títulos `h2`) y la pareja. */
export default function Page() {
  const { contacto, servicios, trabajos } = config;
  const mensaje = mensajeInicio(contacto);
  return (
    <>
      <CabeceraPagina
        pagina="servicios"
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/servicios", texto: "Servicios" },
        ]}
        titulo="Servicios"
        recuento={serviciosTexto(servicios.length)}
      />
      <section aria-label="Catálogo de servicios" className="contenedor flex flex-col gap-[18px] pt-[clamp(1.5rem,1rem+2vw,3rem)]">
        <Catalogo servicios={servicios} trabajos={trabajos} nivel="h2" />
        <Pareja telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensaje} className="mt-2" />
      </section>
      <CtaFinal contacto={contacto} mensaje={mensaje} />
    </>
  );
}
