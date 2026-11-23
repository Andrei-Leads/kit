import { BotonLlamada, telefonoVisible, type SiteConfig } from "@andrei-leads/core";

import { Asistente } from "@/components/Asistente";
import { contorno, grande, relleno } from "@/components/Botones";
import { IconoWhatsapp } from "@/components/Iconos";
import { mensajeInicio } from "@/lib/mensajes";
import { cn } from "@/lib/utils";

type Props = Pick<SiteConfig, "servicios" | "contacto">;

/**
 * Bloque del asistente en el inicio (encargo §6.7): caja de superficie con filete, título y la isla
 * `Asistente`. Sin WhatsApp, no existe (el asistente solo compone un mensaje de WhatsApp).
 */
export function AsistenteHueco({ servicios, contacto }: Props) {
  if (!contacto.whatsapp) return null;
  return (
    <section aria-labelledby="titulo-asistente" className="marco seccion">
      <div className="grid gap-8 border border-filete bg-superficie p-[clamp(24px,4vw,56px)]">
        <div>
          <h2 id="titulo-asistente" data-aparecer className="titulo-h2">
            Cuéntanos tu hueco
          </h2>
          <p className="mt-3 max-w-[68ch] text-texto-suave">{servicios.length > 1 ? "Tres" : "Dos"} toques y te preparamos el mensaje de WhatsApp. No guardamos nada.</p>
        </div>
        <Asistente
          piezas={servicios.map((s) => s.titulo)}
          whatsapp={contacto.whatsapp}
          mensajePorDefecto={mensajeInicio(contacto)}
          claseWhatsapp={cn(relleno, grande)}
          icono={<IconoWhatsapp />}
          llamar={
            <BotonLlamada telefono={contacto.telefono} className={cn(contorno, grande, "flex-[1_1_210px]")}>
              Llamar · {telefonoVisible(contacto.telefono)}
            </BotonLlamada>
          }
        />
      </div>
    </section>
  );
}
