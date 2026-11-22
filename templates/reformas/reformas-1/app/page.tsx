import config from "@/site.config";
import { Asistente } from "@/components/secciones/Asistente";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Garantias } from "@/components/secciones/Garantias";
import { HeroAntesDespues } from "@/components/secciones/HeroAntesDespues";
import { ListaServicios } from "@/components/secciones/ListaServicios";
import { ParesAntesDespues } from "@/components/secciones/ParesAntesDespues";
import { PreguntasFrecuentes } from "@/components/secciones/PreguntasFrecuentes";
import { Proceso } from "@/components/secciones/Proceso";
import { Resenas } from "@/components/secciones/Resenas";
import { Zonas } from "@/components/secciones/Zonas";
import { mensajeInicio } from "@/lib/mensajes";

/**
 * Inicio (encargo §6): hero antes/después → obras en pares (estrella) → servicios → proceso →
 * garantías → reseñas → asistente → zonas → preguntas → CTA. Cada sección sin datos se oculta.
 */
export default function Page() {
  const { contacto, servicios, negocio } = config;
  const cta = { telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje: mensajeInicio(contacto) };
  return (
    <>
      <span data-pagina="inicio" hidden />
      <HeroAntesDespues config={config} />
      <ParesAntesDespues config={config} />
      <section aria-labelledby="titulo-servicios" className="border-t border-filete">
        <div className="contenedor seccion">
          <p className="versalitas mb-3.5">Servicios</p>
          <h2 id="titulo-servicios" className="titulo-seccion filete-h2">
            Lo que reformamos.
          </h2>
          <div className="mt-[clamp(24px,3vw,40px)]">
            <ListaServicios servicios={servicios} />
          </div>
        </div>
      </section>
      <Proceso proceso={config.proceso} />
      <Garantias
        garantias={config.garantias}
        acreditaciones={config.acreditaciones}
        marcas={config.marcas}
        anioFundacion={negocio.anioFundacion}
      />
      <Resenas resenas={config.resenas} valoracion={config.valoracion} trabajos={config.trabajos} fichaGoogle={contacto.fichaGoogle} />
      <Asistente servicios={servicios} whatsapp={contacto.whatsapp} />
      <Zonas zonas={config.zonas} />
      <PreguntasFrecuentes preguntas={config.preguntas} />
      <CtaFinal
        cta={cta}
        titulo={
          <>
            ¿Hablamos de tu <em>reforma</em>?
          </>
        }
      />
    </>
  );
}
