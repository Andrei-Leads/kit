import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import { Marco } from "@/components/Marco";
import { CabeceraInterior } from "@/components/secciones/CabeceraInterior";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Piezas } from "@/components/secciones/Piezas";
import { Resenas } from "@/components/secciones/Resenas";
import { mensajeInicio } from "@/lib/mensajes";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/servicios", titulo: "Servicios" });

/** /servicios (encargo §7): todas las fichas, reseñas y CTA. */
export default function Page() {
  const { contacto } = config;
  return (
    <Marco actual="servicios">
      <CabeceraInterior
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/servicios", texto: "Servicios" },
        ]}
        titulo="Servicios"
        entradilla={`Lo que forjamos en el taller de ${contacto.direccion.ciudad}, pieza a pieza.`}
      />
      <Piezas servicios={config.servicios} />
      <Resenas resenas={config.resenas} valoracion={config.valoracion} fichaGoogle={contacto.fichaGoogle} />
      <CtaFinal contacto={contacto} mensaje={mensajeInicio(contacto)} />
    </Marco>
  );
}
