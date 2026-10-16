import config from "@/site.config";
import { Confianza, hayConfianza } from "@/components/secciones/Confianza";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Hero } from "@/components/secciones/Hero";
import { IndiceLateral } from "@/components/secciones/IndiceLateral";
import { Precios } from "@/components/secciones/Precios";
import { Preguntas } from "@/components/secciones/Preguntas";
import { Proceso } from "@/components/secciones/Proceso";
import { Resenas } from "@/components/secciones/Resenas";
import { Servicios } from "@/components/secciones/Servicios";
import { Zonas } from "@/components/secciones/Zonas";
import { anioActual } from "@/lib/anio";
import { pasosProceso } from "@/lib/proceso";
import { indiceInicio } from "@/lib/secciones";

/**
 * Inicio (encargo §5): Hero → «Lo que cuesta» (puesto 2; siempre sale, en uno de sus 3 modos) → Confianza →
 * Servicios (6 + «Ver todos» con 7 o más) → Cómo trabajamos (pasos por defecto) → Reseñas → Zonas → Preguntas →
 * CTA final. Cada sección recibe solo su parte de los datos y desaparece sin hueco si no los tiene.
 * Desde 1024 px, índice lateral sticky junto al contenido; el CTA final va fuera, a todo el ancho.
 */
export default async function Page() {
  const { negocio, contacto, servicios } = config;
  const anio = await anioActual();

  return (
    <>
      <div className="contenedor lg:flex lg:gap-4">
        <IndiceLateral secciones={indiceInicio(config)} telefono={contacto.telefono} />
        <div className="min-w-0 flex-1">
          <Hero
            negocio={negocio}
            contacto={contacto}
            imagen={config.imagenesHero[0]}
            valoracion={config.valoracion}
          />
          <Precios
            tarifas={config.tarifas}
            servicios={servicios}
            garantias={config.garantias}
            contacto={contacto}
          />
          {hayConfianza({ anioFundacion: negocio.anioFundacion, anio, acreditaciones: config.acreditaciones }) && (
            <Confianza
              anioFundacion={negocio.anioFundacion}
              anio={anio}
              acreditaciones={config.acreditaciones}
            />
          )}
          <Servicios servicios={servicios} limite={6} />
          <Proceso pasos={pasosProceso(config.proceso)} />
          {config.resenas.length > 0 && (
            <Resenas
              resenas={config.resenas}
              valoracion={config.valoracion}
              fichaGoogle={contacto.fichaGoogle}
            />
          )}
          {config.zonas.length > 0 && <Zonas zonas={config.zonas} />}
          {config.preguntas.length > 0 && <Preguntas preguntas={config.preguntas} />}
        </div>
      </div>
      <CtaFinal contacto={contacto} />
    </>
  );
}
