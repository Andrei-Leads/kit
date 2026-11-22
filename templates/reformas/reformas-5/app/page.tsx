import { minusculaInicial, pasosProceso } from "@andrei-leads/core";

import config from "@/site.config";
import { Pareja } from "@/components/Botones";
import { AsistenteCasa } from "@/components/secciones/AsistenteCasa";
import { CasasTrabajos } from "@/components/secciones/CasasTrabajos";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { EstanciasDesde } from "@/components/secciones/EstanciasDesde";
import { Garantias } from "@/components/secciones/Garantias";
import { HeroCasa } from "@/components/secciones/HeroCasa";
import { PreguntasFrecuentes } from "@/components/secciones/PreguntasFrecuentes";
import { ProcesoArcos } from "@/components/secciones/ProcesoArcos";
import { ResenasTestimonio } from "@/components/secciones/ResenasTestimonio";
import { Zonas } from "@/components/secciones/Zonas";
import { datosCta } from "@/lib/cta";
import { mensajeInicio } from "@/lib/mensajes";

/**
 * Inicio, orden de tipo proyecto (tablero §01): hero → casas → estancias (estrella) →
 * pareja → proceso → garantías → pareja → reseñas + testimonio → asistente → zonas →
 * preguntas → CTA final en arco.
 */
export default function Page() {
  const { contacto } = config;
  const cta = datosCta(contacto, mensajeInicio(contacto));
  return (
    <>
      <span data-pagina="inicio" hidden />
      <HeroCasa config={config} mensaje={cta.mensaje} />
      <CasasTrabajos trabajos={config.trabajos} galeria={config.galeria} />
      <EstanciasDesde servicios={config.servicios} />
      <div className="contenedor pt-14">
        <Pareja cta={cta} nota="¿Te imaginas la tuya? Cuéntanos qué quieres cambiar." />
      </div>
      <ProcesoArcos pasos={pasosProceso(config.proceso, "proyecto")} />
      <Garantias garantias={config.garantias} acreditaciones={config.acreditaciones} anioFundacion={config.negocio.anioFundacion} />
      <div className="contenedor pt-14">
        <Pareja cta={cta} nota="Te decimos qué se puede hacer y cuánto cuesta." />
      </div>
      <ResenasTestimonio
        resenas={config.resenas}
        valoracion={config.valoracion}
        trabajos={config.trabajos}
        fichaGoogle={contacto.fichaGoogle}
        conTestimonio
      />
      {contacto.whatsapp && (
        <AsistenteCasa
          servicios={config.servicios.map((s) => ({ titulo: s.titulo, enFrase: minusculaInicial(s.titulo) }))}
          numero={contacto.whatsapp}
          telefono={contacto.telefono}
        />
      )}
      <Zonas zonas={config.zonas} />
      <PreguntasFrecuentes preguntas={config.preguntas} />
      <CtaFinal cta={cta} />
    </>
  );
}
