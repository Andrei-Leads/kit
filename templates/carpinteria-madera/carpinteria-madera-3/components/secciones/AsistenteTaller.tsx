import { BotonLlamada, type Servicio, type SiteConfig } from "@andrei-leads/core";

import { Asistente } from "@/components/Asistente";
import { IconoTelefono, IconoWhatsApp } from "@/components/Iconos";
import { TituloSeccion } from "@/components/TituloSeccion";

type Props = {
  n: string;
  servicios: readonly Pick<Servicio, "slug" | "titulo">[];
  contacto: Pick<SiteConfig["contacto"], "telefono"> & { whatsapp: string };
  mensaje: string;
};

/**
 * Sección del asistente (encargo §6.7), solo con WhatsApp. Envoltorio de servidor: la isla recibe los
 * datos mínimos como props y el botón de llamada ya pintado (no importa core ni site.config).
 */
export function AsistenteTaller({ n, servicios, contacto, mensaje }: Props) {
  const preguntas = servicios.length > 1 ? "tres" : "dos";
  return (
    <section id="asistente" aria-labelledby="h2-asistente" className="pt-(--sec)">
      <TituloSeccion n={n} id="h2-asistente" className="mb-4">
        Tu encargo en {preguntas} preguntas
      </TituloSeccion>
      <p className="mb-7 max-w-[60ch] text-texto-suave">Contesta y te dejamos el mensaje escrito. Lo mandas tú por WhatsApp con las fotos; no guardamos nada.</p>
      <Asistente
        piezas={servicios.map((s) => ({ slug: s.slug, titulo: s.titulo }))}
        whatsapp={contacto.whatsapp}
        mensajeGeneral={mensaje}
        icono={<IconoWhatsApp />}
        llamada={
          <BotonLlamada telefono={contacto.telefono} className="btn btn-contorno flex-[1_1_200px]">
            <IconoTelefono />
            <span>Llamar al taller</span>
          </BotonLlamada>
        }
      />
    </section>
  );
}
