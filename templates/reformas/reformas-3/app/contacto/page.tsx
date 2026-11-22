import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BotonLlamada, BotonWhatsApp, direccionLinea, formatearHorario, mediaVisible, metadatosPagina, telefonoVisible, urlComoLlegar } from "@andrei-leads/core";

import config from "@/site.config";
import { Pareja } from "@/components/Botones";
import { CabeceraPagina } from "@/components/CabeceraPagina";
import { mensajeInicio } from "@/lib/mensajes";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/contacto", titulo: "Contacto" });

const ENLACE = "inline-flex min-h-11 items-center font-semibold text-texto underline decoration-primario decoration-2 underline-offset-[3px]";

/** /contacto: la pareja grande arriba y una tabla con teléfono, WhatsApp, email, dirección («Cómo llegar»), horario, zonas y ficha de Google. */
export default function Page() {
  const { contacto, zonas, valoracion } = config;
  const mensaje = mensajeInicio(contacto);
  const filas: [string, ReactNode][] = [
    [
      "Teléfono",
      <BotonLlamada key="t" telefono={contacto.telefono} className={`${ENLACE} tabular-nums`}>
        {telefonoVisible(contacto.telefono)}
      </BotonLlamada>,
    ],
    ...(contacto.whatsapp
      ? ([
          [
            "WhatsApp",
            <BotonWhatsApp key="w" numero={contacto.whatsapp} mensaje={mensaje} className={ENLACE}>
              Escribir por WhatsApp
            </BotonWhatsApp>,
          ],
        ] as [string, ReactNode][])
      : []),
    [
      "Email",
      <a key="e" href={`mailto:${contacto.email}`} className={`${ENLACE} break-all`}>
        {contacto.email}
      </a>,
    ],
    [
      "Dirección",
      <>
        <span className="block">{direccionLinea(contacto.direccion)}</span>
        {contacto.direccion.provincia !== contacto.direccion.ciudad && <span className="block">{contacto.direccion.provincia}</span>}
        <a href={urlComoLlegar(contacto)} rel="noopener" className={ENLACE}>
          Cómo llegar
        </a>
      </>,
    ],
    [
      "Horario",
      formatearHorario(contacto.horario).map((l) => (
        <span key={l.dias} className="block">
          {l.dias}: {l.horas}
        </span>
      )),
    ],
    ...(zonas.length > 0 ? ([["Zonas", zonas.join(", ")]] as [string, ReactNode][]) : []),
    ...(contacto.fichaGoogle
      ? ([
          [
            "Google",
            <>
              {valoracion && (
                <span className="block">
                  {mediaVisible(valoracion.media)} · {valoracion.total} reseñas
                </span>
              )}
              <a href={contacto.fichaGoogle} rel="noopener" className={ENLACE}>
                Ver ficha en Google
              </a>
            </>,
          ],
        ] as [string, ReactNode][])
      : []),
  ];
  return (
    <>
      <CabeceraPagina
        pagina="contacto"
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/contacto", texto: "Contacto" },
        ]}
        titulo="Contacto"
      >
        <Pareja telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensaje} />
      </CabeceraPagina>
      <section aria-label="Datos de contacto" className="contenedor pt-(--seccion) pb-(--seccion)">
        <table className="w-full max-w-[960px] border-collapse border-2 border-borde">
          <tbody>
            {filas.map(([k, v]) => (
              <tr key={k}>
                <th scope="row" className="etiqueta w-[34%] border-r-2 border-b-2 border-borde p-3 text-left align-top text-[15px] leading-[1.2]">
                  {k}
                </th>
                <td className="border-b-2 border-borde p-3 text-base leading-[1.45]">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
