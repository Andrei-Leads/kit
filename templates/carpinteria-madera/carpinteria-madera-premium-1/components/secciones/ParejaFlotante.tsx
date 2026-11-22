import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { IconoTelefono, IconoWhatsapp } from "@/components/Iconos";

type Props = { telefono: string; whatsapp?: string; mensaje: string };

/**
 * Pareja flotante (escritorio, encargo §5.2): cuando la cabecera se esconde al
 * bajar (`html[data-scroll="abajo"]`), aparece abajo a la derecha con
 * `@starting-style`. Sin JS no existe (la cabecera es fija).
 */
export function ParejaFlotante({ telefono, whatsapp, mensaje }: Props) {
  return (
    <div
      role="group"
      aria-label="Contacto rápido"
      className="flotante sobre-oscuro fixed right-6 bottom-6 z-[55] gap-1.5 rounded-full bg-tinta/95 p-1.5 backdrop-blur-md"
    >
      {whatsapp && (
        <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className="boton boton-48 b-primario">
          <IconoWhatsapp tamano={18} />
          WhatsApp
        </BotonWhatsApp>
      )}
      <BotonLlamada telefono={telefono} className="boton boton-48 b-papel">
        <IconoTelefono tamano={18} />
        Llamar
        <span className="sr-only"> al {telefonoVisible(telefono)}</span>
      </BotonLlamada>
    </div>
  );
}
