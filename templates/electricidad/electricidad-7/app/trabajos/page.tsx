import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hayTrabajos, metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { Foto } from "@/components/base/Foto";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Encabezado } from "@/components/secciones/Encabezado";
import { FiltroTrabajos } from "@/components/secciones/FiltroTrabajos";
import { TarjetaTrabajo } from "@/components/secciones/TarjetaTrabajo";
import { mensajeInicio } from "@/lib/mensajes";

// Descripción propia: la de core dice «reales» y repite la ciudad; en una demo las fotos son de ejemplo.
export const metadata: Metadata = metadatosPagina(config, {
  ruta: "/trabajos",
  titulo: "Trabajos",
  descripcion:
    config.trabajos.length > 0
      ? `Algunos trabajos de ${config.negocio.nombre}, con el barrio, el año y lo que tardamos.`
      : `Fotos del trabajo de ${config.negocio.nombre}.`,
});

const SIZES = "(min-width: 1024px) 380px, 50vw";

/**
 * /trabajos: rejilla de 2 columnas (móvil) y 3 (escritorio) de fotos 3:4 con su pie, y filtro por
 * servicio con anclas. Sin trabajos, la galería. Sin ninguno de los dos, 404.
 */
export default function Page() {
  if (!hayTrabajos(config)) notFound();
  const { trabajos, galeria, servicios, contacto } = config;
  const usados = servicios.filter((s) => trabajos.some((t) => t.servicio === s.slug));
  return (
    <>
      <Encabezado migas={[{ href: "/", texto: "Inicio" }, { href: "/trabajos", texto: "Trabajos" }]} titulo="Trabajos" />
      <section className="contenedor pt-5 pb-[clamp(40px,2rem+3vw,88px)]">
        {trabajos.length > 0 ? (
          <FiltroTrabajos servicios={usados}>
            <ul className="rejilla-trabajos m-0 grid list-none grid-cols-2 gap-x-4 gap-y-5 p-0 lg:grid-cols-3">
              {trabajos.map((t, i) => (
                <li key={t.slug} data-servicio={t.servicio}>
                  <TarjetaTrabajo trabajo={t} sizes={SIZES} preload={i === 0} />
                </li>
              ))}
            </ul>
          </FiltroTrabajos>
        ) : (
          <ul className="m-0 grid list-none grid-cols-2 gap-x-4 gap-y-5 p-0 lg:grid-cols-3">
            {galeria.map((f, i) => (
              <li key={f.src}>
                <figure className="m-0 flex flex-col gap-2">
                  <Foto imagen={f} proporcion="3/4" sizes={SIZES} preload={i === 0} />
                  {f.titulo && <figcaption className="font-black">{f.titulo}</figcaption>}
                </figure>
              </li>
            ))}
          </ul>
        )}
      </section>
      <CtaFinal contacto={contacto} mensaje={mensajeInicio(contacto)} />
    </>
  );
}
