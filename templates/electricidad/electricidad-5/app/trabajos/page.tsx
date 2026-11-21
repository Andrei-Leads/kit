import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hayTrabajos, metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { BandaInterior } from "@/components/secciones/BandaInterior";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { FiltroTrabajos } from "@/components/secciones/FiltroTrabajos";
import { GaleriaBento, TrabajosBento } from "@/components/secciones/TrabajosBento";
import { datosCta } from "@/lib/textos";

// Descripción propia: la de core dice «trabajos reales», y en una demo las fotos son de ejemplo.
export const metadata: Metadata = metadatosPagina(config, {
  ruta: "/trabajos",
  titulo: "Trabajos",
  descripcion:
    config.trabajos.length > 0
      ? `Trabajos de ${config.negocio.nombre} en ${config.contacto.direccion.ciudad} y alrededores: dónde, cuándo y cuánto duró cada uno.`
      : `Fotos del trabajo de ${config.negocio.nombre} en ${config.contacto.direccion.ciudad} y alrededores.`,
});

/**
 * /trabajos: bento de trabajos (el más reciente grande) con filtro por servicio
 * (anclas, sin JS; solo con 2 servicios o más). Sin trabajos, la galería en
 * bento. Sin ninguno de los dos, 404.
 */
export default function Page() {
  if (!hayTrabajos(config)) notFound();
  const { trabajos, galeria, servicios } = config;
  const usados = servicios.filter((s) => trabajos.some((t) => t.servicio === s.slug));
  const hayContexto = trabajos.some((t) => t.ubicacion || t.anio || t.duracion);
  const entrada =
    trabajos.length === 0
      ? "Algunas fotos de nuestro trabajo."
      : hayContexto
        ? "Trabajos que hemos hecho: dónde, cuándo y cuánto duró cada uno."
        : "Algunos trabajos que hemos hecho.";
  return (
    <>
      <span data-pagina="trabajos" hidden />
      <BandaInterior
        migas={[{ href: "/", texto: "Inicio" }, { href: "/trabajos", texto: "Trabajos" }]}
        titulo="Trabajos"
        entrada={<p>{entrada}</p>}
      />
      <section aria-label={trabajos.length > 0 ? "Lista de trabajos" : "Galería"} className="seccion">
        <div className="contenedor">
          {trabajos.length > 0 ? (
            <FiltroTrabajos servicios={usados}>
              <TrabajosBento trabajos={trabajos} precargar />
            </FiltroTrabajos>
          ) : (
            <GaleriaBento galeria={galeria} />
          )}
        </div>
      </section>
      <CtaFinal cta={datosCta(config)} contacto={config.contacto} />
    </>
  );
}
