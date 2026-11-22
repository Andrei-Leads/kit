import config from "@/site.config";
import { MarcaPagina } from "@/components/MarcaPagina";
import { Asistente } from "@/components/secciones/Asistente";
import { ComoTrabajamos } from "@/components/secciones/ComoTrabajamos";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Garantias } from "@/components/secciones/Garantias";
import { HeroCaudal } from "@/components/secciones/HeroCaudal";
import { LemaCifras } from "@/components/secciones/LemaCifras";
import { PanoInstalacion } from "@/components/secciones/PanoInstalacion";
import { Resenas } from "@/components/secciones/Resenas";
import { ServiciosApilados } from "@/components/secciones/ServiciosApilados";
import { TrabajosCollage } from "@/components/secciones/TrabajosCollage";
import { ZonasPreguntas } from "@/components/secciones/ZonasPreguntas";
import { mensajeInicio } from "@/lib/mensajes";
import { datosCta, lineaConfianza } from "@/lib/textos";

/** Inicio de «Caudal» (encargo §4): el orden es el del diseño; cada sección sin datos se oculta. */
export default function Inicio() {
  const cta = datosCta(config.contacto, mensajeInicio(config.contacto));
  const confianza = lineaConfianza(config);
  return (
    <>
      <MarcaPagina pagina="inicio" />
      <HeroCaudal config={config} cta={cta} confianza={confianza} conEstrella={Boolean(config.valoracion)} />
      <LemaCifras config={config} />
      <TrabajosCollage trabajos={config.trabajos} galeria={config.galeria} cta={cta} />
      <PanoInstalacion config={config} cta={cta} />
      <ServiciosApilados servicios={config.servicios} telefono={config.contacto.telefono} whatsapp={config.contacto.whatsapp} />
      <ComoTrabajamos proceso={config.proceso} cta={cta} />
      <Garantias garantias={config.garantias} acreditaciones={config.acreditaciones} marcas={config.marcas} />
      <Resenas config={config} cta={cta} />
      <Asistente config={config} />
      <ZonasPreguntas zonas={config.zonas} preguntas={config.preguntas} />
      <CtaFinal cta={cta} confianza={confianza} />
    </>
  );
}
