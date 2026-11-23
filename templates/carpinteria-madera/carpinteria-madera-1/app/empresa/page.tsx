import type { Metadata } from "next";
import { etiquetaOrigen, listaY, metadatosPagina } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { Filete } from "@/components/TituloSeccion";
import { Foto } from "@/components/base/Foto";
import { anioActual } from "@/lib/anio";
import { mensajeInicio } from "@/lib/mensajes";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/empresa", titulo: "El taller" });

const LISTA = "mt-5 border-t border-filete";

/**
 * /empresa, «Taller» en el menú (encargo §7): titular gigante, años desde `anioFundacion` en
 * cursiva grande junto a la `historia`, fotos del taller a sangre, equipo como lista de nombres y
 * cargos (con foto solo si existe; nunca un hueco de retrato), garantías, marcas y acreditaciones.
 * Sin historia, la `descripcionCorta`. Al final, las zonas y la pareja. Cada bloque vacío se oculta.
 */
export default async function Page() {
  const { negocio, contacto, empresa, garantias, marcas, acreditaciones, zonas } = config;
  const cta = { telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje: mensajeInicio(contacto) };
  const anios = negocio.anioFundacion ? (await anioActual()) - negocio.anioFundacion : 0;
  const conDatos = garantias.length > 0 || marcas.length > 0 || acreditaciones.length > 0;
  return (
    <div data-pagina="empresa">
      <section className="marco pt-[clamp(56px,8vw,128px)]">
        <h1 className="titulo-display">
          Nuestro <em>taller</em>
        </h1>
        <Filete className="my-8" />
        {empresa.historia.length > 0 ? (
          <div className="flex flex-wrap items-start gap-x-[clamp(32px,6vw,96px)] gap-y-8">
            {anios > 0 && (
              <div className="flex-none">
                <p className="font-titulo text-[clamp(5rem,3rem+7vw,10rem)] leading-[0.9] text-primario-texto italic">{anios}</p>
                <p className="mt-2 text-texto-suave">
                  {anios === 1 ? "año" : "años"} desde {negocio.anioFundacion}
                </p>
              </div>
            )}
            <div className="max-w-[60ch] flex-[1_1_340px]">
              {empresa.historia.map((p) => (
                <p key={p} className="mb-4 text-entrada">
                  {p}
                </p>
              ))}
            </div>
          </div>
        ) : (
          <p className="max-w-[60ch] text-entrada">{negocio.descripcionCorta}</p>
        )}
      </section>
      {empresa.imagenes.length > 0 && (
        <section aria-label="Fotos del taller" className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-1 pt-[clamp(56px,8vw,120px)]">
          {empresa.imagenes.map((f) => (
            <Foto key={f.src} imagen={f} sizes="(min-width: 860px) 50vw, 100vw" proporcion="4/5" />
          ))}
        </section>
      )}
      {(empresa.equipo.length > 0 || conDatos) && (
        <section aria-label="Equipo y garantías" className="marco grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-12 pt-[clamp(56px,8vw,120px)]">
          {empresa.equipo.length > 0 && (
            <div>
              <h2 className="titulo-h2">Quiénes somos</h2>
              <ul className={LISTA}>
                {empresa.equipo.map((e) => (
                  <li key={e.nombre} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-filete py-4">
                    <span className="flex items-center gap-4">
                      {e.foto && <Foto imagen={e.foto} sizes="64px" proporcion="1/1" posicionEtiqueta="ninguna" className="size-16 flex-none" />}
                      <span className="font-titulo text-2xl leading-[1.2]">{e.nombre}</span>
                    </span>
                    {(e.cargo || (e.foto && etiquetaOrigen(e.foto))) && (
                      <span className="text-texto-suave italic">
                        {e.cargo}
                        {e.foto && etiquetaOrigen(e.foto) && <span className="block text-xs not-italic">{etiquetaOrigen(e.foto)}</span>}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {conDatos && (
            <div>
              {garantias.length > 0 && (
                <>
                  <h2 className="titulo-h2">Nuestras garantías</h2>
                  <ul className={LISTA}>
                    {garantias.map((g) => (
                      <li key={g} className="border-b border-filete py-4">
                        {g}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {acreditaciones.length > 0 && (
                <ul className={garantias.length > 0 ? "" : LISTA}>
                  {acreditaciones.map((a) => (
                    <li key={a.nombre} className="border-b border-filete py-4">
                      {a.nombre}
                      {a.numero && <span className="text-texto-suave"> · {a.numero}</span>}
                    </li>
                  ))}
                </ul>
              )}
              {marcas.length > 0 && <p className="mt-4 text-texto-suave">Trabajamos con {listaY(marcas)}.</p>}
            </div>
          )}
        </section>
      )}
      <section aria-label="Contacto" className="marco grid gap-6 py-[clamp(56px,8vw,120px)]">
        {zonas.length > 0 && (
          <p className="max-w-[40ch] font-titulo text-[clamp(1.4rem,1.2rem+1vw,2rem)] leading-[1.3] text-texto-suave italic">
            Montamos en {listaY(zonas)}.
          </p>
        )}
        <Pareja cta={cta} />
      </section>
    </div>
  );
}
