import { pasosProceso } from "@andrei-leads/core";

import { ConfiguradorSeccion } from "@/components/secciones/ConfiguradorSeccion";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { ElTaller } from "@/components/secciones/ElTaller";
import { Garantias } from "@/components/secciones/Garantias";
import { HeroCollage } from "@/components/secciones/HeroCollage";
import { Obras } from "@/components/secciones/Obras";
import { Proceso } from "@/components/secciones/Proceso";
import { Resenas } from "@/components/secciones/Resenas";
import { Servicios } from "@/components/secciones/Servicios";
import { PreguntasFrecuentes, Zonas } from "@/components/secciones/ZonasPreguntas";
import { anioActual } from "@/lib/anio";
import { mensajeInicio } from "@/lib/mensajes";
import config from "@/site.config";

/**
 * Inicio (encargo §6, orden de proyecto): hero collage, obras del barrio, «El taller» (estrella),
 * servicios, proceso, garantías, el tablón de reseñas, configurador, zonas, preguntas y CTA final.
 */
export default async function Page() {
  const { negocio, contacto } = config;
  const mensaje = mensajeInicio(contacto);
  const anio = await anioActual();
  const fotoB = config.imagenesHero[1] ?? config.trabajos[0]?.imagenes[0];
  return (
    <>
      <HeroCollage negocio={negocio} contacto={contacto} valoracion={config.valoracion} fotoA={config.imagenesHero[0]} fotoB={fotoB} mensaje={mensaje} />
      <Obras trabajos={config.trabajos} galeria={config.galeria} modo="inicio" antetitulo="Obras recientes" titulo="Lo último que ha salido del taller" />
      <ElTaller config={config} anioActual={anio} mensaje={mensaje} modo="inicio" />
      <Servicios servicios={config.servicios} conCabecera />
      <Proceso pasos={pasosProceso(config.proceso, "proyecto")} />
      <Garantias garantias={config.garantias} contacto={contacto} mensaje={mensaje} sobreAlterna />
      <Resenas
        resenas={config.resenas}
        valoracion={config.valoracion}
        fichaGoogle={contacto.fichaGoogle}
        testimonio={config.trabajos.find((t) => t.testimonio)}
        max={4}
      />
      <ConfiguradorSeccion servicios={config.servicios} nombre={negocio.nombre} contacto={contacto} mensaje={mensaje} />
      <Zonas zonas={config.zonas} />
      <PreguntasFrecuentes preguntas={config.preguntas} grupo="preguntas-inicio" />
      <CtaFinal contacto={contacto} mensaje={mensaje} />
    </>
  );
}
