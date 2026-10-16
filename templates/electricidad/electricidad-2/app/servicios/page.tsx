import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { Corte } from "@/components/Corte";
import { CabeceraInterior } from "@/components/secciones/CabeceraInterior";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { RejillaServicios } from "@/components/secciones/RejillaServicios";
import { Resenas } from "@/components/secciones/Resenas";
import { resenasRecientes } from "@/lib/resenas";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/servicios", titulo: "Servicios" });

/** Reseñas de /servicios: las 3 más recientes (sin «Ver más opiniones»). */
const RESENAS_EN_SERVICIOS = 3;

/**
 * /servicios (mockup 2a, Specs §2): migas + h1 → todas las tarjetas de servicio (sin tope) → las 3 reseñas
 * más recientes con el resumen de valoración (banda piedra-2, solo con reseñas) → CTA final. Las bandas se
 * separan con `Corte`; sin reseñas, el CTA corta directamente desde piedra.
 */
export default function Page() {
  const { contacto, servicios } = config;
  const recientes = resenasRecientes(config.resenas, RESENAS_EN_SERVICIOS);
  const hayResenas = recientes.length > 0;

  return (
    <>
      <CabeceraInterior titulo="Servicios" migas={[{ href: "/", texto: "Inicio" }, { texto: "Servicios" }]} />
      <RejillaServicios servicios={servicios} />

      {hayResenas && (
        <>
          <Corte de="piedra" a="piedra-2" />
          <Resenas
            resenas={recientes}
            valoracion={config.valoracion}
            fichaGoogle={contacto.fichaGoogle}
            telefono={contacto.telefono}
          />
        </>
      )}

      <CtaFinal contacto={contacto} desde={hayResenas ? "piedra-2" : "piedra"} />
    </>
  );
}
