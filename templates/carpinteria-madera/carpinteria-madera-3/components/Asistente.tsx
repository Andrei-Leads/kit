"use client";

import { useState, useSyncExternalStore, type ReactNode } from "react";
import { clsx } from "clsx";
// Única excepción a «nada de core en el cliente» (docs/nuevo-template.md, 6.2): el BotonWhatsApp del
// asistente, porque su mensaje cambia con cada toque. Con core ≥ 0.5.1 no arrastra zod.
import { BotonWhatsApp } from "@andrei-leads/core";

type Props = {
  /** Servicios (solo slug y título). Con uno solo, se salta la primera pregunta. */
  piezas: readonly { slug: string; titulo: string }[];
  whatsapp: string;
  /** Mensaje general del taller: el del botón sin JavaScript (y hasta hidratar). */
  mensajeGeneral: string;
  /** BotonLlamada ya pintado en el servidor (hero-contorno). */
  llamada: ReactNode;
  /** Icono de WhatsApp, pintado en el servidor. */
  icono: ReactNode;
};

const LUGARES = [
  { v: "interior", texto: "Interior" },
  { v: "exterior", texto: "Exterior" },
] as const;
const MEDIDAS = [
  { v: "si", texto: "Sí, las tengo", frase: "Tengo las medidas." },
  { v: "aprox", texto: "Aproximadas", frase: "Tengo medidas aproximadas." },
  { v: "no", texto: "Aún no", frase: "Aún no he medido." },
] as const;

const sinSuscripcion = () => () => {};

/** Minúscula inicial salvo siglas (la de core, sin importarla aquí para no meter más módulos en el cliente). */
const min = (t: string) => (t.length > 1 && /[A-ZÁÉÍÓÚÑ]/.test(t[1]) ? t : t.charAt(0).toLowerCase() + t.slice(1));

/**
 * Asistente «Tu encargo en tres preguntas» (encargo §6.7): pieza (servicios), dentro o fuera, y si
 * tienes medidas, en recuadros de 1 px. Solo compone el `mensaje` de BotonWhatsApp («Buenas. Quiero
 * presupuesto para {servicio}. Es para {interior|exterior}. {medidas} Os paso fotos.»): no guarda ni envía nada. Un segundo
 * toque en la opción marcada la desmarca.
 *
 * Sin JavaScript (y hasta hidratar): la caja con las tres preguntas como texto guía y un único
 * BotonWhatsApp con el mensaje general (encargo §5); los botones de opción solo se pintan al hidratar.
 */
export function Asistente({ piezas, whatsapp, mensajeGeneral, llamada, icono }: Props) {
  const hidratado = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  const unica = piezas.length === 1 ? piezas[0] : undefined;
  const [sel, setSel] = useState<{ pieza?: string; lugar?: string; medidas?: string }>({});
  const pieza = unica ?? piezas.find((p) => p.slug === sel.pieza);
  const medidas = MEDIDAS.find((m) => m.v === sel.medidas);

  const mensaje = hidratado
    ? `Buenas. Quiero presupuesto para ${pieza ? min(pieza.titulo) : "un trabajo de carpintería"}.${sel.lugar ? ` Es para ${sel.lugar}.` : ""}${medidas ? ` ${medidas.frase}` : ""} Os paso fotos.`
    : mensajeGeneral;

  const elegir = (clave: "pieza" | "lugar" | "medidas", v: string) => setSel((s) => ({ ...s, [clave]: s[clave] === v ? undefined : v }));
  const opcion = (on: boolean) =>
    clsx(
      "min-h-11 cursor-pointer rounded-boton border border-tinta px-3.5 py-2 text-left text-[0.9375rem] leading-[1.25]",
      on ? "bg-texto text-fondo" : "bg-transparent text-texto",
    );

  const grupos = [
    ...(unica
      ? []
      : [
          {
            clave: "pieza" as const,
            titulo: "¿Qué pieza?",
            opciones: piezas.map((p) => ({ v: p.slug, texto: p.titulo })),
          },
        ]),
    { clave: "lugar" as const, titulo: "¿Va dentro o fuera?", opciones: LUGARES.map((l) => ({ v: l.v, texto: l.texto })), nota: "Fuera usamos maderas que aguantan el sol." },
    { clave: "medidas" as const, titulo: "¿Tienes medidas?", opciones: MEDIDAS.map((m) => ({ v: m.v, texto: m.texto })) },
  ];

  return (
    <div>
      {hidratado ? (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-4">
          {grupos.map((g, i) => (
            <div key={g.clave} role="group" aria-labelledby={`asistente-${g.clave}`} className="flex flex-col gap-3.5 border border-tinta p-5">
              <p id={`asistente-${g.clave}`} className="font-titulo text-[13px] font-semibold tracking-[0.04em]">
                <span className="text-lapiz">{i + 1} ·</span> {g.titulo}
              </p>
              <div className="flex flex-wrap gap-2">
                {g.opciones.map((o) => {
                  const on = sel[g.clave] === o.v;
                  return (
                    <button key={o.v} type="button" aria-pressed={on} onClick={() => elegir(g.clave, o.v)} className={opcion(on)}>
                      {o.texto}
                    </button>
                  );
                })}
              </div>
              {"nota" in g && g.nota && <p className="text-sm text-texto-suave">{g.nota}</p>}
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-tinta p-5">
          <p className="font-titulo text-[13px] font-semibold tracking-[0.04em]">
            {grupos.map((g, i) => (
              <span key={g.clave} className="mr-4 inline-block">
                <span className="text-lapiz">{i + 1} ·</span> {g.titulo}
              </span>
            ))}
          </p>
          <p className="mt-3 text-texto-suave">
            Dinos {unica ? "" : "qué pieza, "}si va dentro o fuera y si tienes medidas. Mándanos también unas fotos.
          </p>
        </div>
      )}
      {hidratado && (
        <div aria-live="polite" className="mt-4 flex flex-col gap-1.5 border border-dashed border-tinta bg-superficie px-5 py-4">
          <p className="etiqueta text-texto-suave">Mensaje que vas a enviar</p>
          <p>{mensaje}</p>
        </div>
      )}
      <div className="mt-4 flex max-w-[720px] flex-wrap gap-3">
        <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className="btn btn-relleno flex-[1.4_1_250px]">
          {icono}
          <span>Enviar por WhatsApp</span>
        </BotonWhatsApp>
        {llamada}
      </div>
    </div>
  );
}
