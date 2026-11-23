import { BotonLlamada, telefonoVisible, type Servicio, type SiteConfig } from "@andrei-leads/core";

import { Asistente } from "@/components/Asistente";
import { IconoWhatsapp } from "@/components/Iconos";

type Props = {
  servicios: readonly Pick<Servicio, "slug" | "titulo">[];
  contacto: Pick<SiteConfig["contacto"], "telefono"> & { whatsapp: string };
  mensaje: string;
};

/**
 * Sección del asistente (encargo §6.7), solo con WhatsApp: caja blanca con borde de 2 px. Envoltorio
 * de servidor: la isla recibe los datos mínimos como props y el botón de llamada ya pintado (no
 * importa site.config).
 */
export function AsistentePieza({ servicios, contacto, mensaje }: Props) {
  const toques = servicios.length > 1 ? "tres" : "dos";
  return (
    <section id="asistente" aria-labelledby="titulo-asistente" className="contenedor pt-(--seccion)">
      <div className="flex flex-col gap-[22px] border-2 border-borde bg-superficie p-[clamp(1rem,0.6rem+1.6vw,2.25rem)]">
        <h2 id="titulo-asistente" className="titulo-h2 m-0">
          Tu pieza en {toques} toques
        </h2>
        <Asistente
          piezas={servicios.map((s) => ({ slug: s.slug, titulo: s.titulo }))}
          whatsapp={contacto.whatsapp}
          mensajeGeneral={mensaje}
          icono={<IconoWhatsapp />}
          llamada={
            <BotonLlamada telefono={contacto.telefono} className="boton boton-contorno boton-secundario">
              <span>
                Llamar <span aria-hidden="true">·</span> <span className="whitespace-nowrap">{telefonoVisible(contacto.telefono)}</span>
              </span>
            </BotonLlamada>
          }
        />
      </div>
    </section>
  );
}
