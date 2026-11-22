import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarTrabajo, metadatosTrabajo, parametrosTrabajos, servicioDelTrabajo } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { Foto } from "@/components/base/Foto";
import { CabeceraFicha } from "@/components/secciones/CabeceraFicha";
import { mensajeDeTrabajo, TEXTO_WHATSAPP_TRABAJO } from "@/lib/mensajes";
import config from "@/site.config";

// Un slug que no está en generateStaticParams se genera en la primera visita. Sin esto,
// partialPrefetching sirve antes el App Shell con 200 y el 404 solo llega a la segunda.
export const ensureStatic = "navigation";

// Sin trabajos, core devuelve el slug de relleno «_», que acaba en notFound().
export function generateStaticParams() {
  return parametrosTrabajos(config);
}

// Slug inexistente: {}.
export async function generateMetadata({ params }: PageProps<"/trabajos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return metadatosTrabajo(config, slug);
}

/**
 * Ficha de trabajo (encargo §7): el arco con el antes/después (o la foto) bajo la cabecera
 * transparente, migas, h1, descripción y la ficha en píldoras. Debajo, el contenido con el enlace
 * a su servicio, el testimonio, las demás fotos y «¿Tienes algo parecido?» con su mensaje.
 */
export default async function Page({ params }: PageProps<"/trabajos/[slug]">) {
  const { slug } = await params;
  const trabajo = buscarTrabajo(config, slug);
  if (!trabajo) notFound();
  const { contacto } = config;
  const servicio = servicioDelTrabajo(config.servicios, trabajo);
  const ficha = [trabajo.ubicacion, trabajo.anio, trabajo.superficie, trabajo.duracion].filter(Boolean);
  const [primero, ...resto] = trabajo.contenido;
  const fotosExtra = trabajo.imagenes.slice(1);
  const cta = { telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje: mensajeDeTrabajo(trabajo) };

  return (
    <>
      <CabeceraFicha
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/trabajos", texto: "Restauraciones" },
          { href: `/trabajos/${trabajo.slug}`, texto: trabajo.titulo },
        ]}
        titulo={trabajo.titulo}
        par={trabajo.antes ? { antes: trabajo.antes, despues: trabajo.imagenes[0], titulo: trabajo.titulo } : undefined}
        foto={trabajo.antes ? undefined : trabajo.imagenes[0]}
        forma="cuadrada"
      >
        <p className="mt-3 text-texto-suave text-pretty">{trabajo.descripcion}</p>
        {(ficha.length > 0 || trabajo.precio) && (
          <ul aria-label="Ficha del trabajo" className="mt-4 flex flex-wrap gap-2 text-[15px]">
            {ficha.map((f) => (
              <li key={String(f)} className="rounded-boton border-[1.5px] border-borde px-3.5 py-1.5">
                {f}
              </li>
            ))}
            {trabajo.precio && <li className="rounded-boton border-[1.5px] border-primario px-3.5 py-1.5">{trabajo.precio}</li>}
          </ul>
        )}
      </CabeceraFicha>

      <section aria-labelledby="titulo-parecido" className="contenedor py-[clamp(48px,8vw,104px)]">
        {(primero || servicio || trabajo.testimonio) && (
          <div className="mb-[clamp(40px,6vw,64px)] flex flex-wrap items-start gap-x-[clamp(40px,6vw,96px)] gap-y-10">
            {(primero || servicio) && (
              <div className="max-w-[62ch] min-w-0 flex-[1.2_1_360px]">
                {primero && <p className="text-entrada text-pretty">{primero}</p>}
                {resto.map((p) => (
                  <p key={p} className="mt-4 text-texto-suave text-pretty">
                    {p}
                  </p>
                ))}
                {servicio && (
                  <Link href={`/servicios/${servicio.slug}`} className="enlace mt-2 inline-flex min-h-12 items-center">
                    Ver el servicio: {servicio.titulo} <span aria-hidden="true">&nbsp;→</span>
                  </Link>
                )}
              </div>
            )}
            {trabajo.testimonio && (
              <figure className="m-0 min-w-0 flex-[1_1_300px] rounded-tarjeta border border-borde bg-superficie p-7">
                <blockquote className="text-[clamp(1.25rem,1.1rem+0.7vw,1.625rem)] leading-[1.3] font-[520] text-balance">«{trabajo.testimonio.texto}»</blockquote>
                <figcaption className="mt-3 text-[15px] text-texto-suave">{trabajo.testimonio.autor}</figcaption>
              </figure>
            )}
          </div>
        )}
        {fotosExtra.length > 0 && (
          <ul aria-label="Más fotos del trabajo" className="mb-[clamp(40px,6vw,64px)] grid grid-cols-[repeat(auto-fill,minmax(min(100%,240px),1fr))] gap-4">
            {fotosExtra.map((f) => (
              <li key={f.src}>
                <Foto imagen={f} sizes="(min-width: 1280px) 280px, (min-width: 640px) 33vw, 100vw" proporcion="4/5" className="rounded-arco-medio" />
              </li>
            ))}
          </ul>
        )}
        <h2 id="titulo-parecido" className="mb-4 text-[clamp(1.5rem,1.2rem+1vw,2rem)] leading-[1.1] font-[640]">
          ¿Tienes algo parecido?
        </h2>
        <Pareja cta={cta} textoWhatsapp={TEXTO_WHATSAPP_TRABAJO} numeroEnLlamar className="max-w-[620px]" />
      </section>
    </>
  );
}
