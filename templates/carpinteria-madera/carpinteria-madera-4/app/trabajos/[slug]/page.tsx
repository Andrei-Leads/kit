import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarTrabajo, metadatosTrabajo, parametrosTrabajos, servicioDelTrabajo } from "@andrei-leads/core";

import config from "@/site.config";
import { AntesDespues } from "@/components/base/AntesDespues";
import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { Pareja } from "@/components/Botones";
import { MarcaPagina } from "@/components/CabeceraPagina";
import { SinFoto } from "@/components/secciones/RejillaPiezas";
import { mensajeDePieza } from "@/lib/mensajes";
import { numeroPieza, rotuloPieza } from "@/lib/piezas";

// Ver app/servicios/[slug]/page.tsx: sin esto, un slug inexistente da 200 en la primera visita.
export const ensureStatic = "navigation";

// Sin trabajos, core devuelve [{ slug: "_" }] (cacheComponents no admite []) y la página hace notFound().
export function generateStaticParams() {
  return parametrosTrabajos(config);
}

export async function generateMetadata({ params }: PageProps<"/trabajos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return metadatosTrabajo(config, slug);
}

const DT = "pie-ficha text-texto-suave";
const DD = "ft m-0 text-xl leading-[1.1]";

/**
 * Ficha de pieza (entrega §07): a dos columnas en escritorio, la foto 4:5 a la izquierda (LCP) y a la
 * derecha el número enorme en acento, el `h1`, la descripción, la ficha (cada fila sin dato
 * desaparece) y la pareja en acento → resto de fotos → «Antes y después» con deslizador → `contenido`,
 * servicio y testimonio → bloque negro «¿Algo parecido a la N.º 07?» → pieza anterior / siguiente.
 */
export default async function Page({ params }: PageProps<"/trabajos/[slug]">) {
  const { slug } = await params;
  const trabajo = buscarTrabajo(config, slug);
  if (!trabajo) notFound();

  const { contacto, trabajos } = config;
  const indice = trabajos.indexOf(trabajo);
  const rotulo = rotuloPieza(indice);
  const servicio = servicioDelTrabajo(config.servicios, trabajo);
  const mensaje = mensajeDePieza(trabajo, indice);
  const anterior = indice > 0 ? trabajos[indice - 1] : undefined;
  const siguiente = indice < trabajos.length - 1 ? trabajos[indice + 1] : undefined;
  const [principal, ...resto] = trabajo.imagenes;

  const ficha = (
    [
      ["Ubicación", trabajo.ubicacion],
      ["Año", trabajo.anio],
      ["Superficie", trabajo.superficie],
      ["Plazo", trabajo.duracion],
      ["Precio aprox.", trabajo.precio],
      ["Servicio", servicio?.titulo],
    ] as const
  ).filter(([, v]) => v !== undefined && v !== "");

  return (
    <article className="contenedor flex flex-col gap-[clamp(2rem,1.4rem+2.4vw,4rem)] pt-1">
      <MarcaPagina pagina="trabajos" />
      <div className="flex flex-col gap-3">
        <Migas
          migas={[
            { href: "/", texto: "Inicio" },
            { href: "/trabajos", texto: "Piezas" },
            { href: `/trabajos/${trabajo.slug}`, texto: `${rotulo} ${trabajo.titulo}` },
          ]}
        />
        <div className="flex flex-row-reverse flex-wrap items-start gap-x-[clamp(1rem,0.5rem+2.5vw,3rem)] gap-y-6">
          <div className="flex min-w-0 flex-[5_1_300px] flex-col gap-4">
            <span aria-hidden="true" className="ft numero text-[clamp(4rem,2rem+7vw,9rem)] leading-[0.8] decoration-[6px] underline-offset-8">
              {rotulo}
            </span>
            <h1 className="ft m-0 text-[clamp(2.5rem,1.5rem+3.6vw,5.5rem)] leading-[0.92] text-balance">
              <span className="sr-only">{rotulo}: </span>
              {trabajo.titulo}
            </h1>
            <p className="m-0 text-[1.0625rem] text-pretty">{trabajo.descripcion}</p>
            {ficha.length > 0 && (
              <dl className="m-0 border-t-2 border-borde">
                {ficha.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] items-baseline gap-3 border-b-2 border-borde py-[9px]">
                    <dt className={DT}>{k}</dt>
                    <dd className={DD}>{v}</dd>
                  </div>
                ))}
              </dl>
            )}
            <Pareja telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensaje} textoWhatsapp="Quiero algo parecido" tono="acento" />
          </div>
          <div className="min-w-0 flex-[7_1_420px]">
            <Foto
              imagen={principal}
              sizes="(min-width: 1024px) 56vw, 100vw"
              preload
              respaldo={<SinFoto numero={numeroPieza(indice)} titulo={trabajo.titulo} grande />}
            />
          </div>
        </div>
      </div>

      {resto.length > 0 && (
        <ul aria-label="Más fotos de la pieza" className="m-0 grid list-none gap-(--calle-rejilla) p-0 sm:grid-cols-2">
          {resto.map((img) => (
            <li key={img.src}>
              <Foto imagen={img} sizes="(min-width: 640px) 50vw, 100vw" />
            </li>
          ))}
        </ul>
      )}

      {trabajo.antes && (
        <section aria-labelledby="titulo-antes" className="flex w-full max-w-[640px] flex-col gap-2.5">
          <h2 id="titulo-antes" className="titulo-h2 m-0">
            Antes y después
          </h2>
          <AntesDespues antes={trabajo.antes} despues={principal} titulo={trabajo.titulo} sizes="(min-width: 700px) 640px, 100vw" />
        </section>
      )}

      {(trabajo.contenido.length > 0 || servicio || trabajo.testimonio) && (
        <section aria-label="Sobre la pieza" className="flex flex-wrap gap-x-[clamp(1rem,0.5rem+2.5vw,3rem)] gap-y-6 border-t-2 border-borde pt-[18px]">
          <div className="flex flex-[1_1_320px] flex-col gap-3">
            {trabajo.contenido.map((p) => (
              <p key={p} className="m-0 max-w-[60ch] text-pretty">
                {p}
              </p>
            ))}
            {servicio && (
              <Link href={`/servicios/${servicio.slug}`} className="ft flex min-h-11 items-center self-start text-lg tracking-[0.04em] text-texto underline underline-offset-4">
                Servicio: {servicio.titulo}
                <span aria-hidden="true">&nbsp;→</span>
              </Link>
            )}
          </div>
          {trabajo.testimonio && (
            <figure className="m-0 flex flex-[1_1_320px] flex-col gap-2.5">
              <span aria-hidden="true" className="ft numero h-[30px] text-[4rem] leading-[0.6] no-underline">
                «
              </span>
              <blockquote className="ft m-0 text-[clamp(1.5rem,1.1rem+1.4vw,2.5rem)] leading-none text-balance">{trabajo.testimonio.texto}</blockquote>
              <figcaption className="pie-ficha text-texto-suave">
                {trabajo.testimonio.autor} · {rotulo}
              </figcaption>
            </figure>
          )}
        </section>
      )}

      <section aria-labelledby="titulo-parecido" className="sobre-negro flex flex-col gap-[18px] bg-negro p-[clamp(1.5rem,1rem+2vw,3rem)] text-sobre-negro">
        <h2 id="titulo-parecido" className="ft m-0 text-[clamp(2rem,1.2rem+3.6vw,5rem)] leading-[0.92] text-balance">
          ¿Algo parecido a la {rotulo}?
        </h2>
        <Pareja telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensaje} textoWhatsapp="Quiero algo parecido" tono="negro" />
      </section>

      {(anterior || siguiente) && (
        <nav aria-label="Otras piezas" className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-x-6 border-y-2 border-borde">
          {anterior ? (
            <Link href={`/trabajos/${anterior.slug}`} className="flex items-center gap-3.5 py-3 text-texto no-underline [@media(hover:hover)]:hover:bg-fila">
              <Foto imagen={anterior.imagenes[0]} proporcion="1/1" sizes="64px" decorativa etiqueta="corta" className="w-16 flex-none" />
              <span className="flex flex-col gap-0.5">
                <span className={DT}>← Pieza anterior</span>
                <span className="ft text-xl leading-none">
                  {rotuloPieza(indice - 1)} {anterior.titulo}
                </span>
              </span>
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}
          {siguiente && (
            <Link href={`/trabajos/${siguiente.slug}`} className="flex items-center justify-end gap-3.5 py-3 text-right text-texto no-underline [@media(hover:hover)]:hover:bg-fila">
              <span className="flex flex-col gap-0.5">
                <span className={DT}>Pieza siguiente →</span>
                <span className="ft text-xl leading-none">
                  {rotuloPieza(indice + 1)} {siguiente.titulo}
                </span>
              </span>
              <Foto imagen={siguiente.imagenes[0]} proporcion="1/1" sizes="64px" decorativa etiqueta="corta" className="w-16 flex-none" />
            </Link>
          )}
        </nav>
      )}
    </article>
  );
}
