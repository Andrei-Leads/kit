import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buscarServicio, metadatosServicio, minusculaInicial, otrosServicios, parametrosServicios, trabajosDelServicio } from "@andrei-leads/core";

import config from "@/site.config";
import { ParejaCta } from "@/components/Botones";
import { EnlaceFlecha, Flecha } from "@/components/EnlaceFlecha";
import { Destacada } from "@/components/Titulo";
import { Foto } from "@/components/base/Foto";
import { Preguntas } from "@/components/base/Preguntas";
import { BandaServicio } from "@/components/secciones/BandaServicio";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { HeroInterior } from "@/components/secciones/HeroInterior";
import { alcanceRegla, itemRegla, Regla, seccionRegla } from "@/components/secciones/Regla";
import { mensajeDeServicio, textoWaServicio } from "@/lib/mensajes";
import { datosCta, dosCifras, etiquetaObra, lineaConfianza } from "@/lib/textos";
import { cn } from "@/lib/utils";

// Un slug que no está en generateStaticParams se genera en la primera visita. Sin esto,
// partialPrefetching sirve antes el App Shell con 200 y el 404 solo llega a la segunda.
export const ensureStatic = "navigation";

// Con cacheComponents, generateStaticParams no puede devolver []: core pone un slug de relleno.
export function generateStaticParams() {
  return parametrosServicios(config);
}

// Servicio sin `contenido`: core devuelve `noindex, follow`. Slug inexistente: {}.
export async function generateMetadata({ params }: PageProps<"/servicios/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return metadatosServicio(config, slug);
}

/**
 * Ficha de servicio, plantilla de «competencia» (encargo §7): hero interior →
 * tira de `incluye` → pareja → bloques texto/imagen alternos → obras del servicio →
 * preguntas → tarjetas a los demás servicios → pareja final. Tres parejas.
 */
export default async function Page({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const servicio = buscarServicio(config, slug);
  if (!servicio) notFound();

  const { contacto } = config;
  const cta = datosCta(contacto, mensajeDeServicio(servicio));
  const textoWa = textoWaServicio(servicio.titulo);
  const enFrase = minusculaInicial(servicio.titulo);
  const [foto1, foto2, ...resto] = servicio.imagenes;
  const parrafos = servicio.contenido.length > 0 ? servicio.contenido : [servicio.descripcion];
  // Un párrafo con cada foto restante; si sobran párrafos, seguidos; si sobran fotos, en pareja.
  const bloques = resto.slice(0, parrafos.length).map((f, i) => ({ foto: f, texto: parrafos[i] }));
  const sueltos = parrafos.slice(bloques.length);
  const fotosSobrantes = resto.slice(bloques.length);
  const obras = trabajosDelServicio(config.trabajos, servicio);
  const otros = otrosServicios(config.servicios, servicio);
  const hayDetalle = bloques.length + sueltos.length + fotosSobrantes.length > 0;
  const regla = [
    ...(servicio.incluye.length > 0 ? [itemRegla("incluye", "Qué incluye")] : []),
    ...(hayDetalle ? [itemRegla("como", "Cómo lo hacemos")] : []),
    ...(obras.length > 0 ? [itemRegla("obras", "Obras")] : []),
    ...(servicio.preguntas.length > 0 ? [itemRegla("preguntas", "Preguntas")] : []),
    itemRegla("contacto", "Contacto"),
  ];

  return (
    <>
      <span data-pagina="servicios" hidden />
      <HeroInterior
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/servicios", texto: "Servicios" },
          { href: `/servicios/${servicio.slug}`, texto: servicio.titulo },
        ]}
        etiqueta="Servicio"
        titulo={
          <>
            {servicio.titulo} en <Destacada>{contacto.direccion.ciudad}</Destacada>
          </>
        }
        frase={servicio.descripcion}
        extra={servicio.precioDesde && <p className="etiqueta mt-5 inline-block border border-borde px-2.5 py-1.5">{servicio.precioDesde}</p>}
        cta={cta}
        textoWhatsapp={textoWa}
        confianza={lineaConfianza(config, "valoracion")}
        fotos={[foto1, foto2]}
      />

      <div className="relative" style={alcanceRegla(regla)}>
        <Regla items={regla} />
        {servicio.incluye.length > 0 && (
          <section {...seccionRegla("incluye")} data-tono="claro" aria-labelledby="titulo-incluye" className="contenedor mt-(--espacio-seccion)">
            <h2 id="titulo-incluye" className="etiqueta m-0 text-texto-suave">
              Qué incluye
            </h2>
            <ul className="m-0 mt-6 grid list-none grid-cols-1 gap-0 p-0 md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
              {servicio.incluye.map((x, i) => (
                <li key={x} data-aparecer className="border-t border-borde py-5 md:border-t-0 md:border-l md:px-6 md:py-2">
                  <span className="etiqueta block text-texto-suave">{dosCifras(i + 1)}</span>
                  <span className="titulo mt-2 block text-h3">{x}</span>
                </li>
              ))}
            </ul>
            <ParejaCta cta={cta} tono="claro" textoWhatsapp={textoWa} confianza={lineaConfianza(config, "horario")} className="mt-12" />
          </section>
        )}

        {hayDetalle && (
          <section
            {...seccionRegla("como")}
            data-tono="claro"
            aria-label={`Cómo hacemos ${enFrase}`}
            className="contenedor mt-(--espacio-seccion) flex flex-col gap-[clamp(56px,7vw,120px)]"
          >
            {bloques.map((b, i) => (
              <div key={b.foto.src} className={cn("flex flex-wrap items-center gap-x-[clamp(32px,6vw,96px)] gap-y-8", i % 2 === 1 && "lg:flex-row-reverse")}>
                <div className="parallax-grande min-w-0 flex-[1_1_420px]">
                  <Foto imagen={b.foto} sizes="(min-width: 1024px) 560px, 100vw" proporcion="4/5" />
                </div>
                <p data-aparecer className="medida flex-[1_1_300px] text-cuerpo">
                  {b.texto}
                </p>
              </div>
            ))}
            {sueltos.length > 0 && (
              <div className="medida">
                {sueltos.map((p) => (
                  <p key={p} className="mb-5 text-cuerpo">
                    {p}
                  </p>
                ))}
              </div>
            )}
            {fotosSobrantes.length > 0 && (
              <ul className="m-0 grid list-none grid-cols-2 gap-[clamp(16px,3vw,40px)] p-0">
                {fotosSobrantes.map((f) => (
                  <li key={f.src}>
                    <Foto imagen={f} sizes="(min-width: 1024px) 560px, 50vw" proporcion="4/5" />
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {obras.length > 0 && (
          <section {...seccionRegla("obras")} data-tono="claro" aria-labelledby="titulo-obras-servicio" className="contenedor mt-(--espacio-seccion)">
            <h2 id="titulo-obras-servicio" className="titulo text-h2">
              Obras de <Destacada>{enFrase}</Destacada>
            </h2>
            <ul className="m-0 mt-10 grid list-none gap-x-8 gap-y-12 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {obras.map((t) => (
                <li key={t.slug} data-aparecer>
                  <Link href={`/trabajos/${t.slug}`} className="grupo-flecha block">
                    <Foto imagen={t.imagenes[0]} sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" proporcion="4/5" decorativa />
                    <p className="etiqueta mt-4 text-texto-suave">{etiquetaObra(t)}</p>
                    <h3 className="titulo mt-2 text-h3">{t.titulo}</h3>
                    <span className="mt-3 inline-block">
                      <Flecha>Ver obra</Flecha>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {servicio.preguntas.length > 0 && (
          <section
            {...seccionRegla("preguntas")}
            data-tono="claro"
            aria-labelledby="titulo-preguntas-servicio"
            className="contenedor mt-(--espacio-seccion) max-w-[calc(820px+2*var(--margen))]"
          >
            <h2 id="titulo-preguntas-servicio" className="titulo text-[clamp(1.75rem,1.3rem+1.6vw,2.75rem)] leading-[1.1]">
              Preguntas sobre {enFrase}
            </h2>
            <Preguntas preguntas={servicio.preguntas} grupo="preguntas-servicio" className="mt-6" />
          </section>
        )}

        {otros.length > 0 && (
          <section data-tono="claro" aria-labelledby="titulo-otros" className="contenedor mt-(--espacio-seccion)">
            <h2 id="titulo-otros" className="etiqueta m-0 text-texto-suave">
              Otros servicios
            </h2>
            <ul className="m-0 mt-6 grid list-none gap-x-8 gap-y-10 p-0 md:grid-cols-2 lg:grid-cols-3">
              {otros.map((s) => (
                <li key={s.slug}>
                  <Link href={`/servicios/${s.slug}`} className="grupo-flecha block border-t border-borde pt-5">
                    <BandaServicio imagen={s.imagenes[0]} numero={dosCifras(config.servicios.indexOf(s) + 1)} sizes="(min-width: 1024px) 380px, 100vw" />
                    <h3 className="titulo mt-4 text-h3">{s.titulo}</h3>
                    <span className="mt-3 inline-block">
                      <Flecha>Descubrir</Flecha>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8">
              <EnlaceFlecha href="/servicios">Todos los servicios</EnlaceFlecha>
            </p>
          </section>
        )}

        <div className="mt-(--espacio-seccion)">
          <CtaFinal
            id="contacto"
            cta={cta}
            contacto={contacto}
            confianza={lineaConfianza(config, "horario")}
            lineas={[
              "¿Hablamos de tu",
              <>
                pieza a <Destacada>medida</Destacada>?
              </>,
            ]}
            textoWhatsapp={textoWa}
            conDireccion={false}
          />
        </div>
      </div>
    </>
  );
}
