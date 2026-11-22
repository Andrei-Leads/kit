import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  buscarServicio,
  metadatosServicio,
  otrosServicios,
  parametrosServicios,
  precioDesde,
  trabajosDelServicio,
} from "@andrei-leads/core";

import config from "@/site.config";
import { AntesDespues } from "@/components/base/AntesDespues";
import { Foto } from "@/components/base/Foto";
import { Preguntas } from "@/components/base/Preguntas";
import { Destacada, Enlace, Pareja, ParejaCta, Titular } from "@/components/Botones";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { HeroInterior } from "@/components/secciones/HeroInterior";
import { TarjetaObra } from "@/components/secciones/TarjetaObra";
import { TarjetaServicio } from "@/components/secciones/TarjetaServicio";
import { mensajeDeServicio } from "@/lib/mensajes";
import { datosCta, lineaConfianza, num, pidePresupuesto } from "@/lib/textos";
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
 * Ficha de servicio (encargo §7, plantilla de «competencia»): hero con el «desde» y el
 * collage; «Qué *incluye*» numerado y pareja; `contenido` en bloques que alternan con el
 * resto de fotos; antes/después a sangre de una obra del servicio (módulo escenográfico);
 * preguntas; obras del servicio; otros servicios (nunca el actual) y CTA con su mensaje.
 */
export default async function Page({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const s = buscarServicio(config, slug);
  if (!s) notFound();

  const { contacto, trabajos, servicios } = config;
  const ciudad = contacto.direccion.ciudad;
  const datos = datosCta(contacto, mensajeDeServicio(s));
  const precio = s.precioDesde ? precioDesde(s.precioDesde) : undefined;
  const obras = trabajosDelServicio(trabajos, s);
  const conAntes = obras.find((t) => t.antes);
  const otros = otrosServicios(servicios, s);
  const fotosResto = s.imagenes.slice(2);

  return (
    <>
      <HeroInterior
        pagina="servicios"
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/servicios", texto: "Servicios" },
          { href: `/servicios/${s.slug}`, texto: s.titulo },
        ]}
        etiqueta={precio ? (precio.desde ? `Desde ${precio.importe}` : precio.importe) : "Servicio"}
        titulo={
          <>
            {s.titulo} en <Destacada>{ciudad}</Destacada>
          </>
        }
        frase={s.descripcion}
        grande={s.imagenes[0]}
        mini={s.imagenes[1]}
      >
        <Pareja datos={datos} fondo="claro" textoWa={pidePresupuesto(s.titulo)} textoLlamar="Llamar" className="max-w-[620px]" />
      </HeroInterior>

      {s.incluye.length > 0 && (
        <section data-tono="claro" aria-labelledby="titulo-incluye" className="seccion bg-superficie">
          <div className="contenedor">
            <Titular id="titulo-incluye" antes="Qué" destacada="incluye" />
            <ol className="m-0 mt-10 grid list-none gap-x-10 gap-y-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
              {s.incluye.map((x, i) => (
                <li key={x} data-aparecer style={{ "--i": i % 4 } as React.CSSProperties} className="border-t border-borde pt-5">
                  <span aria-hidden="true" className="block font-destacada text-[44px] leading-none text-acento italic">
                    {num(i + 1)}
                  </span>
                  <span className="mt-3 block text-[19px] leading-snug">{x}</span>
                </li>
              ))}
            </ol>
            <ParejaCta
              datos={datos}
              fondo="claro"
              textoWa={pidePresupuesto(s.titulo)}
              textoLlamar="Llamar"
              confianza={lineaConfianza(config)}
              className="mt-[clamp(48px,5vw,88px)]"
            />
          </div>
        </section>
      )}

      {s.contenido.length > 0 && (
        <section data-tono="claro" aria-labelledby="titulo-contenido" className="seccion bg-fondo">
          <div className="contenedor">
            <p className="etiqueta mb-4 text-texto-suave">{s.titulo}</p>
            <Titular id="titulo-contenido" antes="Cómo lo" destacada="hacemos" />
            <div className="mt-[clamp(40px,4vw,72px)] flex flex-col gap-[clamp(48px,5vw,96px)]">
              {s.contenido.map((p, i) => {
                const foto = fotosResto[i];
                return (
                  <div key={i} className={cn("grid items-center gap-x-16 gap-y-8", foto && "lg:grid-cols-2")}>
                    <div className={cn("max-w-[440px]", foto && i % 2 === 1 && "lg:order-2")}>
                      <p className="etiqueta text-texto-suave">
                        {num(i + 1)} / {num(s.contenido.length)}
                      </p>
                      <p className="m-0 mt-4 text-entradilla">{p}</p>
                    </div>
                    {foto && <Foto imagen={foto} sizes="(min-width: 1024px) 520px, 90vw" proporcion="4/5" paralaje className="lg:max-w-[440px]" />}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {conAntes?.antes && (
        <section data-tono="oscuro" aria-labelledby="titulo-antes" className="seccion bg-tinta text-fondo">
          <div className="contenedor">
            <Titular id="titulo-antes" antes="Antes y" destacada="después" />
            <p className="m-0 mt-4 text-texto-claro">{conAntes.titulo}</p>
          </div>
          <AntesDespues antes={conAntes.antes} despues={conAntes.imagenes[0]} sizes="100vw" className="mt-10" />
          <div className="contenedor mt-6">
            <Enlace href={`/trabajos/${conAntes.slug}`}>
              Ver la obra<span className="sr-only">: {conAntes.titulo}</span>
            </Enlace>
          </div>
        </section>
      )}

      {s.preguntas.length > 0 && (
        <section data-tono="claro" aria-labelledby="titulo-preguntas" className="seccion bg-fondo">
          <div className="contenedor grid gap-x-16 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Titular id="titulo-preguntas" antes="Lo que nos" destacada="preguntan" />
            </div>
            <Preguntas preguntas={s.preguntas} className="lg:col-span-7" />
          </div>
        </section>
      )}

      {obras.length > 0 && (
        <section data-tono="claro" aria-labelledby="titulo-obras" className="seccion bg-alterna">
          <div className="contenedor">
            <h2 id="titulo-obras" className="titulo-h2">
              Obras donde lo <Destacada>hicimos</Destacada>
            </h2>
            <div className="mt-10 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {obras.slice(0, 3).map((t, i) => (
                <TarjetaObra key={t.slug} trabajo={t} numero={trabajos.indexOf(t) + 1} i={i} sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 90vw" />
              ))}
            </div>
          </div>
        </section>
      )}

      {otros.length > 0 && (
        <section data-tono="claro" aria-labelledby="titulo-otros" className="seccion bg-fondo">
          <div className="contenedor">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <Titular id="titulo-otros" antes="Otros" destacada="servicios" />
              <Enlace href="/servicios">Todos los servicios</Enlace>
            </div>
            <div className="mt-10 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {otros.slice(0, 3).map((o, i) => (
                <TarjetaServicio key={o.slug} servicio={o} i={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaFinal datos={datos} textoWa={pidePresupuesto(s.titulo)} textoLlamar="Llamar" confianza={lineaConfianza(config, "horario")} />
    </>
  );
}
