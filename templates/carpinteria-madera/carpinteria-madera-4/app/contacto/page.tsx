import type { ReactNode } from "react";
import type { Metadata } from "next";
import {
  BotonLlamada,
  BotonWhatsApp,
  direccionLinea,
  formatearHorario,
  listaY,
  mediaVisible,
  metadatosPagina,
  telefonoVisible,
  urlComoLlegar,
} from "@andrei-leads/core";

import config from "@/site.config";
import { Migas } from "@/components/base/Migas";
import { Pareja } from "@/components/Botones";
import { MarcaPagina } from "@/components/CabeceraPagina";
import { mensajeInicio } from "@/lib/mensajes";
import { horarioLinea } from "@/lib/piezas";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/contacto", titulo: "Contacto" });

const ENLACE = "ft inline-flex min-h-11 items-center text-base tracking-[0.04em] text-texto underline underline-offset-4";

type Fila = { k: string; v: ReactNode; enlace?: ReactNode };

/**
 * /contacto (entrega §07): `h1`, la pareja grande (64 px), el teléfono enorme subrayado, el horario
 * en una línea y la tabla de datos con líneas negras (teléfono, WhatsApp, email, dirección con
 * «Cómo llegar», horario, zonas y ficha de Google), cada fila con su acción. Sin CTA final.
 */
export default function Page() {
  const { contacto, zonas, valoracion } = config;
  const mensaje = mensajeInicio(contacto);
  const tel = telefonoVisible(contacto.telefono);
  const horario = formatearHorario(contacto.horario);

  const filas: Fila[] = [
    {
      k: "Teléfono",
      v: tel,
      enlace: (
        <BotonLlamada telefono={contacto.telefono} className={ENLACE}>
          Llamar<span aria-hidden="true">&nbsp;→</span>
        </BotonLlamada>
      ),
    },
    ...(contacto.whatsapp
      ? [
          {
            k: "WhatsApp",
            v: telefonoVisible(contacto.whatsapp),
            enlace: (
              <BotonWhatsApp numero={contacto.whatsapp} mensaje={mensaje} className={ENLACE}>
                Escribir por WhatsApp<span aria-hidden="true">&nbsp;→</span>
              </BotonWhatsApp>
            ),
          },
        ]
      : []),
    {
      k: "Email",
      v: contacto.email,
      enlace: (
        <a href={`mailto:${contacto.email}`} className={ENLACE}>
          Enviar un email<span aria-hidden="true">&nbsp;→</span>
        </a>
      ),
    },
    {
      k: "Dirección",
      v: direccionLinea(contacto.direccion),
      enlace: (
        <a href={urlComoLlegar(contacto)} target="_blank" rel="noopener" className={ENLACE}>
          Cómo llegar<span aria-hidden="true">&nbsp;→</span>
          <span className="sr-only"> (abre Google Maps)</span>
        </a>
      ),
    },
    ...(horario.length > 0
      ? [
          {
            k: "Horario",
            v: (
              <>
                {horario.map((l) => (
                  <span key={l.dias} className="block">
                    {l.dias} · {l.horas}
                  </span>
                ))}
              </>
            ),
          },
        ]
      : []),
    ...(zonas.length > 0 ? [{ k: "Zonas", v: listaY(zonas) }] : []),
    ...(contacto.fichaGoogle
      ? [
          {
            k: "Google",
            v: valoracion ? `${mediaVisible(valoracion.media)} · ${valoracion.total} ${valoracion.total === 1 ? "reseña" : "reseñas"} en Google` : "Ficha de Google",
            enlace: (
              <a href={contacto.fichaGoogle} target="_blank" rel="noopener" className={ENLACE}>
                Ver la ficha<span aria-hidden="true">&nbsp;→</span>
              </a>
            ),
          },
        ]
      : []),
  ];

  return (
    <section className="contenedor flex flex-col gap-[22px] pt-1">
      <MarcaPagina pagina="contacto" />
      <div className="flex flex-col gap-1.5">
        <Migas
          migas={[
            { href: "/", texto: "Inicio" },
            { href: "/contacto", texto: "Contacto" },
          ]}
        />
        <h1 className="titulo-display m-0">Contacto</h1>
      </div>
      <Pareja telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensaje} textoWhatsapp="Escribir por WhatsApp" textoLlamar="Llamar ahora" tamano="grande" />
      <BotonLlamada
        telefono={contacto.telefono}
        className="ft inline-flex min-h-11 items-center self-start text-[clamp(2.75rem,1.5rem+5.4vw,8rem)] leading-[0.9] text-texto underline decoration-4 underline-offset-8 [@media(hover:hover)]:hover:decoration-primario"
      >
        {tel}
      </BotonLlamada>
      {horario.length > 0 && <p className="pie-ficha m-0 text-sm text-texto-suave">{horarioLinea(contacto.horario)}</p>}
      <dl className="m-0 max-w-[1000px] border-t-2 border-borde">
        {filas.map((f) => (
          <div key={f.k} className="grid grid-cols-[minmax(0,1fr)_minmax(0,2.6fr)] items-baseline gap-3 border-b-2 border-borde py-2.5">
            <dt className="pie-ficha text-texto-suave">{f.k}</dt>
            <dd className="m-0 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="ft text-xl leading-[1.15] [overflow-wrap:anywhere]">{f.v}</span>
              {f.enlace}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
