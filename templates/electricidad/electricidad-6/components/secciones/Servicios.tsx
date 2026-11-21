import type { Servicio, SiteConfig } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { FilasServicios } from "@/components/secciones/FilasServicios";

/** Servicios del inicio: «Qué te arreglamos», filas compactas y la pareja Llamar + WhatsApp que cierra. */
export function Servicios({
  servicios,
  contacto,
  mensaje,
}: {
  servicios: readonly Servicio[];
  contacto: SiteConfig["contacto"];
  mensaje: string;
}) {
  return (
    <section aria-labelledby="titulo-servicios" className="bg-fondo">
      <div className="contenedor flex flex-col gap-6 py-9 lg:py-13">
        <h2 id="titulo-servicios" className="titulo-h2 m-0">
          Qué te arreglamos
        </h2>
        <FilasServicios servicios={servicios} />
        <Pareja contacto={contacto} mensaje={mensaje} className="mt-2" />
      </div>
    </section>
  );
}
