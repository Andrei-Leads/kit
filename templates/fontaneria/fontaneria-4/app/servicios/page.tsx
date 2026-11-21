import type { Metadata } from "next";
import { metadatosPagina, minusculaInicial } from "@andrei-leads/core";

import { CabeceraParte } from "@/components/secciones/CabeceraParte";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Resenas } from "@/components/secciones/Resenas";
import { ServiciosParte } from "@/components/secciones/ServiciosParte";
import { Marco } from "@/components/Marco";
import { dosCifras, lineaConfianza } from "@/lib/formato";
import { mensajeAviso } from "@/lib/mensajes";
import { datosMarco } from "@/lib/navegacion";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/servicios", titulo: "Servicios" });

/** /servicios (encargo §7): cabecera de parte pequeña, fichas de servicio, reseñas y CTA. El índice lista los servicios. */
export default function Page() {
  const { negocio, contacto, servicios, resenas, valoracion } = config;
  return (
    <Marco {...datosMarco(config)} pagina="servicios" campos={servicios.map((s) => ({ id: `s-${s.slug}`, texto: s.titulo }))}>
      <CabeceraParte
        tipo="Servicios"
        casillas={[{ rotulo: "Partes", valor: dosCifras(servicios.length) }]}
        titulo={`Servicios de ${minusculaInicial(negocio.sector)} en ${contacto.direccion.ciudad}`}
        entradilla={negocio.descripcionCorta}
      />
      <ServiciosParte servicios={servicios} />
      <Resenas resenas={resenas} valoracion={valoracion} fichaGoogle={contacto.fichaGoogle} />
      <CtaFinal contacto={config.contacto} confianza={lineaConfianza(config)} mensaje={mensajeAviso(contacto)} />
    </Marco>
  );
}
