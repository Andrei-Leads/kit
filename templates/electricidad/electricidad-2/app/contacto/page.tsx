import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import { CabeceraInterior } from "@/components/secciones/CabeceraInterior";
import { ContactoBotones } from "@/components/secciones/ContactoBotones";
import { ContactoDatos } from "@/components/secciones/ContactoDatos";
import config from "@/site.config";
import { horarioVisible } from "@/lib/formato";
import { textos } from "@/lib/textos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/contacto", titulo: textos.contacto });

/**
 * /contacto (mockups 2g y 2k): `llamada-acento` grande, `whatsapp-linea` (solo con WhatsApp) y email arriba;
 * debajo, horario, dirección con «Cómo llegar ↗» y zonas. Sin CTA final: la página ya es el CTA y acaba sobre
 * piedra; el pie dibuja su propio corte (`.corte-pie`, globals.css).
 */
export default function Page() {
  const { contacto, zonas } = config;

  return (
    <>
      <CabeceraInterior
        titulo={textos.contacto}
        migas={[{ href: "/", texto: textos.inicio }, { texto: textos.contacto }]}
      />
      <div className="contenedor pb-16 lg:pb-24">
        <ContactoBotones contacto={contacto} />
        <ContactoDatos contacto={contacto} horario={horarioVisible(contacto)} zonas={zonas} />
      </div>
    </>
  );
}
