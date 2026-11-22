import type { Metadata } from "next";
import { formatearHorario, listaY, metadatosPagina, telefonoVisible, urlComoLlegar } from "@andrei-leads/core";

import config from "@/site.config";
import { EnlaceFlecha } from "@/components/EnlaceFlecha";
import { Luz } from "@/components/Luz";
import { ParejaCta } from "@/components/ParejaCta";
import { mensajeInicio, TEXTO_WA_CORTO } from "@/lib/mensajes";
import { confianzaHorario } from "@/lib/textos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/contacto", titulo: "Contacto" });

const DT = "etiqueta m-0 text-sobre-tinta-suave";
const FILA = "border-b border-borde-tinta py-5";

/**
 * /contacto (encargo §7): oscura. Arriba del todo, el `h1` corto y la pareja en grande
 * (WhatsApp de 64 px + `boton-telefono` con el número en Hanken 300 a 28 px) con el horario
 * como confianza. Después, email, taller con «Cómo llegar →» (enlace, nunca un mapa
 * incrustado), horario y zonas; `Luz` a la derecha en escritorio.
 */
export default function Page() {
  const c = config.contacto;
  const cta = { telefono: c.telefono, whatsapp: c.whatsapp, mensaje: mensajeInicio(c) };
  const horario = formatearHorario(c.horario);
  return (
    <section data-tono="oscuro" aria-labelledby="titulo-pagina" className="bg-tinta text-sobre-tinta">
      <div className="contenedor rejilla gap-y-14 pt-[88px] pb-[var(--seccion)] lg:pt-36">
        <div className="lg:col-[1/8]">
          <p className="etiqueta text-sobre-tinta-suave">Contacto</p>
          <h1 id="titulo-pagina" className="titulo-h1 mt-3">
            Hablemos de tu <em>ventana</em>.
          </h1>
          <ParejaCta
            cta={cta}
            textoWhatsapp={TEXTO_WA_CORTO}
            textoLlamar={telefonoVisible(c.telefono)}
            telefonoGrande
            tono="oscuro"
            tamano={64}
            apilar
            confianza={confianzaHorario(c.horario)}
            className="mt-7 max-w-[640px]"
          />
          <dl className="m-0 mt-14 grid gap-x-8 border-t border-borde-tinta lg:grid-cols-2">
            <div className={FILA}>
              <dt className={DT}>Email</dt>
              <dd className="m-0 mt-2 text-[17px]">
                <a href={`mailto:${c.email}`} className="break-all underline decoration-1 underline-offset-[5px]">
                  {c.email}
                </a>
              </dd>
            </div>
            <div className={FILA}>
              <dt className={DT}>Taller</dt>
              <dd className="m-0 mt-2 text-[17px] leading-normal">
                {c.direccion.calle}
                <br />
                {c.direccion.cp} {c.direccion.ciudad} ({c.direccion.provincia})
                <br />
                <EnlaceFlecha href={urlComoLlegar(c)} externo className="text-sobre-tinta">
                  Cómo llegar
                </EnlaceFlecha>
                
              </dd>
            </div>
            {horario.length > 0 && (
              <div className={FILA}>
                <dt className={DT}>Horario</dt>
                <dd className="m-0 mt-2">
                  {horario.map((h) => (
                    <p key={h.dias} className="m-0 mb-1 text-[17px] leading-normal">
                      {h.dias} · {h.horas}
                    </p>
                  ))}
                </dd>
              </div>
            )}
            {config.zonas.length > 0 && (
              <div className={FILA}>
                <dt className={DT}>Zonas</dt>
                <dd className="m-0 mt-2 text-[17px] leading-normal text-pretty">{listaY(config.zonas)}</dd>
              </div>
            )}
          </dl>
          {c.fichaGoogle && (
            <EnlaceFlecha href={c.fichaGoogle} externo className="mt-5 text-sobre-tinta">
              Ver la ficha en Google
            </EnlaceFlecha>
          )}
        </div>
        <div className="hidden lg:col-[9/13] lg:mt-10 lg:block lg:self-start">
          <Luz cristales={4} tono="oscuro" />
        </div>
      </div>
    </section>
  );
}
