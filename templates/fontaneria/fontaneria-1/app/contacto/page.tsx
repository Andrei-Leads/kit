import type { Metadata } from "next";
import { BotonLlamada, horarioVisible, metadatosPagina, telefonoVisible, urlComoLlegar } from "@andrei-leads/core";

import config from "@/site.config";
import { Migas } from "@/components/base/Migas";
import { ParCta } from "@/components/ParCta";
import { mensajeInicio } from "@/lib/mensajes";
import { lineaValoracion, textoLlamar } from "@/lib/textos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/contacto", titulo: "Contacto" });

const ENLACE = "inline-flex min-h-11 items-center gap-2 font-bold text-primario-luz underline underline-offset-4";

/**
 * /contacto: el número a --text-display (es un BotonLlamada), la pareja grande, email, horario en filas
 * de tabla (con «Urgencias» si `urgencias24h`), dirección en texto + «Cómo llegar», ficha de Google y zonas.
 */
export default function Page() {
  const { contacto, zonas } = config;
  const { direccion } = contacto;
  return (
    <section className="contenedor pt-[clamp(24px,4vw,56px)] pb-[clamp(40px,6vw,80px)]">
      <Migas
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/contacto", texto: "Contacto" },
        ]}
      />
      <h1 className="condensada mt-3.5 text-h2">Contacto</h1>
      <BotonLlamada telefono={contacto.telefono} className="mt-3 block border-y-3 border-primario-luz pt-2 pb-3.5 hover:text-primario-luz">
        <span className="rotulo block text-primario-luz">Llámanos</span>
        <span className="condensada block text-display leading-[0.95] tracking-normal whitespace-nowrap tabular-nums">
          {telefonoVisible(contacto.telefono)}
        </span>
      </BotonLlamada>
      <ParCta
        className="mt-4 max-w-[680px]"
        grande
        telefono={contacto.telefono}
        whatsapp={contacto.whatsapp}
        mensaje={mensajeInicio(contacto)}
        textoLlamar={textoLlamar(contacto)}
        confianza={lineaValoracion(config)}
      />
      <p className="mt-4 text-[0.9375rem] text-texto-suave">
        Email:{" "}
        <a href={`mailto:${contacto.email}`} className="inline-flex min-h-11 items-center font-semibold text-texto underline underline-offset-4">
          {contacto.email}
        </a>
      </p>
      <div className="mt-10 flex flex-wrap gap-x-16 gap-y-9">
        <div className="min-w-0 flex-[1_1_320px]">
          <h2 className="condensada border-b-3 border-primario-luz pb-3 text-[1.75rem] leading-none">Horario</h2>
          <table className="w-full border-collapse">
            <tbody>
              {horarioVisible(contacto, "24 h, todos los días").map((h) => (
                <tr key={h.dias} className="border-b border-borde">
                  <th scope="row" className="py-3 pr-3 text-left font-normal text-texto-suave">
                    {h.dias}
                  </th>
                  <td className={h.dias === "Urgencias" && contacto.urgencias24h ? "py-3 text-right font-bold text-primario-luz" : "py-3 text-right font-semibold tabular-nums"}>
                    {h.horas}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="min-w-0 flex-[1_1_320px]">
          <h2 className="condensada border-b-3 border-primario-luz pb-3 text-[1.75rem] leading-none">Dónde estamos</h2>
          <p className="mt-3">
            {direccion.calle}
            <br />
            {direccion.cp} {direccion.ciudad}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <a href={urlComoLlegar(contacto)} target="_blank" rel="noopener" className={ENLACE}>
              Cómo llegar <span aria-hidden="true">→</span>
            </a>
            {contacto.fichaGoogle && (
              <a href={contacto.fichaGoogle} target="_blank" rel="noopener" className={ENLACE}>
                Ficha de Google <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
          {zonas.length > 0 && (
            <>
              <p className="mt-4 text-sm text-texto-suave">Trabajamos en</p>
              <p className="condensada mt-1 text-[1.375rem] leading-[1.2] uppercase">{zonas.join(" / ")}</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
