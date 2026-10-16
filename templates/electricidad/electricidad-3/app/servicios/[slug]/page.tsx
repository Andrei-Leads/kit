import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { metadatosServicio } from "@andrei-leads/core";

import config from "@/site.config";
import { CabeceraInterior } from "@/components/CabeceraInterior";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { FichaCabecera } from "@/components/secciones/FichaCabecera";
import { FichaContenido } from "@/components/secciones/FichaContenido";
import { FichaFotos } from "@/components/secciones/FichaFotos";
import { FichaOtrosServicios } from "@/components/secciones/FichaOtrosServicios";
import { Precios } from "@/components/secciones/Precios";
import { Preguntas } from "@/components/secciones/Preguntas";
import { Resenas } from "@/components/secciones/Resenas";
import { TrabajosServicio } from "@/components/secciones/TrabajosServicio";
import { mensajeServicio } from "@/lib/mensajes";
import { fotosRestantes, otrosServicios, tituloFicha, trabajosDelServicio } from "@/lib/servicios";

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
 * Ficha de servicio (encargo §5): migas + h1 «{titulo} en {ciudad}» → foto o icono, pastilla de `precioDesde`,
 * llamada-luz y WhatsApp del servicio → `contenido` (o `descripcion`) y «Qué incluye» → tablero de tarifas
 * (solo con `tarifas`) → resto de fotos → trabajos de este servicio → preguntas del servicio → reseñas →
 * CTA (con el mensaje del servicio) → otros servicios. Cada bloque sale solo con datos.
 */
export default async function Page({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const servicio = config.servicios.find((s) => s.slug === slug);
  if (!servicio) notFound();

  const { contacto } = config;
  const trabajos = trabajosDelServicio(config.trabajos, servicio);

  return (
    <>
      <CabeceraInterior
        titulo={tituloFicha(servicio, contacto.direccion.ciudad)}
        migas={[{ href: "/", texto: "Inicio" }, { href: "/servicios", texto: "Servicios" }, { texto: servicio.titulo }]}
      />
      <div className="contenedor">
        <FichaCabecera servicio={servicio} contacto={contacto} />
        <FichaContenido servicio={servicio} />
        <Precios
          tarifas={config.tarifas}
          servicios={config.servicios}
          garantias={config.garantias}
          contacto={contacto}
          solo="tablero"
          className="pt-11 lg:pt-16"
        />
        <FichaFotos imagenes={fotosRestantes(servicio)} titulo={servicio.titulo} />
        <TrabajosServicio trabajos={trabajos} />
        <Preguntas preguntas={servicio.preguntas} />
        {config.resenas.length > 0 && (
          <Resenas resenas={config.resenas} valoracion={config.valoracion} fichaGoogle={contacto.fichaGoogle} />
        )}
      </div>
      <CtaFinal contacto={contacto} mensaje={mensajeServicio(servicio)} />
      <div className="contenedor">
        <FichaOtrosServicios servicios={otrosServicios(config.servicios, servicio)} />
      </div>
    </>
  );
}
