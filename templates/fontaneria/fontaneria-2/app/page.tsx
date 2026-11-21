import config from "@/site.config";
import { BentoConfianza } from "@/components/secciones/BentoConfianza";
import { ComoTrabajamos } from "@/components/secciones/ComoTrabajamos";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { HeroPartido } from "@/components/secciones/HeroPartido";
import { Pareja } from "@/components/secciones/Pareja";
import { PreguntasFrecuentes } from "@/components/secciones/PreguntasFrecuentes";
import { Resenas } from "@/components/secciones/Resenas";
import { Servicios } from "@/components/secciones/Servicios";
import { TarifasCerradas } from "@/components/secciones/TarifasCerradas";
import { Zonas } from "@/components/secciones/Zonas";
import { anioActual } from "@/lib/anio";
import { tarjetasBento } from "@/lib/bento";
import { h2Seccion } from "@/lib/estilos";
import { lineaCierre } from "@/lib/formato";
import { mensajeBase } from "@/lib/mensajes";
import { hayPrecios, preciosVisibles } from "@/lib/precios";

/**
 * Inicio de «Precio cerrado» (encargo §6): orden de urgencias con las tarifas justo detrás del hero
 * (variante «precio transparente») y el bento de confianza en tercer lugar. Cada sección desaparece
 * sin datos. Cero islas de cliente.
 */
export default async function Inicio() {
  const { negocio, contacto } = config;
  const mensaje = mensajeBase(contacto);
  const precios = preciosVisibles(config);
  const bento = tarjetasBento(config, await anioActual());
  const cierre = (
    <Pareja
      contacto={contacto}
      mensaje={mensaje}
      tamano="cierre"
      textoWhatsapp="Envíanos una foto por WhatsApp"
      linea={lineaCierre(config)}
      className="max-w-180"
    />
  );

  return (
    <>
      <HeroPartido
        negocio={negocio}
        contacto={contacto}
        valoracion={config.valoracion}
        imagenesHero={config.imagenesHero}
        garantias={config.garantias}
        precio={precios[0]}
        mensaje={mensaje}
      />
      <TarifasCerradas precios={precios} nota={config.tarifas?.nota} contacto={contacto} />
      <BentoConfianza tarjetas={bento}>{cierre}</BentoConfianza>
      <ComoTrabajamos proceso={config.proceso} />
      <Servicios
        servicios={config.servicios}
        nivel="h3"
        className="py-[clamp(48px,6vw,96px)]"
        cabecera={<h2 className={h2Seccion}>Nuestros servicios</h2>}
      />
      <Resenas resenas={config.resenas} valoracion={config.valoracion} fichaGoogle={contacto.fichaGoogle}>
        {cierre}
      </Resenas>
      <Zonas zonas={config.zonas} />
      <PreguntasFrecuentes
        preguntas={config.preguntas}
        titulo="Preguntas frecuentes"
        id="titulo-preguntas"
        grupo="preguntas"
        className={config.zonas.length > 0 ? "pb-[clamp(48px,6vw,96px)]" : "py-[clamp(48px,6vw,96px)]"}
      />
      <CtaFinal contacto={config.contacto} valoracion={config.valoracion} conPrecios={hayPrecios(config)} mensaje={mensaje} />
    </>
  );
}
