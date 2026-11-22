import type { Metadata } from "next";
import { listaY, metadatosPagina } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { CotaDato } from "@/components/Cota";
import { Marco } from "@/components/Marco";
import { CabeceraInterior } from "@/components/secciones/CabeceraInterior";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { hayNotas, NotasDePlano, tituloNotas } from "@/components/secciones/NotasDePlano";
import { anioActual } from "@/lib/anio";
import { mensajeInicio } from "@/lib/mensajes";
import { lamina } from "@/lib/navegacion";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/empresa", titulo: "Empresa" });

/**
 * /empresa, «Memoria del taller» (encargo §7): cota con los años (solo con `anioFundacion`),
 * `historia`, `imagenes` como láminas, `equipo` en tabla (nombre · cargo), notas del plano y marcas.
 * Con todo vacío: la descripción, las zonas y el CTA.
 */
export default async function Page() {
  const { negocio, empresa, contacto, zonas } = config;
  const lam = lamina(config, "empresa");
  const anio = await anioActual();
  const anios = negocio.anioFundacion ? anio - negocio.anioFundacion : 0;
  const vacia = empresa.historia.length === 0 && empresa.imagenes.length === 0 && empresa.equipo.length === 0;

  return (
    <Marco actual="empresa" lamina={lam}>
      <CabeceraInterior
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/empresa", texto: "Empresa" },
        ]}
        lamina={`LÁMINA ${lam} · MEMORIA DEL TALLER`}
        titulo="Memoria del taller"
      >
        {negocio.anioFundacion && anios > 0 && (
          <CotaDato texto={`Desde ${negocio.anioFundacion} · ${anios} ${anios === 1 ? "año" : "años"}`} animada className="max-w-[360px]" />
        )}
      </CabeceraInterior>

      <section aria-label="El taller" className="gutter flex max-w-[calc(68ch+128px)] flex-col gap-5 pt-[clamp(32px,6vw,64px)]">
        {empresa.historia.map((p) => (
          <p key={p} className="text-(length:--text-entradilla) leading-[1.6] text-pretty">
            {p}
          </p>
        ))}
        {vacia && (
          <>
            <p className="text-(length:--text-entradilla) leading-[1.6] text-pretty">{negocio.descripcionCorta}</p>
            {zonas.length > 0 && <p className="text-texto-suave">Trabajamos en {listaY(zonas)}.</p>}
          </>
        )}
      </section>

      {empresa.imagenes.length > 0 && (
        <section aria-label="Láminas del taller" className="gutter pt-[clamp(40px,6vw,72px)]">
          <ul className="ancho grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-6">
            {empresa.imagenes.map((im, i) => (
              <li key={im.src}>
                <Foto imagen={im} sizes="(min-width: 1024px) 300px, calc(100vw - 40px)" proporcion="3/2" fig={i + 1} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {empresa.equipo.length > 0 && (
        <section aria-labelledby="titulo-equipo" className="gutter pt-[clamp(40px,6vw,72px)]">
          <h2 id="titulo-equipo" className="h2 mb-5">
            Equipo
          </h2>
          <table className="w-full max-w-[640px] border-collapse border border-texto bg-superficie">
            <thead>
              <tr>
                <th scope="col" className="etiqueta border-b border-texto px-3.5 py-2.5 text-left font-normal">
                  NOMBRE
                </th>
                <th scope="col" className="etiqueta border-b border-texto px-3.5 py-2.5 text-left font-normal">
                  CARGO
                </th>
              </tr>
            </thead>
            <tbody>
              {empresa.equipo.map((e) => (
                <tr key={e.nombre}>
                  <td className="border-b border-borde px-3.5 py-3 font-titulo text-[15px]">{e.nombre}</td>
                  <td className="border-b border-borde px-3.5 py-3 text-[15px] text-texto-suave">{e.cargo ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {hayNotas(config) && (
        <section aria-labelledby="titulo-notas" className="gutter pt-[clamp(40px,6vw,72px)]">
          <h2 id="titulo-notas" className="h2 mb-5">
            {tituloNotas(config)}
          </h2>
          <NotasDePlano garantias={config.garantias} acreditaciones={config.acreditaciones} marcas={config.marcas} />
        </section>
      )}

      <CtaFinal contacto={contacto} mensaje={mensajeInicio(contacto)} />
    </Marco>
  );
}
