import type { Metadata } from "next";
import { listaY, metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { Foto } from "@/components/base/Foto";
import { Compromisos } from "@/components/secciones/Compromisos";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { mensajeInicio, TEXTO_WA } from "@/lib/mensajes";
import { lineaTaller } from "@/lib/textos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/empresa", titulo: "El taller" });

/**
 * /empresa «El *taller*» (encargo §7): historia con capitular, fotos con `grayscale(.6)`
 * estático, equipo como lista de nombres y cargos (sin fotos), compromisos y CTA final. Con
 * todo vacío: descripción, zonas y CTA.
 */
export default function Page() {
  const c = config;
  const { historia, imagenes, equipo } = c.empresa;
  const cta = { telefono: c.contacto.telefono, whatsapp: c.contacto.whatsapp, mensaje: mensajeInicio(c.contacto) };
  const [primero, ...parrafos] = historia;
  return (
    <>
      <section aria-labelledby="titulo-pagina" className="contenedor pt-[clamp(40px,6vw,96px)]">
        <h1 id="titulo-pagina" className="titulo-display">
          El <em>taller</em>
        </h1>
        <p className="versalitas mt-4">{lineaTaller(c.negocio, c.contacto.direccion.ciudad)}</p>
        <div className="mx-auto mt-[clamp(48px,7vw,96px)] max-w-[64ch]">
          {primero ? (
            <>
              <p className="capitular m-0 font-titulo text-[21px] leading-[1.6]">{primero}</p>
              {parrafos.map((p) => (
                <p key={p} className="m-0 mt-5 text-texto-medio">
                  {p}
                </p>
              ))}
            </>
          ) : (
            <>
              <p className="m-0 font-titulo text-2xl leading-[1.5]">{c.negocio.descripcionCorta}</p>
              {c.zonas.length > 0 && <p className="m-0 mt-5 text-texto-suave">Trabajamos en {listaY(c.zonas)}.</p>}
            </>
          )}
        </div>
        {imagenes.length > 0 && (
          <div className="mt-[clamp(64px,9vw,128px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-[clamp(24px,4vw,64px)]">
            {imagenes.map((f) => (
              <Foto key={f.src} imagen={f} sizes="(min-width: 1024px) 45vw, 100vw" claseImagen="grayscale-[0.6]" />
            ))}
          </div>
        )}
        {equipo.length > 0 && (
          <section aria-labelledby="titulo-equipo" className="mt-(--seccion) flex flex-wrap gap-x-[clamp(40px,6vw,112px)] gap-y-8">
            <h2 id="titulo-equipo" className="titulo-h2 flex-[1_1_260px]">
              El <em>equipo</em>
            </h2>
            <ul className="m-0 flex-[2_1_480px] list-none border-t border-anodizado p-0">
              {equipo.map((p) => (
                <li key={p.nombre} className="flex flex-wrap items-baseline justify-between gap-4 border-b border-borde py-5">
                  <span className="font-titulo text-[28px] leading-[1.2]">{p.nombre}</span>
                  {p.cargo && <span className="versalitas">{p.cargo}</span>}
                </li>
              ))}
            </ul>
          </section>
        )}
      </section>
      <Compromisos garantias={c.garantias} acreditaciones={c.acreditaciones} marcas={c.marcas} />
      <CtaFinal cta={cta} textoWhatsapp={TEXTO_WA} />
    </>
  );
}
