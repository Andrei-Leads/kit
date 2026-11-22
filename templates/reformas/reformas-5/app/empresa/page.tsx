import type { Metadata } from "next";
import { iniciales, metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { ArcoTesela } from "@/components/secciones/ArcoTesela";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Garantias } from "@/components/secciones/Garantias";
import { anioActual } from "@/lib/anio";
import { datosCta } from "@/lib/cta";
import { mensajeInicio } from "@/lib/mensajes";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/empresa", titulo: "Empresa" });

/** /empresa: historia, años, foto en arco, equipo (foto solo si es real; si no, arco con la inicial), garantías y marcas. */
export default async function Page() {
  const { empresa, negocio, marcas } = config;
  const anio = await anioActual();
  const [foto, ...fotos] = empresa.imagenes;
  return (
    <>
      <span data-pagina="empresa" hidden />
      <section aria-labelledby="titulo-empresa" className="contenedor grid items-center gap-x-16 gap-y-10 pt-[clamp(1.25rem,4vw,4rem)] lg:grid-cols-2">
        <div>
          <Migas
            migas={[
              { href: "/", texto: "Inicio" },
              { href: "/empresa", texto: "Empresa" },
            ]}
            className="mb-2"
          />
          <h1 id="titulo-empresa" className="titulo-display mb-6">
            Quiénes somos
          </h1>
          {empresa.historia.length > 0 ? (
            empresa.historia.map((p) => (
              <p key={p} className="m-0 mb-[18px] max-w-[56ch]">
                {p}
              </p>
            ))
          ) : (
            <p className="m-0 mb-[18px] max-w-[56ch]">{negocio.descripcionCorta}</p>
          )}
          {negocio.anioFundacion && (
            <div className="mt-3 flex flex-wrap gap-x-10 gap-y-3">
              <p className="m-0">
                <span className="remate block text-[clamp(2rem,1.5rem+2vw,3rem)] leading-[1.1] text-acento">{negocio.anioFundacion}</span>
                <span className="text-[15px] text-texto-suave">año de fundación</span>
              </p>
              {anio - negocio.anioFundacion > 1 && (
                <p className="m-0">
                  <span className="remate block text-[clamp(2rem,1.5rem+2vw,3rem)] leading-[1.1] text-acento">{anio - negocio.anioFundacion}</span>
                  <span className="text-[15px] text-texto-suave">años reformando casas</span>
                </p>
              )}
            </div>
          )}
        </div>
        <div className="w-full lg:max-w-[460px] lg:justify-self-end">
          {foto ? <Foto imagen={foto} sizes="(min-width: 1024px) 460px, 100vw" arco preload /> : <ArcoTesela />}
        </div>
      </section>

      {fotos.length > 0 && (
        <section aria-label="Fotos" className="contenedor pt-[clamp(3.5rem,2.5rem+5vw,6rem)]">
          <ul className="m-0 grid list-none grid-cols-2 gap-x-6 gap-y-4 p-0 lg:grid-cols-4">
            {fotos.map((f) => (
              <li key={f.src}>
                <Foto imagen={f} sizes="(min-width: 1024px) 25vw, 50vw" arco calidad={60} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {empresa.equipo.length > 0 && (
        <section aria-labelledby="titulo-equipo" className="seccion">
          <div className="contenedor">
            <h2 id="titulo-equipo" className="titulo-seccion mb-8">
              Equipo
            </h2>
            <ul className="m-0 grid list-none gap-x-5 gap-y-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {empresa.equipo.map((e) => (
                <li key={e.nombre} className="flex items-center gap-[18px] rounded-tarjeta bg-superficie p-[18px]">
                  {e.foto ? (
                    <Foto imagen={e.foto} sizes="64px" proporcion="4/5" arco className="w-16 flex-none [--radius-foto:8px]" />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="remate grid h-20 w-16 flex-none place-items-center rounded-[32px_32px_8px_8px] bg-alterna pt-2 text-[28px] text-acento"
                    >
                      {iniciales(e.nombre).charAt(0)}
                    </span>
                  )}
                  <div>
                    <p className="m-0 text-lg font-semibold">{e.nombre}</p>
                    {e.cargo && <p className="m-0 text-[15px] text-texto-suave">{e.cargo}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Garantias garantias={config.garantias} acreditaciones={config.acreditaciones} />

      {marcas.length > 0 && (
        <section aria-labelledby="titulo-marcas" className="contenedor pt-[clamp(3.5rem,2.5rem+5vw,6rem)]">
          <h2 id="titulo-marcas" className="remate m-0 mb-5 text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] leading-[1.15]">
            Marcas con las que trabajamos
          </h2>
          <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0">
            {marcas.map((m) => (
              <li key={m} className="rounded-full border border-borde bg-superficie px-5 py-2.5 text-[17px] font-medium">
                {m}
              </li>
            ))}
          </ul>
        </section>
      )}

      <CtaFinal cta={datosCta(config.contacto, mensajeInicio(config.contacto))} />
    </>
  );
}
