import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";
import { notFound } from "next/navigation";

import { Migas } from "@/components/Migas";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { FiltroTrabajos } from "@/components/secciones/FiltroTrabajos";
import { GaleriaTrabajos } from "@/components/secciones/GaleriaTrabajos";
import { TrabajoTarjeta } from "@/components/secciones/TrabajoTarjeta";
import config from "@/site.config";
import { h1Interior } from "@/lib/estilos";
import { hayTrabajos } from "@/lib/navegacion";
import { filtroTrabajos, ID_LISTA_TRABAJOS } from "@/lib/trabajos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/trabajos", titulo: "Trabajos" });

/**
 * /trabajos: sin trabajos ni galería la ruta no existe (404). Con trabajos, rejilla de tarjetas (1
 * columna en móvil, 3 en escritorio) y, con ≥ 2 servicios y ≥ 4 trabajos, filtro de chips con anclas.
 * Sin trabajos pero con galería, rejilla de foto + título.
 */
export default function Page() {
  if (!hayTrabajos(config)) notFound();
  const { trabajos, galeria, contacto } = config;
  const filtro = filtroTrabajos(config);

  return (
    <>
      <header className="border-b border-regla">
        <div className="contenedor flex flex-col gap-2 pt-1 pb-6 md:pb-11">
          <Migas items={[{ href: "/", texto: "Inicio" }, { texto: "Trabajos" }]} />
          <h1 className={h1Interior}>Trabajos</h1>
        </div>
      </header>

      <div className="contenedor pt-7 md:pt-10">
        {trabajos.length === 0 ? (
          <GaleriaTrabajos galeria={galeria} />
        ) : (
          <>
            {filtro && <FiltroTrabajos chips={filtro.chips} />}
            <ul
              id={ID_LISTA_TRABAJOS}
              className="m-0 grid list-none grid-cols-1 gap-8 p-0 md:grid-cols-3 md:gap-6"
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
