import type { Metadata } from "next";
import {
  BotonLlamada,
  horarioVisible,
  metadatosPagina,
  telefonoVisible,
  urlComoLlegar,
} from "@andrei-leads/core";

import config from "@/site.config";
import { Pareja } from "@/components/Pareja";
import { MigasPagina } from "@/components/secciones/MigasPagina";
import { Zonas } from "@/components/secciones/Zonas";
import { enlaceFlecha } from "@/lib/botones";
import { datosCta } from "@/lib/textos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/contacto", titulo: "Contacto" });

const PIEDRA = "bg-superficie p-[clamp(1.5rem,1.2rem+1vw,2.25rem)]";
const H2 = "m-0 font-titulo text-[1.625rem] leading-[1.1] font-medium";

/**
 * /contacto: el teléfono a tamaño display, la pareja de botones (arriba, antes
 * de horario y dirección), y tres piedras: horario (+ «Urgencias 24 h»),
 * dirección con «Cómo llegar» (enlace, nunca mapa) y email con la ficha de
 * Google. Después, las zonas. Sin CTA final.
 */
export default function Page() {
  const { contacto } = config;
  const { direccion } = contacto;
  return (
    <>
      <span data-pagina="contacto" hidden />
      <MigasPagina migas={[{ href: "/", texto: "Inicio" }, { texto: "Contacto" }]} />
      <section className="pt-[clamp(1.5rem,1rem+2vw,3rem)] pb-[clamp(2rem,1.5rem+2vw,4rem)]">
        <div className="contenedor">
          <h1 className="titulo-seccion">Llámanos o escríbenos</h1>
          <BotonLlamada
            telefono={contacto.telefono}
            className="mt-2 inline-flex min-h-11 items-center font-titulo text-[clamp(2.5rem,1.5rem+5vw,6.5rem)] leading-[1.05] font-medium tracking-[-0.02em] whitespace-nowrap no-underline lining-nums hover:underline"
          >
            {telefonoVisible(contacto.telefono)}
          </BotonLlamada>
          <Pareja cta={datosCta(config)} textoWhatsapp="Escribir por WhatsApp" className="mt-[clamp(1.5rem,1rem+1.5vw,2.5rem)]" />

          <div className="mt-[clamp(2.5rem,2rem+2vw,4rem)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,18rem),1fr))] items-start gap-[clamp(0.75rem,0.5rem+1vw,1.25rem)]">
            <div className={`${PIEDRA} rounded-piedra-1`}>
              <h2 className={H2}>Horario</h2>
              <dl className="m-0 mt-4 flex flex-col gap-3">
                {horarioVisible(contacto).map((h) => (
                  <div key={h.dias}>
                    <dt className="font-bold">{h.dias}</dt>
                    <dd className="m-0">{h.horas}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className={`${PIEDRA} rounded-piedra-4`}>
              <h2 className={H2}>Dónde estamos</h2>
              <p className="mt-4 mb-0 leading-normal">
                {direccion.calle}
                <br />
                {direccion.cp} {direccion.ciudad} ({direccion.provincia})
              </p>
              <a href={urlComoLlegar(contacto)} target="_blank" rel="noopener noreferrer" className={`${enlaceFlecha} mt-2 underline`}>
                Cómo llegar →
              </a>
            </div>
            <div className={`${PIEDRA} rounded-piedra-3`}>
              <h2 className={H2}>Escríbenos</h2>
              <a href={`mailto:${contacto.email}`} className="mt-3 inline-flex min-h-11 items-center font-bold [overflow-wrap:anywhere]">
                {contacto.email}
              </a>
              {contacto.fichaGoogle && (
                <a href={contacto.fichaGoogle} target="_blank" rel="noopener noreferrer" className={`${enlaceFlecha} underline`}>
                  Nuestra ficha en Google →
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
      <Zonas zonas={config.zonas} />
    </>
  );
}
