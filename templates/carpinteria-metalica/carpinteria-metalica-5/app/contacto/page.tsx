import type { Metadata } from "next";
import { BotonLlamada, direccionLinea, formatearHorario, listaY, metadatosPagina, telefonoVisible, urlComoLlegar } from "@andrei-leads/core";

import config from "@/site.config";
import { Pareja } from "@/components/Pareja";
import { mensajeInicio, TEXTO_WA } from "@/lib/mensajes";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/contacto", titulo: "Contacto" });

const BLOQUE = "border-t border-anodizado pt-5";
const H2 = "m-0 mb-2.5 text-xs font-medium tracking-[0.12em] text-texto-suave uppercase";

/**
 * /contacto (encargo §7): el teléfono en display serif como `BotonLlamada` y la pareja arriba
 * del todo; debajo, email, taller con «Cómo llegar» (enlace, nunca un mapa), horario y zonas.
 */
export default function Page() {
  const c = config.contacto;
  const cta = { telefono: c.telefono, whatsapp: c.whatsapp, mensaje: mensajeInicio(c) };
  const horario = formatearHorario(c.horario);
  return (
    <section aria-labelledby="titulo-pagina" className="contenedor pt-[clamp(40px,6vw,96px)]">
      <h1 id="titulo-pagina" className="versalitas">
        Contacto
      </h1>
      <BotonLlamada
        telefono={c.telefono}
        className="mt-4 inline-block font-titulo text-[clamp(3rem,1.6rem+6vw,8rem)] leading-none font-[350] tracking-[-0.02em] whitespace-nowrap text-texto no-underline hover:italic"
      >
        {telefonoVisible(c.telefono)}
      </BotonLlamada>
      <Pareja cta={cta} textoWhatsapp={TEXTO_WA} alto={56} className="mt-8 max-w-[640px]" />
      <div className="mt-[clamp(64px,9vw,128px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-x-[clamp(24px,4vw,64px)] gap-y-10">
        <div className={BLOQUE}>
          <h2 className={H2}>Email</h2>
          <a href={`mailto:${c.email}`} className="-my-2 inline-block max-w-full py-2 font-titulo text-[22px] leading-[1.3] break-words underline decoration-1 underline-offset-[5px]">
            {c.email}
          </a>
        </div>
        <div className={BLOQUE}>
          <h2 className={H2}>Taller</h2>
          <p className="m-0 font-titulo text-[22px] leading-[1.35]">{direccionLinea(c.direccion, { provincia: c.direccion.provincia !== c.direccion.ciudad })}</p>
          <a href={urlComoLlegar(c)} target="_blank" rel="noopener noreferrer" className="enlace mt-1.5">
            Cómo llegar
          </a>
        </div>
        {horario.length > 0 && (
          <div className={BLOQUE}>
            <h2 className={H2}>Horario</h2>
            {horario.map((h) => (
              <p key={h.dias} className="m-0 mb-1.5 flex justify-between gap-4 text-base">
                <span>{h.dias}</span>
                <span className="text-texto-suave">{h.horas}</span>
              </p>
            ))}
          </div>
        )}
        {(config.zonas.length > 0 || c.fichaGoogle) && (
          <div className={BLOQUE}>
            <h2 className={H2}>Zonas</h2>
            {config.zonas.length > 0 && <p className="m-0 text-base text-texto-medio">{listaY(config.zonas)}</p>}
            {c.fichaGoogle && (
              <a href={c.fichaGoogle} target="_blank" rel="noopener noreferrer" className="enlace mt-1.5">
                Nuestra ficha en Google
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
