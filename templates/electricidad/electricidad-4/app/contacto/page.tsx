import type { Metadata } from "next";
import {
  BotonLlamada,
  direccionLinea,
  horarioVisible,
  metadatosPagina,
  telefonoVisible,
  urlComoLlegar,
} from "@andrei-leads/core";

import { Migas } from "@/components/base/Migas";
import { Pareja, WhatsAppEtiqueta } from "@/components/Botones";
import { Marco } from "@/components/Marco";
import { Zonas } from "@/components/secciones/Zonas";
import { textoLlamar } from "@/lib/formato";
import { mensajeCuadro } from "@/lib/mensajes";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/contacto", titulo: "Contacto" });

/**
 * /contacto (encargo §7): pareja grande arriba del todo; tres bloques rectos (teléfono, WhatsApp,
 * email); horario de core; dirección en texto + «Cómo llegar» (sin mapa) y ficha de Google; zonas.
 */
export default function Page() {
  const { contacto, zonas } = config;
  const mensaje = mensajeCuadro(contacto);
  const bloque = "flex flex-col gap-2.5 border border-borde bg-superficie p-4";
  const rotulo = "text-sm font-semibold tracking-[0.06em] text-texto-suave uppercase";
  return (
    <Marco actual="contacto">
      <Migas
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/contacto", texto: "Contacto" },
        ]}
        className="contenedor pt-2"
      />
      <div className="contenedor flex flex-col gap-5 pt-3">
        <h1 className="text-display leading-[1.02] font-semibold">Contacto</h1>
        <Pareja contacto={contacto} mensaje={mensaje} className="max-w-[640px]" />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-3">
          <section aria-labelledby="h2-telefono" className={bloque}>
            <h2 id="h2-telefono" className={rotulo}>
              Teléfono
            </h2>
            <p className="cifras text-[26px] font-semibold">{telefonoVisible(contacto.telefono)}</p>
            <BotonLlamada telefono={contacto.telefono} className="contorno-cuadro self-start px-4 text-base">
              {textoLlamar(contacto)}
            </BotonLlamada>
          </section>
          {contacto.whatsapp && (
            <section aria-labelledby="h2-whatsapp" className={bloque}>
              <h2 id="h2-whatsapp" className={rotulo}>
                WhatsApp
              </h2>
              <p className="text-[17px] text-texto-suave">Cuéntanos qué ha pasado y te respondemos.</p>
              <WhatsAppEtiqueta numero={contacto.whatsapp} mensaje={mensaje} texto="Escribir por WhatsApp" compacto icono={false} className="self-start" />
            </section>
          )}
          <section aria-labelledby="h2-email" className={bloque}>
            <h2 id="h2-email" className={rotulo}>
              Email
            </h2>
            <a href={`mailto:${contacto.email}`} className="inline-flex min-h-11 items-center self-start text-lg font-medium underline underline-offset-3 [overflow-wrap:anywhere]">
              {contacto.email}
            </a>
          </section>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-3">
          <section aria-labelledby="h2-horario" className="border border-carril bg-superficie p-4">
            <h2 id="h2-horario" className="mb-2 text-xl font-semibold">
              Horario
            </h2>
            <dl>
              {horarioVisible(contacto, "24 horas").map((h) => (
                <div key={h.dias} className="flex flex-wrap justify-between gap-x-4 gap-y-1 border-t border-carril py-[9px]">
                  <dt className="font-medium">{h.dias}</dt>
                  <dd className="cifras">{h.horas}</dd>
                </div>
              ))}
            </dl>
          </section>
          <section aria-labelledby="h2-direccion" className="flex flex-col gap-2 border border-carril bg-superficie p-4">
            <h2 id="h2-direccion" className="text-xl font-semibold">
              Dirección
            </h2>
            <p className="text-[17px]">{direccionLinea(contacto.direccion, { provincia: contacto.direccion.provincia !== contacto.direccion.ciudad })}</p>
            <a href={urlComoLlegar(contacto)} target="_blank" rel="noopener" className="enlace inline-flex min-h-11 items-center self-start">
              Cómo llegar ›
            </a>
            {contacto.fichaGoogle && (
              <a href={contacto.fichaGoogle} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center self-start font-medium underline underline-offset-3">
                Nuestra ficha en Google ›
              </a>
            )}
          </section>
        </div>
      </div>
      <Zonas zonas={zonas} />
      <div className="h-[clamp(40px,6vw,72px)]" />
    </Marco>
  );
}
