import type { Metadata } from "next";
import { BotonLlamada, direccionLinea, formatearHorario, metadatosPagina, telefonoVisible, urlComoLlegar } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { Marco } from "@/components/Marco";
import { BandaInterior } from "@/components/secciones/BandaInterior";
import { Zonas } from "@/components/secciones/Zonas";
import { mensajeInicio } from "@/lib/mensajes";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/contacto", titulo: "Contacto" });

/**
 * /contacto (encargo §7 y entrega v2): una tarjeta grande con el teléfono en tamaño titular y la
 * pareja arriba del todo; el horario de `formatearHorario`, la dirección con «Cómo llegar» (enlace,
 * nunca un mapa incrustado) y las zonas. Sin CTA final.
 */
export default function Page() {
  const { contacto } = config;
  const { calle, cp, ciudad } = contacto.direccion;
  return (
    <Marco actual="contacto">
      <BandaInterior
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/contacto", texto: "Contacto" },
        ]}
        titulo="Contacto"
        entradilla="Escríbenos o llámanos y te contamos cómo empezar."
      />
      <section aria-label="Datos de contacto" className="pt-[clamp(24px,1rem+3vw,64px)]">
        <div className="contenedor">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-x-[clamp(32px,5vw,72px)] gap-y-9 rounded-[28px] bg-superficie p-[clamp(20px,4vw,56px)] shadow-tarjeta">
            <div className="flex flex-col gap-3.5">
              <h2 className="text-[13px] font-bold tracking-[0.08em] text-texto-suave uppercase">{contacto.whatsapp ? "Teléfono y WhatsApp" : "Teléfono"}</h2>
              <BotonLlamada
                telefono={contacto.telefono}
                className="inline-flex min-h-11 items-center self-start font-titulo text-[clamp(2.25rem,1.6rem+2.6vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.02em] no-underline"
              >
                {telefonoVisible(contacto.telefono)}
              </BotonLlamada>
              <Pareja
                contacto={contacto}
                mensaje={mensajeInicio(contacto)}
                textoLlamar="Llamar ahora"
                nota={contacto.whatsapp ? "Respuesta por WhatsApp en horario de trabajo." : undefined}
                className="max-w-none"
              />
              <a href={`mailto:${contacto.email}`} className="enlace self-start font-normal [overflow-wrap:anywhere]">
                {contacto.email}
              </a>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2.5">
                <h2 className="font-titulo text-[22px] font-semibold">Horario</h2>
                <dl className="flex flex-col">
                  {formatearHorario(contacto.horario).map((h) => (
                    <div key={h.dias} className="flex justify-between gap-4 border-b border-borde py-2.5">
                      <dt>{h.dias}</dt>
                      <dd className="text-right font-semibold">{h.horas}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="flex flex-col gap-1.5">
                <h2 className="font-titulo text-[22px] font-semibold">Dónde estamos</h2>
                <address className="not-italic">
                  {calle}
                  <br />
                  {cp} {ciudad}
                </address>
                <div className="flex flex-wrap gap-x-5 gap-y-1">
                  <a href={urlComoLlegar(contacto)} target="_blank" rel="noopener noreferrer" className="enlace">
                    Cómo llegar<span className="sr-only"> a {direccionLinea(contacto.direccion)} (Google Maps)</span>
                  </a>
                  {contacto.fichaGoogle && (
                    <a href={contacto.fichaGoogle} target="_blank" rel="noopener noreferrer" className="enlace">
                      Ficha de Google
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Zonas zonas={config.zonas} />
      <div aria-hidden="true" className="h-[clamp(56px,2rem+5vw,112px)]" />
    </Marco>
  );
}
