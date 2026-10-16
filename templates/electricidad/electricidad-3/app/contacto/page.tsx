import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";
import { Mail } from "lucide-react";

import { CabeceraInterior } from "@/components/CabeceraInterior";
import { LlamadaLuz, WhatsApp } from "@/components/BotonesContacto";
import { ContactoDireccion } from "@/components/secciones/ContactoDireccion";
import { ContactoHorario } from "@/components/secciones/ContactoHorario";
import config from "@/site.config";
import { mensajeGeneral } from "@/lib/mensajes";
import { h2 } from "@/lib/estilos";
import { cn } from "@/lib/utils";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/contacto", titulo: "Contacto" });

/**
 * /contacto (Pantalla, `contacto`): llamada-luz grande, whatsapp-foto (solo con WhatsApp) y email (mailto con el dato);
 * horario con «Urgencias: 24 h» si `urgencias24h`; dirección con «Cómo llegar ↗» y «Ver ficha en Google ↗» (solo con
 * `fichaGoogle`), siempre como enlaces, y zonas. Móvil: una columna de 640 px como máximo; escritorio: contacto a la
 * izquierda, horario y dirección a la derecha, zonas debajo. Sin CTA final: la página ya es el CTA.
 */
export default function Page() {
  const { contacto, zonas } = config;

  return (
    <>
      <CabeceraInterior titulo="Contacto" migas={[{ href: "/", texto: "Inicio" }, { texto: "Contacto" }]} />

      <div className="contenedor pt-4 pb-11 lg:pt-8 lg:pb-16">
        <div className="grid max-w-[640px] grid-cols-1 gap-3.5 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-x-10 lg:gap-y-6">
          <div className="flex flex-col gap-3.5">
            <LlamadaLuz telefono={contacto.telefono} grande className="min-h-[76px] lg:min-h-[76px] lg:w-full" />
            {contacto.whatsapp && <WhatsApp numero={contacto.whatsapp} mensaje={mensajeGeneral(contacto)} />}
            <a
              href={`mailto:${contacto.email}`}
              className="inline-flex min-h-12 items-center gap-2.5 text-[17px] font-semibold text-texto underline underline-offset-4 [overflow-wrap:anywhere]"
            >
              <Mail aria-hidden="true" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5 flex-none" />
              {contacto.email}
            </a>
          </div>

          <div className="flex flex-col gap-3.5">
            <ContactoHorario contacto={contacto} />
            <ContactoDireccion contacto={contacto} />
          </div>

          {zonas.length > 0 && (
            <section aria-labelledby="titulo-zonas-contacto" className="pt-2 lg:col-span-2">
              <h2 id="titulo-zonas-contacto" className={cn(h2, "mb-2.5 text-xl lg:text-xl")}>
                Dónde trabajamos
              </h2>
              <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                {zonas.map((zona) => (
                  <li key={zona} className="rounded-pastilla bg-superficie px-3.5 py-[7px] text-[15px] font-semibold">
                    {zona}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
