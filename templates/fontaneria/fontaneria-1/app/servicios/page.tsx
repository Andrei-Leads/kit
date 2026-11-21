import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { Encabezado } from "@/components/Encabezado";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { IndiceServicios } from "@/components/secciones/IndiceServicios";
import { Resenas } from "@/components/secciones/Resenas";
import { mensajeInicio } from "@/lib/mensajes";
import { lineaHorario, textoLlamar } from "@/lib/textos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/servicios", titulo: "Servicios" });

/** /servicios: todas las fichas, las reseñas completas (#resenas, destino de «Leer entera») y el CTA final. */
export default function Page() {
  const { contacto } = config;
  return (
    <>
      <Encabezado
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/servicios", texto: "Servicios" },
        ]}
        titulo="Servicios"
      >
        <p className="mt-3.5 max-w-[60ch] text-texto-suave">{config.negocio.descripcionCorta}</p>
      </Encabezado>
      <IndiceServicios servicios={config.servicios} />
      <Resenas resenas={config.resenas} valoracion={config.valoracion} fichaGoogle={contacto.fichaGoogle} variante="completa" />
      <CtaFinal
        telefono={contacto.telefono}
        whatsapp={contacto.whatsapp}
        mensaje={mensajeInicio(contacto)}
        textoLlamar={textoLlamar(contacto)}
        horario={lineaHorario(contacto)}
      />
    </>
  );
}
