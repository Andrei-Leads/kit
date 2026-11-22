import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buscarServicio, metadatosServicio, minusculaInicial, parametrosServicios, trabajosDelServicio } from "@andrei-leads/core";

import config from "@/site.config";
import { Pareja } from "@/components/Botones";
import { IconoCheck } from "@/components/Iconos";
import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { Preguntas } from "@/components/base/Preguntas";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { RejillaFachadas } from "@/components/secciones/TarjetaFachada";
import { mensajeDeServicio, TEXTO_WA, TEXTO_WA_SERVICIO } from "@/lib/mensajes";
import { conAntesPrimero } from "@/lib/textos";
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

/**
 * Ficha de servicio (encargo §7 e Interiores.dc.html): migas, h1, descripción, pastilla del precio
 * (si existe) y la pareja «Pedir precio» + «Llamar»; a la derecha, la foto 4:3 redondeada (LCP).
 * Después, sobre blanco, «Cómo lo hacemos» (`contenido`) con la segunda pareja y la tarjeta «Qué
 * incluye» con checks; el resto de `imagenes`; las fachadas de ese servicio con deslizador; sus
 * preguntas y el CTA final (tercera pareja). Cada bloque vacío se oculta.
 */
export default async function Page({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const servicio = buscarServicio(config, slug);
  if (!servicio) notFound();

  const { contacto } = config;
  const cta = { telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje: mensajeDeServicio(servicio) };
  const [foto, ...resto] = servicio.imagenes;
  const fachadas = conAntesPrimero(trabajosDelServicio(config.trabajos, servicio));
  const hayCuerpo = servicio.contenido.length > 0 || servicio.incluye.length > 0;

  return (
    <>
      <span data-pagina="servicios" hidden />
      <section className="contenedor pt-2 pb-[clamp(40px,6vw,80px)]">
        <Migas
          migas={[
            { href: "/", texto: "Inicio" },
            { href: "/servicios", texto: "Servicios" },
            { href: `/servicios/${servicio.slug}`, texto: servicio.titulo },
          ]}
        />
        <div className={cn("mt-2 grid items-center gap-x-14 gap-y-7", foto && "lg:grid-cols-[5fr_6fr]")}>
          <div className="flex flex-col gap-4">
            <h1 className="titulo-display">{servicio.titulo}</h1>
            <p className="max-w-[36rem] text-texto-suave">{servicio.descripcion}</p>
            {servicio.precioDesde && (
              <p className="self-start rounded-pastilla bg-alterna px-3.5 py-2 text-base leading-none font-extrabold">{servicio.precioDesde}</p>
            )}
            <Pareja cta={cta} textoWhatsapp={TEXTO_WA_SERVICIO} className="mt-1 max-w-[520px]" />
          </div>
          {foto && <Foto imagen={foto} sizes="(min-width: 1024px) 600px, 100vw" preload />}
        </div>
      </section>

      {hayCuerpo && (
        <section aria-label="Cómo lo hacemos" className="border-y border-borde bg-superficie py-[clamp(56px,2rem+6vw,96px)]">
          <div className={cn("contenedor grid items-start gap-x-14 gap-y-10", servicio.contenido.length > 0 && "lg:grid-cols-[7fr_5fr]")}>
            {servicio.contenido.length > 0 && (
              <div className="max-w-[65ch]">
                <h2 className="titulo-seccion mb-5">Cómo lo hacemos</h2>
                {servicio.contenido.map((p) => (
                  <p key={p} className="mb-[1em] last:mb-0">
                    {p}
                  </p>
                ))}
                <Pareja cta={cta} textoWhatsapp={TEXTO_WA} className="mt-7 max-w-[600px]" />
              </div>
            )}
            {servicio.incluye.length > 0 && (
              <div className={cn(servicio.contenido.length === 0 && "max-w-[600px]")}>
                <div className="rounded-tarjeta border border-borde bg-fondo p-6">
                  <h2 className="mb-3 text-xl font-extrabold">Qué incluye</h2>
                  <ul className="flex flex-col gap-2.5">
                    {servicio.incluye.map((x) => (
                      <li key={x} className="flex items-start gap-3 text-base leading-[1.4]">
                        <span className="mt-px flex size-6 flex-none items-center justify-center rounded-full bg-primario text-sobre-primario">
                          <IconoCheck tamano={15} />
                        </span>
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
                {servicio.contenido.length === 0 && <Pareja cta={cta} textoWhatsapp={TEXTO_WA} className="mt-7" />}
              </div>
            )}
          </div>
        </section>
      )}

      {resto.length > 0 && (
        <section aria-label="Más fotos" className="contenedor pt-[clamp(48px,6vw,80px)]">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resto.map((f) => (
              <li key={f.src}>
                <Foto imagen={f} sizes="(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw" />
              </li>
            ))}
          </ul>
        </section>
      )}

      {fachadas.length > 0 && (
        <section aria-labelledby="titulo-fachadas-servicio" className="pt-[clamp(56px,2rem+6vw,96px)]">
          <div className="contenedor">
            <h2 id="titulo-fachadas-servicio" className="titulo-seccion mb-8">
              Fachadas de este servicio
            </h2>
            <RejillaFachadas trabajos={fachadas} whatsapp={contacto.whatsapp} />
          </div>
        </section>
      )}

      {servicio.preguntas.length > 0 && (
        <section aria-labelledby="titulo-preguntas-servicio" className="py-[clamp(56px,2rem+6vw,96px)]">
          <div className="contenedor">
            <div className="mx-auto max-w-[760px]">
              <h2 id="titulo-preguntas-servicio" className="titulo-seccion mb-5">
                Preguntas sobre {minusculaInicial(servicio.titulo)}
              </h2>
              <Preguntas preguntas={servicio.preguntas} grupo="preguntas-servicio" />
            </div>
          </div>
        </section>
      )}

      <div className={cn(servicio.preguntas.length === 0 && "mt-[clamp(56px,2rem+6vw,96px)]")}>
        <CtaFinal cta={cta} titulo="¿Quieres saber cuánto te costaría?" textoWhatsapp={TEXTO_WA} />
      </div>
    </>
  );
}
