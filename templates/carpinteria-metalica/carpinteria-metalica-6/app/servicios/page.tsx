import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { Migas } from "@/components/base/Migas";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Resenas } from "@/components/secciones/Resenas";
import { TarjetasServicios } from "@/components/secciones/TarjetasServicios";
import { mensajeInicio } from "@/lib/mensajes";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/servicios", titulo: "Servicios" });

/**
 * /servicios (encargo §7; no dibujada en la entrega: se construye con las piezas del inicio):
 * migas, h1, todas las tarjetas, reseñas y CTA.
 */
export default function Page() {
  const { contacto, servicios, negocio } = config;
  return (
    <>
      <span data-pagina="servicios" hidden />
      <section className="contenedor pt-2 pb-[clamp(56px,2rem+6vw,112px)]">
        <Migas migas={[{ href: "/", texto: "Inicio" }, { href: "/servicios", texto: "Servicios" }]} />
        <h1 className="titulo-display mt-2">Qué cambiamos</h1>
        <p className="mt-4 mb-[clamp(28px,4vw,48px)] max-w-[40rem] text-texto-suave">{negocio.descripcionCorta}</p>
        <TarjetasServicios servicios={servicios} nivel="h2" />
      </section>
      <Resenas resenas={config.resenas} valoracion={config.valoracion} trabajos={[]} fichaGoogle={contacto.fichaGoogle} />
      <CtaFinal
        cta={{ telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje: mensajeInicio(contacto) }}
        titulo="¿Cómo quedaría tu fachada?"
        texto={contacto.whatsapp ? "Hazle una foto desde la acera de enfrente y mándanosla. Te decimos qué cambiaríamos." : undefined}
      />
    </>
  );
}
