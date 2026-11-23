import type { Metadata } from "next";
import { BotonLlamada, horarioVisible, metadatosPagina, telefonoVisible, urlComoLlegar } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { Marco } from "@/components/Marco";
import { mensajeInicio } from "@/lib/mensajes";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/contacto", titulo: "Contacto" });

const TITULO = "mb-1.5 font-titulo text-[22px] font-extrabold uppercase";

/**
 * /contacto (encargo §7): sobre el óxido, la pareja arriba del todo, el teléfono en condensada
 * gigante como `BotonLlamada`, y email, taller con «Cómo llegar» (enlace, nunca mapa), horario y zonas.
 */
export default function Page() {
  const { contacto, zonas } = config;
  const { direccion } = contacto;
  const tel = telefonoVisible(contacto.telefono);
  return (
    <Marco actual="contacto">
      <section aria-labelledby="titulo-contacto" className="pt-[clamp(96px,9vw,150px)] pb-[clamp(40px,5vw,72px)]">
        <div className="contenedor">
          <h1 id="titulo-contacto" className="display">
            Contacto
          </h1>
          <Pareja contacto={contacto} mensaje={mensajeInicio(contacto)} className="mt-[18px]" />
          <BotonLlamada
            telefono={contacto.telefono}
            className="mt-[clamp(28px,4vw,56px)] block font-titulo text-[clamp(3.5rem,1.6rem+8vw,9rem)] leading-[0.9] font-extrabold tracking-[0.01em] whitespace-nowrap no-underline hover:underline hover:decoration-[3px] hover:underline-offset-8"
          >
            {tel}
          </BotonLlamada>
          <p className="mt-1.5 font-titulo text-[15px] font-bold tracking-[0.08em] text-texto-suave uppercase">Llamar al taller</p>

          <div className="mt-[clamp(28px,4vw,56px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-x-8">
            <div className="border-t border-borde py-4">
              <h2 className={TITULO}>Email</h2>
              <a href={`mailto:${contacto.email}`} className="inline-flex min-h-11 items-center underline underline-offset-[3px] [overflow-wrap:anywhere]">
                {contacto.email}
              </a>
            </div>
            <div className="border-t border-borde py-4">
              <h2 className={TITULO}>Taller</h2>
              <p>
                {direccion.calle}
                <br />
                {direccion.cp} {direccion.ciudad} ({direccion.provincia})
              </p>
              <p className="flex flex-wrap gap-x-5 gap-y-1">
                <a href={urlComoLlegar(contacto)} target="_blank" rel="noopener noreferrer" className="enlace">
                  Cómo llegar →
                </a>
                {contacto.fichaGoogle && (
                  <a href={contacto.fichaGoogle} target="_blank" rel="noopener noreferrer" className="enlace">
                    Ficha de Google →
                  </a>
                )}
              </p>
            </div>
            <div className="border-t border-borde py-4">
              <h2 className={TITULO}>Horario</h2>
              {horarioVisible(contacto).map((h) => (
                <p key={h.dias} className="mb-1">
                  <strong className="font-semibold">{h.dias}</strong> · {h.horas}
                </p>
              ))}
            </div>
            {zonas.length > 0 && (
              <div className="border-t border-borde py-4">
                <h2 className={TITULO}>Zonas</h2>
                <p className="text-pretty">{zonas.join(", ")}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Marco>
  );
}
