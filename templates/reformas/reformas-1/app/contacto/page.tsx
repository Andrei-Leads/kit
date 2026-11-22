import type { Metadata } from "next";
import { formatearHorario, listaY, metadatosPagina, urlComoLlegar } from "@andrei-leads/core";

import config from "@/site.config";
import { Pareja } from "@/components/Botones";
import { mensajeInicio } from "@/lib/mensajes";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/contacto", titulo: "Contacto" });

/**
 * /contacto (encargo §7, tablero Contacto): botones grandes, horario en tabla con filetes,
 * dirección con «Cómo llegar» (enlace a Google Maps, nunca un mapa incrustado), correo, zonas y
 * la ficha de Google.
 */
export default function Page() {
  const { contacto, zonas } = config;
  const horario = formatearHorario(contacto.horario);
  return (
    <>
      <span data-pagina="contacto" hidden />
      <section className="contenedor pt-[clamp(32px,5vw,72px)] pb-[clamp(48px,7vw,104px)]">
        <h1 className="titulo-display">Contacto</h1>
        <p className="mt-5 max-w-[44ch] text-texto-suave">
          {contacto.whatsapp ? "Escríbenos con fotos y medidas, o llama." : "Llámanos y cuéntanos qué quieres reformar."}
        </p>
        <Pareja
          cta={{ telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje: mensajeInicio(contacto) }}
          numeroEnLlamar
          claseBoton="min-h-[60px] text-[17px] flex-[1_1_220px]"
          className="mt-7 max-w-[640px]"
        />
        <div className="mt-[clamp(40px,6vw,88px)] grid items-start gap-[clamp(32px,5vw,88px)] lg:grid-cols-2">
          <div>
            {horario.length > 0 && (
              <>
                <h2 className="versalitas mb-3">Horario</h2>
                <table className="mb-8 w-full border-collapse border-b border-filete">
                  <tbody>
                    {horario.map((h) => (
                      <tr key={h.dias} className="border-t border-filete">
                        <th scope="row" className="py-3.5 pr-3 text-left align-baseline font-titulo text-xl font-normal">
                          {h.dias}
                        </th>
                        <td className="py-3.5 text-right align-baseline text-base">{h.horas}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
            <h2 className="versalitas mb-3">Dónde estamos</h2>
            <p className="mb-1.5 font-titulo text-[22px] leading-[1.3]">
              {contacto.direccion.calle}
              <br />
              {contacto.direccion.cp} {contacto.direccion.ciudad}
            </p>
            <a href={urlComoLlegar(contacto)} className="enlace inline-flex min-h-11 items-center">
              Cómo llegar
            </a>
          </div>
          <div>
            <h2 className="versalitas mb-3">Correo</h2>
            <a href={`mailto:${contacto.email}`} className="inline-block py-1.5 font-titulo text-[clamp(1.25rem,1rem+1vw,1.625rem)] underline underline-offset-4 [overflow-wrap:anywhere]">
              {contacto.email}
            </a>
            {zonas.length > 0 && (
              <>
                <h2 className="versalitas mt-8 mb-3">Zonas</h2>
                <p className="font-titulo text-xl leading-[1.35]">Trabajamos en {listaY(zonas)}.</p>
              </>
            )}
            {contacto.fichaGoogle && (
              <a href={contacto.fichaGoogle} className="enlace mt-4 inline-flex min-h-11 items-center">
                Ver la ficha de Google
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
