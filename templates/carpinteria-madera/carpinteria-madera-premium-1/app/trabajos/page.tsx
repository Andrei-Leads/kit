import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hayTrabajos, metadatosPagina, type Trabajo } from "@andrei-leads/core";

import config from "@/site.config";
import { Destacada } from "@/components/Titulo";
import { Foto } from "@/components/base/Foto";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { HeroInterior } from "@/components/secciones/HeroInterior";
import { TarjetaObra } from "@/components/secciones/TarjetaObra";
import { mensajeInicio } from "@/lib/mensajes";
import { datosCta, lineaConfianza } from "@/lib/textos";
import { cn } from "@/lib/utils";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/trabajos", titulo: "Obras" });

/** Rejilla de obras 4:5 a dos escalas: una de 7 columnas y la siguiente de 5, desplazada hacia abajo. */
function Rejilla({ trabajos, nombreServicio }: { trabajos: readonly Trabajo[]; nombreServicio: (t: Trabajo) => string | undefined }) {
  return (
    <ul className="m-0 grid list-none grid-cols-1 gap-x-[clamp(24px,4vw,64px)] gap-y-16 p-0 lg:grid-cols-12">
      {trabajos.map((t, i) => (
        <li key={t.slug} data-aparecer className={cn(i % 2 === 0 ? "lg:col-span-7" : "lg:col-span-5 lg:mt-[clamp(80px,10vw,160px)]")}>
          <TarjetaObra trabajo={t} servicio={nombreServicio(t)} sizes={i % 2 === 0 ? "(min-width: 1024px) 640px, 100vw" : "(min-width: 1024px) 460px, 100vw"} />
        </li>
      ))}
    </ul>
  );
}

/**
 * /trabajos (encargo §7): «Obras hechas a medida», anclas por servicio
 * (`#servicio-{slug}`, no `?servicio=`: con cacheComponents, searchParams vuelve
 * dinámica la página) y la rejilla a dos escalas. Sin trabajos, la galería.
 */
export default function Page() {
  if (!hayTrabajos(config)) notFound();
  const { trabajos, galeria, servicios, contacto } = config;
  const cta = datosCta(contacto, mensajeInicio(contacto));
  const grupos = servicios.map((s) => ({ servicio: s, obras: trabajos.filter((t) => t.servicio === s.slug) })).filter((g) => g.obras.length > 0);
  const sinServicio = trabajos.filter((t) => !servicios.some((s) => s.slug === t.servicio));
  const nombre = (t: Trabajo) => servicios.find((s) => s.slug === t.servicio)?.titulo;

  return (
    <>
      <span data-pagina="trabajos" hidden />
      <HeroInterior
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/trabajos", texto: "Obras" },
        ]}
        etiqueta={trabajos.length > 0 ? `${trabajos.length} ${trabajos.length === 1 ? "obra" : "obras"}` : "Galería"}
        titulo={
          <>
            Obras hechas <Destacada>a medida</Destacada>
          </>
        }
        frase={trabajos.length > 0 ? "Cada obra con su barrio, sus medidas y lo que tardamos." : "Algunas piezas que hemos hecho."}
        cta={cta}
        confianza={lineaConfianza(config, "valoracion")}
        fotos={[]}
      />
      {trabajos.length > 0 ? (
        <>
          {grupos.length > 1 && (
            <nav aria-label="Obras por servicio" className="contenedor mt-12">
              <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                {grupos.map((g) => (
                  <li key={g.servicio.slug}>
                    <a href={`#servicio-${g.servicio.slug}`} className="inline-flex min-h-11 items-center border border-borde px-4 text-[15px] hover:border-tinta">
                      {g.servicio.titulo}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          {grupos.map((g) => (
            <section
              key={g.servicio.slug}
              id={`servicio-${g.servicio.slug}`}
              data-tono="claro"
              aria-labelledby={`titulo-${g.servicio.slug}`}
              className="contenedor mt-(--espacio-seccion) scroll-mt-24"
            >
              <h2 id={`titulo-${g.servicio.slug}`} className="etiqueta mb-8 border-t border-borde pt-6 text-texto-suave">
                {g.servicio.titulo}
              </h2>
              <Rejilla trabajos={g.obras} nombreServicio={nombre} />
            </section>
          ))}
          {sinServicio.length > 0 && (
            <section data-tono="claro" aria-labelledby="titulo-otras" className="contenedor mt-(--espacio-seccion)">
              <h2 id="titulo-otras" className="etiqueta mb-8 border-t border-borde pt-6 text-texto-suave">
                Otras obras
              </h2>
              <Rejilla trabajos={sinServicio} nombreServicio={nombre} />
            </section>
          )}
        </>
      ) : (
        <section data-tono="claro" aria-label="Galería" className="contenedor mt-(--espacio-seccion)">
          <ul className="m-0 grid list-none grid-cols-1 gap-x-[clamp(24px,4vw,64px)] gap-y-16 p-0 lg:grid-cols-12">
            {galeria.map((g, i) => (
              <li key={g.src} data-aparecer className={cn(i % 2 === 0 ? "lg:col-span-7" : "lg:col-span-5 lg:mt-[clamp(80px,10vw,160px)]")}>
                <figure className="m-0">
                  <Foto imagen={g} sizes="(min-width: 1024px) 640px, 100vw" proporcion="4/5" />
                  {g.titulo && <figcaption className="titulo mt-4 text-h3">{g.titulo}</figcaption>}
                </figure>
              </li>
            ))}
          </ul>
        </section>
      )}
      <div className="mt-(--espacio-seccion)">
        <CtaFinal cta={cta} contacto={contacto} confianza={lineaConfianza(config, "horario")} conDireccion={false} />
      </div>
    </>
  );
}
