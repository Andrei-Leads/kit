import type { SiteConfig } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { TituloSeccion } from "@/components/TituloSeccion";
import { Foto } from "@/components/base/Foto";
import { estancias as agrupar, type DatosCta } from "@/lib/textos";

import { AnclasEstancias, GrupoInicio } from "./Estancias";

type Props = Pick<SiteConfig, "trabajos" | "servicios" | "galeria" | "contacto"> & { cta: DatosCta };

/**
 * Sección estrella «Trabajos por estancia» (encargo §6.2): un grupo por servicio, con anclas si
 * hay 2 o más, y la pareja al final. Sin trabajos pero con `galeria`, un bloque de galería a sangre
 * con los pies de `titulo`. Sin nada, no existe.
 */
export function TrabajosInicio({ trabajos, servicios, galeria, contacto, cta }: Props) {
  const grupos = agrupar(trabajos, servicios);
  if (grupos.length === 0 && galeria.length === 0) return null;
  return (
    <section aria-labelledby="titulo-trabajos" className="seccion">
      <div className="marco">
        <TituloSeccion id="titulo-trabajos">Lo último que ha salido del taller</TituloSeccion>
        <AnclasEstancias estancias={grupos} />
      </div>
      {grupos.length > 0 ? (
        <>
          {grupos.map((g, i) => (
            <GrupoInicio key={g.id} estancia={g} indice={i} contacto={contacto} />
          ))}
          <div className="marco pt-[clamp(56px,7vw,96px)]">
            <Pareja cta={cta} />
          </div>
        </>
      ) : (
        galeria.map((g) => (
          <figure key={g.src} className="foto-estancia mt-[clamp(40px,6vw,96px)]">
            <Foto imagen={g} sizes="100vw" proporcion="relleno" className="aspect-[4/5] lg:aspect-video" />
            {g.titulo && <figcaption className="marco pie-foto mt-3">{g.titulo}</figcaption>}
          </figure>
        ))
      )}
    </section>
  );
}
