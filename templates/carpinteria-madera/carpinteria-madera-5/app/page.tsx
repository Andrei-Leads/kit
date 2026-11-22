import { Asistente } from "@/components/secciones/Asistente";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { EnElTaller } from "@/components/secciones/EnElTaller";
import { Garantias } from "@/components/secciones/Garantias";
import { HeroAntesDespues } from "@/components/secciones/HeroAntesDespues";
import { Resenas } from "@/components/secciones/Resenas";
import { Restauraciones } from "@/components/secciones/Restauraciones";
import { Servicios } from "@/components/secciones/Servicios";
import { ZonasPreguntas } from "@/components/secciones/ZonasPreguntas";
import config from "@/site.config";

/**
 * Inicio de «Restauración» (encargo §5): hero con el antes/después, restauraciones, servicios,
 * en el taller, garantías, reseñas, asistente, zonas y preguntas, y CTA final. Cada sección sin
 * datos se oculta. Los metadatos son los del layout (crearMetadatos).
 */
export default function Page() {
  const c = config;
  return (
    <>
      <HeroAntesDespues negocio={c.negocio} contacto={c.contacto} trabajos={c.trabajos} imagenesHero={c.imagenesHero} valoracion={c.valoracion} />
      <Restauraciones trabajos={c.trabajos} galeria={c.galeria} contacto={c.contacto} />
      <Servicios servicios={c.servicios} />
      <EnElTaller proceso={c.proceso} videoPano={c.videoPano} empresa={c.empresa} contacto={c.contacto} conCta />
      <Garantias garantias={c.garantias} acreditaciones={c.acreditaciones} marcas={c.marcas} anioFundacion={c.negocio.anioFundacion} />
      <Resenas resenas={c.resenas} valoracion={c.valoracion} trabajos={c.trabajos} contacto={c.contacto} conCta />
      <Asistente servicios={c.servicios} contacto={c.contacto} />
      <ZonasPreguntas zonas={c.zonas} preguntas={c.preguntas} />
      <CtaFinal galeria={c.galeria} empresa={c.empresa} contacto={c.contacto} />
    </>
  );
}
