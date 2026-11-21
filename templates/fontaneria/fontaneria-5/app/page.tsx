import { pasosProceso } from "@andrei-leads/core";

import config from "@/site.config";
import { anioActual } from "@/lib/anio";
import { aniosOficio, horarioLinea, valoracionLinea } from "@/lib/formato";
import { mensajeInicio } from "@/lib/mensajes";
import { LlamadaZona, ParCierre, WhatsappContorno } from "@/components/Botones";
import { CifrasContador } from "@/components/secciones/CifrasContador";
import { ComoTrabajamos } from "@/components/secciones/ComoTrabajamos";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { HeroRed } from "@/components/secciones/HeroRed";
import { PreguntasFrecuentes } from "@/components/secciones/PreguntasFrecuentes";
import { RejillaServicios } from "@/components/secciones/RejillaServicios";
import { Resenas } from "@/components/secciones/Resenas";
import { Tarifas } from "@/components/secciones/Tarifas";
import { ZonasRed } from "@/components/secciones/ZonasRed";

/**
 * Inicio (orden de urgencias): hero con la red → cifras como contador → cómo trabajamos (+ pareja
 * de cierre) → servicios (+ pareja) → tarifas → reseñas → zonas (estrella, completa) → preguntas →
 * CTA final. Cada sección sin datos desaparece.
 */
export default async function Inicio() {
  const { negocio, contacto, zonas } = config;
  const mensaje = mensajeInicio(contacto);
  const anio = await anioActual();
  const horario = horarioLinea(contacto);
  return (
    <>
      <HeroRed sector={negocio.sector} contacto={contacto} zonas={zonas} valoracion={config.valoracion} mensaje={mensaje} />
      <CifrasContador
        bajoHero
        anios={aniosOficio(negocio.anioFundacion, anio)}
        valoracion={config.valoracion}
        municipios={zonas.length}
        tiempoLlegada={contacto.tiempoLlegada}
        urgencias24h={contacto.urgencias24h}
        acreditaciones={config.acreditaciones}
        garantias={config.garantias}
      />
      <ComoTrabajamos pasos={pasosProceso(config.proceso, "urgencias")}>
        <ParCierre contacto={contacto} whatsapp={contacto.whatsapp} mensaje={mensaje} linea={horario} />
      </ComoTrabajamos>
      <RejillaServicios servicios={config.servicios}>
        <ParCierre
          contacto={contacto}
          whatsapp={contacto.whatsapp}
          mensaje={mensaje}
          textoWhatsapp="Envíanos una foto por WhatsApp"
          linea={valoracionLinea(config.valoracion)}
        />
      </RejillaServicios>
      <Tarifas tarifas={config.tarifas} />
      <Resenas resenas={config.resenas} valoracion={config.valoracion} fichaGoogle={contacto.fichaGoogle} zonas={zonas} />
      <ZonasRed ciudad={contacto.direccion.ciudad} zonas={zonas} tiempoLlegada={contacto.tiempoLlegada} intro>
        <div className="mt-6 flex flex-col gap-2.5 lg:mt-7 lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-4 lg:gap-y-3">
          <p className="m-0 mb-0.5 font-titulo text-[19px] leading-[1.25] font-bold lg:mr-2 lg:mb-0 lg:text-[22px]">
            ¿Tu pueblo no está? Llama y te decimos.
          </p>
          <LlamadaZona contacto={contacto} />
          {contacto.whatsapp && (
            <WhatsappContorno numero={contacto.whatsapp} mensaje={mensaje}>
              Escribir por WhatsApp
            </WhatsappContorno>
          )}
        </div>
        <p className="mt-2.5 mb-0 text-sm text-texto-suave lg:text-[15px]">{horario}</p>
      </ZonasRed>
      <PreguntasFrecuentes preguntas={config.preguntas} />
      <CtaFinal contacto={contacto} mensaje={mensaje} textoWhatsapp="Escribir por WhatsApp" />
    </>
  );
}
