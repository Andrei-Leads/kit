import type { Metadata } from "next";
import { BotonLlamada, BotonWhatsApp, metadatosPagina } from "@andrei-leads/core";
import { ExternalLink, Mail, MapPin, MessageCircle } from "lucide-react";

import { ContenidoLlamada } from "@/components/ContenidoLlamada";
import { Zonas } from "@/components/secciones/Zonas";
import { buttonVariants } from "@/components/ui/button";
import config from "@/site.config";
import { direccionLinea, enlaceMaps, horarioVisible } from "@/lib/formato";
import { seccion } from "@/lib/estilos";
import { mensajeGeneral } from "@/lib/mensajes";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/contacto", titulo: "Contacto" });

const h2Bloque = "m-0 text-2xl font-extrabold";

export default function Page() {
  const { contacto } = config;
  const horario = horarioVisible(contacto);
  return (
    <>
      <section className={`contenedor flex flex-col gap-6 ${seccion}`}>
        <h1 className="m-0 text-[32px] leading-[1.05] font-extrabold tracking-[-0.015em] md:text-[56px]">
          Contacto
        </h1>
        <div className="grid items-start gap-7 md:grid-cols-2 md:gap-14">
          <div className="flex flex-col gap-2.5">
            <BotonLlamada telefono={contacto.telefono} className={buttonVariants({ variant: "llamadaHero" })}>
              <ContenidoLlamada telefono={contacto.telefono} tamanoNumero="31" />
            </BotonLlamada>
            {contacto.whatsapp && (
              <BotonWhatsApp
                numero={contacto.whatsapp}
                mensaje={mensajeGeneral(contacto)}
                className={buttonVariants({ variant: "whatsappSecundario" })}
              >
                <MessageCircle aria-hidden="true" className="size-5" />
                <span>Escribir por WhatsApp</span>
              </BotonWhatsApp>
            )}
            <a
              href={`mailto:${contacto.email}`}
              className={buttonVariants({ variant: "whatsappSecundario" })}
            >
              <Mail aria-hidden="true" className="size-5" />
              <span className="break-all">{contacto.email}</span>
            </a>
          </div>

          <div className="flex flex-col gap-7">
            {horario.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className={h2Bloque}>Horario</h2>
                <table className="w-full border-collapse rounded-md border border-linea bg-tarjeta">
                  <tbody>
                    {horario.map((h) => (
                      <tr key={h.dias} className="border-b border-linea last:border-b-0">
                        <th scope="row" className="px-4 py-2.5 text-left font-normal text-tinta-suave">
                          {h.dias}
                        </th>
                        <td className="px-4 py-2.5 text-right font-bold tabular-nums">{h.horas}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="flex flex-col gap-2">
              <h2 className={h2Bloque}>Dirección</h2>
              <p className="m-0 flex gap-2.5">
                <MapPin aria-hidden="true" className="mt-1 size-5 flex-none text-acero" />
                <span>{direccionLinea(contacto.direccion)}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={enlaceMaps(contacto.direccion)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-md border-2 border-tinta bg-tarjeta px-3.5 font-bold text-tinta hover:bg-papel"
                >
                  <span>Cómo llegar</span>
                  <ExternalLink aria-hidden="true" className="size-4" />
                </a>
                {contacto.fichaGoogle && (
                  <a
                    href={contacto.fichaGoogle}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({ variant: "enlaceMedida" })}
                  >
                    <span>Ver ficha en Google</span>
                    <ExternalLink aria-hidden="true" className="size-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Zonas zonas={config.zonas} telefono={contacto.telefono} />
    </>
  );
}
