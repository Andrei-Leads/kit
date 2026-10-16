import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { metadatosPagina } from "@andrei-leads/core";

import { CabeceraInterior } from "@/components/CabeceraInterior";
import { FiltroTrabajos } from "@/components/secciones/FiltroTrabajos";
import { GaleriaTrabajos } from "@/components/secciones/GaleriaTrabajos";
import { TrabajoTarjeta } from "@/components/secciones/TrabajoTarjeta";
import config from "@/site.config";
import { hayTrabajos } from "@/lib/navegacion";
import { filtroTrabajos, ID_LISTA_TRABAJOS } from "@/lib/trabajos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/trabajos", titulo: "Trabajos" });

/**
 * /trabajos: sin trabajos ni galería la ruta no existe (404). Con trabajos, rejilla de tarjetas (2 columnas en móvil,
 * 3 en escritorio) y, con ≥ 2 servicios y ≥ 4 trabajos, filtro de chips con anclas. Sin trabajos pero con galería,
 * rejilla de fotos con su título y sin enlaces. Sin CTA final (como el diseño); el pie queda a 44 / 64 px.
 */
export default function Page() {
  if (!hayTrabajos(config)) notFound();
  const { trabajos, galeria } = config;
  const filtro = filtroTrabajos(config);

  return (
    <>
      <CabeceraInterior titulo="Trabajos" migas={[{ href: "/", texto: "Inicio" }, { texto: "Trabajos" }]} />

      <div className="contenedor pt-5 pb-11 lg:pt-8 lg:pb-16">
        {trabajos.length === 0 ? (
          <GaleriaTrabajos galeria={galeria} />
        ) : (
          <>
            {filtro && <FiltroTrabajos chips={filtro.chips} />}
            <ul
              id={ID_LISTA_TRABAJOS}
              className="m-0 grid list-none scroll-mt-20 grid-cols-2 gap-x-2.5 gap-y-[18px] p-0 lg:grid-cols-3 lg:gap-x-4 lg:gap-y-8"
            >
              {trabajos.map((t) => (
                <TrabajoTarjeta key={t.slug} trabajo={t} id={filtro?.anclas.get(t.slug)} />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
