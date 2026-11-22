import type { Metadata } from "next";
import { BotonLlamada, formatearHorario, listaY, metadatosPagina, telefonoVisible, urlComoLlegar } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { Migas } from "@/components/base/Migas";
import { mensajeInicio } from "@/lib/mensajes";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/contacto", titulo: "Contacto" });

const TARJETA = "min-w-0 flex-[1_1_300px] rounded-tarjeta border border-borde bg-superficie p-7";

/**
 * /contacto (encargo §7): migas, h1, la pareja arriba y el teléfono a tamaño display (también un
 * enlace `tel:`). Debajo, tres bloques: horario, taller (dirección, «Cómo llegar» y email) y zonas
 * con la ficha de Google. Sin formulario ni mapa incrustado.
 */
export default function Page() {
  const { contacto, zonas } = config;
  const horario = formatearHorario(contacto.horario);
  const { direccion } = contacto;
  return (
    <section className="contenedor pt-10 pb-[clamp(56px,8vw,104px)]">
      <Migas
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/contacto", texto: "Contacto" },
        ]}
      />
      <h1 className="titulo-display mt-3">Contacto</h1>
      <Pareja
        cta={{ telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje: mensajeInicio(contacto) }}
        tamano="grande"
        iconoLlamar
        className="mt-5 max-w-[640px]"
      />
      <BotonLlamada
        telefono={contacto.telefono}
        className="mt-5 inline-block text-[clamp(2rem,1.4rem+3vw,4.5rem)] leading-[1.1] font-[640] tracking-[-0.02em] text-texto underline decoration-primario decoration-[3px] underline-offset-[10px]"
      >
        {telefonoVisible(contacto.telefono)}
      </BotonLlamada>

      <div className="mt-[clamp(40px,6vw,64px)] flex flex-wrap gap-4">
        {horario.length > 0 && (
          <div className={TARJETA}>
            <h2 className="mb-3.5 text-[1.375rem] font-[640]">Horario</h2>
            <dl>
              {horario.map((h) => (
                <div key={h.dias} className="flex flex-wrap justify-between gap-x-4 gap-y-1 border-t border-borde py-2.5">
                  <dt>{h.dias}</dt>
                  <dd className="text-texto-suave">{h.horas}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
        <div className={TARJETA}>
          <h2 className="mb-3.5 text-[1.375rem] font-[640]">Taller</h2>
          <address className="not-italic">
            {direccion.calle}
            <br />
            {direccion.cp} {direccion.ciudad}
          </address>
          <a href={urlComoLlegar(contacto)} className="enlace inline-flex min-h-12 items-center">
            Cómo llegar <span aria-hidden="true">&nbsp;↗</span>
          </a>
          <p className="mt-2">
            <a href={`mailto:${contacto.email}`} className="enlace break-words">
              {contacto.email}
            </a>
          </p>
        </div>
        {(zonas.length > 0 || contacto.fichaGoogle) && (
          <div className="min-w-0 flex-[1_1_300px] px-1 py-7">
            {zonas.length > 0 && (
              <>
                <h2 className="mb-2.5 text-[1.375rem] font-[640]">Zonas</h2>
                <p className="text-texto-suave text-pretty">Trabajamos en {listaY(zonas)}.</p>
              </>
            )}
            {contacto.fichaGoogle && (
              <a href={contacto.fichaGoogle} className="enlace mt-1.5 inline-flex min-h-12 items-center">
                Nuestra ficha en Google <span aria-hidden="true">&nbsp;↗</span>
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
