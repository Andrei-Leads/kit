import { pasosProceso } from "@andrei-leads/core";

import config from "@/site.config";
import { ParejaSuelta } from "@/components/Pareja";
import { BentoPiedras } from "@/components/secciones/BentoPiedras";
import { ComoTrabajamos } from "@/components/secciones/ComoTrabajamos";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { HeroSangre } from "@/components/secciones/HeroSangre";
import { PreguntasFrecuentes } from "@/components/secciones/PreguntasFrecuentes";
import { ResenasVecinos } from "@/components/secciones/ResenasVecinos";
import { Servicios } from "@/components/secciones/Servicios";
import { Tarifas } from "@/components/secciones/Tarifas";
import { Zonas } from "@/components/secciones/Zonas";
import { bento } from "@/lib/bento";
import { datosCta } from "@/lib/textos";

/**
 * Inicio (urgencias con un cambio explícito del encargo: las reseñas suben al
 * segundo lugar). Hero a sangre → reseñas (estrella) → bento de confianza →
 * cómo trabajamos (+ pareja) → servicios → tarifas → zonas (+ pareja) →
 * preguntas → CTA final. Cada sección sin datos desaparece.
 */
export default function Page() {
  const { negocio, contacto } = config;
  const cta = datosCta(config);
  return (
    <>
      <span data-pagina="inicio" hidden />
      <HeroSangre
        sector={negocio.sector}
        ciudad={contacto.direccion.ciudad}
        imagen={config.imagenesHero[0]}
        valoracion={config.valoracion}
        contacto={contacto}
        cta={cta}
      />
      <ResenasVecinos resenas={config.resenas} valoracion={config.valoracion} fichaGoogle={contacto.fichaGoogle} cta={cta} />
      <BentoPiedras datos={bento(config)} />
      <ComoTrabajamos pasos={pasosProceso(config.proceso, "urgencias")} />
      <ParejaSuelta cta={cta} />
      <Servicios servicios={config.servicios} />
      <Tarifas tarifas={config.tarifas} />
      {config.zonas.length > 0 && (
        <>
          <Zonas zonas={config.zonas} />
          <ParejaSuelta cta={cta} />
        </>
      )}
      <PreguntasFrecuentes preguntas={config.preguntas} />
      <CtaFinal cta={cta} />
    </>
  );
}
