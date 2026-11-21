import type { Metadata } from "next";
import { BotonLlamada, direccionLinea, formatearHorario, metadatosPagina, telefonoVisible, urlComoLlegar } from "@andrei-leads/core";

import { Marco } from "@/components/Marco";
import { Pareja } from "@/components/Pareja";
import { CabeceraParte } from "@/components/secciones/CabeceraParte";
import { Encabezado } from "@/components/secciones/Encabezado";
import { lineaConfianza } from "@/lib/formato";
import { mensajeAviso } from "@/lib/mensajes";
import { datosMarco } from "@/lib/navegacion";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/contacto", titulo: "Contacto" });

/**
 * /contacto (encargo §7): el teléfono a --text-telefono con su cota, la pareja de botones, email,
 * dirección con «Cómo llegar» (enlace, nunca mapa), zonas, horario de `formatearHorario` como tabla
 * con la fila «Urgencias: 24 h» si urgencias24h, y la ficha de Google. Sin CTA final (ya es el contacto).
 */
export default function Page() {
  const { negocio, contacto, zonas } = config;
  const cota = (
    <span className="mt-2.5 flex items-center text-primario">
      <span aria-hidden="true" className="h-3 w-px bg-current" />
      <span aria-hidden="true" className="h-px flex-1 bg-current" />
      <span className="px-2.5 font-titulo text-[0.6875rem] font-bold tracking-[0.08em] uppercase">Llamar</span>
      <span aria-hidden="true" className="h-px flex-1 bg-current" />
      <span aria-hidden="true" className="h-3 w-px bg-current" />
    </span>
  );
  return (
    <Marco {...datosMarco(config)}
      pagina="contacto"
      campos={[
        { id: "telefono", texto: "Teléfono" },
        { id: "canales", texto: "Otros canales" },
        { id: "horario", texto: "Horario" },
      ]}
    >
      <CabeceraParte
        tipo="Abrir un aviso"
        casillas={contacto.urgencias24h ? [{ rotulo: "Urgencias", valor: "24 h" }] : []}
        titulo="Contacto"
        entradilla={`${negocio.sector} en ${contacto.direccion.ciudad} y alrededores. Llama o escribe y abrimos el aviso.`}
      />
      <div className="flex flex-col gap-(--sec) px-(--pad) py-(--sec)">
        <section id="telefono" aria-labelledby="h2-telefono">
          <Encabezado n="01" rotulo="Teléfono" />
          <h2 id="h2-telefono" className="sr-only">
            Teléfono
          </h2>
          <BotonLlamada telefono={contacto.telefono} className="inline-flex max-w-full flex-col text-texto no-underline">
            <span className="font-titulo text-telefono leading-none font-semibold tracking-[-0.02em] [font-stretch:75%]">
              {telefonoVisible(contacto.telefono)}
            </span>
            {cota}
          </BotonLlamada>
          <Pareja contacto={config.contacto} mensaje={mensajeAviso(contacto)} textoWhatsapp="Escribir por WhatsApp" confianza={lineaConfianza(config)} className="mt-6" />
        </section>

        <section id="canales" aria-labelledby="h2-canales">
          <Encabezado n="02" rotulo="Otros canales" titulo="Escríbenos o ven" id="h2-canales" />
          <div className="casillas">
            <a href={`mailto:${contacto.email}`} className="casilla flex min-h-[72px] flex-[1_1_220px] flex-col justify-center px-3 py-2.5 no-underline">
              <span className="rotulo text-[0.6875rem]">Email</span>
              <span className="font-titulo text-[0.9375rem] font-semibold [overflow-wrap:anywhere]">{contacto.email}</span>
            </a>
            <div className="casilla flex-[1_1_100%] px-3 py-2.5">
              <div className="rotulo text-[0.6875rem]">Dirección</div>
              <div className="mt-0.5 font-semibold">{direccionLinea(contacto.direccion)}</div>
              <a href={urlComoLlegar(contacto)} target="_blank" rel="noopener noreferrer" className="enlace-parte">
                Cómo llegar →
              </a>
            </div>
            {zonas.length > 0 && (
              <div className="casilla flex-[1_1_100%] px-3 py-2.5">
                <div className="rotulo text-[0.6875rem]">Zona de servicio</div>
                <p className="mt-1 font-titulo text-sm leading-[1.7]">{zonas.join(" · ")}</p>
              </div>
            )}
          </div>
        </section>

        <section id="horario" aria-labelledby="h2-horario">
          <Encabezado n="03" rotulo="Horario" />
          <h2 id="h2-horario" className="sr-only">
            Horario
          </h2>
          <table className="w-full max-w-[560px] border-collapse border border-texto bg-superficie">
            <tbody>
              {formatearHorario(contacto.horario).map((h) => (
                <tr key={h.dias} className="border-b border-borde">
                  <th scope="row" className="p-3 text-left font-semibold">
                    {h.dias}
                  </th>
                  <td className="border-l border-texto p-3 text-right font-titulo text-sm">{h.horas}</td>
                </tr>
              ))}
              {contacto.urgencias24h && (
                <tr>
                  <th scope="row" className="p-3 text-left font-semibold text-primario">
                    Urgencias
                  </th>
                  <td className="border-l border-texto p-3 text-right font-titulo text-sm font-bold text-primario">24 h</td>
                </tr>
              )}
            </tbody>
          </table>
          {contacto.fichaGoogle && (
            <a href={contacto.fichaGoogle} target="_blank" rel="noopener noreferrer" className="enlace-parte mt-3">
              Ver la ficha de Google →
            </a>
          )}
        </section>
      </div>
    </Marco>
  );
}
