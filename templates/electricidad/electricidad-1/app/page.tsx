import config from "@/site.config";
import { Confianza } from "@/components/secciones/Confianza";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Hero } from "@/components/secciones/Hero";
import { Preguntas } from "@/components/secciones/Preguntas";
import { Proceso } from "@/components/secciones/Proceso";
import { Resenas } from "@/components/secciones/Resenas";
import { Servicios } from "@/components/secciones/Servicios";
import { Tarifas } from "@/components/secciones/Tarifas";
import { Zonas } from "@/components/secciones/Zonas";
import { pasosProceso } from "@/lib/proceso";
import { numerarSecciones, seccionesInicio } from "@/lib/secciones";

/**
 * Inicio (encargo §5): hero (01) → confianza → trámite → servicios (destacado + filas) → tarifas →
 * reseñas → zonas → preguntas → CTA final. Cada sección recibe solo su parte de los datos y
 * desaparece sin hueco si no los tiene (salvo el trámite, que usa los pasos por defecto).
 * Los números «NN —» salen de `seccionesInicio`, la misma lista que decide qué se pinta.
 */
export default function Page() {
  const { negocio, contacto, servicios } = config;
  const visibles = seccionesInicio(config);
  const n = numerarSecciones(visibles);
  const hay = (s: (typeof visibles)[number]) => visibles.includes(s);

  return (
    <>
      <Hero
        negocio={negocio}
        contacto={contacto}
        valoracion={config.valoracion}
        acreditacion={config.acreditaciones[0]}
      />
      <Confianza negocio={negocio} acreditaciones={config.acreditaciones} garantias={config.garantias} />
      <Proceso numero={n.proceso} pasos={pasosProceso(config.proceso)} servicio={servicios[0]} />
      <Servicios numero={n.servicios} servicios={servicios} contacto={contacto} />
      {config.tarifas && hay("tarifas") && <Tarifas numero={n.tarifas} tarifas={config.tarifas} />}
      {hay("resenas") && (
        <Resenas
          numero={n.resenas}
          resenas={config.resenas}
          valoracion={config.valoracion}
          fichaGoogle={contacto.fichaGoogle}
        />
      )}
      {hay("zonas") && <Zonas numero={n.zonas} zonas={config.zonas} />}
      {hay("preguntas") && <Preguntas numero={n.preguntas} preguntas={config.preguntas} />}
      <CtaFinal contacto={contacto} numero={n.cta} />
    </>
  );
}
