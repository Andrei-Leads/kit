import { pasosProceso } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { Marco } from "@/components/Marco";
import { VolverAPlanificar } from "@/components/secciones/Cierre";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { FichasTrabajos } from "@/components/secciones/FichasTrabajos";
import { Garantias } from "@/components/secciones/Garantias";
import { HeroPlanificador } from "@/components/secciones/HeroPlanificador";
import { PreguntasFrecuentes } from "@/components/secciones/PreguntasFrecuentes";
import { ProcesoPistas } from "@/components/secciones/ProcesoPistas";
import { Resenas } from "@/components/secciones/Resenas";
import { ServiciosTarjetas } from "@/components/secciones/ServiciosTarjetas";
import { Zonas } from "@/components/secciones/Zonas";
import { mensajeInicio } from "@/lib/mensajes";
import { lineaHorario } from "@/lib/textos";
import config from "@/site.config";

/**
 * Inicio (encargo §6, orden de proyecto con la excepción del hero): planificador, fichas de
 * trabajos, servicios (+ pareja), proceso, garantías, reseñas, «¿Ya lo tienes más claro?», zonas,
 * preguntas y CTA final.
 */
export default function Page() {
  const { contacto } = config;
  const mensaje = mensajeInicio(contacto);
  return (
    <Marco>
      <HeroPlanificador />
      <FichasTrabajos trabajos={config.trabajos} servicios={config.servicios} galeria={config.galeria} titulo="Trabajos recientes" verTodos />
      <ServiciosTarjetas
        servicios={config.servicios}
        titulo="Qué reformamos"
        conPlanificador={Boolean(contacto.whatsapp)}
        pie={<Pareja contacto={contacto} mensaje={mensaje} nota={lineaHorario(contacto)} className="mt-2" />}
      />
      <ProcesoPistas pasos={pasosProceso(config.proceso, "proyecto")} />
      <Garantias garantias={config.garantias} acreditaciones={config.acreditaciones} />
      <Resenas
        resenas={config.resenas}
        valoracion={config.valoracion}
        fichaGoogle={contacto.fichaGoogle}
        testimonio={config.trabajos.find((t) => t.testimonio)}
      />
      <VolverAPlanificar contacto={contacto} />
      <Zonas zonas={config.zonas} />
      <PreguntasFrecuentes preguntas={config.preguntas} grupo="preguntas-inicio" />
      <CtaFinal contacto={contacto} mensaje={mensaje} />
    </Marco>
  );
}
