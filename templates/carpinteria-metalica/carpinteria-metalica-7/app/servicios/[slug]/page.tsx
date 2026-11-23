import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buscarServicio, metadatosServicio, parametrosServicios, precioDesde } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { Pareja } from "@/components/Botones";
import { Marco } from "@/components/Marco";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { GaleriaPorTipo } from "@/components/secciones/GaleriaPorTipo";
import { PreguntasFrecuentes } from "@/components/secciones/PreguntasFrecuentes";
import { mensajeDeServicio } from "@/lib/mensajes";
import { numero } from "@/lib/textos";
import config from "@/site.config";

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

const WA_SERVICIO = "Mándanos una foto";

/**
 * Ficha de servicio (encargo §7): en escritorio, texto a la izquierda y foto a sangre de columna
 * con corte diagonal; en móvil, texto y foto 4:3 con corte arriba. Sin foto, banda de hierro con
 * el número de pieza gigante. Después, contenido + «Qué incluye» con rombos, la segunda pareja,
 * las obras de este tipo (filtradas en el servidor), preguntas y CTA final con el mensaje del servicio.
 */
export default async function Page({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const indice = config.servicios.findIndex((s) => s.slug === slug);
  const servicio = buscarServicio(config, slug);
  if (!servicio) notFound();

  const { contacto } = config;
  const mensaje = mensajeDeServicio(servicio);
  const n = numero(indice);
  const [foto, ...fotos] = servicio.imagenes;
  const precio = servicio.precioDesde ? precioDesde(servicio.precioDesde) : undefined;

  return (
    <Marco actual="servicios">
      <header className="lg:grid lg:min-h-[620px] lg:grid-cols-2">
        <div className="contenedor pt-24 lg:flex lg:max-w-none lg:flex-col lg:justify-end lg:pt-[150px] lg:pr-12 lg:pb-14 lg:pl-[max(40px,calc((100vw-1200px)/2+40px))]">
          <Migas
            migas={[
              { href: "/", texto: "Inicio" },
              { href: "/servicios", texto: "Servicios" },
              { href: `/servicios/${servicio.slug}`, texto: servicio.titulo },
            ]}
          />
          <p className="mt-4 font-titulo text-sm font-bold tracking-[0.08em] uppercase lg:mt-[22px] lg:text-[15px]">Pieza {n}</p>
          <h1 className="mt-1 font-titulo text-[clamp(2.5rem,1.2rem+4.4vw,5.5rem)] leading-[0.9] font-extrabold text-balance uppercase [overflow-wrap:anywhere] lg:mt-1.5">
            {servicio.titulo}
          </h1>
          <p className="mt-3 max-w-[40ch] text-[1.0625rem] leading-[1.45] text-pretty lg:mt-4 lg:text-[1.2rem]">{servicio.descripcion}</p>
          {precio && (
            <p className="mt-3 font-titulo text-2xl font-extrabold uppercase">
              {precio.desde && <span className="mr-2 text-base tracking-[0.08em]">Desde</span>}
              {precio.importe}
            </p>
          )}
          <Pareja contacto={contacto} mensaje={mensaje} textoWhatsapp={WA_SERVICIO} className="mt-[18px] max-w-[560px] lg:mt-6" />
        </div>
        {foto ? (
          <div className="relative mt-7 aspect-[4/3] lg:mt-0 lg:aspect-auto">
            <div className="absolute inset-0 banda-arriba lg:[clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)]">
              <Foto
                imagen={foto}
                sizes="(min-width: 1024px) 50vw, 100vw"
                proporcion="relleno"
                preload
                className="absolute inset-0"
                claseEtiqueta="top-[calc(var(--diagonal)+8px)] left-4 lg:top-20 lg:left-[22%]"
              />
            </div>
          </div>
        ) : (
          <div
            aria-hidden="true"
            className="hierro banda-arriba mt-7 flex h-[220px] items-end justify-end overflow-hidden pr-4 pb-3 lg:mt-0 lg:h-auto lg:pr-12 lg:pb-6 lg:[clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)]"
          >
            <span className="contorno-acento font-titulo text-[200px] leading-[0.8] font-extrabold lg:text-[420px]">{n}</span>
          </div>
        )}
      </header>

      <section aria-label="Detalle del servicio" className="py-[clamp(36px,5vw,72px)]">
        <div className="contenedor grid items-start gap-[clamp(28px,4vw,64px)] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div>
            {servicio.contenido.map((p) => (
              <p key={p} className="mb-3.5 max-w-[62ch] text-pretty">
                {p}
              </p>
            ))}
          </div>
          {servicio.incluye.length > 0 && (
            <div>
              <h2 className="mb-3 font-titulo text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)] leading-none font-extrabold uppercase">Qué incluye</h2>
              <ul>
                {servicio.incluye.map((x) => (
                  <li key={x} className="flex items-baseline gap-3 border-t border-borde py-2.5">
                    <span aria-hidden="true" className="rombo -translate-y-0.5 bg-sobre-primario" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {fotos.length > 0 && (
          <ul className="contenedor mt-7 grid grid-cols-2 gap-3 lg:grid-cols-3">
            {fotos.map((f) => (
              <li key={f.src}>
                <Foto imagen={f} sizes="(min-width: 1024px) 380px, calc(50vw - 22px)" proporcion="4/3" etiquetaCompacta className="corte-tarjeta" />
              </li>
            ))}
          </ul>
        )}
        <div className="contenedor mt-7">
          <Pareja contacto={contacto} mensaje={mensaje} textoWhatsapp={WA_SERVICIO} className="max-w-[560px]" />
        </div>
      </section>

      <GaleriaPorTipo
        trabajos={config.trabajos}
        servicios={config.servicios}
        soloServicio={servicio.slug}
        titulo="Obras de este tipo"
        entradilla="Piezas de este tipo que ya están montadas."
      />
      <PreguntasFrecuentes preguntas={servicio.preguntas} grupo="preguntas-servicio" />
      <CtaFinal contacto={contacto} mensaje={mensaje} />
    </Marco>
  );
}
