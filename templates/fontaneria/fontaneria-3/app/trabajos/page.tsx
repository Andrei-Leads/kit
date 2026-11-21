import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hayTrabajos, metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { CabeceraPagina } from "@/components/secciones/CabeceraPagina";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { FiltroTrabajos } from "@/components/secciones/FiltroTrabajos";
import { MigasPagina } from "@/components/secciones/MigasPagina";
import { RejillaGaleria, RejillaTrabajos } from "@/components/secciones/RejillaTrabajos";
import { datosCta } from "@/lib/textos";

// Descripción propia: la de core dice «trabajos reales», y en una demo las fotos son de ejemplo.
export const metadata: Metadata = metadatosPagina(config, {
  ruta: "/trabajos",
  titulo: "Trabajos",
  descripcion:
    config.trabajos.length > 0
      ? `Algunos trabajos de ${config.negocio.nombre} en ${config.contacto.direccion.ciudad} y alrededores, con el sitio y el año.`
      : `Fotos del trabajo de ${config.negocio.nombre} en ${config.contacto.direccion.ciudad} y alrededores.`,
});

/**
 * /trabajos: rejilla de arcos con título, ubicación y año, y filtro por
 * servicio (solo con 2 servicios o más). Sin trabajos, la galería en arcos.
 * Sin ninguno de los dos, 404.
 */
export default function Page() {
  if (!hayTrabajos(config)) notFound();
  const { trabajos, galeria, servicios } = config;
  const usados = servicios.filter((s) => trabajos.some((t) => t.servicio === s.slug));
  return (
    <>
      <span data-pagina="trabajos" hidden />
      <MigasPagina migas={[{ href: "/", texto: "Inicio" }, { texto: "Trabajos" }]} />
      <CabeceraPagina
        titulo="Trabajos"
        entrada={
          trabajos.length > 0
            ? "Algunos de nuestros trabajos, con el sitio y el año."
            : "Algunas fotos de nuestro trabajo."
        }
      />
      <section className="seccion">
        <div className="contenedor">
          {trabajos.length > 0 ? (
            <FiltroTrabajos servicios={usados}>
              <RejillaTrabajos trabajos={trabajos} precargar />
            </FiltroTrabajos>
          ) : (
            <RejillaGaleria galeria={galeria} precargar />
          )}
        </div>
      </section>
      <CtaFinal cta={datosCta(config)} />
    </>
  );
}
