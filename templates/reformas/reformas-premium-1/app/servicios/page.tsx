import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { Destacada, Pareja } from "@/components/Botones";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { HeroInterior } from "@/components/secciones/HeroInterior";
import { ResenasTestimonio } from "@/components/secciones/ResenasTestimonio";
import { ServiciosApilados } from "@/components/secciones/ServiciosApilados";
import { mensajeInicio } from "@/lib/mensajes";
import { datosCta, lineaConfianza } from "@/lib/textos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/servicios", titulo: "Servicios" });

/** /servicios (encargo §7): hero con collage de las dos primeras fotos de servicio, hasta 6 servicios apilados, reseñas y CTA. */
export default function Page() {
  const { contacto, servicios } = config;
  const ciudad = contacto.direccion.ciudad;
  const datos = datosCta(contacto, mensajeInicio(contacto));
  return (
    <>
      <HeroInterior
        pagina="servicios"
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/servicios", texto: "Servicios" },
        ]}
        etiqueta={`${servicios.length} ${servicios.length === 1 ? "servicio" : "servicios"}`}
        titulo={
          <>
            Servicios de reforma en <Destacada>{ciudad}</Destacada>
          </>
        }
        frase={config.negocio.descripcionCorta}
        grande={servicios[0]?.imagenes[0]}
        mini={servicios[1]?.imagenes[0]}
      >
        <Pareja datos={datos} fondo="claro" className="max-w-[620px]" />
      </HeroInterior>
      <ServiciosApilados servicios={servicios} datos={{ telefono: contacto.telefono, whatsapp: contacto.whatsapp }} apilados={6} conTitulo={false} nivel="h2" />
      <ResenasTestimonio config={config} datos={datos} testimonio={false} />
      <CtaFinal datos={datos} confianza={lineaConfianza(config, "horario")} />
    </>
  );
}
