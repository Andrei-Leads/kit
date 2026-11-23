import { AsistenteHueco } from "@/components/secciones/AsistenteHueco";
import { ComoTrabajamos } from "@/components/secciones/ComoTrabajamos";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Garantias } from "@/components/secciones/Garantias";
import { Hero } from "@/components/secciones/Hero";
import { PreguntasFrecuentes } from "@/components/secciones/PreguntasFrecuentes";
import { Resenas } from "@/components/secciones/Resenas";
import { Servicios } from "@/components/secciones/Servicios";
import { TrabajosInicio } from "@/components/secciones/TrabajosInicio";
import { Zonas } from "@/components/secciones/Zonas";
import { mensajeInicio } from "@/lib/mensajes";
import { lineaHorario } from "@/lib/textos";
import config from "@/site.config";

/** Inicio de «Veta» en el orden del encargo §6 (tipo proyecto). Cada sección sin datos desaparece. */
export default function Inicio() {
  const { negocio, contacto } = config;
  const cta = { telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje: mensajeInicio(contacto) };
  return (
    <div data-pagina="inicio">
      <Hero
        sector={negocio.sector}
        ciudad={contacto.direccion.ciudad}
        imagenesHero={config.imagenesHero}
        valoracion={config.valoracion}
        cta={cta}
      />
      <TrabajosInicio trabajos={config.trabajos} servicios={config.servicios} galeria={config.galeria} contacto={contacto} cta={cta} />
      <Servicios servicios={config.servicios} cta={cta} />
      <ComoTrabajamos proceso={config.proceso} />
      <Garantias
        garantias={config.garantias}
        marcas={config.marcas}
        acreditaciones={config.acreditaciones}
        anioFundacion={negocio.anioFundacion}
      />
      <Resenas resenas={config.resenas} valoracion={config.valoracion} fichaGoogle={contacto.fichaGoogle} cta={cta} />
      <AsistenteHueco servicios={config.servicios} contacto={contacto} />
      <Zonas zonas={config.zonas} />
      <PreguntasFrecuentes preguntas={config.preguntas} />
      <CtaFinal foto={config.imagenesHero[1] ?? config.galeria[0]} cta={cta} horario={lineaHorario(contacto.horario)} />
    </div>
  );
}
