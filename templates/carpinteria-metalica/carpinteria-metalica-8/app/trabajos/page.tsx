import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hayTrabajos, metadatosPagina } from "@andrei-leads/core";

import { CabeceraPagina } from "@/components/secciones/CabeceraPagina";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Obras } from "@/components/secciones/Obras";
import { mensajeInicio } from "@/lib/mensajes";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/trabajos", titulo: "Obras" });

/** /trabajos («Obras», encargo §7): rejilla de 2 columnas en escritorio; solo con galería, mosaico. */
export default function Page() {
  if (!hayTrabajos(config)) notFound();
  const { contacto } = config;
  return (
    <>
      <CabeceraPagina
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/trabajos", texto: "Obras" },
        ]}
        titulo="Obras"
        entradilla={config.trabajos.length > 0 ? "Trabajos terminados que han salido de nuestro taller." : "Fotos de trabajos que han salido de nuestro taller."}
      />
      <Obras trabajos={config.trabajos} galeria={config.galeria} modo="lista" />
      <CtaFinal contacto={contacto} mensaje={mensajeInicio(contacto)} />
    </>
  );
}
