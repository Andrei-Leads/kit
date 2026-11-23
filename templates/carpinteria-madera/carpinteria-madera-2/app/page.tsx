import { pasosProceso } from "@andrei-leads/core";

import { Marco } from "@/components/Marco";
import { ComoTrabajamos } from "@/components/secciones/ComoTrabajamos";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Garantias } from "@/components/secciones/Garantias";
import { HeroAsistente } from "@/components/secciones/HeroAsistente";
import { PreguntasFrecuentes } from "@/components/secciones/PreguntasFrecuentes";
import { RecordatorioAsistente } from "@/components/secciones/RecordatorioAsistente";
import { Resenas } from "@/components/secciones/Resenas";
import { ServiciosTarjetas } from "@/components/secciones/ServiciosTarjetas";
import { TrabajosInicio } from "@/components/secciones/TrabajosInicio";
import { Zonas } from "@/components/secciones/Zonas";
import { mensajeInicio } from "@/lib/mensajes";
import config from "@/site.config";

/**
 * Inicio (encargo §6, orden de proyecto con el asistente como hero): asistente (+ cifras), trabajos
 * (+ pareja), servicios, cómo trabajamos (+ pareja), garantías, reseñas, recordatorio (+ pareja),
 * zonas, preguntas y CTA final.
 */
export default function Page() {
  const { contacto } = config;
  const mensaje = mensajeInicio(contacto);
  return (
    <Marco actual="inicio">
      <HeroAsistente />
      <TrabajosInicio trabajos={config.trabajos} galeria={config.galeria} contacto={contacto} mensaje={mensaje} />
      <ServiciosTarjetas servicios={config.servicios} titulo="Lo que fabricamos" conAsistente={Boolean(contacto.whatsapp)} />
      <ComoTrabajamos pasos={pasosProceso(config.proceso, "proyecto")} contacto={contacto} mensaje={mensaje} />
      <Garantias garantias={config.garantias} acreditaciones={config.acreditaciones} marcas={config.marcas} />
      <Resenas
        resenas={config.resenas}
        valoracion={config.valoracion}
        fichaGoogle={contacto.fichaGoogle}
        testimonio={config.trabajos.find((t) => t.testimonio)}
      />
      <RecordatorioAsistente contacto={contacto} mensaje={mensaje} />
      <Zonas zonas={config.zonas} />
      <PreguntasFrecuentes preguntas={config.preguntas} grupo="preguntas-inicio" />
      <CtaFinal contacto={contacto} mensaje={mensaje} asistente="#asistente" />
    </Marco>
  );
}
