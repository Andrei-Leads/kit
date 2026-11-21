import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import { CabeceraPagina } from "@/components/CabeceraPagina";
import { Marco } from "@/components/Marco";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Dossier } from "@/components/secciones/Dossier";
import { ListaServicios } from "@/components/secciones/ListaServicios";
import { mensajeEdificio } from "@/lib/mensajes";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/servicios", titulo: "Servicios" });

/** /servicios (encargo §7): h1, la lista editorial completa, el Dossier corto (solo habilitación) y CTA. */
export default function Page() {
  const c = config;
  return (
    <Marco actual="servicios">
      <CabeceraPagina
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/servicios", texto: "Servicios" },
        ]}
        titulo="Servicios"
        entradilla={c.negocio.descripcionCorta}
      />
      <div className="contenedor pb-14 lg:pb-24">
        <ListaServicios servicios={c.servicios} nivel="h2" />
      </div>
      <Dossier
        acreditaciones={c.acreditaciones}
        garantias={c.garantias}
        negocio={c.negocio}
        contacto={c.contacto}
        comunidades={Boolean(c.comunidades)}
        modo="habilitacion"
        n="01"
        className="mb-14 lg:mb-20"
      />
      <CtaFinal contacto={c.contacto} mensaje={mensajeEdificio(c.contacto)} n={c.acreditaciones.length > 0 ? "02" : "01"} />
    </Marco>
  );
}
