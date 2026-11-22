import type { Metadata } from "next";

import config from "@/site.config";
import { AsistenteInstalacion } from "@/components/secciones/AsistenteInstalacion";
import { Credenciales } from "@/components/secciones/Credenciales";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { HeroTension } from "@/components/secciones/HeroTension";
import { IndiceServicios } from "@/components/secciones/IndiceServicios";
import { Lema } from "@/components/secciones/Lema";
import { Pano } from "@/components/secciones/Pano";
import { Proceso } from "@/components/secciones/Proceso";
import { ProyectosDestacados } from "@/components/secciones/ProyectosDestacados";
import { Resenas } from "@/components/secciones/Resenas";
import { ZonasYPreguntas } from "@/components/secciones/ZonasYPreguntas";
import { cifrasClave } from "@/lib/cifras";
import { mensajeInicio } from "@/lib/mensajes";
import { datosCta, lineaConfianza, lineaHorario } from "@/lib/textos";

// La home usa los metadatos del layout (crearMetadatos): título, descripción y canonical «/».
export const metadata: Metadata = {};

/**
 * Inicio de «Tensión» (encargo §6): un distribuidor corto. Ritmo oscuro, claro,
 * oscuro (pano), oscuro, claro, oscuro. Nunca pasan más de dos secciones sin
 * una pareja de CTA. `urgencias24h` no se pinta en la home.
 */
export default async function Page() {
  const { negocio, contacto } = config;
  const mensaje = mensajeInicio(contacto);
  const cta = datosCta(contacto, mensaje);
  const cifras = await cifrasClave(config);
  const ciudad = contacto.direccion.ciudad;
  return (
    <>
      <span data-pagina="inicio" hidden />
      <HeroTension
        negocio={negocio}
        ciudad={ciudad}
        imagenes={config.imagenesHero}
        valoracion={config.valoracion}
        cta={cta}
        confianza={lineaConfianza(config)}
      />
      <section aria-label="Lema" className="pb-[clamp(80px,4rem+5vw,144px)]">
        <div className="contenedor border-t border-[var(--color-linea)] pt-[clamp(48px,3rem+3vw,96px)]">
          <Lema />
        </div>
      </section>
      <ProyectosDestacados trabajos={config.trabajos} galeria={config.galeria} cta={cta} />
      <Pano
        video={config.videoPano ?? config.videoHero}
        imagen={config.imagenesHero[3]}
        cifras={cifras}
        servicios={config.servicios.map((s) => s.titulo)}
        cta={cta}
      />
      <Credenciales acreditaciones={config.acreditaciones} garantias={config.garantias} marcas={config.marcas} />
      <IndiceServicios servicios={config.servicios} cta={cta} />
      <Proceso proceso={config.proceso} cta={cta} />
      <Resenas resenas={config.resenas} valoracion={config.valoracion} fichaGoogle={contacto.fichaGoogle} cta={cta} />
      <AsistenteInstalacion servicios={config.servicios.map((s) => s.titulo)} whatsapp={contacto.whatsapp} mensajeBase={mensaje} />
      <ZonasYPreguntas zonas={config.zonas} ciudad={ciudad} preguntas={config.preguntas} />
      <CtaFinal cta={cta} confianza={lineaHorario(contacto)} />
    </>
  );
}
