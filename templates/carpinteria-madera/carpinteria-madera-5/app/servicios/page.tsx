import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import { Migas } from "@/components/base/Migas";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { ListaServicios } from "@/components/secciones/Servicios";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/servicios", titulo: "Servicios" });

/** /servicios (encargo §7): migas, h1 y las tarjetas de servicio (con h2), y el CTA final. */
export default function Page() {
  const { servicios, galeria, empresa, contacto } = config;
  return (
    <>
      <section className="contenedor pt-10 pb-[clamp(56px,8vw,104px)]">
        <Migas
          migas={[
            { href: "/", texto: "Inicio" },
            { href: "/servicios", texto: "Servicios" },
          ]}
        />
        <h1 className="titulo-display mt-3">Servicios</h1>
        <p className="mt-3 mb-[clamp(32px,5vw,56px)] max-w-[44ch] text-texto-suave text-pretty">Lo que recuperamos en el taller y en tu casa.</p>
        <ListaServicios servicios={servicios} nivel="h2" />
      </section>
      <CtaFinal galeria={galeria} empresa={empresa} contacto={contacto} />
    </>
  );
}
