import type { Metadata } from "next";
import { direccionLinea, horarioVisible, metadatosPagina, urlComoLlegar } from "@andrei-leads/core";

import config from "@/site.config";
import { LlamadaGrande, WhatsappContorno } from "@/components/Botones";
import { BandaCabecera, H1_INTERIOR, H2 } from "@/components/secciones/BandaCabecera";
import { ZonasRed } from "@/components/secciones/ZonasRed";
import { valoracionLinea } from "@/lib/formato";
import { mensajeInicio } from "@/lib/mensajes";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/contacto", titulo: "Contacto" });

/**
 * /contacto: número a tamaño titular (llamada-contacto) y WhatsApp; horario en tabla
 * (formatearHorario + fila de urgencias), dirección con «Cómo llegar» (enlace, nunca mapa), email y la
 * red completa de zonas.
 */
export default function Contacto() {
  const { contacto, zonas } = config;
  const ciudad = contacto.direccion.ciudad;
  const valoracion = valoracionLinea(config.valoracion);
  const nota = valoracion;
  return (
    <>
      <BandaCabecera>
        <h1 className={H1_INTERIOR}>Contacto</h1>
        <p className="mt-2 mb-0 text-[clamp(1rem,0.9rem+0.4vw,1.1875rem)]">
          {contacto.whatsapp ? "Llámanos o mándanos una foto." : "Llámanos."} Salimos desde {ciudad}.
        </p>
        <div className="mt-[22px] flex max-w-[900px] flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-3.5">
          <LlamadaGrande
            contacto={contacto}
            className="sm:flex-[1_1_320px]"
            alto="min-h-24"
            tamanoNumero="text-[clamp(2.25rem,1.5rem+2.4vw,3.25rem)] leading-[1.02] tracking-[-0.02em]"
          />
          {contacto.whatsapp && (
            <WhatsappContorno
              numero={contacto.whatsapp}
              mensaje={mensajeInicio(contacto)}
              alto="min-h-16"
              className="sm:flex-[1_1_280px] [&_span_span]:text-[19px]"
            >
              Envíanos una foto por WhatsApp
            </WhatsappContorno>
          )}
        </div>
        {nota && <p className="mt-3 mb-0 text-[15px] leading-[1.3] font-semibold">{nota}</p>}
      </BandaCabecera>

      <section className="contenedor flex flex-wrap gap-x-16 gap-y-8 pt-8 pb-2 lg:pt-12">
        <div className="min-w-0 flex-[1_1_360px]">
          <h2 className={`${H2} mb-2.5`}>Horario</h2>
          <table className="w-full border-collapse border-t-2 border-tinta">
            <tbody>
              {horarioVisible(contacto).map((h) => (
                <tr key={h.dias} className="border-b-2 border-tinta">
                  <th scope="row" className="py-2.5 pr-3 text-left font-normal">
                    {h.dias}
                  </th>
                  <td className="py-2.5 text-right font-titulo text-[17px] leading-[1.3] font-semibold tabular-nums">{h.horas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="min-w-0 flex-[1_1_360px]">
          <h2 className={`${H2} mb-2.5`}>Dónde estamos</h2>
          <address className="text-[17px] not-italic">
            {contacto.direccion.calle}
            <br />
            {contacto.direccion.cp} {ciudad} ({contacto.direccion.provincia})
          </address>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href={urlComoLlegar(contacto)}
              aria-label={`Cómo llegar a ${direccionLinea(contacto.direccion)}`}
              className="inline-flex min-h-12 items-center border-2 border-tinta px-[18px] font-titulo text-base font-semibold text-texto no-underline hover:bg-primario-suave"
            >
              Cómo llegar <span aria-hidden="true">&nbsp;→</span>
            </a>
            <a href={`mailto:${contacto.email}`} className="inline-flex min-h-11 items-center text-base text-texto underline">
              {contacto.email}
            </a>
          </div>
          {contacto.fichaGoogle && (
            <a href={contacto.fichaGoogle} className="mt-1 inline-flex min-h-11 items-center text-base text-texto underline">
              Ver la ficha en Google
            </a>
          )}
        </div>
      </section>

      <ZonasRed ciudad={ciudad} zonas={zonas} tiempoLlegada={contacto.tiempoLlegada} />
    </>
  );
}
