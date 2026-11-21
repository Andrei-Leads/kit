import type { Metadata } from "next";
import { direccionLinea, iniciales, metadatosPagina, urlComoLlegar } from "@andrei-leads/core";

import config from "@/site.config";
import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { BandaCabecera, H1_INTERIOR, H2 } from "@/components/secciones/BandaCabecera";
import { CifrasContador } from "@/components/secciones/CifrasContador";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { ZonasRed } from "@/components/secciones/ZonasRed";
import { anioActual } from "@/lib/anio";
import { aniosOficio } from "@/lib/formato";
import { mensajeInicio } from "@/lib/mensajes";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/empresa", titulo: "Empresa" });

/**
 * /empresa «Desde dónde salimos»: dirección del taller, historia, fotos en duotono, equipo (foto o
 * iniciales en caja primario), contadores, acreditaciones, garantías y marcas. Cada bloque vacío se
 * oculta; con todo vacío queda la descripción, la red de zonas y el CTA.
 */
export default async function Empresa() {
  const { negocio, contacto, empresa, zonas } = config;
  const anio = await anioActual();
  const hayHistoria = empresa.historia.length > 0;
  return (
    <>
      <BandaCabecera>
        <Migas migas={[{ href: "/", texto: "Inicio" }, { href: "/empresa", texto: "Empresa" }]} className="text-texto [&_a]:underline" />
        <h1 className={`${H1_INTERIOR} mt-3`}>Desde dónde salimos</h1>
        <p className="mt-3 mb-0 max-w-[52ch] text-[clamp(1rem,0.9rem+0.4vw,1.1875rem)]">{negocio.descripcionCorta}</p>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
          <address className="flex items-center gap-2.5 font-titulo text-lg font-semibold not-italic">
            <span aria-hidden="true" className="box-border size-[22px] flex-none border-4 border-tinta bg-primario" />
            {direccionLinea(contacto.direccion)}
          </address>
          <a
            href={urlComoLlegar(contacto)}
            className="inline-flex min-h-12 items-center border-2 border-tinta px-[18px] font-titulo text-base font-semibold text-texto no-underline hover:bg-primario-suave"
          >
            Cómo llegar <span aria-hidden="true">&nbsp;→</span>
          </a>
        </div>
      </BandaCabecera>

      {(hayHistoria || empresa.imagenes.length > 0) && (
        <section className="contenedor flex flex-wrap gap-x-16 gap-y-8 pt-9 pb-2 lg:pt-16">
          {hayHistoria && (
            <div className="max-w-[68ch] min-w-0 flex-[1_1_480px]">
              <h2 className={`${H2} mb-3`}>Quiénes somos</h2>
              {empresa.historia.map((p, i) => (
                <p key={i} className="mt-0 mb-3.5">
                  {p}
                </p>
              ))}
            </div>
          )}
          {empresa.imagenes.length > 0 && (
            <div className="grid min-w-0 flex-[1_1_420px] grid-cols-2 gap-2.5">
              {empresa.imagenes.map((f, i) => {
                const ancha = i === 0 && empresa.imagenes.length % 2 === 1;
                return (
                <div key={f.src} className={ancha ? "corte col-span-2" : "corte"}>
                  <Foto imagen={f} proporcion="3/2" preload={i === 0} sizes={ancha ? "(min-width: 1024px) 800px, 100vw" : "(min-width: 1024px) 400px, 50vw"} />
                </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {empresa.equipo.length > 0 && (
        <section className="contenedor pt-10 pb-2">
          <h2 className={`${H2} mb-4`}>El equipo</h2>
          <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3 lg:grid-cols-4">
            {empresa.equipo.map((m) => (
              <li key={m.nombre}>
                <div className="corte">
                  {m.foto ? (
                    <Foto imagen={m.foto} proporcion="1/1" sizes="(min-width: 1024px) 300px, 50vw" />
                  ) : (
                    <div aria-hidden="true" className="grid aspect-square place-items-center bg-primario font-titulo text-5xl font-bold text-sobre-primario">
                      {iniciales(m.nombre)}
                    </div>
                  )}
                </div>
                <p className="mt-2 mb-0 font-titulo text-lg leading-tight font-semibold">{m.nombre}</p>
                {m.cargo && <p className="m-0 text-[15px] text-texto-suave">{m.cargo}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-10">
        <CifrasContador
          anios={aniosOficio(negocio.anioFundacion, anio)}
          valoracion={config.valoracion}
          municipios={zonas.length}
          tiempoLlegada={contacto.tiempoLlegada}
          urgencias24h={contacto.urgencias24h}
          acreditaciones={config.acreditaciones}
          garantias={config.garantias}
        />
      </div>

      {config.marcas.length > 0 && (
        <section className="contenedor pt-10 pb-2">
          <h2 className={`${H2} mb-3`}>Marcas con las que trabajamos</h2>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
            {config.marcas.map((m) => (
              <li key={m} className="border-2 border-tinta px-3.5 py-1.5 font-titulo text-base font-semibold">
                {m}
              </li>
            ))}
          </ul>
        </section>
      )}

      <ZonasRed ciudad={contacto.direccion.ciudad} zonas={zonas} tiempoLlegada={contacto.tiempoLlegada} intro id="zonas" />
      <CtaFinal contacto={contacto} mensaje={mensajeInicio(contacto)} textoWhatsapp="Escribir por WhatsApp" />
    </>
  );
}
