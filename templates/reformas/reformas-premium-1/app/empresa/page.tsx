import type { Metadata } from "next";
import { iniciales, metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { Foto } from "@/components/base/Foto";
import { Destacada, Pareja, Titular } from "@/components/Botones";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Garantias } from "@/components/secciones/Garantias";
import { HeroInterior } from "@/components/secciones/HeroInterior";
import { Cifras, cifras } from "@/components/secciones/Lema";
import { ZonasPreguntas } from "@/components/secciones/ZonasPreguntas";
import { mensajeInicio } from "@/lib/mensajes";
import { datosCta, lineaConfianza } from "@/lib/textos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/empresa", titulo: "Estudio" });

/**
 * /empresa («Estudio», encargo §7): hero «Quiénes *somos*» con `empresa.imagenes[0]` y
 * `[2]`; historia en 440 px; banda 4:1 con `empresa.imagenes[1]`; equipo entre filetes
 * (sin foto real, la inicial en cursiva sobre alterna: nunca una cara de IA); cifras,
 * garantías, acreditaciones y marcas. Con todo vacío: descripción, zonas y CTA.
 */
export default function Page() {
  const { negocio, contacto, empresa } = config;
  const datos = datosCta(contacto, mensajeInicio(contacto));
  const [grande, banda, mini] = empresa.imagenes;
  const lista = cifras(config);
  const vacia = empresa.historia.length === 0 && empresa.equipo.length === 0;
  return (
    <>
      <HeroInterior
        pagina="empresa"
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/empresa", texto: "Estudio" },
        ]}
        etiqueta={negocio.anioFundacion ? `Estudio · Desde ${negocio.anioFundacion}` : "Estudio"}
        titulo={
          <>
            Quiénes <Destacada>somos</Destacada>
          </>
        }
        frase={negocio.descripcionCorta}
        grande={grande}
        mini={mini}
      >
        <Pareja datos={datos} fondo="claro" className="max-w-[620px]" />
      </HeroInterior>

      {empresa.historia.length > 0 && (
        <section data-tono="claro" aria-labelledby="titulo-historia" className="seccion bg-fondo pt-0">
          <div className="contenedor grid gap-x-16 gap-y-8 border-t border-borde pt-[clamp(56px,5vw,96px)] lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Titular id="titulo-historia" antes="Nuestra" destacada="historia" />
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              {empresa.historia.map((p, i) => (
                <p key={i} className="m-0 mb-5 max-w-[440px] first:text-entradilla">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      {banda && (
        <div data-tono="claro" className="contenedor">
          <Foto imagen={banda} sizes="(min-width: 1280px) 1120px, 100vw" proporcion="4/1" paralaje />
        </div>
      )}

      {empresa.equipo.length > 0 && (
        <section data-tono="claro" aria-labelledby="titulo-equipo" className="seccion bg-fondo">
          <div className="contenedor grid gap-x-16 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Titular id="titulo-equipo" antes="Quién lleva" destacada="tu obra" />
            </div>
            <ul className="m-0 list-none border-t border-borde p-0 lg:col-span-7">
              {empresa.equipo.map((p, i) => (
                <li key={p.nombre} data-aparecer style={{ "--i": i } as React.CSSProperties} className="flex items-center gap-6 border-b border-borde py-5">
                  {p.foto ? (
                    <Foto imagen={p.foto} sizes="88px" proporcion="4/5" etiqueta="mini" className="w-[88px] shrink-0" />
                  ) : (
                    <span aria-hidden="true" className="grid size-[88px] shrink-0 place-items-center rounded-foto bg-alterna font-destacada text-[44px] leading-none text-primario-texto italic">
                      {iniciales(p.nombre).slice(0, 1)}
                    </span>
                  )}
                  <span>
                    <span className="block text-h3">{p.nombre}</span>
                    {p.cargo && <span className="mt-1 block text-texto-suave">{p.cargo}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {lista.length > 0 && (
        <section data-tono="claro" aria-label="Cifras" className="bg-fondo pb-[clamp(56px,5vw,96px)]">
          <div className="contenedor">
            <Cifras lista={lista} />
          </div>
        </section>
      )}

      <Garantias garantias={config.garantias} acreditaciones={config.acreditaciones} marcas={config.marcas} />
      {vacia && <ZonasPreguntas zonas={config.zonas} preguntas={[]} />}
      <CtaFinal datos={datos} confianza={lineaConfianza(config, "horario")} />
    </>
  );
}
