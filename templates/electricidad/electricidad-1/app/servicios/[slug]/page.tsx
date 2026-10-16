import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { metadatosServicio } from "@andrei-leads/core";

import config from "@/site.config";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { GuiaCabecera } from "@/components/secciones/GuiaCabecera";
import { GuiaFotos } from "@/components/secciones/GuiaFotos";
import { GuiaIncluye } from "@/components/secciones/GuiaIncluye";
import { GuiaIndice } from "@/components/secciones/GuiaIndice";
import { GuiaOtrosServicios } from "@/components/secciones/GuiaOtrosServicios";
import { GuiaPreguntas } from "@/components/secciones/GuiaPreguntas";
import { GuiaQueEs } from "@/components/secciones/GuiaQueEs";
import { GuiaTrabajos } from "@/components/secciones/GuiaTrabajos";
import { Resenas } from "@/components/secciones/Resenas";
import { TramiteResumido } from "@/components/secciones/TramiteResumido";
import { hayIndice, PARTES_GUIA, partesGuia, trabajosDelServicio } from "@/lib/guia";
import { mensajeServicio } from "@/lib/mensajes";
import { pasosProceso } from "@/lib/proceso";
import { numerarSecciones } from "@/lib/secciones";

// Un slug que no está en generateStaticParams se genera en la primera visita. Sin esto,
// partialPrefetching sirve antes el App Shell con 200 y el 404 solo llega a la segunda.
// Con "navigation", Next espera al resultado completo: 404 desde la primera petición.
export const ensureStatic = "navigation";

// Con cacheComponents, generateStaticParams no puede devolver [].
export function generateStaticParams() {
  const params = config.servicios.map((s) => ({ slug: s.slug }));
  return params.length > 0 ? params : [{ slug: "_" }];
}

// Servicio sin `contenido`: core devuelve `noindex, follow`. Slug inexistente: {}.
export async function generateMetadata({ params }: PageProps<"/servicios/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return metadatosServicio(config, slug);
}

/**
 * Guía de servicio (Specs §6): banda de aviso + cabecera de documento → «En esta guía» (solo con
 * `contenido`) → Qué es → Qué incluye → trámite resumido → fotos → trabajos del servicio → preguntas
 * del servicio → reseñas → CTA → otros servicios. Cada parte sale solo con datos (salvo el trámite,
 * que usa los pasos por defecto). Qué se pinta, qué se numera y qué lista el índice sale de
 * `partesGuia`: no pueden desincronizarse.
 */
export default async function Page({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const servicio = config.servicios.find((s) => s.slug === slug);
  if (!servicio) notFound();

  const { contacto } = config;
  const trabajos = trabajosDelServicio(config.trabajos, servicio);
  const partes = partesGuia(servicio, config, trabajos.length > 0);
  const n = numerarSecciones(partes, 1);
  const hay = (p: (typeof partes)[number]) => partes.includes(p);
  const otros = config.servicios.filter((s) => s.slug !== servicio.slug);

  const entradas = hayIndice(servicio)
    ? partes.map((p) => ({ id: PARTES_GUIA[p].id, etiqueta: PARTES_GUIA[p].etiqueta, numero: n[p] }))
    : [];

  return (
    <>
      <GuiaCabecera servicio={servicio} contacto={contacto} ciudad={contacto.direccion.ciudad} />

      {entradas.length > 0 && <GuiaIndice entradas={entradas} className="mt-8 md:mt-12" />}

      {hay("queEs") && <GuiaQueEs numero={n.queEs} id={PARTES_GUIA.queEs.id} contenido={servicio.contenido} />}
      {hay("incluye") && (
        <GuiaIncluye numero={n.incluye} id={PARTES_GUIA.incluye.id} incluye={servicio.incluye} />
      )}
      <TramiteResumido numero={n.tramite} id={PARTES_GUIA.tramite.id} pasos={pasosProceso(config.proceso)} />
      {servicio.imagenes.length > 0 && <GuiaFotos imagenes={servicio.imagenes} />}
      {hay("trabajos") && <GuiaTrabajos numero={n.trabajos} id={PARTES_GUIA.trabajos.id} trabajos={trabajos} />}
      {hay("preguntas") && (
        <GuiaPreguntas
          numero={n.preguntas}
          id={PARTES_GUIA.preguntas.id}
          titulo={servicio.titulo}
          preguntas={servicio.preguntas}
        />
      )}
      {hay("resenas") && (
        <div id={PARTES_GUIA.resenas.id}>
          <Resenas
            numero={n.resenas}
            resenas={config.resenas}
            valoracion={config.valoracion}
            fichaGoogle={contacto.fichaGoogle}
          />
        </div>
      )}

      <CtaFinal contacto={contacto} mensaje={mensajeServicio(servicio)} />
      {otros.length > 0 && <GuiaOtrosServicios servicios={otros} />}
    </>
  );
}
