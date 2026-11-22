import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarTrabajo, metadatosTrabajo, parametrosTrabajos, servicioDelTrabajo } from "@andrei-leads/core";

import config from "@/site.config";
import { Foto } from "@/components/base/Foto";
import { Pareja } from "@/components/Botones";
import { CabeceraPagina } from "@/components/CabeceraPagina";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { mensajeDeObra } from "@/lib/mensajes";
import { numeroObra } from "@/lib/obras";

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

const CELDA = "border-b-2 border-borde px-3 py-[11px]";

/**
 * Ficha de obra: «Obra 01 · Reforma integral», `h1` y la foto 3:2 en color a
 * todo el ancho (LCP) → ficha técnica en tabla de borde negro (cada fila sin
 * dato desaparece) con la descripción y el `contenido` al lado → «Terminada /
 * Estado previo» (color / blanco y negro) → galería en color → testimonio →
 * «¿Quieres algo parecido?» → obra anterior / siguiente.
 */
export default async function Page({ params }: PageProps<"/trabajos/[slug]">) {
  const { slug } = await params;
  const trabajo = buscarTrabajo(config, slug);
  if (!trabajo) notFound();

  const { contacto, trabajos } = config;
  const indice = trabajos.indexOf(trabajo);
  const servicio = servicioDelTrabajo(config.servicios, trabajo);
  const mensaje = mensajeDeObra(trabajo);
  const anterior = indice > 0 ? trabajos[indice - 1] : undefined;
  const siguiente = indice < trabajos.length - 1 ? trabajos[indice + 1] : undefined;
  const [principal, ...resto] = trabajo.imagenes;

  const filas: [string, React.ReactNode][] = (
    [
      ["Obra n.º", numeroObra(indice)],
      ["Barrio", trabajo.ubicacion],
      ["Año", trabajo.anio],
      ["Superficie", trabajo.superficie],
      ["Plazo", trabajo.duracion],
      [
        "Servicio",
        servicio && (
          <Link href={`/servicios/${servicio.slug}`} className="text-texto underline decoration-primario decoration-2 underline-offset-[3px]">
            {servicio.titulo}
          </Link>
        ),
      ],
      ["Precio aproximado", trabajo.precio],
    ] as [string, React.ReactNode][]
  ).filter(([, v]) => v !== undefined && v !== "" && v !== false);

  return (
    <>
      <CabeceraPagina
        pagina="trabajos"
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/trabajos", texto: "Obras" },
          { href: `/trabajos/${trabajo.slug}`, texto: trabajo.titulo },
        ]}
        antetitulo={`Obra ${numeroObra(indice)}${servicio ? ` · ${servicio.titulo}` : ""}`}
        titulo={trabajo.titulo}
      />

      <section aria-label="Ficha de la obra" className="contenedor pt-5">
        <figure className="m-0">
          <Foto imagen={principal} sizes="100vw" proporcion="3/2" preload />
        </figure>
        <div className="mt-7 grid items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <table className="w-full border-collapse border-2 border-borde">
            <caption className="etiqueta pb-2 text-left text-[15px]">Ficha técnica</caption>
            <tbody>
              {filas.map(([k, v]) => (
                <tr key={k}>
                  <th scope="row" className={`${CELDA} etiqueta w-[42%] border-r-2 text-left align-top text-sm leading-[1.2]`}>
                    {k}
                  </th>
                  <td className={`${CELDA} text-[15px] leading-[1.35]`}>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <p className="m-0 max-w-[52ch] text-[clamp(1.125rem,1rem+0.5vw,1.375rem)] leading-[1.4] font-medium">{trabajo.descripcion}</p>
            {trabajo.contenido.map((p) => (
              <p key={p} className="m-0 mt-4 max-w-[62ch]">
                {p}
              </p>
            ))}
          </div>
        </div>

        {trabajo.antes && (
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            <figure className="m-0">
              <figcaption className="etiqueta border-t-2 border-borde py-2 text-sm">Terminada</figcaption>
              <Foto imagen={principal} sizes="(min-width: 640px) 50vw, 100vw" proporcion="3/2" />
            </figure>
            <figure className="m-0">
              <figcaption className="etiqueta border-t-2 border-borde py-2 text-sm">Estado previo</figcaption>
              <Foto imagen={trabajo.antes} sizes="(min-width: 640px) 50vw, 100vw" proporcion="3/2" archivo />
            </figure>
          </div>
        )}

        {resto.length > 0 && (
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {resto.map((img) => (
              <figure key={img.src} className="m-0">
                <Foto imagen={img} sizes="(min-width: 640px) 50vw, 100vw" proporcion="3/2" />
              </figure>
            ))}
          </div>
        )}

        {trabajo.testimonio && (
          <figure className="m-0 mt-12 max-w-[820px] border-t-2 border-borde pt-4">
            <blockquote className="m-0 text-[clamp(1.25rem,1.05rem+0.9vw,1.75rem)] leading-[1.35] font-medium text-pretty">
              «{trabajo.testimonio.texto}»
            </blockquote>
            <figcaption className="mt-2.5 text-sm text-texto-suave">
              {trabajo.testimonio.autor} · {trabajo.titulo}
            </figcaption>
          </figure>
        )}

        <div className="mt-12 border-t-2 border-borde pt-5">
          <h2 className="titulo-h2 m-0 mb-4">¿Quieres algo parecido?</h2>
          <Pareja telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensaje} textoWhatsapp="Quiero una obra así" />
        </div>

        {(anterior || siguiente) && (
          <nav aria-label="Otras obras" className="mt-10 grid grid-cols-2 border-2 border-borde">
            <div className="min-h-[88px] border-r-2 border-borde">
              {anterior && (
                <Link href={`/trabajos/${anterior.slug}`} className="block h-full p-3.5 text-texto no-underline hover:bg-superficie">
                  <span className="block text-[13px] text-texto-suave">← Obra anterior</span>
                  <span className="condensada mt-1 block text-xl leading-none">
                    {numeroObra(indice - 1)} {anterior.titulo}
                  </span>
                </Link>
              )}
            </div>
            <div className="min-h-[88px] text-right">
              {siguiente && (
                <Link href={`/trabajos/${siguiente.slug}`} className="block h-full p-3.5 text-texto no-underline hover:bg-superficie">
                  <span className="block text-[13px] text-texto-suave">Obra siguiente →</span>
                  <span className="condensada mt-1 block text-xl leading-none">
                    {numeroObra(indice + 1)} {siguiente.titulo}
                  </span>
                </Link>
              )}
            </div>
          </nav>
        )}
      </section>
      <CtaFinal contacto={contacto} mensaje={mensaje} textoWhatsapp="Quiero una obra así" />
    </>
  );
}
