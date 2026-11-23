import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buscarServicio, metadatosServicio, parametrosServicios, precioDesde, trabajosDelServicio } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { Filete, TituloSeccion } from "@/components/TituloSeccion";
import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { Preguntas } from "@/components/base/Preguntas";
import { FotoPequena } from "@/components/secciones/Estancias";
import { mensajeDeServicio, TEXTO_WHATSAPP } from "@/lib/mensajes";
import { lineaValoracion, pieTrabajo } from "@/lib/textos";
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

const SECCION = "marco pt-[clamp(48px,6vw,96px)]";

/**
 * Ficha de servicio (encargo §7): primera foto a sangre (sin foto, cabecera tipográfica con
 * filete), h1, pareja; el contenido a 68 caracteres con capitular (sin `contenido`, la
 * `descripcion`); «Qué incluye» con filetes y la pareja; fotos restantes; trabajos del servicio;
 * preguntas; y el cierre sobre `alterna`. La pareja sale tres veces (encargo §3). Cada bloque vacío
 * se oculta.
 */
export default async function Page({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const servicio = buscarServicio(config, slug);
  if (!servicio) notFound();
  const { contacto, valoracion } = config;
  const cta = { telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje: mensajeDeServicio(servicio) };
  const [foto, ...restoFotos] = servicio.imagenes;
  const parrafos = servicio.contenido.length > 0 ? servicio.contenido : [servicio.descripcion];
  const trabajos = trabajosDelServicio(config.trabajos, servicio);
  const precio = servicio.precioDesde ? precioDesde(servicio.precioDesde) : undefined;

  return (
    <div data-pagina="servicios">
      <Migas
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/servicios", texto: "Servicios" },
          { href: `/servicios/${servicio.slug}`, texto: servicio.titulo },
        ]}
        className="marco py-2"
      />
      {foto && (
        <Foto imagen={foto} sizes="100vw" proporcion="relleno" preload calidad={60} className="aspect-[4/5] max-h-[72svh] w-full lg:aspect-video" />
      )}
      <section className="marco grid gap-6 pt-[clamp(40px,6vw,96px)]">
        {!foto && <Filete />}
        <h1 className="titulo-display">{servicio.titulo}</h1>
        {precio && (
          <p className="font-titulo text-[clamp(1.25rem,1.1rem+0.6vw,1.6rem)] italic">
            {precio.desde && <span className="mr-1.5 font-texto text-sm tracking-[0.08em] text-texto-suave not-italic uppercase">Desde</span>}
            {precio.importe}
          </p>
        )}
        <Pareja cta={cta} textoWhatsapp={TEXTO_WHATSAPP} />
      </section>
      <section aria-label={`Sobre ${servicio.titulo}`} className={`${SECCION} max-w-[calc(68ch+10vw)]`}>
        {parrafos.map((p, i) => (
          <p key={p} className={i === 0 ? "capitular text-entrada" : "mt-5"}>
            {p}
          </p>
        ))}
      </section>
      {servicio.incluye.length > 0 && (
        <section aria-labelledby="titulo-incluye" className={SECCION}>
          <h2 id="titulo-incluye" className="titulo-h2">
            Qué incluye
          </h2>
          <ul className="mt-5 mb-8 max-w-[68ch] border-t border-filete">
            {servicio.incluye.map((i) => (
              <li key={i} className="border-b border-filete py-4 font-titulo text-pregunta">
                {i}
              </li>
            ))}
          </ul>
          <Pareja cta={cta} textoWhatsapp={TEXTO_WHATSAPP} />
        </section>
      )}
      {restoFotos.length > 0 && (
        <section aria-label={`Más fotos de ${servicio.titulo}`} className={`${SECCION} grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-6`}>
          {restoFotos.map((f) => (
            <Foto key={f.src} imagen={f} sizes="(min-width: 1024px) 45vw, 100vw" proporcion="1/1" />
          ))}
        </section>
      )}
      {trabajos.length > 0 && (
        <section aria-labelledby="titulo-trabajos-servicio" className={SECCION}>
          <TituloSeccion id="titulo-trabajos-servicio" className="mb-8">
            Trabajos de este servicio
          </TituloSeccion>
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-x-6 gap-y-8">
            {trabajos.map((t) => (
              <li key={t.slug}>
                <FotoPequena foto={{ imagen: t.imagenes[0], trabajo: t, pie: pieTrabajo(t) }} sizes="(min-width: 1280px) 400px, (min-width: 700px) 45vw, 100vw" />
              </li>
            ))}
          </ul>
        </section>
      )}
      {servicio.preguntas.length > 0 && (
        <section aria-labelledby="titulo-preguntas-servicio" className={SECCION}>
          <h2 id="titulo-preguntas-servicio" className="titulo-h2 mb-3">
            Preguntas
          </h2>
          <Preguntas preguntas={servicio.preguntas} grupo="preguntas-servicio" className="border-t border-filete" />
        </section>
      )}
      <section aria-labelledby="titulo-cierre" className="marco mt-[clamp(64px,8vw,120px)] grid gap-6 bg-alterna py-[clamp(56px,7vw,104px)]">
        <h2 id="titulo-cierre" className="max-w-[16ch] font-titulo text-[clamp(2.25rem,1.5rem+3.4vw,5rem)] leading-none tracking-[-0.025em]">
          Envíanos fotos y <em>medidas</em> del hueco
        </h2>
        <Pareja cta={cta} textoWhatsapp={TEXTO_WHATSAPP} />
        {valoracion && <p className="text-[15px] text-texto-suave">{lineaValoracion(valoracion)}</p>}
      </section>
    </div>
  );
}
