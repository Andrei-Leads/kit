import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { MarcaPagina } from "@/components/MarcaPagina";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { HeroInterior } from "@/components/secciones/HeroInterior";
import { Resenas } from "@/components/secciones/Resenas";
import { ServiciosApilados } from "@/components/secciones/ServiciosApilados";
import { mensajeInicio } from "@/lib/mensajes";
import { datosCta, lineaConfianza } from "@/lib/textos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/servicios", titulo: "Servicios" });

/**
 * /servicios (encargo §7): hero interior «Lo que hacemos» (tipográfico: las
 * fotos de los servicios salen justo debajo, en cada bloque), todos los
 * servicios apilados con su pareja, reseñas y CTA final.
 */
export default function Page() {
  const cta = datosCta(config.contacto, mensajeInicio(config.contacto));
  const confianza = lineaConfianza(config);
  const n = config.servicios.length;
  return (
    <>
      <MarcaPagina pagina="servicios" inicioClaro />
      <HeroInterior
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/servicios", texto: "Servicios" },
        ]}
        etiqueta="Servicios"
        titulo={
          <>
            Lo que <em>hacemos</em>
          </>
        }
        frase={`${n === 1 ? "Un tipo de obra" : `${n} tipos de obra`} en ${config.contacto.direccion.ciudad} y alrededores.`}
        cta={cta}
        confianza={confianza}
        sinFotos
      />
      <ServiciosApilados servicios={config.servicios} telefono={config.contacto.telefono} whatsapp={config.contacto.whatsapp} conCabecera={false} />
      <Resenas config={config} cta={cta} />
      <CtaFinal cta={cta} confianza={confianza} />
    </>
  );
}
