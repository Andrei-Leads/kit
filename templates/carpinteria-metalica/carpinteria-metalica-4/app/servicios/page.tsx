import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import { Marco } from "@/components/Marco";
import { CabeceraInterior } from "@/components/secciones/CabeceraInterior";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { DespiecePagina } from "@/components/secciones/Despiece";
import { Observaciones } from "@/components/secciones/Observaciones";
import { mensajeInicio } from "@/lib/mensajes";
import { lamina } from "@/lib/navegacion";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/servicios", titulo: "Servicios" });

/** /servicios (encargo §7): fichas grandes con foto (tabla de despiece con 7 o más), observaciones y CTA. */
export default function Page() {
  const { servicios, contacto } = config;
  const lam = lamina(config, "servicios");
  return (
    <Marco actual="servicios" lamina={lam}>
      <CabeceraInterior
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/servicios", texto: "Servicios" },
        ]}
        lamina={`LÁMINA ${lam} · ${servicios.length} ${servicios.length === 1 ? "PIEZA" : "PIEZAS"}`}
        titulo="Servicios"
      />
      <section aria-label="Lista de servicios" className="gutter pt-[clamp(32px,6vw,64px)]">
        <DespiecePagina servicios={servicios} />
      </section>
      <Observaciones resenas={config.resenas} valoracion={config.valoracion} fichaGoogle={contacto.fichaGoogle} />
      <CtaFinal contacto={contacto} mensaje={mensajeInicio(contacto)} />
    </Marco>
  );
}
