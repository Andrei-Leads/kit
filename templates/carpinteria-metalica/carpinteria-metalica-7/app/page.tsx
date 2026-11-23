import { pasosProceso } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { Marco } from "@/components/Marco";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { EncargoSeccion } from "@/components/secciones/EncargoSeccion";
import { GaleriaPorTipo } from "@/components/secciones/GaleriaPorTipo";
import { Garantias } from "@/components/secciones/Garantias";
import { HeroTaller } from "@/components/secciones/HeroTaller";
import { Piezas } from "@/components/secciones/Piezas";
import { PreguntasFrecuentes } from "@/components/secciones/PreguntasFrecuentes";
import { Proceso } from "@/components/secciones/Proceso";
import { Resenas } from "@/components/secciones/Resenas";
import { Zonas } from "@/components/secciones/Zonas";
import { conPuebloYAnio } from "@/lib/galeria";
import { mensajeInicio } from "@/lib/mensajes";
import config from "@/site.config";

/**
 * Inicio (encargo §6, tipo proyecto): hero del taller y descripción, obras por tipo (estrella),
 * piezas + pareja, proceso, garantías, reseñas + pareja, encargo, zonas, preguntas y CTA final.
 */
export default function Page() {
  const { negocio, contacto } = config;
  const mensaje = mensajeInicio(contacto);
  const iTestimonio = config.trabajos.findIndex((t) => t.testimonio);
  return (
    <Marco>
      <HeroTaller
        titulo={`${negocio.sector} en ${contacto.direccion.ciudad}`}
        foto={config.imagenesHero[0]}
        valoracion={config.valoracion}
        contacto={contacto}
        mensaje={mensaje}
      />
      <div className="contenedor pt-7">
        <p className="max-w-[38ch] text-[clamp(1.125rem,1rem+0.7vw,1.5rem)] leading-[1.4] text-pretty">{negocio.descripcionCorta}</p>
      </div>
      <GaleriaPorTipo
        trabajos={config.trabajos}
        servicios={config.servicios}
        galeria={config.galeria}
        titulo={config.trabajos.length > 0 ? "Obras del taller" : "Galería"}
        entradilla={config.trabajos.length > 0 ? (conPuebloYAnio(config.trabajos) ? "Por tipo de pieza, cada una con su pueblo y su año." : "Por tipo de pieza.") : undefined}
        resumen
      />
      <Piezas servicios={config.servicios} titulo="Piezas que forjamos" />
      <div className="contenedor pb-[clamp(32px,4vw,56px)]">
        <Pareja contacto={contacto} mensaje={mensaje} />
      </div>
      <Proceso pasos={pasosProceso(config.proceso, "proyecto")} />
      <Garantias garantias={config.garantias} acreditaciones={config.acreditaciones} anioFundacion={negocio.anioFundacion} />
      <Resenas
        resenas={config.resenas}
        valoracion={config.valoracion}
        fichaGoogle={contacto.fichaGoogle}
        testimonio={iTestimonio >= 0 ? { trabajo: config.trabajos[iTestimonio], indice: iTestimonio } : undefined}
      />
      <div className="contenedor pb-[clamp(36px,5vw,64px)]">
        <Pareja contacto={contacto} mensaje={mensaje} />
      </div>
      <EncargoSeccion servicios={config.servicios} contacto={contacto} mensajeGeneral={mensaje} />
      <Zonas zonas={config.zonas} />
      <PreguntasFrecuentes preguntas={config.preguntas} grupo="preguntas-inicio" />
      <CtaFinal contacto={contacto} mensaje={mensaje} />
    </Marco>
  );
}
