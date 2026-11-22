import type { Metadata } from "next";
import { etiquetaOrigen, iniciales, metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { MarcaPagina } from "@/components/MarcaPagina";
import { Foto } from "@/components/base/Foto";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Garantias } from "@/components/secciones/Garantias";
import { HeroInterior } from "@/components/secciones/HeroInterior";
import { LemaCifras } from "@/components/secciones/LemaCifras";
import { Titular } from "@/components/secciones/Titular";
import { mensajeInicio } from "@/lib/mensajes";
import { datosCta, lineaConfianza, lineaHorario } from "@/lib/textos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/empresa", titulo: "Empresa" });

/**
 * /empresa (encargo §7): «Instaladores desde {año}» (sin año, «Quiénes somos»)
 * con las fotos de `empresa.imagenes`, historia, cifras, garantías, equipo en
 * filas y CTA final. Cada bloque vacío se oculta.
 */
export default function Page() {
  const { negocio, empresa, contacto } = config;
  const cta = datosCta(contacto, mensajeInicio(contacto));
  const [primero, ...resto] = empresa.historia;
  return (
    <>
      <MarcaPagina pagina="empresa" inicioClaro />
      <HeroInterior
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/empresa", texto: "Empresa" },
        ]}
        etiqueta="Empresa"
        titulo={
          negocio.anioFundacion ? (
            <>
              Instaladores <em>desde {negocio.anioFundacion}</em>
            </>
          ) : (
            <>
              Quiénes <em>somos</em>
            </>
          )
        }
        frase={negocio.descripcionCorta}
        cta={cta}
        confianza={lineaConfianza(config)}
        fotos={[empresa.imagenes[0], empresa.imagenes[1]]}
      />

      {primero && (
        <section data-tono="claro" aria-labelledby="titulo-historia" className="bg-fondo pb-20 lg:pb-32">
          <div className="contenedor grid gap-6 lg:grid-cols-[440px_minmax(0,520px)]">
            <h2 id="titulo-historia" className="etiqueta m-0 lg:pt-3">
              Historia
            </h2>
            <div className="flex flex-col gap-6">
              <p className="titulo m-0 text-[24px] leading-[1.3] lg:text-[30px]">{primero}</p>
              {resto.map((p) => (
                <p key={p} className="m-0 text-lg leading-relaxed text-texto-suave">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      {empresa.imagenes.length > 2 && (
        <section aria-label="Fotos de la empresa" className="bg-fondo pb-20 lg:pb-32">
          <ul className="contenedor m-0 grid list-none gap-6 sm:grid-cols-2 lg:gap-10">
            {empresa.imagenes.slice(2).map((f) => (
              <li key={f.src} data-aparecer>
                <Foto imagen={f} sizes="(min-width: 1024px) 540px, (min-width: 640px) 45vw, 100vw" proporcion="4/5" />
              </li>
            ))}
          </ul>
        </section>
      )}

      <LemaCifras config={config} conLema={false} />

      <Garantias
        garantias={config.garantias}
        acreditaciones={config.acreditaciones}
        marcas={config.marcas}
        lineas={[<>Todo <em key="e">por escrito</em></>]}
      />

      {empresa.equipo.length > 0 && (
        <section data-tono="claro" aria-labelledby="titulo-equipo" className="seccion bg-fondo">
          <div className="contenedor grid gap-10 lg:grid-cols-[440px_minmax(0,560px)]">
            <div className="flex flex-col gap-[18px]">
              <p className="etiqueta">Equipo</p>
              <Titular id="titulo-equipo" className="text-[40px] lg:text-[56px]" lineas={[<>Quién <em key="e">viene</em></>]} />
            </div>
            <ul className="m-0 list-none border-b border-borde p-0">
              {empresa.equipo.map((m) => (
                <li key={m.nombre} data-aparecer className="flex items-center gap-5 border-t border-borde py-5">
                  {m.foto ? (
                    <Foto imagen={m.foto} sizes="72px" proporcion="1/1" posicionEtiqueta="ninguna" className="w-[72px] flex-none" />
                  ) : (
                    <span aria-hidden="true" className="titulo flex size-[72px] flex-none items-center justify-center rounded-foto bg-tinta text-2xl text-white">
                      {iniciales(m.nombre)}
                    </span>
                  )}
                  <div className="flex flex-col gap-0.5">
                    <h3 className="m-0 text-lg font-normal">{m.nombre}</h3>
                    {m.cargo && <p className="m-0 text-sm text-texto-suave">{m.cargo}</p>}
                    {/* En 72 px no cabe la píldora: la etiqueta de origen va como texto. */}
                    {m.foto && etiquetaOrigen(m.foto) && <p className="m-0 text-xs text-texto-suave">Foto: {etiquetaOrigen(m.foto)}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaFinal cta={cta} lineas={[<>Conócenos en <em>tu obra</em>.</>]} confianza={lineaHorario(contacto.horario)} />
    </>
  );
}
