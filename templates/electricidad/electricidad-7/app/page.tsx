import config from "@/site.config";
import { Confianza } from "@/components/secciones/Confianza";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { HeroChat } from "@/components/secciones/HeroChat";
import { ParEntreBloques } from "@/components/secciones/ParEntreBloques";
import { PreguntasFrecuentes } from "@/components/secciones/PreguntasFrecuentes";
import { Proceso } from "@/components/secciones/Proceso";
import { Resenas } from "@/components/secciones/Resenas";
import { Servicios } from "@/components/secciones/Servicios";
import { Tarifas } from "@/components/secciones/Tarifas";
import { Zonas } from "@/components/secciones/Zonas";
import { mensajeInicio } from "@/lib/mensajes";
import { fichasConfianza } from "@/lib/textos";

/**
 * Inicio (urgencias): hero con chat → confianza → proceso en hilo → pareja → índice por síntomas →
 * tarifas → reseñas (+ pareja) → zonas → preguntas → CTA final. Cada sección sin datos desaparece.
 */
export default function Inicio() {
  const { negocio, contacto, servicios, valoracion } = config;
  const mensaje = mensajeInicio(contacto);
  const fichas = fichasConfianza(config, true);
  return (
    <>
      <HeroChat negocio={negocio} contacto={contacto} servicios={servicios} valoracion={valoracion} />
      {fichas.length > 0 && (
        <section aria-label="Por qué fiarte" className="contenedor pb-[clamp(48px,2rem+3vw,88px)]">
          <Confianza fichas={fichas} etiqueta="Por qué fiarte" />
        </section>
      )}
      <Proceso proceso={config.proceso} />
      <ParEntreBloques contacto={contacto} mensaje={mensaje} pregunta="¿Lo tienes delante ahora?" />
      {/* Sin WhatsApp, el hero ya lleva el índice por síntomas: no se repite. */}
      {contacto.whatsapp && <Servicios servicios={servicios} whatsapp={contacto.whatsapp} titulo="¿Qué te pasa?" />}
      <Tarifas tarifas={config.tarifas} />
      <Resenas resenas={config.resenas} valoracion={valoracion} contacto={contacto} mensajeCta={mensaje} />
      <Zonas zonas={config.zonas} />
      <PreguntasFrecuentes preguntas={config.preguntas} />
      <CtaFinal contacto={contacto} mensaje={mensaje} />
    </>
  );
}
