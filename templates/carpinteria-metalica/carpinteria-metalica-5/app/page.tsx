import { pasosProceso } from "@andrei-leads/core";

import config from "@/site.config";
import { Compromisos, hayCompromisos } from "@/components/secciones/Compromisos";
import { ConsultaObra } from "@/components/secciones/ConsultaObra";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { FranjaPareja } from "@/components/secciones/FranjaPareja";
import { HeroPerfil } from "@/components/secciones/HeroPerfil";
import { Metodo } from "@/components/secciones/Metodo";
import { Obras } from "@/components/secciones/Obras";
import { PreguntasFrecuentes } from "@/components/secciones/PreguntasFrecuentes";
import { Resenas } from "@/components/secciones/Resenas";
import { Soluciones } from "@/components/secciones/Soluciones";
import { Zonas } from "@/components/secciones/Zonas";
import { mensajeInicio, TEXTO_WA } from "@/lib/mensajes";
import { lineaTaller } from "@/lib/textos";

/**
 * Inicio de «Perfil» (encargo §6): hero con vídeo → obras → soluciones (estrella) → pareja →
 * método → compromisos (+ pareja) → reseñas → consulta → zonas → preguntas → CTA final.
 */
export default function Page() {
  const c = config;
  const cta = { telefono: c.contacto.telefono, whatsapp: c.contacto.whatsapp, mensaje: mensajeInicio(c.contacto) };
  const compromisos = { garantias: c.garantias, acreditaciones: c.acreditaciones, marcas: c.marcas, anioFundacion: c.negocio.anioFundacion };
  return (
    <>
      <HeroPerfil
        sector={c.negocio.sector}
        ciudad={c.contacto.direccion.ciudad}
        video={c.videoHero}
        imagen={c.imagenesHero[0]}
        valoracion={c.valoracion}
        descripcion={c.negocio.descripcionCorta}
        antetitulo={`${c.negocio.nombre} · ${lineaTaller(c.negocio, c.contacto.direccion.ciudad)}`}
        cta={cta}
      />
      <Obras trabajos={c.trabajos} galeria={c.galeria} />
      <Soluciones
        servicios={c.servicios}
        titulo={
          <h2 id="titulo-soluciones" className="titulo-h2">
            Lo que <em>fabricamos</em>
          </h2>
        }
      />
      <FranjaPareja
        cta={cta}
        frase={cta.whatsapp ? "Envíanos los planos y te decimos qué solución encaja." : "Llámanos y te decimos qué solución encaja."}
      />
      <Metodo pasos={pasosProceso(c.proceso, "proyecto")} />
      {hayCompromisos(compromisos) && (
        <>
          <Compromisos {...compromisos} />
          <FranjaPareja cta={cta} />
        </>
      )}
      <Resenas resenas={c.resenas} valoracion={c.valoracion} fichaGoogle={c.contacto.fichaGoogle} trabajos={c.trabajos} />
      <ConsultaObra contacto={c.contacto} soluciones={c.servicios.map((s) => s.titulo)} />
      <Zonas zonas={c.zonas} />
      <PreguntasFrecuentes preguntas={c.preguntas} />
      <CtaFinal cta={cta} textoWhatsapp={TEXTO_WA} />
    </>
  );
}
