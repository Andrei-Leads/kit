import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Encabezado } from "@/components/secciones/Encabezado";
import { Resenas } from "@/components/secciones/Resenas";
import { Servicios } from "@/components/secciones/Servicios";
import { mensajeInicio } from "@/lib/mensajes";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/servicios", titulo: "Servicios" });

/** /servicios: el índice por síntomas completo, reseñas y CTA. */
export default function Page() {
  const { contacto } = config;
  return (
    <>
      <Encabezado migas={[{ href: "/", texto: "Inicio" }, { href: "/servicios", texto: "Servicios" }]} titulo="Servicios" />
      <Servicios servicios={config.servicios} whatsapp={contacto.whatsapp} titulo="Elige lo que te pasa" />
      <Resenas resenas={config.resenas} valoracion={config.valoracion} contacto={contacto} />
      <CtaFinal contacto={contacto} mensaje={mensajeInicio(contacto)} />
    </>
  );
}
