import type { Metadata } from "next";
import { iniciales, metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { Foto } from "@/components/base/Foto";
import { Confianza } from "@/components/secciones/Confianza";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Encabezado, H2 } from "@/components/secciones/Encabezado";
import { Zonas } from "@/components/secciones/Zonas";
import { mensajeInicio } from "@/lib/mensajes";
import { fichasConfianza } from "@/lib/textos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/empresa", titulo: "Quiénes somos" });

const BURBUJA = "m-0 max-w-[90%] self-start border border-linea bg-superficie px-[18px] py-3.5 leading-normal burbuja-entra";

/** /empresa (corta): descripción e historia en burbujas, equipo, «Con papeles», foto, zonas y CTA. */
export default function Page() {
  const { negocio, empresa, contacto } = config;
  const fichas = fichasConfianza(config, false);
  const [foto, ...fotos] = empresa.imagenes;
  return (
    <>
      <Encabezado migas={[{ href: "/", texto: "Inicio" }, { href: "/empresa", texto: "Empresa" }]} titulo="Quiénes somos" />
      <div className="contenedor flex flex-wrap items-start gap-x-[clamp(32px,6vw,88px)] gap-y-7 pt-6">
        <div className="flex max-w-[620px] min-w-0 flex-[1_1_340px] flex-col gap-2.5">
          <p className={BURBUJA}>{negocio.descripcionCorta}</p>
          {empresa.historia.map((p, i) => (
            <p key={i} className={BURBUJA}>
              {p}
            </p>
          ))}
          {empresa.equipo.length > 0 && (
            <>
              <h2 className={`${H2} mt-6 mb-1.5`}>El equipo</h2>
              <ul className="m-0 flex list-none flex-wrap gap-5 p-0">
                {empresa.equipo.map((e) => (
                  <li key={e.nombre} className="flex items-center gap-3">
                    {e.foto ? (
                      <Foto imagen={e.foto} proporcion="1/1" sizes="56px" decorativa className="size-14 flex-none rounded-full" />
                    ) : (
                      <span aria-hidden="true" className="grid size-14 flex-none place-items-center rounded-full bg-burbuja-sale text-[22px] font-black">
                        {iniciales(e.nombre)}
                      </span>
                    )}
                    <span>
                      <strong className="block text-lg font-black">{e.nombre}</strong>
                      {e.cargo && <span className="text-[15px] text-texto-suave">{e.cargo}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
          {fichas.length > 0 && (
            <>
              <h2 className={`${H2} mt-6 mb-1.5`}>Acreditaciones y garantías</h2>
              <Confianza fichas={fichas} etiqueta="Acreditaciones y garantías" />
            </>
          )}
          {config.marcas.length > 0 && (
            <>
              <h2 className={`${H2} mt-6 mb-1.5`}>Marcas con las que trabajamos</h2>
              <Confianza fichas={config.marcas} etiqueta="Marcas" />
            </>
          )}
        </div>
        {foto && (
          <div className="flex w-full min-w-0 flex-[0_1_320px] flex-col gap-4">
            <Foto imagen={foto} proporcion="3/4" sizes="320px" preload />
            {fotos.map((f) => (
              <Foto key={f.src} imagen={f} proporcion="3/4" sizes="320px" />
            ))}
          </div>
        )}
      </div>
      <Zonas zonas={config.zonas} />
      <CtaFinal contacto={contacto} mensaje={mensajeInicio(contacto)} />
    </>
  );
}
