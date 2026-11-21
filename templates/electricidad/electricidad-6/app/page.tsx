import config from "@/site.config";
import { Pareja } from "@/components/Botones";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Guardia } from "@/components/secciones/Guardia";
import { HeroTelefono } from "@/components/secciones/HeroTelefono";
import { PreguntasFrecuentes } from "@/components/secciones/PreguntasFrecuentes";
import { Proceso } from "@/components/secciones/Proceso";
import { Resenas } from "@/components/secciones/Resenas";
import { Servicios } from "@/components/secciones/Servicios";
import { Tarifas } from "@/components/secciones/Tarifas";
import { mensajeBase } from "@/lib/mensajes";

/**
 * Inicio de «Apagón» (encargo §6), en el orden del tipo urgencias: Hero → Guardia (estrella, en el
 * puesto de la franja de confianza, con las zonas dentro) → Proceso → Servicios (+ pareja) → Tarifas →
 * Reseñas (+ pareja) → Preguntas → CTA final. Sin islas de cliente.
 */
export default function Page() {
  const { negocio, contacto } = config;
  const mensaje = mensajeBase(contacto);
  return (
    <>
      <HeroTelefono sector={negocio.sector} contacto={contacto} valoracion={config.valoracion} mensaje={mensaje} />
      <Guardia
        contacto={contacto}
        zonas={config.zonas}
        anioFundacion={negocio.anioFundacion}
        valoracion={config.valoracion}
        acreditaciones={config.acreditaciones}
        garantias={config.garantias}
      />
      <Proceso proceso={config.proceso} />
      <Servicios servicios={config.servicios} contacto={contacto} mensaje={mensaje} />
      <Tarifas tarifas={config.tarifas} />
      <Resenas resenas={config.resenas} valoracion={config.valoracion} fichaGoogle={contacto.fichaGoogle} deNoche={contacto.urgencias24h}>
        <Pareja contacto={contacto} mensaje={mensaje} className="mt-2" />
      </Resenas>
      <PreguntasFrecuentes preguntas={config.preguntas} />
      <CtaFinal contacto={contacto} mensaje={mensaje} />
    </>
  );
}
