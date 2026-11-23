import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hayTrabajos, metadatosPagina } from "@andrei-leads/core";

import { Marco } from "@/components/Marco";
import { CabeceraInterior } from "@/components/secciones/CabeceraInterior";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { GaleriaPorTipo } from "@/components/secciones/GaleriaPorTipo";
import { conPuebloYAnio } from "@/lib/galeria";
import { mensajeInicio } from "@/lib/mensajes";
import config from "@/site.config";

const conObras = config.trabajos.length > 0;

export const metadata: Metadata = metadatosPagina(config, { ruta: "/trabajos", titulo: conObras ? "Obras" : "Galería" });

/** /trabajos «Obras» (encargo §7): la galería por tipo completa, con chips de ancla y «Quiero una así». */
export default function Page() {
  if (!hayTrabajos(config)) notFound();
  const { contacto } = config;
  const titulo = conObras ? "Obras" : "Galería";
  return (
    <Marco actual="trabajos">
      <CabeceraInterior
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/trabajos", texto: titulo },
        ]}
        titulo={titulo}
        entradilla={conObras ? `${conPuebloYAnio(config.trabajos) ? "Cada pieza con su pueblo y su año. " : ""}Pulsa en una para ver cómo se hizo.` : undefined}
      />
      <GaleriaPorTipo trabajos={config.trabajos} servicios={config.servicios} galeria={config.galeria} whatsapp={contacto.whatsapp} />
      <CtaFinal contacto={contacto} mensaje={mensajeInicio(contacto)} />
    </Marco>
  );
}
