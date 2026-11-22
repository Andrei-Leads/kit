import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarTrabajo, metadatosTrabajo, parametrosTrabajos, servicioDelTrabajo } from "@andrei-leads/core";

import { AntesDespues } from "@/components/base/AntesDespues";
import { Foto, PieFigura, textoPie } from "@/components/base/Foto";
import { Pareja } from "@/components/Botones";
import { CotaLinea, CotaVertical } from "@/components/Cota";
import { Marco } from "@/components/Marco";
import { CabeceraInterior } from "@/components/secciones/CabeceraInterior";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { mensajeDeTrabajo, mensajeInicio } from "@/lib/mensajes";
import { lamina } from "@/lib/navegacion";
import { dosCifras } from "@/lib/textos";
import config from "@/site.config";

// Un slug que no está en generateStaticParams se genera en la primera visita. Sin esto,
// partialPrefetching sirve antes el App Shell con 200 y el 404 solo llega a la segunda.
export const ensureStatic = "navigation";

// Sin trabajos, core devuelve [{ slug: "_" }], que buscarTrabajo no encuentra: 404.
export function generateStaticParams() {
  return parametrosTrabajos(config);
}

export async function generateMetadata({ params }: PageProps<"/trabajos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return metadatosTrabajo(config, slug);
}

/**
 * Ficha de obra (encargo §7): arriba, el cajetín con los datos de contexto en filas (cada fila sin
 * dato desaparece). Debajo, la foto principal 3:2 con cotas y `AntesDespues` si hay `antes`; el
 * `contenido`, el `testimonio` como «Observación del cliente», el enlace al servicio y la pareja
 * «Quiero algo parecido» + Llamar.
 */
export default async function Page({ params }: PageProps<"/trabajos/[slug]">) {
  const { slug } = await params;
  const trabajo = buscarTrabajo(config, slug);
  if (!trabajo) notFound();

  const { contacto } = config;
  const servicio = servicioDelTrabajo(config.servicios, trabajo);
  const ref = dosCifras(config.trabajos.findIndex((t) => t.slug === trabajo.slug) + 1);
  const lam = lamina(config, "trabajos");
  const [foto, ...fotos] = trabajo.imagenes;
  const filas = [
    ["UBICACIÓN", trabajo.ubicacion],
    ["AÑO", trabajo.anio && String(trabajo.anio)],
    ["SUPERFICIE", trabajo.superficie],
    ["DURACIÓN", trabajo.duracion],
    ["SERVICIO", servicio?.titulo],
    ["PRECIO", trabajo.precio],
  ].filter((f): f is [string, string] => !!f[1]);
  const sizes = "(min-width: 1024px) 760px, calc(100vw - 62px)";

  return (
    <Marco actual="trabajos" lamina={`${lam}.${ref}`}>
      <CabeceraInterior
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/trabajos", texto: "Trabajos" },
          { href: `/trabajos/${trabajo.slug}`, texto: trabajo.titulo },
        ]}
        lamina={`LÁMINA ${lam}.${ref} · FICHA DE OBRA`}
        titulo={trabajo.titulo}
        largo
      >
        <div className="max-w-[560px] border border-texto bg-superficie">
          <p className="etiqueta border-b border-texto px-3.5 py-2.5">REF. {ref} · DATOS DE OBRA</p>
          {filas.length > 0 && (
            <dl>
              {filas.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[120px_minmax(0,1fr)] border-b border-borde last:border-b-0">
                  <dt className="etiqueta border-r border-borde px-3.5 py-2.5 text-texto-suave">{k}</dt>
                  <dd className="px-3.5 py-2.5 font-titulo text-sm">{v}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </CabeceraInterior>

      <section aria-label="La obra" className="gutter pt-[clamp(32px,6vw,64px)]">
        <div className="flex max-w-[1000px] flex-col gap-2.5">
          <CotaLinea className="mr-[22px]" />
          <div className="flex gap-2.5">
            {trabajo.antes ? (
              <AntesDespues antes={trabajo.antes} despues={foto} sizes={sizes} preload className="min-w-0 flex-1" />
            ) : (
              <Foto imagen={foto} sizes={sizes} proporcion="3/2" preload className="min-w-0 flex-1" />
            )}
            <CotaVertical />
          </div>
          <PieFigura texto={textoPie(foto, 1, trabajo.antes ? "antes y después" : undefined)} />
        </div>

        {trabajo.contenido.length > 0 && (
          <div className="mt-9 flex max-w-[68ch] flex-col gap-5">
            {trabajo.contenido.map((p) => (
              <p key={p} className="text-pretty">
                {p}
              </p>
            ))}
          </div>
        )}

        {trabajo.testimonio && (
          <figure className="mt-10 flex max-w-[68ch] flex-col gap-3 border-y border-texto py-5">
            <span className="etiqueta">OBSERVACIÓN DEL CLIENTE</span>
            <blockquote className="text-[clamp(1.125rem,1rem+0.5vw,1.375rem)] leading-normal text-pretty">«{trabajo.testimonio.texto}»</blockquote>
            <figcaption className="etiqueta text-texto-suave">— {trabajo.testimonio.autor}</figcaption>
          </figure>
        )}

        {fotos.length > 0 && (
          <ul aria-label="Más láminas de la obra" className="mt-10 grid max-w-[1000px] grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-6">
            {fotos.map((f, i) => (
              <li key={f.src}>
                <Foto imagen={f} sizes="(min-width: 1024px) 320px, calc(100vw - 40px)" proporcion="4/3" fig={i + 2} />
              </li>
            ))}
          </ul>
        )}

        {servicio && (
          <Link href={`/servicios/${servicio.slug}`} className="enlace mt-7">
            Servicio: {servicio.titulo}&nbsp;<span className="flecha">→</span>
          </Link>
        )}

        <Pareja contacto={contacto} mensaje={mensajeDeTrabajo(trabajo)} textoWhatsapp="Quiero algo parecido" className="mt-8 max-w-[720px]" />
      </section>

      <CtaFinal contacto={contacto} mensaje={mensajeInicio(contacto)} />
    </Marco>
  );
}
