import { ViewTransition } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buscarTrabajo, metadatosTrabajo, parametrosTrabajos, servicioDelTrabajo } from "@andrei-leads/core";

import config from "@/site.config";
import { ParejaCta } from "@/components/Botones";
import { EnlaceFlecha } from "@/components/EnlaceFlecha";
import { AntesDespues } from "@/components/base/AntesDespues";
import { EtiquetaOrigen, Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { Collage } from "@/components/secciones/Collage";
import { alcanceRegla, itemRegla, Regla, seccionRegla } from "@/components/secciones/Regla";
import { mensajeDeTrabajo, TEXTO_WA_TRABAJO } from "@/lib/mensajes";
import { datosCta, lineaConfianza } from "@/lib/textos";

// Ver app/servicios/[slug]/page.tsx: sin esto, un slug inexistente da 200 en la primera visita.
export const ensureStatic = "navigation";

// Sin trabajos, core devuelve [{ slug: "_" }], que no existe: la página hace notFound().
export function generateStaticParams() {
  return parametrosTrabajos(config);
}

export async function generateMetadata({ params }: PageProps<"/trabajos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return metadatosTrabajo(config, slug);
}

/**
 * Ficha de obra (encargo §7): la foto principal a sangre con el h1 sobre velo (la
 * misma foto de la tarjeta, que pasa aquí con View Transitions), ficha en etiqueta,
 * el antes/después grande como módulo escenográfico, `contenido` a 40 ch, el resto
 * de fotos en collage, testimonio, enlace al servicio y «Quiero algo parecido».
 */
export default async function Page({ params }: PageProps<"/trabajos/[slug]">) {
  const { slug } = await params;
  const trabajo = buscarTrabajo(config, slug);
  if (!trabajo) notFound();

  const servicio = servicioDelTrabajo(config.servicios, trabajo);
  const [principal, ...resto] = trabajo.imagenes;
  const ficha = [
    servicio && { k: "Servicio", v: servicio.titulo },
    trabajo.ubicacion && { k: "Lugar", v: trabajo.ubicacion },
    trabajo.anio && { k: "Año", v: String(trabajo.anio) },
    trabajo.superficie && { k: "Medida", v: trabajo.superficie },
    trabajo.duracion && { k: "Plazo", v: trabajo.duracion },
    trabajo.precio && { k: "Precio", v: trabajo.precio },
  ].filter((x): x is { k: string; v: string } => Boolean(x));
  const regla = [
    ...(ficha.length > 0 ? [itemRegla("ficha", "Ficha")] : []),
    ...(trabajo.antes ? [itemRegla("antes", "Antes y después")] : []),
    ...(trabajo.contenido.length > 0 ? [itemRegla("obra", "La obra")] : []),
    ...(resto.length > 0 ? [itemRegla("fotos", "Fotos")] : []),
    itemRegla("parecido", "Algo parecido"),
  ];
  const pares = [];
  for (let i = 0; i < resto.length; i += 2) pares.push(resto.slice(i, i + 2));

  return (
    <>
      <span data-pagina="trabajos" hidden />
      <section
        data-tono="oscuro"
        data-hero="medio"
        aria-labelledby="titulo-pagina"
        className="sobre-oscuro relative flex h-[100svh] max-h-[760px] min-h-[560px] flex-col justify-end overflow-hidden bg-tinta text-fondo lg:max-h-[860px]"
      >
        <ViewTransition name={`obra-${trabajo.slug}`} share="morph" default="none">
          <Foto imagen={principal} sizes="100vw" proporcion="relleno" preload posicionEtiqueta="fuera" tono="oscuro" className="absolute inset-0">
            <div aria-hidden="true" className="velo-hero" />
          </Foto>
        </ViewTransition>
        <div className="absolute top-[72px] right-(--margen) z-[3]">
          <EtiquetaOrigen imagen={principal} />
        </div>
        <div className="contenedor relative z-[2] pb-[calc(88px+env(safe-area-inset-bottom))] lg:pb-16">
          <Migas
            migas={[
              { href: "/", texto: "Inicio" },
              { href: "/trabajos", texto: "Obras" },
              { href: `/trabajos/${trabajo.slug}`, texto: trabajo.titulo },
            ]}
            className="mb-6 text-papel-suave [&_[aria-current]]:text-fondo"
          />
          <h1 id="titulo-pagina" className="titulo max-w-[18ch] text-h1">
            {trabajo.titulo}
          </h1>
          <p className="medida mt-5 text-cuerpo text-papel-suave">{trabajo.descripcion}</p>
        </div>
      </section>

      <div className="relative" style={alcanceRegla(regla)}>
        <Regla items={regla} />
        {ficha.length > 0 && (
          <section {...seccionRegla("ficha")} data-tono="claro" aria-label="Ficha de la obra" className="contenedor pt-12">
            <dl className="m-0 grid grid-cols-2 gap-x-8 gap-y-6 border-y border-borde py-6 md:grid-cols-3 lg:grid-cols-6">
              {ficha.map((f) => (
                <div key={f.k}>
                  <dt className="etiqueta text-texto-suave">{f.k}</dt>
                  <dd className="m-0 mt-1 text-[15px] tabular-nums">{f.v}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {trabajo.antes && (
          <section {...seccionRegla("antes")} data-tono="claro" aria-labelledby="titulo-antes" className="contenedor mt-(--espacio-seccion)">
            <h2 id="titulo-antes" className="titulo mb-8 text-h2">
              Antes y <span className="text-destacado">después</span>
            </h2>
            <AntesDespues antes={trabajo.antes} despues={principal} sizes="(min-width: 1280px) 1200px, 100vw" />
          </section>
        )}

        {trabajo.contenido.length > 0 && (
          <section {...seccionRegla("obra")} data-tono="claro" aria-label="La obra" className="contenedor mt-(--espacio-seccion)">
            <div className="medida lg:ml-[calc(100%/12*5)]">
              {trabajo.contenido.map((p) => (
                <p key={p} className="mb-5 text-cuerpo">
                  {p}
                </p>
              ))}
            </div>
          </section>
        )}

        {resto.length > 0 && (
          <section {...seccionRegla("fotos")} data-tono="claro" aria-label="Más fotos de la obra" className="contenedor mt-(--espacio-seccion) flex flex-col gap-16">
            {pares.map((p, i) => (
              <Collage key={p[0].src} grande={p[0]} mini={p[1]} invertido={i % 2 === 1} sizes="(min-width: 1024px) 700px, 76vw" className="mx-auto w-full max-w-[880px]" />
            ))}
          </section>
        )}

        {(trabajo.testimonio || servicio) && (
          <section data-tono="claro" aria-label="Testimonio" className="contenedor mt-(--espacio-seccion)">
            {trabajo.testimonio && (
              <figure className="m-0 max-w-[900px] border-t border-borde pt-8">
                <blockquote className="titulo m-0 text-[clamp(1.75rem,1.3rem+1.8vw,2.25rem)] leading-[1.2]">«{trabajo.testimonio.texto}»</blockquote>
                <figcaption className="mt-4 text-sm text-texto-suave">{trabajo.testimonio.autor}</figcaption>
              </figure>
            )}
            {servicio && (
              <p className="mt-8">
                <EnlaceFlecha href={`/servicios/${servicio.slug}`}>
                  Ver el servicio<span className="sr-only">: {servicio.titulo}</span>
                </EnlaceFlecha>
              </p>
            )}
          </section>
        )}

        <section {...seccionRegla("parecido")} data-tono="claro" aria-labelledby="titulo-parecido" className="contenedor seccion">
          <h2 id="titulo-parecido" className="titulo text-h2">
            ¿Quieres algo <span className="text-destacado">parecido</span>?
          </h2>
          <ParejaCta
            cta={datosCta(config.contacto, mensajeDeTrabajo(trabajo))}
            tono="claro"
            textoWhatsapp={TEXTO_WA_TRABAJO}
            confianza={lineaConfianza(config, "whatsapp")}
            className="mt-8"
          />
        </section>
      </div>
    </>
  );
}
