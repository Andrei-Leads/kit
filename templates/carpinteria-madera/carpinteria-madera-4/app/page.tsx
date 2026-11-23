import config from "@/site.config";
import { Pareja } from "@/components/Botones";
import { AsistentePieza } from "@/components/secciones/AsistentePieza";
import { Catalogo } from "@/components/secciones/Catalogo";
import { ComoTrabajamos } from "@/components/secciones/ComoTrabajamos";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Garantias } from "@/components/secciones/Garantias";
import { HeroCollage } from "@/components/secciones/HeroCollage";
import { PreguntasFrecuentes } from "@/components/secciones/PreguntasFrecuentes";
import { RejillaDelCatalogo } from "@/components/secciones/RejillaPiezas";
import { Resenas } from "@/components/secciones/Resenas";
import { Zonas } from "@/components/secciones/Zonas";
import { mensajeInicio } from "@/lib/mensajes";
import { recientes } from "@/lib/piezas";

/** Piezas de la home: las 8 más recientes; con más, «Ver las {n} piezas». */
const EN_INICIO = 8;

/**
 * Inicio de «Galería» (encargo §6): collage de trabajos → rejilla de piezas numeradas con filtro
 * (la sección estrella) → catálogo de servicios → cómo trabajamos → franja negra de garantías →
 * reseñas → asistente → zonas → preguntas → CTA final. Cada sección sin datos se oculta.
 */
export default function Page() {
  const { contacto, servicios, trabajos, proceso, garantias, acreditaciones, marcas, negocio, resenas, valoracion, zonas, preguntas } = config;
  const mensaje = mensajeInicio(contacto);
  const piezas = recientes(trabajos).slice(0, EN_INICIO);
  return (
    <>
      <HeroCollage config={config} mensaje={mensaje} />
      <RejillaDelCatalogo config={config} piezas={piezas} total={trabajos.length} titulo="Piezas" id="piezas" className="pt-[clamp(2rem,1.4rem+2.4vw,4rem)]" />
      <section aria-labelledby="titulo-catalogo" className="contenedor flex flex-col gap-[18px] pt-(--seccion)">
        <h2 id="titulo-catalogo" className="titulo-h2 m-0">
          Catálogo de servicios
        </h2>
        <Catalogo servicios={servicios} trabajos={trabajos} />
        <Pareja telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensaje} className="mt-2" />
      </section>
      <ComoTrabajamos proceso={proceso} />
      <Garantias garantias={garantias} acreditaciones={acreditaciones} marcas={marcas} anioFundacion={negocio.anioFundacion} />
      <Resenas resenas={resenas} valoracion={valoracion} trabajos={trabajos} fichaGoogle={contacto.fichaGoogle}>
        <Pareja telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensaje} />
      </Resenas>
      {contacto.whatsapp && <AsistentePieza servicios={servicios} contacto={{ telefono: contacto.telefono, whatsapp: contacto.whatsapp }} mensaje={mensaje} />}
      <Zonas zonas={zonas} />
      <PreguntasFrecuentes preguntas={preguntas} />
      <CtaFinal contacto={contacto} mensaje={mensaje} />
    </>
  );
}
