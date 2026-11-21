import config from "@/site.config";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Garantias } from "@/components/secciones/Garantias";
import { HeroBento } from "@/components/secciones/HeroBento";
import { PreguntasFrecuentes } from "@/components/secciones/PreguntasFrecuentes";
import { Proceso } from "@/components/secciones/Proceso";
import { Resenas } from "@/components/secciones/Resenas";
import { ServiciosBento } from "@/components/secciones/ServiciosBento";
import { Tarifas } from "@/components/secciones/Tarifas";
import { Zonas } from "@/components/secciones/Zonas";
import { datosCta } from "@/lib/textos";

/**
 * Inicio en el orden de urgencias (encargo §6): hero bento (absorbe la franja de
 * confianza) → garantías → proceso (+ pareja) → servicios (estrella) → tarifas →
 * reseñas (+ pareja) → zonas → preguntas → CTA final. Cada sección sin datos desaparece.
 */
export default function Page() {
  const cta = datosCta(config);
  const conPrecio = config.servicios.some((s) => s.precioDesde !== undefined);
  return (
    <>
      <span data-pagina="inicio" hidden />
      <HeroBento
        negocio={config.negocio}
        contacto={config.contacto}
        valoracion={config.valoracion}
        acreditacion={config.acreditaciones[0]}
        zonas={config.zonas}
        imagen={config.imagenesHero[0]}
        cta={cta}
      />
      <Garantias garantias={config.garantias} acreditaciones={config.acreditaciones.slice(1)} />
      <Proceso proceso={config.proceso} cta={cta} />
      <ServiciosBento
        servicios={config.servicios}
        trabajos={config.trabajos}
        limite={6}
        entrada={conPrecio ? "Toca un servicio para ver qué incluye y cuánto cuesta." : "Toca un servicio para ver qué incluye."}
      />
      <Tarifas tarifas={config.tarifas} />
      <Resenas resenas={config.resenas} valoracion={config.valoracion} fichaGoogle={config.contacto.fichaGoogle} cta={cta} />
      <Zonas zonas={config.zonas} />
      <PreguntasFrecuentes preguntas={config.preguntas} />
      <CtaFinal cta={cta} contacto={config.contacto} />
    </>
  );
}
