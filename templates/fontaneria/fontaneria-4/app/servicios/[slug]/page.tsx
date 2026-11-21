import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  buscarServicio,
  metadatosServicio,
  minusculaInicial,
  otrosServicios,
  parametrosServicios,
  precioDesde,
  trabajosDelServicio,
} from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { Preguntas } from "@/components/base/Preguntas";
import { CasillaMarcada } from "@/components/Iconos";
import { Marco } from "@/components/Marco";
import { Pareja } from "@/components/Pareja";
import { CabeceraParte } from "@/components/secciones/CabeceraParte";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Encabezado } from "@/components/secciones/Encabezado";
import { FichaTrabajo } from "@/components/secciones/FichaTrabajo";
import { dosCifras, lineaConfianza } from "@/lib/formato";
import { mensajeAvisoServicio } from "@/lib/mensajes";
import { datosMarco, numerar } from "@/lib/navegacion";
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
 * Parte de servicio (encargo §7): migas, casillas Ref. y precio, h1 con el título, entradilla y
 * botones con el mensaje del servicio; después, cada apartado como campo numerado: descripción
 * (`contenido` a 68 caracteres), qué incluye (casillas marcadas), fotos (polaroids), trabajos del
 * servicio, dudas y servicios relacionados. Cada bloque vacío se oculta.
 */
export default async function Page({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const servicio = buscarServicio(config, slug);
  if (!servicio) notFound();

  const { servicios } = config;
  const ref = dosCifras(servicios.findIndex((s) => s.slug === servicio.slug) + 1);
  const trabajos = trabajosDelServicio(config.trabajos, servicio);
  const relacionados = otrosServicios(servicios, servicio).slice(0, 3);
  const mensaje = mensajeAvisoServicio(servicio);
  const textoWa = `Pide presupuesto de ${minusculaInicial(servicio.titulo)} por WhatsApp`;
  const precio = servicio.precioDesde ? precioDesde(servicio.precioDesde) : undefined;

  const campos = numerar([
    servicio.contenido.length > 0 && { id: "descripcion", texto: "Descripción" },
    servicio.incluye.length > 0 && { id: "incluye", texto: "Qué incluye" },
    servicio.imagenes.length > 0 && { id: "fotos", texto: "Fotos" },
    trabajos.length > 0 && { id: "trabajos-servicio", texto: "Trabajos" },
    servicio.preguntas.length > 0 && { id: "dudas-servicio", texto: "Dudas" },
    relacionados.length > 0 && { id: "relacionados", texto: "Relacionados" },
    { id: "abrir-aviso", texto: "Abrir aviso" },
  ]);
  const n = (id: string) => campos.find((c) => c.id === id)?.n ?? "";

  return (
    <Marco {...datosMarco(config)} ficha pagina="servicios" campos={campos}>
      <CabeceraParte
        tipo="Parte de servicio"
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/servicios", texto: "Servicios" },
          { href: `/servicios/${servicio.slug}`, texto: servicio.titulo },
        ]}
        casillas={[
          { rotulo: "Ref.", valor: ref },
          ...(precio ? [{ rotulo: precio.desde ? "Desde" : "Precio", valor: precio.importe }] : []),
        ]}
        titulo={servicio.titulo}
        entradilla={servicio.descripcion}
      >
        <Pareja contacto={config.contacto} mensaje={mensaje} textoWhatsapp={textoWa} confianza={lineaConfianza(config)} className="mt-5" />
      </CabeceraParte>

      <div className="flex flex-col gap-(--sec) px-(--pad) pt-(--sec)">
        {servicio.contenido.length > 0 && (
          <section id="descripcion" aria-labelledby="h2-descripcion">
            <Encabezado n={n("descripcion")} rotulo="Descripción del trabajo" />
            <h2 id="h2-descripcion" className="sr-only">
              Descripción del trabajo
            </h2>
            <div className="texto-editorial flex flex-col gap-[1.1em]">
              {servicio.contenido.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>
        )}

        {servicio.incluye.length > 0 && (
          <section id="incluye" aria-labelledby="h2-incluye">
            <Encabezado n={n("incluye")} rotulo="Material y mano de obra" titulo="Qué incluye" id="h2-incluye" />
            <ul className="casillas max-w-[720px]">
              {servicio.incluye.map((x) => (
                <li key={x} className="casilla flex flex-[1_1_260px] items-start gap-2.5 p-3 leading-snug">
                  <CasillaMarcada />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
            <Pareja contacto={config.contacto} mensaje={mensaje} textoWhatsapp={textoWa} confianza={lineaConfianza(config)} className="mt-6" />
          </section>
        )}

        {servicio.imagenes.length > 0 && (
          <section id="fotos" aria-labelledby="h2-fotos">
            <Encabezado n={n("fotos")} rotulo="Fotos del aviso" titulo="Fotos" id="h2-fotos" />
            <div className="flex flex-wrap gap-6">
              {servicio.imagenes.map((img, i) => (
                <div key={img.src} className={`w-[220px] ${i % 2 ? "giro-der" : "giro-izq"}`}>
                  <Foto imagen={img} sizes="220px" />
                </div>
              ))}
            </div>
          </section>
        )}

        {trabajos.length > 0 && (
          <section id="trabajos-servicio" aria-labelledby="h2-trabajos-servicio">
            <Encabezado n={n("trabajos-servicio")} rotulo="Partes archivados" titulo="Trabajos de este servicio" id="h2-trabajos-servicio" />
            {trabajos.map((t) => (
              <FichaTrabajo key={t.slug} trabajo={t} indice={config.trabajos.indexOf(t)} nivel="h3" />
            ))}
          </section>
        )}

        {servicio.preguntas.length > 0 && (
          <section id="dudas-servicio" aria-labelledby="h2-dudas-servicio">
            <Encabezado n={n("dudas-servicio")} rotulo="Dudas" />
            <h2 id="h2-dudas-servicio" className="h2-parte mb-4">
              Dudas frecuentes
            </h2>
            <Preguntas preguntas={servicio.preguntas} grupo="dudas-servicio" />
          </section>
        )}

        {relacionados.length > 0 && (
          <section id="relacionados" aria-labelledby="h2-relacionados">
            <Encabezado n={n("relacionados")} rotulo="Otros partes" titulo="Servicios relacionados" id="h2-relacionados" />
            <div className="casillas">
              {relacionados.map((r) => (
                <Link
                  key={r.slug}
                  href={`/servicios/${r.slug}`}
                  className="casilla flex min-h-16 flex-[1_1_200px] flex-col justify-center gap-0.5 px-3 py-2.5 no-underline"
                >
                  <span className="rotulo-sm">Ref. {dosCifras(servicios.indexOf(r) + 1)}</span>
                  <span className="font-titulo text-sm leading-snug font-semibold">{r.titulo} →</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <CtaFinal contacto={config.contacto} confianza={lineaConfianza(config)} mensaje={mensaje} textoWhatsapp={textoWa} />
    </Marco>
  );
}
