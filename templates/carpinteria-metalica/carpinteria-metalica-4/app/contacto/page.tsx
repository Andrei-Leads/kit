import type { Metadata } from "next";
import { BotonLlamada, BotonWhatsApp, horarioVisible, listaY, metadatosPagina, telefonoVisible, urlComoLlegar } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { Marco } from "@/components/Marco";
import { CabeceraInterior } from "@/components/secciones/CabeceraInterior";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { mensajeInicio } from "@/lib/mensajes";
import { lamina } from "@/lib/navegacion";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/contacto", titulo: "Contacto" });

/**
 * /contacto (encargo §7): la pareja arriba del todo y un cajetín grande con teléfono (en tamaño
 * titular, como `BotonLlamada`), WhatsApp, email, dirección con «Cómo llegar» (enlace a la ficha de
 * Google o a Google Maps; nunca un mapa incrustado), horario y zonas.
 */
export default function Page() {
  const { contacto, zonas } = config;
  const d = contacto.direccion;
  const mensaje = mensajeInicio(contacto);
  const lam = lamina(config, "contacto");
  const fila = "grid grid-cols-[repeat(auto-fit,minmax(min(100%,160px),1fr))] border-b border-borde last:border-b-0";
  const dt = "etiqueta px-4 pt-3.5 text-texto-suave sm:pb-3.5";
  const dd = "px-4 pt-1 pb-3.5 sm:pt-3.5";
  return (
    <Marco actual="contacto" lamina={lam}>
      <CabeceraInterior
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/contacto", texto: "Contacto" },
        ]}
        lamina={`LÁMINA ${lam} · CONTACTO`}
        titulo="Contacto"
      >
        <Pareja contacto={contacto} mensaje={mensaje} className="max-w-[720px] pt-1" />
      </CabeceraInterior>

      <section aria-label="Datos de contacto" className="gutter pt-[clamp(32px,6vw,64px)]">
        <dl className="max-w-[880px] border border-texto bg-superficie">
          <div className={fila}>
            <dt className={dt}>TELÉFONO</dt>
            <dd className={dd}>
              <BotonLlamada telefono={contacto.telefono} className="inline-flex min-h-11 items-center font-titulo text-[clamp(1.5rem,1.1rem+1.6vw,2.5rem)] leading-tight font-semibold tracking-[-0.02em] no-underline hover:text-primario">
                {telefonoVisible(contacto.telefono)}
              </BotonLlamada>
            </dd>
          </div>
          {contacto.whatsapp && (
            <div className={fila}>
              <dt className={dt}>WHATSAPP</dt>
              <dd className={dd}>
                <BotonWhatsApp numero={contacto.whatsapp} mensaje={mensaje} className="inline-flex min-h-11 items-center font-titulo text-base underline underline-offset-[3px]">
                  {telefonoVisible(contacto.whatsapp)}
                </BotonWhatsApp>
              </dd>
            </div>
          )}
          <div className={fila}>
            <dt className={dt}>EMAIL</dt>
            <dd className={`${dd} font-titulo text-[15px] [overflow-wrap:anywhere]`}>
              <a href={`mailto:${contacto.email}`} className="inline-flex min-h-11 items-center underline underline-offset-[3px]">
                {contacto.email}
              </a>
            </dd>
          </div>
          <div className={fila}>
            <dt className={dt}>DIRECCIÓN</dt>
            <dd className={`${dd} leading-normal`}>
              {d.calle}
              <br />
              {d.cp} {d.ciudad}, {d.provincia}
              <br />
              <a href={contacto.fichaGoogle ?? urlComoLlegar(contacto)} rel="noopener" className="enlace">
                Cómo llegar ↗
              </a>
            </dd>
          </div>
          <div className={fila}>
            <dt className={dt}>HORARIO</dt>
            <dd className={`${dd} flex flex-col gap-1`}>
              {horarioVisible(contacto).map((h) => (
                <span key={h.dias}>
                  {h.dias} · <span className="font-titulo text-sm">{h.horas}</span>
                </span>
              ))}
            </dd>
          </div>
          {zonas.length > 0 && (
            <div className={fila}>
              <dt className={dt}>ZONAS</dt>
              <dd className={`${dd} leading-normal`}>{listaY(zonas)}</dd>
            </div>
          )}
        </dl>
      </section>

      <CtaFinal contacto={contacto} mensaje={mensaje} />
    </Marco>
  );
}
