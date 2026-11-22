import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarTrabajo, metadatosTrabajo, minusculaInicial, parametrosTrabajos, servicioDelTrabajo } from "@andrei-leads/core";

import config from "@/site.config";
import { AntesDespues } from "@/components/base/AntesDespues";
import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { mensajeDeTrabajo, TEXTO_WHATSAPP_TRABAJO } from "@/lib/mensajes";
import { partirUbicacion } from "@/lib/textos";

// Ver app/servicios/[slug]/page.tsx: sin esto, un slug inexistente da 200 en la primera visita.
export const ensureStatic = "navigation";

// Sin trabajos, core devuelve [{ slug: "_" }], que no existe: la página hace notFound().
export function generateStaticParams() {
  return parametrosTrabajos(config);
}

export async function generateMetadata({ params }: PageProps<"/trabajos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return metadatosTrabajo(config, slug);
}

const SIZES = "(min-width: 1104px) 1040px, 100vw";

/**
 * Ficha de trabajo (encargo §7, tablero Trabajo): deslizador a todo el ancho (o la foto sola),
 * h1 con la ubicación en cursiva y la tabla de contexto con filetes → `contenido` en serif, enlace
 * al servicio y el resto de fotos en 4:3 → testimonio en cita grande → «¿Quieres algo parecido?».
 */
export default async function Page({ params }: PageProps<"/trabajos/[slug]">) {
  const { slug } = await params;
  const trabajo = buscarTrabajo(config, slug);
  if (!trabajo) notFound();

  const { contacto } = config;
  const servicio = servicioDelTrabajo(config.servicios, trabajo);
  const [principal, ...resto] = trabajo.imagenes;
  const [inicio, lugar] = partirUbicacion(trabajo.titulo, trabajo.ubicacion);
  const filas = [
    { k: "Ubicación", v: trabajo.ubicacion },
    { k: "Año", v: trabajo.anio?.toString() },
    { k: "Superficie", v: trabajo.superficie },
    { k: "Plazo", v: trabajo.duracion },
    { k: "Servicio", v: servicio?.titulo },
    { k: "Precio aproximado", v: trabajo.precio },
  ].filter((f): f is { k: string; v: string } => Boolean(f.v));

  return (
    <>
      <span data-pagina="trabajos" hidden />
      <section className="contenedor pt-[clamp(8px,2vw,24px)] pb-[clamp(40px,6vw,88px)]">
        <Migas
          className="mb-[clamp(12px,2vw,20px)]"
          migas={[
            { href: "/", texto: "Inicio" },
            { href: "/trabajos", texto: "Trabajos" },
            { href: `/trabajos/${trabajo.slug}`, texto: trabajo.titulo },
          ]}
        />
        <div className="mx-auto max-w-[1040px]">
          {trabajo.antes ? (
            <AntesDespues antes={trabajo.antes} despues={principal} titulo={trabajo.titulo} sizes={SIZES} preload antesInmediata />
          ) : (
            <Foto imagen={principal} sizes={SIZES} preload />
          )}
        </div>
        <div className="mt-[clamp(28px,4vw,56px)] grid items-start gap-[clamp(28px,5vw,88px)] lg:grid-cols-[7fr_5fr]">
          <h1 className="titulo-display" style={{ fontSize: "clamp(2rem, 1.3rem + 3vw, 4.25rem)" }}>
            {inicio}
            {lugar && <em className="text-primario-texto">{lugar}</em>}
          </h1>
          {filas.length > 0 && (
            <table className="w-full border-collapse border-b border-filete">
              <tbody>
                {filas.map((f) => (
                  <tr key={f.k} className="border-t border-filete">
                    <th scope="row" className="versalitas w-[44%] py-3 pr-3 text-left align-baseline">
                      {f.k}
                    </th>
                    <td className="py-3 align-baseline font-titulo text-lg">{f.v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <section aria-label="La obra" className="border-t border-filete">
        <div className="contenedor grid items-start gap-[clamp(28px,5vw,88px)] py-[clamp(40px,6vw,88px)] lg:grid-cols-[7fr_5fr]">
          <div className="max-w-[65ch]">
            {(trabajo.contenido.length > 0 ? trabajo.contenido : [trabajo.descripcion]).map((p) => (
              <p key={p} className="mb-[1em] font-titulo text-lectura last:mb-0">
                {p}
              </p>
            ))}
            {servicio && (
              <Link href={`/servicios/${servicio.slug}`} className="enlace mt-5 inline-flex min-h-11 items-center">
                Más sobre {minusculaInicial(servicio.titulo)}
              </Link>
            )}
          </div>
          {resto.length > 0 && (
            <ul className="grid gap-3 lg:grid-cols-2">
              {resto.map((f) => (
                <li key={f.src}>
                  {/* calc() y no «100vw» a secas: con un «NNvw» suelto, next/image quita del srcset los anchos < 640 y el escritorio (240 px) bajaría 640. */}
                  <Foto imagen={f} sizes="(min-width: 1024px) 240px, calc(100vw - 32px)" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {trabajo.testimonio && (
        <section aria-label="Testimonio" className="border-t border-filete bg-alterna">
          <figure className="contenedor seccion m-0">
            <blockquote className="max-w-[26ch] font-titulo text-[clamp(1.75rem,1.2rem+2.6vw,3.5rem)] leading-[1.15] tracking-[-0.015em] text-balance italic">
              «{trabajo.testimonio.texto}»
            </blockquote>
            <figcaption className="versalitas mt-[22px]">{trabajo.testimonio.autor} · Cliente de esta obra</figcaption>
          </figure>
        </section>
      )}

      <CtaFinal
        compacto
        cta={{ telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje: mensajeDeTrabajo(trabajo) }}
        textoWhatsapp={TEXTO_WHATSAPP_TRABAJO}
        titulo={
          <>
            ¿Quieres algo <em>parecido</em>?
          </>
        }
      />
    </>
  );
}
