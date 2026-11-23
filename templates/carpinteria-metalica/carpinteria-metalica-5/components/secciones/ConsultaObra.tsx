import { BotonLlamada, type SiteConfig } from "@andrei-leads/core";

import { Consulta } from "@/components/cliente/Consulta";
import { mensajeInicio } from "@/lib/mensajes";
import { llamarLargo } from "@/lib/textos";

type Props = { contacto: SiteConfig["contacto"]; soluciones: readonly string[] };

/** «Cuéntanos tu *obra*» (encargo §6.8): banda en `superficie` con el asistente. Sin WhatsApp, no existe. */
export function ConsultaObra({ contacto, soluciones }: Props) {
  if (!contacto.whatsapp) return null;
  return (
    <section aria-labelledby="titulo-consulta" className="mt-(--seccion) border-y border-borde bg-superficie py-[clamp(56px,8vw,112px)]">
      <div className="contenedor">
        <Consulta
          titulo={
            <h2 id="titulo-consulta" className="titulo-h2">
              Cuéntanos tu <em>obra</em>
            </h2>
          }
          soluciones={soluciones}
          whatsapp={contacto.whatsapp}
          mensajeVacio={mensajeInicio(contacto)}
          llamada={
            <BotonLlamada telefono={contacto.telefono} className="boton boton-contorno flex-[1_1_200px]">
              {llamarLargo(contacto.telefono)}
            </BotonLlamada>
          }
        />
      </div>
    </section>
  );
}
