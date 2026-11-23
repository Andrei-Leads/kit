import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import { CabeceraPagina } from "@/components/secciones/CabeceraPagina";
import { ConfiguradorSeccion } from "@/components/secciones/ConfiguradorSeccion";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Resenas } from "@/components/secciones/Resenas";
import { Servicios } from "@/components/secciones/Servicios";
import { mensajeInicio } from "@/lib/mensajes";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/servicios", titulo: "Servicios" });

/** /servicios (encargo §7): todas las tarjetas de arco, reseñas y el configurador. */
export default function Page() {
  const { contacto } = config;
  const mensaje = mensajeInicio(contacto);
  return (
    <>
      <CabeceraPagina
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/servicios", texto: "Servicios" },
        ]}
        titulo="Servicios"
        entradilla="Todo lo que hacemos en el taller y en tu casa. Elige uno para ver qué incluye."
      />
      <Servicios servicios={config.servicios} />
      <Resenas resenas={config.resenas} valoracion={config.valoracion} fichaGoogle={contacto.fichaGoogle} max={3} />
      <ConfiguradorSeccion servicios={config.servicios} nombre={config.negocio.nombre} contacto={contacto} mensaje={mensaje} />
      <CtaFinal contacto={contacto} mensaje={mensaje} />
    </>
  );
}
