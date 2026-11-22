import type { Metadata } from "next";
import { listaY, metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { Foto } from "@/components/base/Foto";
import { CabeceraPagina } from "@/components/CabeceraPagina";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { anioActual } from "@/lib/anio";
import { mensajeInicio } from "@/lib/mensajes";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/empresa", titulo: "Empresa" });

const SUBTITULO = "condensada m-0 mt-7 mb-2.5 text-[28px] leading-[0.95] first:mt-0";

/**
 * /empresa: historia (el primer párrafo grande, en Archivo a ancho 100: la
 * condensada no va en párrafos de más de dos líneas, entrega §0.2), años,
 * equipo en tabla, acreditaciones, garantías, marcas separadas por «/» y
 * fotos en blanco y negro. Con todo vacío: `descripcionCorta` y zonas.
 */
export default async function Page() {
  const { negocio, empresa, acreditaciones, garantias, marcas, zonas } = config;
  const anio = await anioActual();
  const anios = negocio.anioFundacion ? anio - negocio.anioFundacion : 0;
  const [primero, ...resto] = empresa.historia;
  const hayLateral = anios > 0 || empresa.equipo.length > 0 || acreditaciones.length > 0 || garantias.length > 0 || marcas.length > 0;
  return (
    <>
      <CabeceraPagina
        pagina="empresa"
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/empresa", texto: "Empresa" },
        ]}
        titulo="Empresa"
        entrada={primero ? <p>{negocio.descripcionCorta}</p> : undefined}
      />
      <section aria-label="Quiénes somos" className="contenedor pt-(--seccion)">
        <div className="grid gap-x-12 gap-y-8 border-t-2 border-borde pt-5 sm:grid-cols-2">
          <div>
            {primero ? (
              <>
                <p className="m-0 text-[clamp(1.25rem,1.05rem+0.9vw,1.75rem)] leading-[1.3] font-medium">{primero}</p>
                {resto.map((p) => (
                  <p key={p} className="m-0 mt-4 max-w-[62ch]">
                    {p}
                  </p>
                ))}
              </>
            ) : (
              <>
                <p className="m-0 text-[17px]">{negocio.descripcionCorta}</p>
                {zonas.length > 0 && <p className="m-0 mt-3 text-texto-suave">Trabajamos en {listaY(zonas)}.</p>}
              </>
            )}
          </div>
          {hayLateral && (
            <div>
              {anios > 0 && (
                <p className="m-0 flex flex-wrap items-baseline gap-3.5">
                  <span className="condensada text-[clamp(3rem,2rem+4vw,6rem)] leading-[0.85] tracking-[-0.01em]">{anios} años</span>
                  <span className="condensada text-xl text-texto-suave">Desde {negocio.anioFundacion}</span>
                </p>
              )}
              {empresa.equipo.length > 0 && (
                <>
                  <h2 className={SUBTITULO}>Equipo</h2>
                  <table className="w-full border-collapse border-t-2 border-borde">
                    <tbody>
                      {empresa.equipo.map((p) => (
                        <tr key={p.nombre}>
                          <th scope="row" className="condensada border-b-2 border-borde py-[11px] pr-3 text-left text-lg leading-none">
                            {p.nombre}
                          </th>
                          <td className="border-b-2 border-borde py-[11px] text-right text-[15px] text-texto-suave">{p.cargo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
              {acreditaciones.length > 0 && (
                <>
                  <h2 className={SUBTITULO}>Acreditaciones</h2>
                  <ul className="m-0 list-none border-t-2 border-borde p-0">
                    {acreditaciones.map((a) => (
                      <li key={a.nombre} className="border-b-2 border-borde py-[11px] text-[15px]">
                        {a.nombre}
                        {a.numero && ` · ${a.numero}`}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {garantias.length > 0 && (
                <>
                  <h2 className={SUBTITULO}>Garantías</h2>
                  <ul className="m-0 list-none border-t-2 border-borde p-0">
                    {garantias.map((g) => (
                      <li key={g} className="border-b-2 border-borde py-[11px] text-[15px]">
                        {g}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {marcas.length > 0 && (
                <>
                  <h2 className={SUBTITULO}>Marcas</h2>
                  <p className="condensada m-0 text-2xl leading-[1.1]">{marcas.join(" / ")}</p>
                </>
              )}
            </div>
          )}
        </div>
        {empresa.imagenes.length > 0 && (
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {empresa.imagenes.map((img) => (
              <figure key={img.src} className="m-0">
                <Foto imagen={img} sizes="(min-width: 640px) 50vw, 100vw" proporcion="3/2" archivo />
              </figure>
            ))}
          </div>
        )}
      </section>
      <CtaFinal contacto={config.contacto} mensaje={mensajeInicio(config.contacto)} />
    </>
  );
}
