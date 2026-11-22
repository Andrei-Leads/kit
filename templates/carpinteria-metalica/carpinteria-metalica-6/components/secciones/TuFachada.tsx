import { BotonLlamada, minusculaInicial, telefonoVisible, type SiteConfig } from "@andrei-leads/core";

import { pastillaClara } from "@/components/Botones";
import { IconoTelefono } from "@/components/Iconos";
import { TuFachadaIsla } from "@/components/secciones/TuFachadaIsla";
import { cn } from "@/lib/utils";

type Props = { servicios: SiteConfig["servicios"]; telefono: string; whatsapp?: string };

/**
 * Asistente «Tu fachada» (encargo §5 y §6.9): tarjeta blanca de 24 px de radio con el texto y el
 * progreso a la izquierda y las preguntas a la derecha. Componente de servidor: pasa los títulos y
 * el botón de llamada (ya pintado) a la isla. Sin WhatsApp, no existe.
 */
export function TuFachada({ servicios, telefono, whatsapp }: Props) {
  if (!whatsapp) return null;
  const pasos = servicios.length === 1 ? 2 : 3;
  return (
    <section aria-labelledby="titulo-asistente" className="py-[clamp(56px,2rem+6vw,112px)]">
      <div className="contenedor">
        <TuFachadaIsla
          numero={whatsapp}
          servicios={servicios.map((s) => ({ titulo: s.titulo, enFrase: minusculaInicial(s.titulo) }))}
          llamada={
            <BotonLlamada telefono={telefono} className={cn(pastillaClara, "min-h-14 flex-[1_1_180px]")}>
              <IconoTelefono tamano={20} />
              <span>
                Llamar<span className="sr-only"> al {telefonoVisible(telefono)}</span>
              </span>
            </BotonLlamada>
          }
          cabeza={
            <>
              <h2 id="titulo-asistente" className="titulo-seccion">
                Tu fachada, en {pasos === 2 ? "dos" : "tres"} preguntas
              </h2>
              <p className="text-texto-suave">Elige y te dejamos el mensaje escrito. Solo tienes que enviarlo con una foto. No te pedimos ningún dato.</p>
            </>
          }
        />
      </div>
    </section>
  );
}
