import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hayTrabajos, metadatosPagina } from "@andrei-leads/core";

import { Marco } from "@/components/Marco";
import { BandaInterior } from "@/components/secciones/BandaInterior";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { FichasTrabajos } from "@/components/secciones/FichasTrabajos";
import { mensajeInicio } from "@/lib/mensajes";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/trabajos", titulo: "Trabajos" });

/** /trabajos (encargo §7): rejilla de fichas redondeadas, sin filtro. Sin trabajos, la galería. */
export default function Page() {
  if (!hayTrabajos(config)) notFound();
  const { contacto } = config;
  return (
    <Marco actual="trabajos">
      <BandaInterior
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/trabajos", texto: "Trabajos" },
        ]}
        titulo="Trabajos"
        entradilla={config.trabajos.length > 0 ? "Obras terminadas, con lo que hicimos en cada una." : undefined}
      />
      <FichasTrabajos trabajos={config.trabajos} servicios={config.servicios} galeria={config.galeria} fila={false} />
      <CtaFinal contacto={contacto} mensaje={mensajeInicio(contacto)} />
    </Marco>
  );
}
