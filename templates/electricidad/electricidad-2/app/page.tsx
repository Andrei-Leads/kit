import config from "@/site.config";
import { Corte } from "@/components/Corte";
import { Confianza } from "@/components/secciones/Confianza";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Hero } from "@/components/secciones/Hero";
import { PorQueFiarte } from "@/components/secciones/PorQueFiarte";
import { Preguntas } from "@/components/secciones/Preguntas";
import { Proceso } from "@/components/secciones/Proceso";
import { Resenas } from "@/components/secciones/Resenas";
import { Servicios } from "@/components/secciones/Servicios";
import { Tarifas } from "@/components/secciones/Tarifas";
import { Zonas } from "@/components/secciones/Zonas";
import { anioActual } from "@/lib/anio";
import { aniosEnElBarrio } from "@/lib/formato";
import { pasosProceso } from "@/lib/proceso";
import { estrellaInicio, hayConfianza } from "@/lib/secciones";

/**
 * Inicio (encargo §5): hero → reseñas (la pieza estrella, puesto 2) o «Por qué fiarte» si hay 0 reseñas →
 * franja de confianza (solo con reseñas) → «Cómo trabajamos» → servicios → tarifas → zonas + preguntas →
 * CTA final. Cada sección recibe solo su parte de los datos y desaparece sin hueco si no los tiene (salvo
 * «Cómo trabajamos», que usa los pasos por defecto, y los servicios, que siempre son al menos 1).
 *
 * Las bandas alternan piedra y piedra-2 y se separan con `Corte` (diagonal que sube a la derecha). El hero
 * dibuja su propio corte (con foto no puede ser un elemento aparte); los demás los pone esta página, que es
 * la que sabe qué hay encima y debajo de cada uno. Sin sección estrella, el hero corta hacia piedra y
 * «Cómo trabajamos» sube al puesto 2.
 */
export default async function Page() {
  const { negocio, contacto, servicios, tarifas } = config;
  const anio = await anioActual();
  const anios = aniosEnElBarrio(negocio.anioFundacion, anio);
  const estrella = estrellaInicio(config, anio);
  const hayZonasOPreguntas = config.zonas.length > 0 || config.preguntas.length > 0;
  // ¿Algo entre los servicios (piedra-2) y el CTA final? Si no, el CTA corta directamente desde piedra-2.
  const hayDespuesDeServicios = tarifas !== undefined || hayZonasOPreguntas;

  return (
    <>
      <Hero
        negocio={negocio}
        contacto={contacto}
        valoracion={config.valoracion}
        imagen={config.imagenesHero[0]}
        siguiente={estrella === "ninguna" ? "piedra" : "piedra-2"}
      />

      {estrella === "resenas" && (
        <Resenas
          resenas={config.resenas}
          valoracion={config.valoracion}
          fichaGoogle={contacto.fichaGoogle}
          telefono={contacto.telefono}
        />
      )}
      {estrella === "fiarte" && (
        <PorQueFiarte
          anios={anios}
          acreditaciones={config.acreditaciones}
          garantias={config.garantias}
          telefono={contacto.telefono}
        />
      )}
      {estrella !== "ninguna" && <Corte de="piedra-2" a="piedra" />}

      {estrella === "resenas" && hayConfianza(config, anio) && (
        <Confianza anios={anios} acreditaciones={config.acreditaciones} garantias={config.garantias} />
      )}
      <Proceso pasos={pasosProceso(config.proceso)} />

      <Corte de="piedra" a="piedra-2" />
      <Servicios servicios={servicios} />
      {hayDespuesDeServicios && <Corte de="piedra-2" a="piedra" />}

      {tarifas && <Tarifas tarifas={tarifas} />}
      {hayZonasOPreguntas && (
        <div className="contenedor grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-x-[72px] gap-y-14 pt-4 pb-16 lg:pt-6 lg:pb-[104px]">
          {config.zonas.length > 0 && <Zonas zonas={config.zonas} />}
          {config.preguntas.length > 0 && <Preguntas preguntas={config.preguntas} />}
        </div>
      )}

      <CtaFinal contacto={contacto} desde={hayDespuesDeServicios ? "piedra" : "piedra-2"} />
    </>
  );
}
