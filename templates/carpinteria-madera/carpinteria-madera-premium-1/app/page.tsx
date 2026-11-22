import { BotonLlamada, minusculaInicial, pasosProceso } from "@andrei-leads/core";

import config from "@/site.config";
import { pildoraTinta, textoLlamar } from "@/components/Botones";
import { IconoTelefono } from "@/components/Iconos";
import { Asistente } from "@/components/secciones/Asistente";
import { Cifras } from "@/components/secciones/Cifras";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { HeroInicio } from "@/components/secciones/HeroInicio";
import { Lema } from "@/components/secciones/Lema";
import { Obras } from "@/components/secciones/Obras";
import { Opiniones } from "@/components/secciones/Opiniones";
import { Pano } from "@/components/secciones/Pano";
import { ProcesoTaller } from "@/components/secciones/ProcesoTaller";
import { alcanceRegla, Regla } from "@/components/secciones/Regla";
import { ServiciosFilas } from "@/components/secciones/ServiciosFilas";
import { ZonasYPreguntas } from "@/components/secciones/ZonasYPreguntas";
import { mensajeInicio } from "@/lib/mensajes";
import { datosCta, lineaConfianza } from "@/lib/textos";

/**
 * Inicio (encargo §6): un distribuidor corto. Hero → lema → obras → pano →
 * proceso apilado → servicios → cifras → opiniones → asistente → zonas y
 * preguntas → CTA final. Cada sección cierra con su pareja de CTAs.
 */
export default function Page() {
  const { contacto, negocio } = config;
  const cta = datosCta(contacto, mensajeInicio(contacto));
  const hayObras = config.trabajos.length > 0 || config.galeria.length > 0;
  const regla = [
    ...(hayObras ? [{ id: "obras", texto: "Obras", timeline: "--sec-obras" }] : []),
    { id: "taller", texto: "El taller", timeline: "--pano" },
    { id: "servicios", texto: "Servicios", timeline: "--sec-servicios" },
    ...(config.resenas.length > 0 ? [{ id: "opiniones", texto: "Opiniones", timeline: "--sec-opiniones" }] : []),
    { id: "contacto", texto: "Contacto", timeline: "--sec-contacto" },
  ];

  return (
    <>
      <span data-pagina="inicio" hidden />
      <HeroInicio
        video={config.videoHero}
        imagen={config.imagenesHero[0]}
        sector={negocio.sector}
        ciudad={contacto.direccion.ciudad}
        anioFundacion={negocio.anioFundacion}
        valoracion={config.valoracion}
        cta={cta}
        confianza={lineaConfianza(config, "valoracion")}
      />
      <div className="relative" style={alcanceRegla(regla)}>
        <Regla items={regla} />
        <Lema descripcion={negocio.descripcionCorta} imagen={config.imagenesHero[1]} />
        <Obras
          trabajos={config.trabajos}
          galeria={config.galeria}
          servicios={config.servicios}
          ciudad={contacto.direccion.ciudad}
          cta={cta}
          confianza={lineaConfianza(config, "valoracion")}
        />
        <Pano
          videoPano={config.videoPano}
          videoHero={config.videoHero}
          imagen={config.imagenesHero[0]}
          ciudad={contacto.direccion.ciudad}
          cta={cta}
        />
        <ProcesoTaller
          pasos={pasosProceso(config.proceso, "proyecto")}
          cta={cta}
          confianza={config.garantias[0] ?? lineaConfianza(config, "horario")}
        />
        <ServiciosFilas servicios={config.servicios} cta={cta} confianza={lineaConfianza(config, "horario")} />
        <Cifras
          anioFundacion={negocio.anioFundacion}
          valoracion={config.valoracion}
          zonas={config.zonas}
          garantias={config.garantias}
          marcas={config.marcas}
          cta={cta}
          confianza={lineaConfianza(config, "valoracion")}
        />
        <Opiniones
          resenas={config.resenas}
          valoracion={config.valoracion}
          fichaGoogle={contacto.fichaGoogle}
          trabajos={config.trabajos}
          cta={cta}
          confianza={lineaConfianza(config, "whatsapp")}
        />
        {contacto.whatsapp && (
          <section data-tono="claro" aria-label="Asistente de presupuesto" className="bg-alterna py-[clamp(5rem,3rem+6vw,9rem)]">
            <div className="contenedor">
              <Asistente
                servicios={config.servicios.map((s) => ({ titulo: s.titulo, enFrase: minusculaInicial(s.titulo) }))}
                numero={contacto.whatsapp}
                mensajeGenerico={cta.mensaje}
                llamada={
                  <BotonLlamada telefono={contacto.telefono} className={`${pildoraTinta} flex-[1_1_200px]`}>
                    <IconoTelefono />
                    <span>{textoLlamar(contacto.telefono)}</span>
                  </BotonLlamada>
                }
              />
            </div>
          </section>
        )}
        <ZonasYPreguntas zonas={config.zonas} preguntas={config.preguntas} cta={cta} confianza={lineaConfianza(config, "horario")} />
        <CtaFinal id="contacto" cta={cta} contacto={contacto} confianza={lineaConfianza(config, "horario")} />
      </div>
    </>
  );
}
