import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BotonLlamada,
  buscarServicio,
  metadatosServicio,
  minusculaInicial,
  parametrosServicios,
  telefonoVisible,
  trabajosDelServicio,
} from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { Pareja } from "@/components/Botones";
import { Check, IconoTelefono } from "@/components/Iconos";
import { Marco } from "@/components/Marco";
import { AsistenteServidor } from "@/components/secciones/AsistenteServidor";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { TarjetaTrabajo } from "@/components/secciones/TarjetaTrabajo";
import { Preguntas } from "@/components/base/Preguntas";
import { mensajeDeServicio, mensajeInicio } from "@/lib/mensajes";
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
 * Ficha de servicio (encargo §7): cabecera en el campo pleno con migas, h1, «desde» y «o llámanos»,
 * y el asistente con el servicio ya elegido (paso 2 de 3); sin WhatsApp, una tarjeta con la
 * llamada. Debajo: fotos en carril, «Cómo lo hacemos», «Incluye» en píldoras, la pareja, trabajos
 * de este servicio, preguntas y CTA con su mensaje. Cada bloque vacío se oculta.
 */
export default async function Page({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const servicio = buscarServicio(config, slug);
  if (!servicio) notFound();

  const { contacto } = config;
  const mensaje = mensajeDeServicio(servicio);
  const enFrase = minusculaInicial(servicio.titulo);
  const tel = telefonoVisible(contacto.telefono);
  const trabajos = trabajosDelServicio(config.trabajos, servicio);
  const parrafos = servicio.contenido.length > 0 ? servicio.contenido : [servicio.descripcion];

  return (
    <Marco actual="servicios">
      <section aria-labelledby="h1-servicio" className="campo-pleno px-[clamp(20px,4vw,40px)] pt-[100px] pb-[clamp(48px,7vw,96px)]">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-start gap-[clamp(20px,4vw,56px)]">
          <div className="flex min-w-0 flex-[1_1_400px] flex-col gap-3.5 lg:pt-8">
            <Migas
              migas={[
                { href: "/", texto: "Inicio" },
                { href: "/servicios", texto: "Servicios" },
                { href: `/servicios/${servicio.slug}`, texto: servicio.titulo },
              ]}
            />
            <h1 id="h1-servicio" className="font-titulo text-display leading-[1.04] font-bold tracking-[-0.03em]">
              {servicio.titulo}
            </h1>
            <p className="max-w-[44ch] text-entradilla">{servicio.descripcion}</p>
            {servicio.precioDesde && (
              <span className="self-start rounded-full bg-(--color-sobre-pleno) px-4 py-1.5 font-bold text-texto tabular-nums">{servicio.precioDesde}</span>
            )}
            <BotonLlamada telefono={contacto.telefono} className="boton boton-compacto boton-contorno-pleno self-start px-[22px] text-base">
              o llámanos:&nbsp;{tel}
            </BotonLlamada>
          </div>
          <div className="min-w-0 flex-[1_1_460px]">
            {contacto.whatsapp ? (
              <AsistenteServidor
                servicios={config.servicios}
                whatsapp={contacto.whatsapp}
                mensajeBase={mensajeInicio(contacto)}
                servicioInicial={servicio.slug}
              />
            ) : (
              <div className="tarjeta-clara flex flex-col gap-3.5 rounded-tarjeta bg-superficie p-6">
                <p className="font-titulo text-[22px] font-bold">Cuéntanos tu hueco por teléfono</p>
                <BotonLlamada telefono={contacto.telefono} className="boton boton-primario text-lg">
                  <IconoTelefono />
                  Llamar al&nbsp;{tel}
                </BotonLlamada>
              </div>
            )}
          </div>
        </div>
      </section>

      <section aria-label="Detalle del servicio" className="seccion">
        <div className="contenedor flex flex-col gap-[clamp(40px,6vw,72px)]">
          {servicio.imagenes.length > 0 && (
            <ul aria-label="Fotos" className="carril carril-ancho">
              {servicio.imagenes.map((f) => (
                <li key={f.src}>
                  <Foto imagen={f} sizes="(min-width: 1024px) 380px, 80vw" />
                </li>
              ))}
            </ul>
          )}
          <div className="flex flex-wrap items-start gap-[clamp(28px,5vw,72px)]">
            <div className="flex max-w-[62ch] flex-[1_1_380px] flex-col gap-3.5">
              <h2 className="h2">Cómo lo hacemos</h2>
              {parrafos.map((p) => (
                <p key={p} className="text-[clamp(1.05rem,1rem+0.3vw,1.2rem)]">
                  {p}
                </p>
              ))}
            </div>
            {servicio.incluye.length > 0 && (
              <div className="flex flex-[1_1_320px] flex-col gap-3.5">
                <h3 className="font-titulo text-xl font-bold">Incluye</h3>
                <ul className="flex flex-wrap gap-2.5">
                  {servicio.incluye.map((x) => (
                    <li key={x} className="pildora-check min-h-12 bg-alterna py-1.5 pr-5 pl-2">
                      <Check tamano={30} />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <Pareja contacto={contacto} mensaje={mensaje} textoWhatsapp="Envíanos fotos por WhatsApp" />
          {trabajos.length > 0 && (
            <div className="flex flex-col gap-6">
              <h2 className="h3-seccion">Trabajos de {enFrase}</h2>
              <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                {trabajos.map((t) => (
                  <li key={t.slug} data-aparecer="" className="min-w-0">
                    <TarjetaTrabajo trabajo={t} sizes="(min-width: 1024px) 380px, 45vw" compacta />
                  </li>
                ))}
              </ul>
            </div>
          )}
          {servicio.preguntas.length > 0 && (
            <div className="flex max-w-[820px] flex-col gap-4">
              <h2 className="h3-seccion">Dudas sobre {enFrase}</h2>
              <Preguntas preguntas={servicio.preguntas} grupo="preguntas-servicio" />
            </div>
          )}
        </div>
      </section>

      <CtaFinal contacto={contacto} mensaje={mensaje} />
    </Marco>
  );
}
