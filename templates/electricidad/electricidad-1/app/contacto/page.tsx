import type { Metadata } from "next";
import type { ReactNode } from "react";
import { metadatosPagina } from "@andrei-leads/core";

import { LlamadaCampo, WhatsApp } from "@/components/BotonesContacto";
import { Migas } from "@/components/Migas";
import config from "@/site.config";
import { etiquetaCampo, h1Interior } from "@/lib/estilos";
import { horarioVisible, urlComoLlegar } from "@/lib/formato";
import { mensajeGeneral } from "@/lib/mensajes";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/contacto", titulo: "Contacto" });

const enlaceExterno =
  "inline-flex min-h-11 items-center gap-1 font-bold text-tinta underline underline-offset-4 hover:decoration-2";

/** Bloque de la columna derecha: h2 mono 20 px con regla inferior de 2 px de tinta. */
function Bloque({ id, titulo, children }: { id: string; titulo: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="m-0 border-b-2 border-tinta pb-2.5 font-mono text-xl leading-[1.2] font-bold">
        {titulo}
      </h2>
      {children}
    </section>
  );
}

/**
 * /contacto (Specs §2): llamada-campo de 80 px, whatsapp-foto (solo con WhatsApp) y email a la izquierda;
 * horario, dirección con «Cómo llegar ↗» (un enlace: nunca un mapa ni un iframe) y zonas a la derecha.
 * Sin CTA final: la página ya es el CTA.
 */
export default function Page() {
  const { contacto, zonas } = config;
  const horario = horarioVisible(contacto);
  const { direccion } = contacto;

  return (
    <>
      <header className="border-b border-regla">
        <div className="contenedor flex flex-col gap-2 pt-1 pb-6 md:pb-11">
          <Migas items={[{ href: "/", texto: "Inicio" }, { texto: "Contacto" }]} />
          <h1 className={h1Interior}>Contacto</h1>
        </div>
      </header>

      <div className="contenedor grid grid-cols-1 gap-10 pt-7 pb-14 md:pt-10 md:pb-[88px] md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-x-14">
        <div className="flex flex-col gap-3">
          {/* llamada-campo a 80 px y con el número a 28 px (la variante base es de 72 px y 25 px). */}
          <LlamadaCampo telefono={contacto.telefono} className="min-h-20 [&_span.font-bold]:text-[28px]" />
          {contacto.whatsapp && (
            <WhatsApp numero={contacto.whatsapp} mensaje={mensajeGeneral(contacto)} variante="foto">
              Envíanos una foto de la avería
            </WhatsApp>
          )}
          <div className="mt-3 flex flex-col gap-0.5">
            <span className={etiquetaCampo}>Email</span>
            <a
              href={`mailto:${contacto.email}`}
              className="inline-flex min-h-11 items-center text-[17px] text-tinta underline underline-offset-4 [overflow-wrap:anywhere]"
            >
              {contacto.email}
            </a>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-8">
          {horario.length > 0 && (
            <Bloque id="titulo-horario" titulo="Horario">
              <dl className="m-0">
                {horario.map((h) => (
                  <div key={h.dias} className="flex justify-between gap-4 border-b border-regla py-3">
                    <dt className="text-base">{h.dias}</dt>
                    <dd className="m-0 font-mono text-[15px] font-bold whitespace-nowrap">{h.horas}</dd>
                  </div>
                ))}
              </dl>
            </Bloque>
          )}

          <Bloque id="titulo-direccion" titulo="Dirección">
            <p className="m-0 mt-3 text-[17px] leading-normal">
              {direccion.calle}
              <br />
              {direccion.cp} {direccion.ciudad}
            </p>
            <div className="mt-1 flex flex-wrap gap-x-5">
              <a
                href={urlComoLlegar(contacto)}
                target="_blank"
                rel="noopener noreferrer"
                className={enlaceExterno}
              >
                Cómo llegar <span aria-hidden="true">↗</span>
                <span className="sr-only"> (se abre en otra pestaña)</span>
              </a>
              {contacto.fichaGoogle && (
                <a
                  href={contacto.fichaGoogle}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={enlaceExterno}
                >
                  Ver ficha en Google <span aria-hidden="true">↗</span>
                  <span className="sr-only"> (se abre en otra pestaña)</span>
                </a>
              )}
            </div>
          </Bloque>

          {zonas.length > 0 && (
            <Bloque id="titulo-zonas-contacto" titulo="Dónde trabajamos">
              <p className="m-0 mt-3 font-mono text-[15px] leading-[1.75] font-medium text-pretty">
                {zonas.join(" / ")}
              </p>
            </Bloque>
          )}
        </div>
      </div>
    </>
  );
}
