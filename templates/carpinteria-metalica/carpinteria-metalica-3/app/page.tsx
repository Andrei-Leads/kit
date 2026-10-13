import { AMedida } from "@/components/secciones/AMedida";
import { Averias } from "@/components/secciones/Averias";
import { Confianza } from "@/components/secciones/Confianza";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Hero } from "@/components/secciones/Hero";
import { Preguntas } from "@/components/secciones/Preguntas";
import { Proceso } from "@/components/secciones/Proceso";
import { Resenas } from "@/components/secciones/Resenas";
import { Tarifas } from "@/components/secciones/Tarifas";
import { Zonas } from "@/components/secciones/Zonas";
import { mensajeGeneral } from "@/lib/mensajes";
import config from "@/site.config";

export default function Page() {
  const { negocio, contacto } = config;
  return (
    <>
      <Hero
        sector={negocio.sector}
        descripcionCorta={negocio.descripcionCorta}
        ciudad={contacto.direccion.ciudad}
        urgencias24h={contacto.urgencias24h}
        tiempoLlegada={contacto.tiempoLlegada}
        horario={contacto.horario}
        telefono={contacto.telefono}
        whatsapp={contacto.whatsapp}
        mensajeWhatsapp={mensajeGeneral(contacto)}
        valoracion={config.valoracion}
        hayResenas={config.resenas.length > 0}
      />
      <Resenas resenas={config.resenas} valoracion={config.valoracion} fichaGoogle={contacto.fichaGoogle} />
      <Averias servicios={config.servicios} telefono={contacto.telefono} />
      <Confianza
        anioFundacion={negocio.anioFundacion}
        acreditaciones={config.acreditaciones}
        garantias={config.garantias}
      />
      <Proceso proceso={config.proceso} />
      <Tarifas tarifas={config.tarifas} />
      <AMedida servicios={config.servicios} />
      <Zonas zonas={config.zonas} telefono={contacto.telefono} />
      <Preguntas preguntas={config.preguntas} titulo="Preguntas frecuentes" nivel="h2" />
      <CtaFinal telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensajeGeneral(contacto)} />
    </>
  );
}
