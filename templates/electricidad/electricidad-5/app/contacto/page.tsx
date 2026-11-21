import type { Metadata } from "next";
import { BotonLlamada, BotonWhatsApp, direccionLinea, metadatosPagina, telefonoVisible, urlComoLlegar } from "@andrei-leads/core";

import config from "@/site.config";
import { llamadaSuave, Pareja, whatsappSuave } from "@/components/Botones";
import { IconoExterno, IconoTelefono, IconoWhatsapp } from "@/components/Iconos";
import { BandaInterior } from "@/components/secciones/BandaInterior";
import { datosCta, lineasHorario, TEXTO_WHATSAPP } from "@/lib/textos";
import { cn } from "@/lib/utils";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/contacto", titulo: "Contacto" });

const TARJETA = "flex flex-col rounded-tarjeta bg-superficie p-6 lg:p-7";
const ETIQUETA = "m-0 text-sm font-semibold text-texto-suave";

/**
 * /contacto: banda pleno con la pareja arriba del todo → bento de contacto:
 * tarjeta grande Llamar, WhatsApp, email, horario, dirección con «Cómo llegar»
 * (enlace, nunca mapa incrustado) y zonas. Sin WhatsApp, el email sube a su sitio.
 */
export default function Page() {
  const { contacto, zonas } = config;
  const cta = datosCta(config);
  const horario = lineasHorario(contacto);
  return (
    <>
      <span data-pagina="contacto" hidden />
      <BandaInterior
        migas={[{ href: "/", texto: "Inicio" }, { href: "/contacto", texto: "Contacto" }]}
        titulo="Contacto"
        entrada={<p>Llámanos o escríbenos.{contacto.urgencias24h && " Para urgencias, a cualquier hora."}</p>}
      >
        <Pareja cta={cta} tono="pleno" />
      </BandaInterior>

      <section aria-label="Formas de contacto" className="seccion">
        <div className="contenedor grid gap-(--hueco-bento) md:grid-cols-2 lg:grid-cols-3">
          <div className={cn(TARJETA, "md:col-span-2 lg:p-12")}>
            <h2 className={ETIQUETA}>Llámanos{contacto.urgencias24h && " · urgencias 24 h"}</h2>
            <p className="m-0 mt-4 font-titulo text-[clamp(2.5rem,1.6rem+3.6vw,4.5rem)] leading-none font-[750] tracking-[-0.04em] whitespace-nowrap tabular-nums">
              {telefonoVisible(contacto.telefono)}
            </p>
            <span aria-hidden="true" className="raya-acento mt-3" />
            <div className="mt-6">
              <BotonLlamada telefono={contacto.telefono} className={llamadaSuave}>
                <IconoTelefono />
                {cta.textoLlamada}
              </BotonLlamada>
            </div>
          </div>
          {contacto.whatsapp && (
            <div className={cn(TARJETA, "bg-alterna")}>
              <h2 className={ETIQUETA}>WhatsApp</h2>
              <p className="m-0 mt-3 text-[1.375rem] leading-snug font-bold">{TEXTO_WHATSAPP}</p>
              <div className="mt-auto pt-6">
                <BotonWhatsApp numero={contacto.whatsapp} mensaje={cta.mensaje} className={cn(whatsappSuave, "w-full sm:w-full")}>
                  <IconoWhatsapp />
                  Escribir por WhatsApp
                </BotonWhatsApp>
              </div>
            </div>
          )}
          <div className={TARJETA}>
            <h2 className={ETIQUETA}>Email</h2>
            <a href={`mailto:${contacto.email}`} className="mt-3 inline-flex min-h-11 items-center text-lg font-bold [overflow-wrap:anywhere] underline hover:no-underline">
              {contacto.email}
            </a>
          </div>
          {horario.length > 0 && (
            <div className={TARJETA}>
              <h2 className={ETIQUETA}>Horario</h2>
              <ul className="m-0 mt-3 flex list-none flex-col gap-2 p-0">
                {horario.map((l) => (
                  <li key={l.dias}>
                    <span className="block font-bold">{l.dias}</span>
                    <span className="tabular-nums">{l.horas}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className={TARJETA}>
            <h2 className={ETIQUETA}>Dirección</h2>
            <p className="m-0 mt-3 text-lg font-semibold">{direccionLinea(contacto.direccion)}</p>
            <a
              href={urlComoLlegar(contacto)}
              rel="noopener"
              className="mt-3 inline-flex min-h-11 w-fit items-center gap-1.5 font-bold underline underline-offset-4 hover:no-underline"
            >
              Cómo llegar
              <IconoExterno />
            </a>
            {contacto.fichaGoogle && (
              <a href={contacto.fichaGoogle} rel="noopener" className="inline-flex min-h-11 w-fit items-center gap-1.5 font-semibold underline underline-offset-4 hover:no-underline">
                Ver la ficha de Google
                <IconoExterno />
              </a>
            )}
          </div>
          {zonas.length > 0 && (
            <div className={cn(TARJETA, "md:col-span-2")}>
              <h2 className={ETIQUETA}>Zonas</h2>
              <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0">
                {zonas.map((z) => (
                  <li key={z} className="inline-flex min-h-10 items-center rounded-boton bg-alterna px-4 text-[0.9375rem] font-semibold">
                    {z}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
