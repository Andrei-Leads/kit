import type { Metadata } from "next";
import { BotonLlamada, direccionLinea, horarioVisible, metadatosPagina, telefonoVisible, urlComoLlegar } from "@andrei-leads/core";

import config from "@/site.config";
import { ParCta } from "@/components/Botones";
import { ChatWhatsApp } from "@/components/secciones/ChatWhatsApp";
import { Encabezado } from "@/components/secciones/Encabezado";
import { Zonas } from "@/components/secciones/Zonas";
import { mensajeInicio } from "@/lib/mensajes";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/contacto", titulo: "Contacto" });

const TARJETA = "border border-linea bg-superficie px-5 py-4 burbuja-entra";
const ETIQUETA = "text-sm font-bold text-texto-suave";
const ENLACE = "inline-flex min-h-11 items-center font-extrabold underline underline-offset-[3px]";

/** /contacto: pareja arriba, el asistente completo y las fichas de teléfono, email, horario y dirección; zonas. */
export default function Page() {
  const { contacto, negocio } = config;
  return (
    <>
      <Encabezado migas={[{ href: "/", texto: "Inicio" }, { href: "/contacto", texto: "Contacto" }]} titulo="Contacto">
        <ParCta contacto={contacto} mensaje={mensajeInicio(contacto)} className="mt-5 max-w-[560px]" />
      </Encabezado>
      <div className="contenedor mt-7 flex flex-wrap items-start gap-x-[clamp(32px,5vw,72px)] gap-y-7">
        {contacto.whatsapp && (
          <div className="min-w-0 max-w-(--container-chat) flex-[1_1_340px]">
            <ChatWhatsApp negocio={negocio} contacto={contacto} servicios={config.servicios} />
          </div>
        )}
        <dl className="m-0 flex min-w-0 flex-[1_1_300px] flex-col gap-2.5">
          <div className={TARJETA}>
            <dt className={ETIQUETA}>Teléfono</dt>
            <dd className="m-0">
              <BotonLlamada telefono={contacto.telefono} className="inline-flex min-h-11 items-center text-xl font-black underline underline-offset-[3px]">
                {telefonoVisible(contacto.telefono)}
              </BotonLlamada>
            </dd>
          </div>
          <div className={TARJETA}>
            <dt className={ETIQUETA}>Email</dt>
            <dd className="m-0">
              <a href={`mailto:${contacto.email}`} className="inline-flex min-h-11 items-center text-[17px] font-extrabold underline underline-offset-[3px] [overflow-wrap:anywhere]">
                {contacto.email}
              </a>
            </dd>
          </div>
          <div className={TARJETA}>
            <dt className={ETIQUETA}>Horario</dt>
            {horarioVisible(contacto).map((h) => (
              <dd key={h.dias} className="m-0 mt-1 font-bold">
                {h.dias} · {h.horas}
              </dd>
            ))}
          </div>
          <div className={TARJETA}>
            <dt className={ETIQUETA}>Dirección</dt>
            <dd className="m-0 mt-1 font-bold">{direccionLinea(contacto.direccion)}</dd>
            <dd className="m-0 flex flex-wrap gap-x-5">
              <a href={urlComoLlegar(contacto)} target="_blank" rel="noopener noreferrer" className={ENLACE}>
                Cómo llegar <span aria-hidden="true">&nbsp;→</span>
              </a>
              {contacto.fichaGoogle && (
                <a href={contacto.fichaGoogle} target="_blank" rel="noopener noreferrer" className={ENLACE}>
                  Ficha de Google <span aria-hidden="true">&nbsp;→</span>
                </a>
              )}
            </dd>
          </div>
        </dl>
      </div>
      <div className="pb-[clamp(48px,2.5rem+3vw,96px)]">
        <Zonas zonas={config.zonas} />
      </div>
    </>
  );
}
