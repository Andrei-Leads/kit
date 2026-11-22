import { pasosProceso } from "@andrei-leads/core";

import config from "@/site.config";
import { CtaFinal, lineasFoto } from "@/components/secciones/CtaFinal";
import { Compromisos } from "@/components/secciones/Compromisos";
import { HeroMarco } from "@/components/secciones/HeroMarco";
import { Lema } from "@/components/secciones/Lema";
import { PanoLuz } from "@/components/secciones/PanoLuz";
import { Proceso } from "@/components/secciones/Proceso";
import { Resenas } from "@/components/secciones/Resenas";
import { SolucionesApiladas } from "@/components/secciones/SolucionesApiladas";
import { Trabajos } from "@/components/secciones/Trabajos";
import { TuVentana } from "@/components/secciones/TuVentana";
import { ZonasPreguntas } from "@/components/secciones/ZonasPreguntas";
import { mensajeInicio, TEXTO_WA } from "@/lib/mensajes";
import { confianzaHorario, confianzaValoracion } from "@/lib/textos";

/**
 * Inicio de «Marco» (encargo §6): un distribuidor de ~400 palabras con ritmo claro y
 * oscuro (`data-tono` en cada sección, lo lee la cabecera). Nunca pasan más de dos
 * secciones sin una pareja de CTAs.
 */
export default function Page() {
  const c = config;
  const cta = { telefono: c.contacto.telefono, whatsapp: c.contacto.whatsapp, mensaje: mensajeInicio(c.contacto) };
  return (
    <>
      <HeroMarco
        sector={c.negocio.sector}
        ciudad={c.contacto.direccion.ciudad}
        fotos={c.imagenesHero}
        cta={cta}
        confianza={confianzaValoracion(c)}
      />
      <Lema negocio={c.negocio} valoracion={c.valoracion} zonas={c.zonas} />
      <Trabajos trabajos={c.trabajos} galeria={c.galeria} cta={cta} />
      <SolucionesApiladas servicios={c.servicios} contacto={c.contacto} mensaje={cta.mensaje} apilados={4} />
      <Proceso pasos={pasosProceso(c.proceso, "proyecto")} cta={cta} />
      <PanoLuz video={c.videoPano} respaldo={c.galeria[0] ?? c.trabajos[0]?.imagenes[0]} cta={cta} />
      <Compromisos garantias={c.garantias} acreditaciones={c.acreditaciones} marcas={c.marcas} />
      <Resenas resenas={c.resenas} valoracion={c.valoracion} fichaGoogle={c.contacto.fichaGoogle} trabajos={c.trabajos} cta={cta} />
      <TuVentana contacto={c.contacto} soluciones={c.servicios.map((s) => s.titulo)} />
      <ZonasPreguntas zonas={c.zonas} preguntas={c.preguntas} />
      <CtaFinal
        cta={cta}
        lineas={lineasFoto(cta.whatsapp)}
        textoWhatsapp={TEXTO_WA}
        confianza={confianzaHorario(c.contacto.horario)}
      />
    </>
  );
}
