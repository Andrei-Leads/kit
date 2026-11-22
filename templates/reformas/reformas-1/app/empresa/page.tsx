import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { Foto } from "@/components/base/Foto";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { lineaAcreditaciones } from "@/components/secciones/Garantias";
import { Zonas } from "@/components/secciones/Zonas";
import { anioActual } from "@/lib/anio";
import { mensajeInicio } from "@/lib/mensajes";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/empresa", titulo: "Empresa" });

/**
 * /empresa (encargo §7, tablero Empresa): h1 con el año, `historia` en serif a dos columnas,
 * `imagenes` en par 3:2 → sobre `alterna`, los años, el equipo (nombre y cargo entre filetes),
 * las garantías, las acreditaciones y las marcas. Con todo vacío: la descripción, las zonas y el CTA.
 */
export default async function Page() {
  const { negocio, empresa, contacto, garantias, acreditaciones, marcas } = config;
  const anio = await anioActual();
  const anios = negocio.anioFundacion ? anio - negocio.anioFundacion : 0;
  const historia = empresa.historia.length > 0 ? empresa.historia : [negocio.descripcionCorta];
  const hayFicha = anios > 0 || empresa.equipo.length > 0 || garantias.length > 0 || acreditaciones.length > 0 || marcas.length > 0;
  const sinNada = empresa.historia.length === 0 && empresa.imagenes.length === 0 && !hayFicha;

  return (
    <>
      <span data-pagina="empresa" hidden />
      <section className="contenedor pt-[clamp(32px,5vw,72px)] pb-[clamp(40px,6vw,88px)]">
        <p className="versalitas mb-3.5">Empresa</p>
        <h1 className="titulo-display">
          {negocio.anioFundacion ? (
            <>
              Reformamos casas <em className="text-primario-texto">desde {negocio.anioFundacion}</em>.
            </>
          ) : (
            <>
              Reformamos casas en <em className="text-primario-texto">{contacto.direccion.ciudad}</em>.
            </>
          )}
        </h1>
        <div className="mt-[clamp(32px,5vw,64px)] grid gap-[clamp(24px,4vw,64px)] lg:grid-cols-2">
          {historia.map((p) => (
            <p key={p} className="font-titulo text-lectura">
              {p}
            </p>
          ))}
        </div>
        {empresa.imagenes.length > 0 && (
          <ul className="mt-[clamp(32px,5vw,64px)] grid grid-cols-1 gap-3 sm:grid-cols-2">
            {empresa.imagenes.map((f, i) => (
              <li key={f.src}>
                {/* La primera es el LCP de /empresa en escritorio. */}
                <Foto imagen={f} sizes="(min-width: 1280px) 570px, (min-width: 640px) 50vw, 100vw" proporcion="3/2" preload={i === 0} />
              </li>
            ))}
          </ul>
        )}
      </section>

      {hayFicha && (
        <section aria-label="Quiénes somos" className="border-t border-filete bg-alterna">
          <div className="contenedor grid items-start gap-[clamp(24px,4vw,72px)] py-[clamp(40px,6vw,88px)] lg:grid-cols-[5fr_7fr]">
            <div>
              {anios > 0 && (
                <>
                  <h2 className="versalitas mb-3.5">Años de oficio</h2>
                  <p className="titulo-display text-acento italic">{anios} años</p>
                </>
              )}
            </div>
            <div>
              {empresa.equipo.length > 0 && (
                <>
                  <h2 className="versalitas mb-3">Equipo</h2>
                  <ul className="mb-8 border-b border-filete">
                    {empresa.equipo.map((p) => (
                      <li key={p.nombre} className="flex justify-between gap-4 border-t border-filete py-3.5">
                        <span className="font-titulo text-xl">{p.nombre}</span>
                        {p.cargo && <span className="text-right text-[15px] text-texto-suave">{p.cargo}</span>}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {garantias.length > 0 && (
                <>
                  <h2 className="versalitas mb-3">Garantías</h2>
                  <ul className="mb-7 border-b border-filete">
                    {garantias.map((g) => (
                      <li key={g} className="border-t border-filete py-3">
                        {g}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {acreditaciones.length > 0 && <p className="versalitas mb-1.5">{lineaAcreditaciones(acreditaciones)}</p>}
              {marcas.length > 0 && <p className="versalitas">Trabajamos con {marcas.join(" · ")}</p>}
            </div>
          </div>
        </section>
      )}

      {sinNada && <Zonas zonas={config.zonas} />}

      <CtaFinal
        compacto
        cta={{ telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje: mensajeInicio(contacto) }}
        titulo={
          <>
            ¿Hablamos de tu <em>reforma</em>?
          </>
        }
      />
    </>
  );
}
