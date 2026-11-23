import config from "@/site.config";
import { CifrasFachada } from "@/components/secciones/CifrasFachada";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Encabezado } from "@/components/secciones/Encabezado";
import { FachadasAntesDespues } from "@/components/secciones/FachadasAntesDespues";
import { Garantias } from "@/components/secciones/Garantias";
import { HeroFachada } from "@/components/secciones/HeroFachada";
import { ParCta } from "@/components/secciones/ParCta";
import { Proceso } from "@/components/secciones/Proceso";
import { Resenas } from "@/components/secciones/Resenas";
import { TarjetasServicios } from "@/components/secciones/TarjetasServicios";
import { TuFachada } from "@/components/secciones/TuFachada";
import { ZonasPreguntas } from "@/components/secciones/ZonasPreguntas";
import { anioActual } from "@/lib/anio";
import { mensajeInicio } from "@/lib/mensajes";
import { cifras } from "@/lib/textos";

const MAX_SERVICIOS = 6;

/**
 * Inicio (encargo §6): hero antes/después → fachadas (estrella) → cifras + pareja → servicios →
 * proceso → garantías + pareja → reseñas → asistente → zonas y preguntas → CTA final. Cada
 * sección sin datos se oculta.
 */
export default async function Page() {
  const { contacto, servicios, trabajos, galeria } = config;
  const cta = { telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje: mensajeInicio(contacto) };
  const anio = await anioActual();
  const listaCifras = cifras(config, anio);
  const hayFachadas = trabajos.length > 0 || galeria.length > 0;
  return (
    <>
      <HeroFachada
        negocio={config.negocio}
        contacto={contacto}
        trabajos={trabajos}
        imagenesHero={config.imagenesHero}
        valoracion={config.valoracion}
      />
      <FachadasAntesDespues trabajos={trabajos} galeria={galeria} whatsapp={contacto.whatsapp} />
      <CifrasFachada cifras={listaCifras} className="pt-[clamp(24px,0.75rem+3vw,48px)] pb-[clamp(48px,2rem+4vw,88px)]">
        <ParCta cta={cta} pregunta={hayFachadas ? "¿Tu fachada se parece a alguna de estas?" : undefined} className="mt-8" />
      </CifrasFachada>
      <section aria-labelledby="titulo-servicios" className="border-y border-borde bg-superficie py-[clamp(56px,2rem+6vw,112px)]">
        <div className="contenedor">
          <Encabezado
            id="titulo-servicios"
            titulo="Qué cambiamos"
            enlace={servicios.length > MAX_SERVICIOS ? { href: "/servicios", texto: "Ver todos los servicios" } : undefined}
          />
          <TarjetasServicios servicios={servicios.slice(0, MAX_SERVICIOS)} />
        </div>
      </section>
      <Proceso proceso={config.proceso} />
      <Garantias garantias={config.garantias} acreditaciones={config.acreditaciones} marcas={config.marcas} />
      <div className="contenedor pt-[clamp(32px,1.25rem+3vw,56px)] pb-[clamp(56px,2rem+6vw,112px)]">
        <ParCta cta={cta} />
      </div>
      <Resenas resenas={config.resenas} valoracion={config.valoracion} trabajos={trabajos} fichaGoogle={contacto.fichaGoogle} />
      <TuFachada servicios={servicios} telefono={contacto.telefono} whatsapp={contacto.whatsapp} />
      <ZonasPreguntas zonas={config.zonas} preguntas={config.preguntas} className={contacto.whatsapp ? undefined : "pt-[clamp(56px,2rem+6vw,112px)]"} />
      <CtaFinal
        cta={cta}
        titulo="¿Cómo quedaría tu fachada?"
        texto={
          contacto.whatsapp
            ? "Hazle una foto desde la acera de enfrente y mándanosla. Te decimos qué cambiaríamos."
            : "Llámanos y cuéntanos qué quieres cambiar. Te decimos qué haríamos en tu fachada."
        }
      />
    </>
  );
}
