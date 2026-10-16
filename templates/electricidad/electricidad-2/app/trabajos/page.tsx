import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { metadatosPagina } from "@andrei-leads/core";

import { CabeceraInterior } from "@/components/secciones/CabeceraInterior";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { FiltroTrabajos } from "@/components/secciones/FiltroTrabajos";
import { GaleriaTrabajos } from "@/components/secciones/GaleriaTrabajos";
import { TrabajoTarjeta } from "@/components/secciones/TrabajoTarjeta";
import config from "@/site.config";
import { hayTrabajos } from "@/lib/navegacion";
import { textos } from "@/lib/textos";
import { filtroTrabajos, ID_LISTA_TRABAJOS } from "@/lib/trabajos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/trabajos", titulo: textos.trabajos });

/**
 * /trabajos (mockups 2c, 2d y filtro): sin trabajos ni galería la ruta no existe (404). Con trabajos, rejilla
 * de tarjetas (1 columna en móvil, 2 desde tablet) y, con ≥ 2 servicios y ≥ 4 trabajos, filtro de chips con
 * anclas. Sin trabajos pero con galería, rejilla de fotos con su título, sin enlaces. Cierra con el CTA final.
 */
export default function Page() {
  if (!hayTrabajos(config)) notFound();
  const { trabajos, galeria, contacto } = config;
  const filtro = filtroTrabajos(config);

  return (
    <>
      <CabeceraInterior
        titulo={textos.trabajos}
        migas={[{ href: "/", texto: textos.inicio }, { texto: textos.trabajos }]}
      />

      <div className="contenedor pb-16 lg:pb-24">
        {trabajos.length === 0 ? (
          <GaleriaTrabajos galeria={galeria} />
        ) : (
          <>
            {filtro && <FiltroTrabajos chips={filtro.chips} />}
            <ul
              id={ID_LISTA_TRABAJOS}
              className="m-0 grid list-none grid-cols-1 gap-9 p-0 md:grid-cols-2 md:gap-x-7"
            >
              {trabajos.map((t) => (
                <TrabajoTarjeta key={t.slug} trabajo={t} id={filtro?.anclas.get(t.slug)} />
              ))}
            </ul>
          </>
        )}
      </div>

      <CtaFinal contacto={contacto} />
    </>
  );
}
