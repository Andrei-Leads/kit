import type { Metadata } from "next";
import { BotonLlamada, BotonWhatsApp, formatearHorario, metadatosPagina, telefonoVisible, urlComoLlegar } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { CabeceraPagina } from "@/components/secciones/CabeceraPagina";
import { Zonas } from "@/components/secciones/ZonasPreguntas";
import { mensajeInicio } from "@/lib/mensajes";
import { cn } from "@/lib/utils";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/contacto", titulo: "Contacto" });

const TARJETA = "flex flex-col gap-2.5 px-[26px] py-7";
const CLAVE = "text-sm font-semibold tracking-[0.08em] text-texto-suave uppercase";
const LINEA = "font-titulo text-[21px] leading-[1.35] [overflow-wrap:anywhere]";
const CTA = "boton boton-tierra mt-1.5 min-h-12 self-start px-5 text-[17px]";

/**
 * /contacto (encargo §7): la pareja arriba del todo y tarjetas de guijarro con WhatsApp, llamada,
 * email, dirección con «Cómo llegar» (enlace, sin mapa) y horario. Debajo, las zonas.
 */
export default function Page() {
  const { contacto } = config;
  const mensaje = mensajeInicio(contacto);
  const d = contacto.direccion;
  return (
    <>
      <CabeceraPagina
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/contacto", texto: "Contacto" },
        ]}
        titulo="Contacto"
        entradilla={contacto.whatsapp ? "Escríbenos por WhatsApp o llámanos al taller." : "Llámanos al taller o escríbenos un email."}
        ctas={<Pareja contacto={contacto} mensaje={mensaje} grande />}
      />
      <section aria-label="Datos de contacto" className="contenedor pb-[clamp(56px,7vw,96px)]">
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-5">
          {contacto.whatsapp && (
            <li className={cn(TARJETA, "rounded-guijarro-1 bg-primario-suave")}>
              <h2 className={CLAVE}>WhatsApp</h2>
              <p className={LINEA}>Mándanos fotos y te decimos algo</p>
              <BotonWhatsApp numero={contacto.whatsapp} mensaje={mensaje} className={CTA}>
                Escribir por WhatsApp
              </BotonWhatsApp>
            </li>
          )}
          <li className={cn(TARJETA, "rounded-tarjeta bg-superficie")}>
            <h2 className={CLAVE}>Teléfono</h2>
            <p className={LINEA}>{telefonoVisible(contacto.telefono)}</p>
            <BotonLlamada telefono={contacto.telefono} className={CTA}>
              Llamar al taller
            </BotonLlamada>
          </li>
          <li className={cn(TARJETA, "rounded-[28px_8px_28px_28px] bg-superficie")}>
            <h2 className={CLAVE}>Email</h2>
            <p className={LINEA}>{contacto.email}</p>
            <a href={`mailto:${contacto.email}`} className={CTA}>
              Escribir un email
            </a>
          </li>
          <li className={cn(TARJETA, "rounded-guijarro-2 bg-alterna")}>
            <h2 className={CLAVE}>El taller</h2>
            <p className={LINEA}>
              {d.calle}
              <br />
              {d.cp} {d.ciudad}
            </p>
            <a href={urlComoLlegar(contacto)} target="_blank" rel="noopener" className={cn(CTA, "hover:!bg-superficie")}>
              Cómo llegar
            </a>
          </li>
          <li className={cn(TARJETA, "rounded-[8px_28px_28px_28px] bg-superficie")}>
            <h2 className={CLAVE}>Horario</h2>
            <ul className="flex flex-col gap-1">
              {formatearHorario(contacto.horario).map((l) => (
                <li key={l.dias} className={LINEA}>
                  {l.dias}: {l.horas}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </section>
      <Zonas zonas={config.zonas} />
    </>
  );
}
