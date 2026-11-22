import { ViewTransition } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hayTrabajos, metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { Foto } from "@/components/base/Foto";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { FiltroTrabajos } from "@/components/secciones/FiltroTrabajos";
import { HeroInterior } from "@/components/secciones/HeroInterior";
import { Senal } from "@/components/Titular";
import { mensajeInicio } from "@/lib/mensajes";
import { datosCta, fichaTrabajo, lineaConfianza, lineaHorario, recientes } from "@/lib/textos";
import { cn } from "@/lib/utils";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/trabajos", titulo: "Proyectos" });

/**
 * /trabajos (encargo §7): rejilla a dos escalas (uno grande 4:5 y dos
 * medianos), cada uno con su ficha. Filtro por servicio en enlaces de texto.
 * Sin trabajos, la galería; sin nada, 404.
 */
export default function Page() {
  if (!hayTrabajos(config)) notFound();
  const { contacto } = config;
  const cta = datosCta(contacto, mensajeInicio(contacto));
  const trabajos = recientes(config.trabajos);
  const usados = config.servicios.filter((s) => trabajos.some((t) => t.servicio === s.slug));
  const fotosHero = (trabajos.length > 0 ? trabajos.map((t) => t.imagenes[0]) : config.galeria).slice(0, 2);

  return (
    <>
      <span data-pagina="trabajos" hidden />
      <HeroInterior
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/trabajos", texto: "Proyectos" },
        ]}
        titulo={
          <>
            Obras <Senal>terminadas</Senal>.
          </>
        }
        frase={trabajos.length > 0 ? "Cada proyecto con su lugar, su superficie y su plazo." : "Algunas de nuestras instalaciones, por dentro."}
        cta={cta}
        confianza={lineaConfianza(config)}
        imagenes={fotosHero}
        numeroPagina="03"
      />

      <section aria-label="Proyectos" className="pb-[clamp(72px,3.5rem+4vw,128px)]">
        <div className="contenedor">
          {trabajos.length > 0 ? (
            <FiltroTrabajos servicios={usados}>
              <ul className="rejilla-trabajos m-0 grid list-none grid-flow-dense gap-x-[clamp(24px,4vw,64px)] gap-y-14 p-0 md:grid-cols-12">
                {trabajos.map((t, i) => {
                  const grande = i % 3 === 0;
                  return (
                    <li
                      key={t.slug}
                      data-servicio={t.servicio}
                      data-aparecer
                      className={cn(grande ? "md:col-span-7 md:row-span-2" : "md:col-span-4 md:col-start-9")}
                    >
                      <Link href={`/trabajos/${t.slug}`} className="group flex flex-col gap-4 no-underline">
                        <ViewTransition name={`trabajo-${t.slug}`} share="morph" default="none">
                          <div>
                            <Foto imagen={t.imagenes[0]} sizes={grande ? "(min-width: 768px) 56vw, 100vw" : "(min-width: 768px) 30vw, 100vw"} decorativa />
                          </div>
                        </ViewTransition>
                        {fichaTrabajo(t) && <p className="etiqueta m-0 text-acento">{fichaTrabajo(t)}</p>}
                        <h2 className={cn("m-0 font-titulo leading-[1.2] font-normal tracking-[-0.01em] group-hover:underline", grande ? "text-[clamp(1.5rem,1.2rem+1vw,2rem)]" : "text-h3")}>
                          {t.titulo}
                        </h2>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </FiltroTrabajos>
          ) : (
            <ul className="m-0 grid list-none gap-x-[clamp(24px,4vw,64px)] gap-y-12 p-0 md:grid-cols-2">
              {config.galeria.map((g) => (
                <li key={g.src} data-aparecer>
                  <figure className="m-0 flex flex-col gap-3">
                    <Foto imagen={g} sizes="(min-width: 768px) 46vw, 100vw" />
                    {g.titulo && <figcaption className="titulo-pequeno">{g.titulo}</figcaption>}
                  </figure>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <CtaFinal
        cta={cta}
        titular={
          <>
            La próxima, <Senal>la tuya</Senal>.
          </>
        }
        confianza={lineaHorario(contacto)}
      />
    </>
  );
}
