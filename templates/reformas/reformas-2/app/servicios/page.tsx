import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import { Marco } from "@/components/Marco";
import { BandaInterior } from "@/components/secciones/BandaInterior";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Resenas } from "@/components/secciones/Resenas";
import { ServiciosTarjetas } from "@/components/secciones/ServiciosTarjetas";
import { mensajeInicio } from "@/lib/mensajes";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/servicios", titulo: "Servicios" });

/** /servicios (encargo §7): banda terracota, tarjetas, reseñas y CTA. */
export default function Page() {
  const { contacto } = config;
  return (
    <Marco actual="servicios">
      <BandaInterior
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/servicios", texto: "Servicios" },
        ]}
        titulo="Servicios"
        entradilla={contacto.whatsapp ? "Elige el tuyo y planifícalo en dos pasos." : "Elige el tuyo y llámanos para contarnos tu reforma."}
      />
      <ServiciosTarjetas servicios={config.servicios} conPlanificador={Boolean(contacto.whatsapp)} />
      <Resenas resenas={config.resenas} valoracion={config.valoracion} fichaGoogle={contacto.fichaGoogle} />
      <CtaFinal contacto={contacto} mensaje={mensajeInicio(contacto)} />
    </Marco>
  );
}
