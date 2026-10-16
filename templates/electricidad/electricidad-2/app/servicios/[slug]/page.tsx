import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { metadatosServicio } from "@andrei-leads/core";

import config from "@/site.config";
import { CabeceraInterior } from "@/components/secciones/CabeceraInterior";
import { CitaGrande } from "@/components/secciones/CitaGrande";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { FichaCabecera } from "@/components/secciones/FichaCabecera";
import { FichaContenido } from "@/components/secciones/FichaContenido";
import { FichaFotos } from "@/components/secciones/FichaFotos";
import { FichaOtrosServicios } from "@/components/secciones/FichaOtrosServicios";
import { FichaPreguntas } from "@/components/secciones/FichaPreguntas";
import { TrabajosServicio } from "@/components/secciones/TrabajosServicio";
import { etiquetaWhatsappServicio, mensajeServicio } from "@/lib/mensajes";
import { resenasRecientes } from "@/lib/resenas";
import { otrosServicios, tituloFicha, trabajosDelServicio } from "@/lib/servicios";

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
 * Ficha de servicio (mockup 2b/2i, Specs §2): migas + h1 «{titulo} en {ciudad}» → foto 3:2 (o icono) con
 * descripción, precio y botones → `contenido` y «Qué incluye» → fotos restantes → «Trabajos de este
 * servicio» y «Preguntas» → la reseña más reciente como cita grande → CTA con «Otros servicios». Cada bloque
 * sale solo con datos y sin hueco. Sin `contenido`, la `descripcion` (ya en la cabecera) hace de texto y no
 * se repite. Todos los botones de WhatsApp de la ficha, también el del CTA, llevan el texto de la decisión 4
 * y el mensaje del servicio.
 */
export default async function Page({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const servicio = config.servicios.find((s) => s.slug === slug);
  if (!servicio) notFound();

  const { contacto } = config;
  const trabajos = trabajosDelServicio(config.trabajos, servicio);
  const otros = otrosServicios(config.servicios, servicio);
  const [cita] = resenasRecientes(config.resenas, 1);
  const hayContenido = servicio.contenido.length > 0 || servicio.incluye.length > 0;
  const fotosRestantes = servicio.imagenes.slice(1);
  const hayTrabajosOPreguntas = trabajos.length > 0 || servicio.preguntas.length > 0;

  return (
    <>
      <CabeceraInterior
        titulo={tituloFicha(servicio, contacto.direccion.ciudad)}
        migas={[{ href: "/", texto: "Inicio" }, { href: "/servicios", texto: "Servicios" }, { texto: servicio.titulo }]}
      />
      <FichaCabecera servicio={servicio} contacto={contacto} />

      {hayContenido && <FichaContenido servicio={servicio} />}
      <FichaFotos imagenes={fotosRestantes} />

      {hayTrabajosOPreguntas && (
        <div className="contenedor grid grid-cols-1 gap-x-14 gap-y-14 pb-16 lg:grid-cols-2 lg:pb-[88px]">
          {trabajos.length > 0 && <TrabajosServicio trabajos={trabajos} idTitulo="titulo-trabajos-servicio" />}
          {servicio.preguntas.length > 0 && (
            <FichaPreguntas preguntas={servicio.preguntas} idTitulo="titulo-preguntas-servicio" />
          )}
        </div>
      )}

      {cita && <CitaGrande resena={cita} />}

      <CtaFinal
        contacto={contacto}
        desde={cita ? "piedra-2" : "piedra"}
        mensaje={mensajeServicio(servicio)}
        etiquetaWhatsapp={etiquetaWhatsappServicio(servicio)}
      >
        {otros.length > 0 && <FichaOtrosServicios servicios={otros} />}
      </CtaFinal>
    </>
  );
}
