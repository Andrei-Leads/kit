import type { Metadata } from "next";
import { iniciales, metadatosPagina } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { Marco } from "@/components/Marco";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Zonas } from "@/components/secciones/Zonas";
import { anioActual } from "@/lib/anio";
import { acreditacionLinea, aniosOficio } from "@/lib/formato";
import { mensajeCuadro } from "@/lib/mensajes";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/empresa", titulo: "Quiénes somos" });

/**
 * /empresa (encargo §7, corta): la placa de características en grande (nombre, razón social,
 * años, habilitaciones y garantías), historia (o la descripción corta), fotos 3:2, equipo, marcas,
 * zonas y CTA. Con todo vacío: placa con el nombre, descripción, zonas y CTA.
 */
export default async function Page() {
  const { negocio, contacto, acreditaciones, garantias, empresa, marcas, zonas } = config;
  const anio = await anioActual();
  const filas = [
    { k: "Razón social", v: negocio.nombreLegal },
    ...(negocio.anioFundacion ? [{ k: "En el oficio", v: aniosOficio(negocio.anioFundacion, anio) }] : []),
    ...acreditaciones.map((a) => ({ k: "Habilitación", v: acreditacionLinea(a) })),
  ];
  const historia = empresa.historia.length > 0 ? empresa.historia : [negocio.descripcionCorta];

  return (
    <Marco actual="empresa">
      <Migas
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/empresa", texto: "Empresa" },
        ]}
        className="contenedor pt-2"
      />
      <div className="contenedor flex flex-col gap-7 pt-3">
        <h1 className="text-display leading-[1.02] font-semibold">Quiénes somos</h1>
        <div className="flex flex-wrap items-start gap-[clamp(24px,4vw,48px)]">
          <section aria-label="Placa de características" className="max-w-[560px] flex-[1_1_360px] border-2 border-texto bg-superficie p-1.5">
            <div className="flex flex-col gap-3 border border-carril p-4">
              <p className="h2 [overflow-wrap:anywhere]">{negocio.nombre}</p>
              <dl>
                {filas.map((f) => (
                  <div key={f.k + f.v} className="grid grid-cols-[130px_minmax(0,1fr)] gap-3 border-t border-carril py-[9px]">
                    <dt className="rotulo pt-0.5">{f.k}</dt>
                    <dd className="cifras [overflow-wrap:anywhere]">{f.v}</dd>
                  </div>
                ))}
              </dl>
              {garantias.length > 0 && (
                <ul className="flex flex-col gap-2 border-t border-carril pt-3">
                  {garantias.map((g) => (
                    <li key={g} className="flex items-center gap-2.5">
                      <span aria-hidden="true" className="size-2.5 flex-none bg-primario" />
                      {g}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
          <div className="flex max-w-[68ch] min-w-0 flex-[1_1_360px] flex-col gap-3.5">
            {historia.map((p) => (
              <p key={p} className="text-lg leading-[1.55]">
                {p}
              </p>
            ))}
          </div>
        </div>
        {empresa.imagenes.length > 0 && (
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-3">
            {empresa.imagenes.map((img) => (
              <li key={img.src}>
                <Foto imagen={img} proporcion="3/2" sizes="(min-width: 1280px) 600px, (min-width: 700px) 45vw, 92vw" className="border border-carril" />
              </li>
            ))}
          </ul>
        )}
        {empresa.equipo.length > 0 && (
          <section aria-labelledby="h2-equipo" className="flex flex-col gap-3">
            <h2 id="h2-equipo" className="h2">
              Equipo
            </h2>
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,220px),1fr))] gap-3">
              {empresa.equipo.map((m) => (
                <li key={m.nombre} className="flex flex-col border border-carril bg-superficie">
                  {m.foto ? (
                    <Foto imagen={m.foto} proporcion="1/1" sizes="(min-width: 700px) 240px, 92vw" />
                  ) : (
                    <span aria-hidden="true" className="flex aspect-square items-center justify-center bg-alterna text-5xl font-semibold text-texto-suave">
                      {iniciales(m.nombre)}
                    </span>
                  )}
                  <span className="flex flex-col px-3.5 py-3">
                    <span className="text-lg font-semibold">{m.nombre}</span>
                    {m.cargo && <span className="text-[15px] text-texto-suave">{m.cargo}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
        {marcas.length > 0 && (
          <section aria-labelledby="h2-marcas" className="flex flex-col gap-3">
            <h2 id="h2-marcas" className="h2">
              Material con el que trabajamos
            </h2>
            <ul className="flex flex-wrap gap-2">
              {marcas.map((m) => (
                <li key={m} className="border border-borde bg-superficie px-3 py-1.5 font-medium">
                  {m}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
      <Zonas zonas={zonas} />
      <CtaFinal contacto={contacto} mensaje={mensajeCuadro(contacto)} />
    </Marco>
  );
}
