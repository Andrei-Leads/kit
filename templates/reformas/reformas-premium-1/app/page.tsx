import config from "@/site.config";
import { Asistente } from "@/components/secciones/Asistente";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { EnPortada } from "@/components/secciones/EnPortada";
import { Garantias } from "@/components/secciones/Garantias";
import { Lema } from "@/components/secciones/Lema";
import { Pano } from "@/components/secciones/Pano";
import { Portada } from "@/components/secciones/Portada";
import { Proceso } from "@/components/secciones/Proceso";
import { ResenasTestimonio } from "@/components/secciones/ResenasTestimonio";
import { ServiciosApilados } from "@/components/secciones/ServiciosApilados";
import { ZonasPreguntas } from "@/components/secciones/ZonasPreguntas";
import { mensajeDeTrabajo, mensajeInicio } from "@/lib/mensajes";
import { datosCta, lineaConfianza } from "@/lib/textos";

/**
 * Inicio de «Estancia» (encargo §6). Ritmo claro/oscuro: portada (oscuro) · lema ·
 * En portada · pano (oscuro) · servicios · proceso (oscuro) · garantías · reseñas
 * (alterna) · asistente (tinta suave) · zonas y preguntas · CTA y pie (oscuro).
 * Cada sección sin datos se oculta. Los metadatos son los del layout (`crearMetadatos`).
 */
export default function Inicio() {
  const datos = datosCta(config.contacto, mensajeInicio(config.contacto));
  const { telefono, whatsapp } = config.contacto;
  return (
    <>
      <Portada config={config} datos={datos} />
      <Lema config={config} />
      <EnPortada config={config} datos={datos} />
      <Pano trabajos={config.trabajos} datos={{ telefono, whatsapp }} mensajeDe={mensajeDeTrabajo} />
      <ServiciosApilados servicios={config.servicios} datos={{ telefono, whatsapp }} />
      <Proceso config={config} datos={datos} />
      <Garantias garantias={config.garantias} acreditaciones={config.acreditaciones} marcas={config.marcas} />
      <ResenasTestimonio config={config} datos={datos} />
      <Asistente servicios={config.servicios} contacto={config.contacto} />
      <ZonasPreguntas zonas={config.zonas} preguntas={config.preguntas} />
      <CtaFinal datos={datos} confianza={lineaConfianza(config, "horario")} />
    </>
  );
}
