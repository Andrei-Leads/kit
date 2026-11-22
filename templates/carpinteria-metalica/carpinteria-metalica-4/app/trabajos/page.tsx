import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hayTrabajos, metadatosPagina } from "@andrei-leads/core";

import { Marco } from "@/components/Marco";
import { CabeceraInterior } from "@/components/secciones/CabeceraInterior";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { FichasObra } from "@/components/secciones/FichasObra";
import { mensajeInicio } from "@/lib/mensajes";
import { lamina } from "@/lib/navegacion";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/trabajos", titulo: "Trabajos" });

/** /trabajos (encargo §7): fichas en 2 columnas (1 en móvil) con la REF completa; sin filtro. Sin trabajos, la galería. */
export default function Page() {
  if (!hayTrabajos(config)) notFound();
  const { trabajos, galeria, contacto } = config;
  const lam = lamina(config, "trabajos");
  const total = trabajos.length > 0 ? trabajos.length : galeria.length;
  const unidad = trabajos.length > 0 ? (total === 1 ? "OBRA" : "OBRAS") : total === 1 ? "FOTO" : "FOTOS";
  return (
    <Marco actual="trabajos" lamina={lam}>
      <CabeceraInterior
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/trabajos", texto: "Trabajos" },
        ]}
        lamina={`LÁMINA ${lam} · ${total} ${unidad}`}
        titulo="Obras terminadas"
      />
      <section aria-label="Obras" className="gutter pt-[clamp(32px,6vw,64px)]">
        <FichasObra trabajos={trabajos} servicios={config.servicios} galeria={galeria} modo="pagina" />
      </section>
      <CtaFinal contacto={contacto} mensaje={mensajeInicio(contacto)} />
    </Marco>
  );
}
