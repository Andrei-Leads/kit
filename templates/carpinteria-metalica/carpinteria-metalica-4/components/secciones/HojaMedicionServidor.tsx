import { BotonLlamada, telefonoVisible, type SiteConfig } from "@andrei-leads/core";

import { Encabezado } from "@/components/Encabezado";
import { HojaMedicion } from "@/components/HojaMedicion";

type Props = {
  servicios: SiteConfig["servicios"];
  contacto: SiteConfig["contacto"];
  n?: string;
};

/**
 * Sección `HojaMedicion` (encargo §6.8). Se oculta sin WhatsApp. Pasa a la isla solo los títulos
 * de los servicios, el número y el `BotonLlamada` ya pintado (la isla no importa site.config).
 */
export function HojaMedicionServidor({ servicios, contacto, n }: Props) {
  if (!contacto.whatsapp) return null;
  return (
    <section id="hoja" aria-labelledby="titulo-hoja" className="gutter seccion">
      <Encabezado n={n} etiqueta="HOJA DE MEDICIÓN" titulo="Rellena la hoja y vamos a medir" id="titulo-hoja" />
      <HojaMedicion
        servicios={servicios.map((s) => s.titulo)}
        numero={contacto.whatsapp}
        llamada={
          <BotonLlamada telefono={contacto.telefono} className="boton boton-trazo flex-[1_1_200px]">
            Llamar · {telefonoVisible(contacto.telefono)}
          </BotonLlamada>
        }
      />
    </section>
  );
}
