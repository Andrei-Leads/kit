import type { Metadata } from "next";
import { BotonLlamada, direccionLinea, formatearHorario, metadatosPagina, telefonoVisible, urlComoLlegar } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { Marco } from "@/components/Marco";
import { Zonas } from "@/components/secciones/Zonas";
import { mensajeInicio } from "@/lib/mensajes";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/contacto", titulo: "Contacto" });

/**
 * /contacto (encargo §7): tarjeta del campo pleno con la pareja arriba y el teléfono a tamaño
 * display; debajo, tres tarjetas blancas (horario de `formatearHorario`, taller con «Cómo llegar»
 * como enlace, nunca un mapa incrustado, y email) y las zonas. Sin CTA final.
 */
export default function Page() {
  const { contacto } = config;
  const { calle, cp, ciudad, provincia } = contacto.direccion;
  return (
    <Marco actual="contacto">
      <section aria-labelledby="h1-pagina" className="px-[clamp(12px,3vw,40px)] pt-[100px] pb-[clamp(48px,7vw,88px)]">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-5">
          <div className="campo-pleno flex flex-col gap-[18px] rounded-[32px] p-[clamp(24px,5vw,56px)]">
            <h1 id="h1-pagina" className="font-titulo text-[clamp(2rem,1.4rem+2.4vw,3.5rem)] leading-[1.05] font-bold tracking-[-0.03em]">
              Contacto
            </h1>
            <Pareja contacto={contacto} mensaje={mensajeInicio(contacto)} tono="pleno" textoLlamar="Llamar ahora" />
            <BotonLlamada
              telefono={contacto.telefono}
              className="self-start border-b-[3px] border-acento font-titulo text-display leading-[1.05] font-bold tracking-[-0.02em] tabular-nums no-underline"
            >
              {telefonoVisible(contacto.telefono)}
            </BotonLlamada>
            {contacto.whatsapp && <p className="text-[15px]">Respuesta por WhatsApp en horario de trabajo.</p>}
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-4">
            <div className="flex flex-col gap-3 rounded-tarjeta bg-superficie p-6">
              <h2 className="font-titulo text-xl font-bold">Horario</h2>
              <dl className="flex flex-col gap-2">
                {formatearHorario(contacto.horario).map((h) => (
                  <div key={h.dias} className="flex justify-between gap-3 border-b border-borde pb-2">
                    <dt>{h.dias}</dt>
                    <dd className="text-right font-bold tabular-nums">{h.horas}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="flex flex-col gap-2.5 rounded-tarjeta bg-superficie p-6">
              <h2 className="font-titulo text-xl font-bold">Taller</h2>
              <address className="not-italic">
                {calle}
                <br />
                {cp} {ciudad} ({provincia})
              </address>
              <a href={urlComoLlegar(contacto)} target="_blank" rel="noopener noreferrer" className="boton boton-compacto boton-contorno self-start">
                Cómo llegar<span className="sr-only"> a {direccionLinea(contacto.direccion)} (Google Maps)</span>
              </a>
            </div>
            <div className="flex flex-col gap-2.5 rounded-tarjeta bg-superficie p-6">
              <h2 className="font-titulo text-xl font-bold">Email</h2>
              <a href={`mailto:${contacto.email}`} className="enlace self-start [overflow-wrap:anywhere]">
                {contacto.email}
              </a>
              {contacto.fichaGoogle && (
                <a href={contacto.fichaGoogle} target="_blank" rel="noopener noreferrer" className="enlace mt-auto self-start">
                  Nuestra ficha de Google →
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
      <Zonas zonas={config.zonas} />
    </Marco>
  );
}
