import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buscarServicio, metadatosServicio, minusculaInicial, parametrosServicios, trabajosDelServicio } from "@andrei-leads/core";

import config from "@/site.config";
import { Pareja } from "@/components/Botones";
import { AntesDespues } from "@/components/base/AntesDespues";
import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Obra } from "@/components/secciones/Obra";
import { PreguntasFrecuentes } from "@/components/secciones/PreguntasFrecuentes";
import { mensajeDeServicio } from "@/lib/mensajes";
import { partirUltima, pieObra } from "@/lib/textos";
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

const SIZES = "(min-width: 1024px) 58vw, 100vw";

/**
 * Ficha de servicio (encargo §7, tablero Servicio): migas, h1 con la última palabra en cursiva,
 * «desde» y botón → a la derecha, el deslizador de la primera obra del servicio con `antes`, o su
 * foto 4:3, o nada (h1 a display) → `contenido` en serif a 65 caracteres e «incluye» con filetes →
 * el resto de obras del servicio → preguntas → CTA con su mensaje.
 */
export default async function Page({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const servicio = buscarServicio(config, slug);
  if (!servicio) notFound();

  const { contacto } = config;
  const cta = { telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje: mensajeDeServicio(servicio) };
  const enFrase = minusculaInicial(servicio.titulo);
  const obras = trabajosDelServicio(config.trabajos, servicio);
  const par = obras.find((t) => t.antes);
  const foto = servicio.imagenes[0];
  const conMedio = Boolean(par || foto);
  const otras = obras.filter((t) => t !== par);
  const [antes, ultima] = partirUltima(servicio.titulo);

  return (
    <>
      <span data-pagina="servicios" hidden />
      <section className="contenedor pt-[clamp(8px,2vw,24px)] pb-[clamp(40px,6vw,88px)]">
        <Migas
          className="mb-[clamp(12px,2vw,24px)]"
          migas={[
            { href: "/", texto: "Inicio" },
            { href: "/servicios", texto: "Servicios" },
            { href: `/servicios/${servicio.slug}`, texto: servicio.titulo },
          ]}
        />
        <div className={cn("grid items-start gap-[clamp(24px,4vw,72px)]", conMedio && "lg:grid-cols-[5fr_7fr]")}>
          <div>
            <h1
              className="titulo-display"
              style={conMedio ? { fontSize: "clamp(2.25rem, 1.4rem + 3.6vw, 5rem)" } : undefined}
            >
              {antes}
              <em className="text-primario-texto">{ultima}</em>
            </h1>
            <p className="mt-5 max-w-[38ch] text-texto-suave">{servicio.descripcion}</p>
            {servicio.precioDesde && <p className="mt-3 font-titulo text-2xl">{servicio.precioDesde}</p>}
            <Pareja cta={cta} className="mt-6 max-w-[520px]" />
          </div>
          {conMedio && (
            <div>
              {par?.antes ? (
                <>
                  <AntesDespues antes={par.antes} despues={par.imagenes[0]} titulo={par.titulo} sizes={SIZES} preload antesInmediata pista />
                  <p className="versalitas mt-3 border-t border-filete pt-3">{pieObra(par)}</p>
                </>
              ) : (
                foto && <Foto imagen={foto} sizes={SIZES} preload />
              )}
            </div>
          )}
        </div>
      </section>

      {(servicio.contenido.length > 0 || servicio.incluye.length > 0) && (
        <section aria-label="Cómo lo hacemos" className="border-t border-filete">
          <div className="contenedor seccion grid items-start gap-[clamp(32px,5vw,88px)] lg:grid-cols-[7fr_5fr]">
            {servicio.contenido.length > 0 && (
              <div className="max-w-[65ch]">
                <h2 className="titulo-seccion filete-h2 mb-6">Cómo lo hacemos</h2>
                {servicio.contenido.map((p) => (
                  <p key={p} className="mb-[1em] font-titulo text-lectura last:mb-0">
                    {p}
                  </p>
                ))}
              </div>
            )}
            {servicio.incluye.length > 0 && (
              <div className={cn(servicio.contenido.length === 0 && "lg:col-span-2")}>
                <h2 className="versalitas mb-3">Qué incluye</h2>
                <ul className="border-b border-filete">
                  {servicio.incluye.map((x) => (
                    <li key={x} className="border-t border-filete py-3.5 text-base">
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {otras.length > 0 && (
        <section aria-labelledby="titulo-obras-servicio" className="border-t border-filete">
          <div className="contenedor seccion">
            <h2 id="titulo-obras-servicio" className="titulo-seccion filete-h2">
              {par ? "Más obras de este servicio" : "Obras de este servicio"}
            </h2>
            <div className="mt-[clamp(32px,5vw,64px)] grid gap-x-[clamp(24px,4vw,64px)] gap-y-[clamp(40px,5vw,72px)] lg:grid-cols-2">
              {otras.map((t) => (
                <Obra key={t.slug} trabajo={t} modo="tarjeta" />
              ))}
            </div>
          </div>
        </section>
      )}

      <PreguntasFrecuentes preguntas={servicio.preguntas} titulo={`Preguntas sobre ${enFrase}`} grupo="preguntas-servicio" />

      <CtaFinal
        compacto
        cta={cta}
        titulo={
          <>
            Pide presupuesto de <em>{enFrase}</em>
          </>
        }
      />
    </>
  );
}
