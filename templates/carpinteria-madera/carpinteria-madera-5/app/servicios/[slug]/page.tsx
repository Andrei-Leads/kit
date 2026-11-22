import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarServicio, metadatosServicio, minusculaInicial, parametrosServicios, trabajosDelServicio } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { Foto } from "@/components/base/Foto";
import { Preguntas } from "@/components/base/Preguntas";
import { CabeceraFicha } from "@/components/secciones/CabeceraFicha";
import { PildoraPrecio } from "@/components/secciones/Servicios";
import { Valoracion } from "@/components/secciones/Valoracion";
import { mensajeDeServicio, TEXTO_WHATSAPP_SERVICIO } from "@/lib/mensajes";
import { fichaTrabajo } from "@/lib/textos";
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
 * Ficha de servicio (encargo §7): el arco con el antes/después de su primer trabajo con `antes`
 * (o la foto del servicio), migas, h1, descripción, precio y pareja. Debajo, el contenido con
 * «Qué incluye», sus trabajos y sus preguntas, y una caja final con el arco de borde. Cada bloque
 * vacío se oculta.
 */
export default async function Page({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const servicio = buscarServicio(config, slug);
  if (!servicio) notFound();
  const { contacto, valoracion } = config;
  const trabajos = trabajosDelServicio(config.trabajos, servicio);
  const conAntes = trabajos.find((t) => t.antes);
  const cta = { telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje: mensajeDeServicio(servicio) };
  const nombre = minusculaInicial(servicio.titulo);
  const [primero, ...resto] = servicio.contenido;
  // Las fotos del servicio que no salen ya en el arco de arriba.
  const enCabecera = conAntes ? [conAntes.imagenes[0].src, conAntes.antes?.src] : [servicio.imagenes[0]?.src];
  const fotosExtra = servicio.imagenes.filter((f) => !enCabecera.includes(f.src));

  return (
    <>
      <CabeceraFicha
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/servicios", texto: "Servicios" },
          { href: `/servicios/${servicio.slug}`, texto: servicio.titulo },
        ]}
        titulo={servicio.titulo}
        par={conAntes?.antes ? { antes: conAntes.antes, despues: conAntes.imagenes[0], titulo: conAntes.titulo } : undefined}
        foto={conAntes ? undefined : servicio.imagenes[0]}
        forma="apaisada"
      >
        <p className="mt-2 text-texto-suave text-pretty">{servicio.descripcion}</p>
        {servicio.precioDesde && <PildoraPrecio precio={servicio.precioDesde} className="mt-3 text-[15px]" />}
        <Pareja cta={cta} textoWhatsapp={TEXTO_WHATSAPP_SERVICIO} className="mt-4" />
      </CabeceraFicha>

      {(servicio.contenido.length > 0 || servicio.incluye.length > 0) && (
        <section aria-label={`Sobre ${nombre}`} className="contenedor pt-[clamp(56px,8vw,104px)]">
          <div className="flex flex-wrap items-start gap-x-[clamp(40px,6vw,96px)] gap-y-10">
            {primero && (
              <div className="max-w-[62ch] min-w-0 flex-[1.4_1_360px]">
                <p className="text-entrada text-pretty">{primero}</p>
                {resto.map((p) => (
                  <p key={p} className="mt-4 text-texto-suave text-pretty">
                    {p}
                  </p>
                ))}
              </div>
            )}
            {servicio.incluye.length > 0 && (
              <div className="min-w-0 flex-[1_1_300px] rounded-tarjeta border border-borde bg-superficie px-7 pt-7 pb-8">
                <h2 className="mb-3.5 text-h3 font-[640]">Qué incluye</h2>
                <ul className="flex flex-col gap-2.5">
                  {servicio.incluye.map((i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span aria-hidden="true" className="punto" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <Pareja cta={cta} textoWhatsapp={TEXTO_WHATSAPP_SERVICIO} numeroEnLlamar className="mt-8 max-w-[620px]" />
        </section>
      )}

      {fotosExtra.length > 0 && (
        <section aria-label={`Fotos de ${nombre}`} className="contenedor pt-[clamp(56px,8vw,104px)]">
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,240px),1fr))] gap-4">
            {fotosExtra.map((f) => (
              <li key={f.src}>
                <Foto imagen={f} sizes="(min-width: 1280px) 280px, (min-width: 640px) 33vw, 100vw" proporcion="4/5" className="rounded-arco-medio" />
              </li>
            ))}
          </ul>
        </section>
      )}

      {(trabajos.length > 0 || servicio.preguntas.length > 0) && (
        <section aria-label={`Trabajos y preguntas de ${nombre}`} className="contenedor pt-[clamp(56px,8vw,104px)]">
          <div className="flex flex-wrap gap-x-[clamp(40px,6vw,96px)] gap-y-10">
            {trabajos.length > 0 && (
              <div className="min-w-0 flex-[1_1_320px]">
                <h2 className="mb-4 text-h2 font-[640]">Trabajos de {nombre}</h2>
                <ul className="flex flex-col gap-3">
                  {trabajos.map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={`/trabajos/${t.slug}`}
                        className="block rounded-tarjeta border border-borde bg-superficie px-6 py-[22px] text-texto no-underline hover:border-primario"
                      >
                        {fichaTrabajo(t) && <p className="text-sm text-texto-suave">{fichaTrabajo(t)}</p>}
                        <h3 className="mt-1 text-xl font-[620]">{t.titulo}</h3>
                        <p className="mt-2.5 flex flex-wrap items-center gap-2">
                          {t.precio && <span className="rounded-boton border-[1.5px] border-primario px-3 py-[3px] text-sm">{t.precio}</span>}
                          <span className="font-semibold underline decoration-primario underline-offset-[5px]">
                            Ver el trabajo <span aria-hidden="true">→</span>
                          </span>
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {servicio.preguntas.length > 0 && (
              <div className="min-w-0 flex-[1.4_1_360px]">
                <h2 className="mb-4 text-h2 font-[640]">Preguntas sobre {nombre}</h2>
                <Preguntas preguntas={servicio.preguntas} grupo="preguntas-servicio" />
              </div>
            )}
          </div>
        </section>
      )}

      <section aria-labelledby="titulo-cierre" className="contenedor py-[clamp(56px,8vw,104px)]">
        <div className="rounded-[48px_48px_24px_24px] border border-arco p-[clamp(28px,5vw,56px)]">
          <h2 id="titulo-cierre" className="titulo-seccion">
            ¿Qué pieza quieres recuperar?
          </h2>
          <Pareja cta={cta} textoWhatsapp={TEXTO_WHATSAPP_SERVICIO} numeroEnLlamar tamano="grande" className="mt-6 max-w-[620px]" />
          <Valoracion valoracion={valoracion} className="mt-3.5 text-[15px]" />
        </div>
      </section>
    </>
  );
}
