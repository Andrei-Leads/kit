import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarServicio, metadatosServicio, parametrosServicios, precioDesde, trabajosDelServicio } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { Foto } from "@/components/base/Foto";
import { Marco } from "@/components/Marco";
import { CabeceraInterior } from "@/components/secciones/CabeceraInterior";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { mensajeDeServicio } from "@/lib/mensajes";
import { lamina } from "@/lib/navegacion";
import { dosCifras, refTrabajo } from "@/lib/textos";
import config from "@/site.config";

// Un slug que no está en generateStaticParams se genera en la primera visita. Sin esto,
// partialPrefetching sirve antes el App Shell con 200 y el 404 solo llega a la segunda.

/** `sizes` de las láminas: la rejilla es auto-fit (280 px mín.), así que 1 o 2 fotos ocupan todo el ancho. */
function sizesLaminas(n: number) {
  if (n === 1) return "(min-width: 1308px) 1180px, 90vw";
  if (n === 2) return "(min-width: 1308px) 578px, (min-width: 664px) 45vw, 90vw";
  return "(min-width: 1308px) 377px, (min-width: 1024px) 30vw, (min-width: 664px) 45vw, 90vw";
}
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

const TEXTO_WA = "Pedir medición";

/**
 * Ficha técnica de servicio (encargo §7): cabecera con la pareja; a dos columnas en escritorio, el
 * `contenido` en párrafos de 68 caracteres y, *sticky* a la derecha, el cajetín con REF, precio,
 * «Incluye» con topes de cota y la segunda pareja (en móvil, tras el primer párrafo). Después, las
 * fotos como láminas numeradas, las obras de este servicio, sus preguntas y el CTA final (tercera
 * pareja). Sin `contenido`, la `descripcion` (y `noindex`, que pone core).
 */
export default async function Page({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const servicio = buscarServicio(config, slug);
  if (!servicio) notFound();

  const { contacto } = config;
  const mensaje = mensajeDeServicio(servicio);
  const indice = config.servicios.findIndex((s) => s.slug === servicio.slug);
  const ref = dosCifras(indice + 1);
  const lam = lamina(config, "servicios");
  const [primero, ...resto] = servicio.contenido.length > 0 ? servicio.contenido : [servicio.descripcion];
  const trabajos = trabajosDelServicio(config.trabajos, servicio);
  const precio = servicio.precioDesde ? precioDesde(servicio.precioDesde) : undefined;

  return (
    <Marco actual="servicios" lamina={`${lam}.${ref}`}>
      <CabeceraInterior
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/servicios", texto: "Servicios" },
          { href: `/servicios/${servicio.slug}`, texto: servicio.titulo },
        ]}
        lamina={`LÁMINA ${lam}.${ref} · FICHA DE SERVICIO`}
        titulo={servicio.titulo}
        largo
      >
        <Pareja contacto={contacto} mensaje={mensaje} textoWhatsapp={TEXTO_WA} className="max-w-[720px] pt-1" />
      </CabeceraInterior>

      <section aria-label="Ficha del servicio" className="gutter pt-[clamp(32px,6vw,64px)]">
        <div className="ancho grid items-start gap-x-14 gap-y-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <p className="max-w-[68ch] text-(length:--text-entradilla) leading-[1.6] text-pretty lg:col-start-1">{primero}</p>
          <aside aria-label={`Ficha REF. ${ref}`} className="border border-texto bg-superficie lg:sticky lg:top-[84px] lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div className="etiqueta flex justify-between gap-3 border-b border-texto px-4 py-3">
              <span>REF. {ref}</span>
              <span>FICHA</span>
            </div>
            {precio && (
              <div className="flex flex-col gap-1 border-b border-borde px-4 py-3.5">
                <span className="etiqueta text-texto-suave">{precio.desde ? "PRECIO DESDE" : "PRECIO"}</span>
                <span className="font-titulo text-2xl font-semibold">{precio.importe}</span>
              </div>
            )}
            {servicio.incluye.length > 0 && (
              <div className="border-b border-borde px-4 py-3.5">
                <h2 className="etiqueta text-texto-suave">INCLUYE</h2>
                <ul className="relative mt-2.5 flex flex-col gap-2.5 pl-[22px] before:absolute before:top-2 before:bottom-2 before:left-1 before:w-px before:bg-cota">
                  {servicio.incluye.map((x) => (
                    <li key={x} className="relative text-[15px] leading-[1.45] before:absolute before:top-[9px] before:-left-[23px] before:h-px before:w-[11px] before:bg-texto">
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Pareja contacto={contacto} mensaje={mensaje} textoWhatsapp={TEXTO_WA} iconos={false} apilada className="p-4" />
          </aside>
          {resto.length > 0 && (
            <div className="flex max-w-[68ch] flex-col gap-5 lg:col-start-1">
              {resto.map((p) => (
                <p key={p} className="text-texto-suave text-pretty">
                  {p}
                </p>
              ))}
            </div>
          )}
        </div>
      </section>

      {servicio.imagenes.length > 0 && (
        <section aria-label="Láminas del servicio" className="gutter pt-[clamp(48px,7vw,80px)]">
          <ul className="ancho grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-6">
            {servicio.imagenes.map((im, i) => (
              <li key={im.src}>
                <Foto imagen={im} sizes={sizesLaminas(servicio.imagenes.length)} proporcion="1/1" fig={i + 1} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {trabajos.length > 0 && (
        <section aria-labelledby="titulo-obras-servicio" className="gutter pt-[clamp(48px,7vw,80px)]">
          <h2 id="titulo-obras-servicio" className="h2 mb-5">
            Obras de este servicio
          </h2>
          <ul className="max-w-[1000px] border-t border-texto">
            {trabajos.map((t) => (
              <li key={t.slug}>
                <Link href={`/trabajos/${t.slug}`} className="flex flex-wrap justify-between gap-x-5 gap-y-1.5 border-b border-borde py-3.5 no-underline">
                  <span className="font-titulo text-[15px] font-medium">{t.titulo}</span>
                  <span className="etiqueta text-texto-suave">
                    {refTrabajo(t, config.trabajos.indexOf(t))} <span className="flecha">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {servicio.preguntas.length > 0 && (
        <section aria-labelledby="titulo-preguntas-servicio" className="gutter pt-[clamp(48px,7vw,80px)]">
          <h2 id="titulo-preguntas-servicio" className="h2 mb-5">
            Preguntas sobre este servicio
          </h2>
          <ul className="max-w-[820px] border-t border-texto">
            {servicio.preguntas.map((q, i) => (
              <li key={q.pregunta} className="grid grid-cols-[52px_minmax(0,1fr)] gap-x-3 gap-y-1 border-b border-texto py-4">
                <span aria-hidden="true" className="etiqueta pt-0.5">
                  P.{dosCifras(i + 1)}
                </span>
                <h3 className="font-titulo text-base font-medium">{q.pregunta}</h3>
                <p className="col-start-2 mt-1.5 text-texto-suave">{q.respuesta}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <CtaFinal contacto={contacto} mensaje={mensaje} textoWhatsapp={TEXTO_WA} />
    </Marco>
  );
}
