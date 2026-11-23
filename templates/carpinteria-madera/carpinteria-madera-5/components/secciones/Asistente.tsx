import { BotonLlamada, telefonoVisible, type SiteConfig } from "@andrei-leads/core";

import { AsistentePieza } from "@/components/AsistentePieza";
import { contorno, grande, relleno } from "@/components/Botones";
import { IconoWhatsapp } from "@/components/Iconos";
import { mensajeInicio } from "@/lib/mensajes";
import { cn } from "@/lib/utils";

type Props = Pick<SiteConfig, "servicios" | "contacto">;

/**
 * Bloque del asistente en el inicio (encargo §6.7): caja de superficie con la esquina inferior
 * izquierda muy redondeada, título y la isla `AsistentePieza`. Sin WhatsApp, no existe (el
 * asistente solo compone un mensaje de WhatsApp).
 */
export function Asistente({ servicios, contacto }: Props) {
  if (!contacto.whatsapp) return null;
  return (
    <section aria-labelledby="titulo-asistente" className="pb-[clamp(56px,9vw,120px)]">
      <div className="contenedor">
        <div className="rounded-caja border border-borde bg-superficie p-[clamp(24px,5vw,64px)]">
          <p className="antetitulo">Pide presupuesto</p>
          <h2 id="titulo-asistente" className="titulo-seccion">
            Cuéntanos qué pieza tienes
          </h2>
          <AsistentePieza
            piezas={servicios.map((s) => ({ slug: s.slug, titulo: s.titulo }))}
            whatsapp={contacto.whatsapp}
            mensajePorDefecto={mensajeInicio(contacto)}
            claseWhatsapp={cn(relleno, grande)}
            icono={<IconoWhatsapp tamano={20} />}
            llamar={
              <BotonLlamada telefono={contacto.telefono} className={cn(contorno, grande, "flex-[1_1_200px]")}>
                <span>Llamar · {telefonoVisible(contacto.telefono)}</span>
              </BotonLlamada>
            }
          />
          <p className="mt-3 text-[15px] text-texto-suave">Al abrirse WhatsApp, añade una foto.</p>
        </div>
      </div>
    </section>
  );
}
