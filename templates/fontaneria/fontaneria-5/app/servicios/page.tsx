import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { Migas } from "@/components/base/Migas";
import { BandaCabecera, H1_INTERIOR, H2 } from "@/components/secciones/BandaCabecera";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Montante } from "@/components/secciones/Montante";
import { RejillaServicios } from "@/components/secciones/RejillaServicios";
import { Resenas } from "@/components/secciones/Resenas";
import { LlamadaHero, WhatsappContorno } from "@/components/Botones";
import { ramasZonas, valoracionLinea } from "@/lib/formato";
import { mensajeInicio } from "@/lib/mensajes";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/servicios", titulo: "Servicios" });

/** /servicios: banda con h1 y botones, rejilla de servicios, reseñas, montante resumido y CTA. */
export default function Servicios() {
  const { contacto, zonas } = config;
  const mensaje = mensajeInicio(contacto);
  const ciudad = contacto.direccion.ciudad;
  const ramas = ramasZonas(ciudad, zonas);
  const valoracion = valoracionLinea(config.valoracion);
  return (
    <>
      <BandaCabecera>
        <Migas migas={[{ href: "/", texto: "Inicio" }, { href: "/servicios", texto: "Servicios" }]} className="text-texto [&_a]:text-texto" />
        <h1 className={`${H1_INTERIOR} mt-3`}>Servicios</h1>
        <p className="mt-3 mb-0 max-w-[46ch] text-[clamp(1rem,0.9rem+0.4vw,1.1875rem)]">
          Lo que arreglamos en {ciudad}
          {ramas.length > 0 ? " y alrededores" : ""}. Llámanos y te decimos a qué hora llegamos.
        </p>
        <div className="mt-5 flex flex-col gap-2.5 lg:flex-row lg:flex-wrap lg:gap-3">
          <LlamadaHero contacto={contacto} />
          {contacto.whatsapp && (
            <WhatsappContorno numero={contacto.whatsapp} mensaje={mensaje}>
              Envíanos una foto por WhatsApp
            </WhatsappContorno>
          )}
        </div>
        {valoracion && <p className="mt-3 mb-0 text-[15px] font-semibold">{valoracion}</p>}
      </BandaCabecera>
      <RejillaServicios servicios={config.servicios} titulo="Todos los servicios" preloadPrimera />
      <Resenas resenas={config.resenas} valoracion={config.valoracion} fichaGoogle={contacto.fichaGoogle} zonas={zonas} />
      {zonas.length > 0 && (
        <section className="contenedor pt-10 pb-6 lg:pt-16">
          <h2 className={H2}>Dónde trabajamos</h2>
          <Montante ciudad={ciudad} ramas={ramas} max={6} hrefMas="/contacto#zonas" className="mt-4" />
        </section>
      )}
      <CtaFinal contacto={contacto} mensaje={mensaje} textoWhatsapp="Escribir por WhatsApp" />
    </>
  );
}
