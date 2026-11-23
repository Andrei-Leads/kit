import type { Metadata } from "next";
import { BotonLlamada, formatearHorario, listaY, metadatosPagina, telefonoVisible, urlComoLlegar } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { mensajeInicio, TEXTO_WHATSAPP_FOTOS } from "@/lib/mensajes";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/contacto", titulo: "Contacto" });

const COLUMNA = "border-b border-filete py-6 pr-6";
const ENLACE = "enlace con-flecha inline-flex min-h-11 items-center";

/**
 * /contacto (encargo §7): h1, la pareja arriba del todo y el teléfono a tamaño display; debajo,
 * horario (`formatearHorario`), dirección con «Cómo llegar» y la ficha de Google, zonas y email.
 */
export default function Page() {
  const { contacto, zonas } = config;
  const { direccion } = contacto;
  const cta = { telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje: mensajeInicio(contacto) };
  return (
    <div data-pagina="contacto" className="marco grid gap-[clamp(40px,5vw,72px)] py-[clamp(48px,7vw,112px)]">
      <div className="grid gap-6">
        <h1 className="titulo-display">
          Hablemos de <em>tu hueco</em>
        </h1>
        <Pareja cta={cta} textoWhatsapp={TEXTO_WHATSAPP_FOTOS} />
        <BotonLlamada
          telefono={contacto.telefono}
          className="justify-self-start border-b border-filete pb-2 font-titulo text-[clamp(2.25rem,1.4rem+4vw,6rem)] leading-none tracking-[-0.02em] text-texto no-underline"
        >
          {telefonoVisible(contacto.telefono)}
        </BotonLlamada>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] border-t border-filete">
        <div className={COLUMNA}>
          <h2 className="titulo-columna">Horario</h2>
          {formatearHorario(contacto.horario).map((h) => (
            <p key={h.dias} className="mb-1.5">
              <span className="text-texto-suave">{h.dias}</span>
              <br />
              {h.horas}
            </p>
          ))}
        </div>
        <div className={COLUMNA}>
          <h2 className="titulo-columna">El taller</h2>
          <p className="mb-2">
            {direccion.calle}
            <br />
            {direccion.cp} {direccion.ciudad} ({direccion.provincia})
          </p>
          <div className="flex flex-col items-start">
            <a href={urlComoLlegar(contacto)} className={ENLACE}>
              Cómo llegar <span aria-hidden="true" className="flecha ml-1">→</span>
            </a>
            {contacto.fichaGoogle && (
              <a href={contacto.fichaGoogle} className={ENLACE}>
                Ficha de Google <span aria-hidden="true" className="flecha ml-1">→</span>
              </a>
            )}
          </div>
        </div>
        <div className={COLUMNA}>
          <h2 className="titulo-columna">{zonas.length > 0 ? "Zonas" : "Email"}</h2>
          {zonas.length > 0 && <p className="mb-3">{listaY(zonas)}.</p>}
          <a href={`mailto:${contacto.email}`} className="enlace inline-flex min-h-11 items-center [overflow-wrap:anywhere]">
            {contacto.email}
          </a>
        </div>
      </div>
    </div>
  );
}
