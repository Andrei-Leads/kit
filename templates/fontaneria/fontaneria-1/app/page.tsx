import config from "@/site.config";
import { Cierre } from "@/components/secciones/Cierre";
import { ComoTrabajamos } from "@/components/secciones/ComoTrabajamos";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { FranjaCifras } from "@/components/secciones/FranjaCifras";
import { HeroIndice } from "@/components/secciones/HeroIndice";
import { IndiceServicios } from "@/components/secciones/IndiceServicios";
import { PreguntasFrecuentes } from "@/components/secciones/PreguntasFrecuentes";
import { Resenas } from "@/components/secciones/Resenas";
import { Tarifas } from "@/components/secciones/Tarifas";
import { Zonas } from "@/components/secciones/Zonas";
import { cifras } from "@/lib/cifras";
import { mensajeInicio } from "@/lib/mensajes";
import { lineaHorario, lineaValoracion, textoLlamar } from "@/lib/textos";

/**
 * Inicio en el orden de urgencias: índice por síntomas (estrella) → cifras → cómo trabajamos → cierre →
 * lo que arreglamos → tarifas → cierre → reseñas → zonas → (cierre + preguntas) → CTA final.
 * Cero componentes cliente.
 */
export default async function Inicio() {
  const { negocio, contacto } = config;
  const par = {
    telefono: contacto.telefono,
    whatsapp: contacto.whatsapp,
    mensaje: mensajeInicio(contacto),
    textoLlamar: textoLlamar(contacto),
  };
  const horario = lineaHorario(contacto);
  return (
    <>
      <HeroIndice sector={negocio.sector} contacto={contacto} servicios={config.servicios} mensaje={par.mensaje} textoLlamar={par.textoLlamar} confianza={lineaValoracion(config)} />
      <FranjaCifras cifras={await cifras(config)} acreditaciones={config.acreditaciones} garantias={config.garantias} />
      <ComoTrabajamos proceso={config.proceso} />
      <Cierre frase="¿Te está pasando ahora?" {...par} confianza={horario} />
      <IndiceServicios servicios={config.servicios} enInicio />
      <Tarifas tarifas={config.tarifas} />
      <Cierre frase="Pregunta el precio antes de que vayamos" {...par} confianza={lineaValoracion(config)} />
      <Resenas resenas={config.resenas} valoracion={config.valoracion} fichaGoogle={contacto.fichaGoogle} />
      <Zonas zonas={config.zonas} />
      {config.zonas.length > 0 && config.preguntas.length > 0 && (
        <Cierre frase="¿Estás en una de estas zonas?" {...par} confianza={lineaValoracion(config)} />
      )}
      <PreguntasFrecuentes preguntas={config.preguntas} />
      <CtaFinal {...par} horario={horario} />
    </>
  );
}
