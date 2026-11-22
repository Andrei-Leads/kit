import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buscarServicio, metadatosServicio, minusculaInicial, parametrosServicios, trabajosDelServicio } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { Preguntas } from "@/components/base/Preguntas";
import { Cronologia } from "@/components/Cronologia";
import { Entrada } from "@/components/Entrada";
import { Marco } from "@/components/Marco";
import { Pareja } from "@/components/Pareja";
import { Rotulo } from "@/components/Rotulo";
import { CabeceraPagina } from "@/components/secciones/CabeceraPagina";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { horarioLinea, pasosDiario, trabajosOrdenados } from "@/lib/formato";
import { mensajeObraServicio } from "@/lib/mensajes";
import { numerar, numeroDe } from "@/lib/navegacion";
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
 * Ficha de servicio (encargo §7): h1, «desde», la pareja y la cronología del proceso (los mismos pasos
 * que en el inicio); después «Qué hacemos» (`contenido` a 65 caracteres o la descripción), «Incluye»
 * con marcas de plano y la pareja, las fotos, las entradas del diario de este servicio, las preguntas y
 * el CTA. Pareja tres veces: cabecera, tras «Incluye» y final.
 */
export default async function Page({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const servicio = buscarServicio(config, slug);
  if (!servicio) notFound();

  const { contacto } = config;
  const ciudad = contacto.direccion.ciudad;
  const pasos = pasosDiario(config.proceso);
  const obras = trabajosDelServicio(trabajosOrdenados(config.trabajos), servicio);
  const mensaje = mensajeObraServicio(servicio);
  const textoWa = `Pide presupuesto de ${minusculaInicial(servicio.titulo)}`;
  const contenido = servicio.contenido.length > 0 ? servicio.contenido : [servicio.descripcion];

  const secciones = numerar([
    { id: "contenido", texto: "Qué hacemos" },
    servicio.incluye.length > 0 && { id: "incluye", texto: "Incluye" },
    servicio.imagenes.length > 0 && { id: "fotos", texto: "Fotos" },
    obras.length > 0 && { id: "obras", texto: "Obras" },
    servicio.preguntas.length > 0 && { id: "preguntas", texto: "Preguntas" },
  ]);
  const n = (id: string) => numeroDe(secciones, id);

  return (
    <Marco config={config} pagina="servicios" ficha secciones={secciones}>
      <CabeceraPagina
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/servicios", texto: "Servicios" },
          { href: `/servicios/${servicio.slug}`, texto: servicio.titulo },
        ]}
        cinta={`Servicio · ${ciudad}`}
        titulo={`${servicio.titulo} en ${ciudad}`}
        entradilla={servicio.descripcion}
        desde={servicio.precioDesde}
      >
        <Pareja contacto={contacto} mensaje={mensaje} textoWhatsapp={textoWa} className="mt-1" />
        <div className="mt-8 w-full">
          <Cronologia pasos={pasos} etiqueta="Pasos de la obra" />
        </div>
      </CabeceraPagina>

      <section id="contenido" aria-labelledby="h2-contenido" className="px-(--pad) py-(--sec)">
        <div className="max-w-[1040px]">
          <Rotulo n={n("contenido")}>Qué hacemos</Rotulo>
          <h2 id="h2-contenido" className="sr-only">
            Qué hacemos
          </h2>
          <div className="texto-editorial grid gap-5 text-texto">
            {contenido.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {servicio.incluye.length > 0 && (
        <section id="incluye" aria-labelledby="h2-incluye" className="border-t border-borde bg-alterna px-(--pad) py-(--sec)">
          <div className="max-w-[1040px]">
            <Rotulo n={n("incluye")}>Incluye</Rotulo>
            <h2 id="h2-incluye" className="h2-diario mb-8">
              Qué entra en la obra
            </h2>
            <ul className="mb-12 grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] border-t border-borde">
              {servicio.incluye.map((x) => (
                <li key={x} className="flex items-start gap-3.5 border-b border-borde py-4 pr-3 text-[17px] leading-[1.45]">
                  <span aria-hidden="true" className="rombo mt-1.5 size-2 flex-none" />
                  {x}
                </li>
              ))}
            </ul>
            <Pareja contacto={contacto} mensaje={mensaje} textoWhatsapp={textoWa} />
          </div>
        </section>
      )}

      {servicio.imagenes.length > 0 && (
        <section id="fotos" aria-label="Fotos" className="px-(--pad) py-(--sec)">
          <div className="grid max-w-[1040px] grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-4">
            {servicio.imagenes.map((img) => (
              <Foto key={img.src} imagen={img} sizes="(min-width: 1024px) 520px, calc(100vw - 40px)" />
            ))}
          </div>
        </section>
      )}

      {obras.length > 0 && (
        <section id="obras" aria-labelledby="h2-obras" className="border-t border-borde px-(--pad) py-(--sec)">
          <div className="max-w-[1040px]">
            <Rotulo n={n("obras")}>Obras</Rotulo>
            <h2 id="h2-obras" className="h2-diario mb-6">
              Entradas del diario de este servicio
            </h2>
            {obras.map((t, i) => (
              <Entrada key={t.slug} trabajo={t} indice={i} />
            ))}
          </div>
        </section>
      )}

      {servicio.preguntas.length > 0 && (
        <section id="preguntas" aria-labelledby="h2-preguntas" className="border-t border-borde bg-alterna px-(--pad) py-(--sec)">
          <div className="max-w-[820px]">
            <Rotulo n={n("preguntas")}>Preguntas</Rotulo>
            <h2 id="h2-preguntas" className="h2-diario mb-6">
              Preguntas sobre este servicio
            </h2>
            <Preguntas preguntas={servicio.preguntas} grupo="faq-servicio" />
          </div>
        </section>
      )}

      <CtaFinal
        contacto={contacto}
        primerPaso={pasos[0]?.titulo ?? ""}
        horario={horarioLinea(contacto.horario)}
        mensaje={mensaje}
        textoWhatsapp={textoWa}
      />
    </Marco>
  );
}
