import { telefonoVisible } from "@andrei-leads/core";

import config from "@/site.config";
import { Pareja } from "@/components/Botones";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { GarantiasBanda } from "@/components/secciones/GarantiasBanda";
import { HeroCollage } from "@/components/secciones/HeroCollage";
import { HojaEncargo } from "@/components/secciones/HojaEncargo";
import { PreguntasFrecuentes } from "@/components/secciones/PreguntasFrecuentes";
import { ProcesoTabla } from "@/components/secciones/ProcesoTabla";
import { RejillaGaleria, RejillaObras, numerar } from "@/components/secciones/RejillaObras";
import { ResenasCatalogo } from "@/components/secciones/ResenasCatalogo";
import { ServiciosIndice } from "@/components/secciones/ServiciosIndice";
import { Zonas } from "@/components/secciones/Zonas";
import { mensajeInicio } from "@/lib/mensajes";
import { obrasTexto } from "@/lib/obras";

/**
 * Inicio (tipo proyecto): collage de 3 obras → rejilla de obras (estrella, 8
 * como máximo, con filtro) → índice de servicios → proceso → banda de
 * garantías → reseñas → hoja de encargo → zonas → preguntas → CTA final.
 */
export default function Page() {
  const { contacto, trabajos, galeria, servicios } = config;
  const mensaje = mensajeInicio(contacto);
  const pareja = <Pareja telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensaje} />;
  // Sin fotos en el hero, el hero ya es el índice de servicios: no se repite.
  const heroConFotos = trabajos.length > 0 || config.imagenesHero.length > 0 || galeria.length > 0;
  return (
    <>
      <HeroCollage config={config} mensaje={mensaje} />

      {trabajos.length > 0 ? (
        <RejillaObras
          id="obras"
          obras={numerar(trabajos).slice(0, 8)}
          servicios={servicios}
          conFiltro
          mosaico
          encabezado={{ titulo: "Obras", sub: obrasTexto(trabajos.length) }}
          cierre={{ tipo: "ver", total: trabajos.length }}
          className="pt-(--seccion)"
        />
      ) : (
        <RejillaGaleria galeria={galeria} encabezado={{ titulo: "Fotos", sub: `${galeria.length} fotos` }} className="pt-(--seccion)" />
      )}

      {heroConFotos && (
        <section aria-labelledby="titulo-servicios" className="contenedor pt-(--seccion)">
          <h2 id="titulo-servicios" className="titulo-h2 m-0 mb-4">
            Servicios
          </h2>
          <ServiciosIndice servicios={servicios} trabajos={trabajos} />
          <div className="mt-6">{pareja}</div>
        </section>
      )}

      <ProcesoTabla proceso={config.proceso} />
      <GarantiasBanda garantias={config.garantias} acreditaciones={config.acreditaciones} anioFundacion={config.negocio.anioFundacion} />
      <ResenasCatalogo resenas={config.resenas} valoracion={config.valoracion} trabajos={trabajos} fichaGoogle={contacto.fichaGoogle}>
        {pareja}
      </ResenasCatalogo>
      {contacto.whatsapp && (
        <HojaEncargo
          servicios={servicios.map((s) => s.titulo)}
          whatsapp={contacto.whatsapp}
          telefono={contacto.telefono}
          telefonoVisible={telefonoVisible(contacto.telefono)}
        />
      )}
      <Zonas zonas={config.zonas} />
      <PreguntasFrecuentes preguntas={config.preguntas} />
      <CtaFinal contacto={contacto} mensaje={mensaje} />
    </>
  );
}
