import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buscarServicio, metadatosServicio, minusculaInicial, parametrosServicios, trabajosDelServicio } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { Pareja } from "@/components/Botones";
import { Marca } from "@/components/Iconos";
import { Marco } from "@/components/Marco";
import { BandaInterior } from "@/components/secciones/BandaInterior";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { FichasTrabajos } from "@/components/secciones/FichasTrabajos";
import { PlanificadorServidor } from "@/components/secciones/PlanificadorServidor";
import { PreguntasFrecuentes } from "@/components/secciones/PreguntasFrecuentes";
import { mensajeDeServicio } from "@/lib/mensajes";
import { lineaHorario } from "@/lib/textos";
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
 * Ficha de servicio (encargo §7): cabecera terracota con migas, h1, «desde» y el planificador
 * corto (tamaño y plazo) con el servicio ya elegido; sin WhatsApp, la llamada. Debajo, contenido,
 * «Qué incluye», pareja y fotos; trabajos del servicio, preguntas y CTA. Cada bloque vacío se oculta.
 */
export default async function Page({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const servicio = buscarServicio(config, slug);
  if (!servicio) notFound();

  const { contacto } = config;
  const mensaje = mensajeDeServicio(servicio);
  const enFrase = minusculaInicial(servicio.titulo);
  const trabajos = trabajosDelServicio(config.trabajos, servicio);
  const [foto, ...fotos] = servicio.imagenes;
  const cuerpo = servicio.contenido.length > 0 || servicio.incluye.length > 0 || !!foto;

  return (
    <Marco actual="servicios">
      <BandaInterior
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/servicios", texto: "Servicios" },
          { href: `/servicios/${servicio.slug}`, texto: servicio.titulo },
        ]}
        titulo={servicio.titulo}
        entradilla={servicio.descripcion}
        desde={servicio.precioDesde}
        debajo={
          !contacto.whatsapp && (
            <Pareja contacto={contacto} mensaje={mensaje} tono="sobre" nota={lineaHorario(contacto)} className="mt-2 max-w-[420px]" />
          )
        }
        lateral={<PlanificadorServidor servicios={[servicio]} contacto={contacto} mensajeBase={mensaje} servicioFijo={servicio} />}
      />

      {cuerpo && (
        <section aria-label="Detalle del servicio" className="pt-[clamp(48px,2rem+4vw,96px)]">
          <div className="contenedor grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-start gap-x-[clamp(32px,5vw,72px)] gap-y-8">
            <div className="flex max-w-[62ch] flex-col gap-4">
              {servicio.contenido.length > 0 && (
                <>
                  <h2 className="h2">Cómo lo hacemos</h2>
                  {servicio.contenido.map((p) => (
                    <p key={p} className="text-pretty">
                      {p}
                    </p>
                  ))}
                </>
              )}
              {servicio.incluye.length > 0 && (
                <>
                  <h2 className="mt-4 font-titulo text-[22px] font-semibold">Qué incluye</h2>
                  <ul className="flex flex-col gap-2.5">
                    {servicio.incluye.map((x) => (
                      <li key={x} className="flex items-start gap-3">
                        <Marca />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <Pareja contacto={contacto} mensaje={mensaje} textoWhatsapp="Pide presupuesto por WhatsApp" nota={lineaHorario(contacto)} className="mt-3" />
            </div>
            {foto && <Foto imagen={foto} sizes="(min-width: 1024px) 560px, calc(100vw - 32px)" className="rounded-tarjeta" />}
          </div>
          {fotos.length > 0 && (
            <ul className="contenedor mt-8 grid grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] gap-3">
              {fotos.map((f) => (
                <li key={f.src}>
                  <Foto imagen={f} sizes="(min-width: 1024px) 380px, calc(100vw - 32px)" />
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      <FichasTrabajos trabajos={trabajos} servicios={config.servicios} titulo={`Trabajos de ${enFrase}`} />
      <PreguntasFrecuentes preguntas={servicio.preguntas} grupo="preguntas-servicio" />
      <CtaFinal
        contacto={contacto}
        mensaje={mensaje}
        titulo={`Pide presupuesto de ${enFrase}`}
        textoWhatsapp="Pide presupuesto por WhatsApp"
        planificar={false}
      />
    </Marco>
  );
}
