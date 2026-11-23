import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarServicio, metadatosServicio, parametrosServicios } from "@andrei-leads/core";

import { Preguntas } from "@/components/base/Preguntas";
import { CabeceraPagina } from "@/components/CabeceraPagina";
import { Lamina } from "@/components/Lamina";
import { Marco } from "@/components/Marco";
import { Pareja } from "@/components/Pareja";
import { TituloBloque } from "@/components/TituloSeccion";
import { dosCifras, letra, metaTrabajo, notaHorario } from "@/lib/formato";
import { mensajePieza } from "@/lib/mensajes";
import { numerar, numeroDe } from "@/lib/navegacion";
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

/**
 * Ficha de pieza (encargo §7): «Pieza A», h1 al tamaño del hero, descripción y la pareja con su
 * mensaje; después los bloques numerados «Qué hacemos» (`contenido` o la descripción, y sus láminas
 * 4:5), «Qué incluye» (lista mono «01 — …» y la pareja), «Trabajos de esta pieza» y «Preguntas».
 * Cierra con «Empezamos por medir el hueco». El índice lateral lista los bloques que existen.
 */
export default async function Page({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const servicio = buscarServicio(config, slug);
  if (!servicio) notFound();

  const { contacto, servicios, trabajos } = config;
  const indice = servicios.findIndex((s) => s.slug === servicio.slug);
  const l = letra(indice);
  const mensaje = mensajePieza(servicio);
  const nota = notaHorario(contacto);
  const parrafos = servicio.contenido.length > 0 ? servicio.contenido : [servicio.descripcion];
  const relacionados = trabajos.map((t, i) => ({ t, i })).filter(({ t }) => t.servicio === servicio.slug);

  const secciones = numerar([
    { id: "que-hacemos", texto: "Qué hacemos" },
    servicio.incluye.length > 0 && { id: "que-incluye", texto: "Qué incluye" },
    relacionados.length > 0 && { id: "trabajos-pieza", texto: "Trabajos" },
    servicio.preguntas.length > 0 && { id: "preguntas", texto: "Preguntas" },
  ]);
  const n = (id: string) => numeroDe(secciones, id);
  // Láminas en el orden de la página: las fotos del servicio y después la de cada trabajo.
  const primeraTrabajo = servicio.imagenes.length + 1;

  return (
    <Marco config={config} pagina="servicios" ficha rotulo={`Pieza ${l} · índice`} secciones={secciones}>
      <CabeceraPagina
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/servicios", texto: "Servicios" },
          { href: `/servicios/${servicio.slug}`, texto: servicio.titulo },
        ]}
        rotulo={`Pieza ${l}`}
        titulo={servicio.titulo}
        tamano="display"
      >
        <p className="max-w-[56ch] text-[1.1875rem] text-texto-suave">{servicio.descripcion}</p>
        {servicio.precioDesde && <p className="font-titulo text-sm tracking-[0.04em]">{servicio.precioDesde}</p>}
        <div className="max-w-[720px]">
          <Pareja contacto={contacto} mensaje={mensaje} nota={nota} />
        </div>
      </CabeceraPagina>

      <section id="que-hacemos" aria-labelledby="h2-que-hacemos" className="pt-18">
        <TituloBloque n={n("que-hacemos")} id="h2-que-hacemos">
          Qué hacemos
        </TituloBloque>
        <div className="flex max-w-[66ch] flex-col gap-4">
          {parrafos.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        {servicio.imagenes.length > 0 && (
          <div className="mt-8 grid max-w-[820px] grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-6">
            {servicio.imagenes.map((im, i) => (
              <Lamina key={im.src + i} imagen={im} numero={i + 1} proporcion="4/5" sizes="(min-width: 1024px) 400px, 100vw" />
            ))}
          </div>
        )}
        {servicio.incluye.length === 0 && (
          <div className="mt-10 max-w-[720px]">
            <Pareja contacto={contacto} mensaje={mensaje} />
          </div>
        )}
      </section>

      {servicio.incluye.length > 0 && (
        <section id="que-incluye" aria-labelledby="h2-que-incluye" className="pt-18">
          <TituloBloque n={n("que-incluye")} id="h2-que-incluye">
            Qué incluye
          </TituloBloque>
          <ul className="max-w-[66ch] font-titulo text-sm tracking-[0.02em]">
            {servicio.incluye.map((x, i) => (
              <li key={x} className="flex gap-4 border-b border-dashed border-borde py-3">
                <span className="text-lapiz">{dosCifras(i + 1)}</span>
                <span>— {x}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 max-w-[720px]">
            <Pareja contacto={contacto} mensaje={mensaje} />
          </div>
        </section>
      )}

      {relacionados.length > 0 && (
        <section id="trabajos-pieza" aria-labelledby="h2-trabajos-pieza" className="pt-18">
          <TituloBloque n={n("trabajos-pieza")} id="h2-trabajos-pieza">
            Trabajos de esta pieza
          </TituloBloque>
          <div className="grid max-w-[820px] grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-6 gap-y-8">
            {relacionados.map(({ t, i }, k) => (
              <article key={t.slug} className="flex flex-col gap-2.5">
                <Lamina imagen={t.imagenes[0]} numero={primeraTrabajo + k} sizes="(min-width: 1024px) 400px, 100vw" />
                <p className="mt-1.5 font-titulo text-[12.5px] tracking-[0.04em] text-lapiz">{metaTrabajo(t, i)}</p>
                <h3 className="text-[1.1875rem] leading-[1.3] font-semibold">
                  <Link href={`/trabajos/${t.slug}`} className="no-underline hover:underline">
                    {t.titulo}
                  </Link>
                </h3>
              </article>
            ))}
          </div>
        </section>
      )}

      {servicio.preguntas.length > 0 && (
        <section id="preguntas" aria-labelledby="h2-preguntas" className="pt-18">
          <TituloBloque n={n("preguntas")} id="h2-preguntas">
            Preguntas
          </TituloBloque>
          <Preguntas preguntas={servicio.preguntas} grupo="faq-servicio" className="max-w-[820px]" />
        </section>
      )}

      <section aria-labelledby="h2-medir" className="flex max-w-[720px] flex-col gap-6 pt-22">
        <h2 id="h2-medir" className="titulo text-h2 leading-[1.1]">
          Empezamos por medir el hueco
        </h2>
        <Pareja contacto={contacto} mensaje={mensaje} nota={nota} />
      </section>
    </Marco>
  );
}
