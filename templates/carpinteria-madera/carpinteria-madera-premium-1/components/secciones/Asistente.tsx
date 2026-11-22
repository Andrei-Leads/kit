"use client";

import { useState, useSyncExternalStore, type ReactNode } from "react";
import { BotonWhatsApp } from "@andrei-leads/core";

import { IconoWhatsapp } from "@/components/Iconos";

type Props = {
  /** Título del botón y el mismo título en frase («cocinas a medida»). */
  servicios: readonly { titulo: string; enFrase: string }[];
  numero: string;
  /** Mensaje genérico (sin elegir nada, o sin JS). */
  mensajeGenerico: string;
  /** `BotonLlamada` pildora-tinta pintado en el servidor. */
  llamada: ReactNode;
};

const PUNTOS = [
  ["Ya tengo el hueco medido", "Ya tengo el hueco medido."],
  ["Estoy en plena reforma", "Estoy en plena reforma."],
  ["De momento es una idea", "De momento es una idea."],
] as const;
const VISITAS = [
  ["Quiero ver muestras de madera", "Me gustaría ver muestras de madera."],
  ["Prefiero que vengáis a medir", "Prefiero que vengáis a medir."],
] as const;

const sinSuscripcion = () => () => {};
const BOTON = "boton b-tinta flex-[1.3_1_220px]";

/**
 * Asistente de WhatsApp (encargo §6.9): tres preguntas con botones de filete que
 * solo componen el mensaje de BotonWhatsApp. No guarda ni envía nada. Sin JS (o
 * antes de hidratar), un texto guía y el botón con el mensaje genérico.
 */
export function Asistente({ servicios, numero, mensajeGenerico, llamada }: Props) {
  const activo = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  const [pieza, setPieza] = useState(-1);
  const [punto, setPunto] = useState(-1);
  const [visita, setVisita] = useState(-1);
  const cuenta = [pieza, punto, visita].filter((x) => x >= 0).length;
  const mensaje =
    cuenta === 0
      ? mensajeGenerico
      : [
          // «Quiero presupuesto de»: «me interesa» no concuerda con títulos en plural («me interesa cocinas a medida»).
          `Hola, quiero presupuesto de ${pieza >= 0 ? servicios[pieza].enFrase : "una pieza a medida"}.`,
          punto >= 0 ? PUNTOS[punto][1] : "",
          visita >= 0 ? VISITAS[visita][1] : "",
          "Os mando fotos.",
        ]
          .filter(Boolean)
          .join(" ");

  const grupo = (titulo: string, opciones: readonly string[], valor: number, poner: (n: number) => void) => (
    <fieldset className="m-0 mt-7 border-0 p-0">
      <legend className="p-0 text-[15px] font-medium">{titulo}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {opciones.map((o, i) => (
          <button key={o} type="button" aria-pressed={valor === i} onClick={() => poner(valor === i ? -1 : i)} className="opcion">
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );

  return (
    <div className="flex flex-wrap items-start gap-x-[clamp(40px,6vw,96px)] gap-y-12">
      <div className="min-w-0 flex-[1_1_560px]">
        <div className="flex items-baseline justify-between gap-4">
          <p className="etiqueta m-0 text-texto-suave">Presupuesto por WhatsApp</p>
          {activo && <p className="m-0 text-xs font-medium text-texto-suave tabular-nums">{cuenta} de 3</p>}
        </div>
        <h2 className="titulo mt-4 text-h2">
          Cuéntanos tu <span className="text-destacado">pieza</span>
        </h2>
        {activo ? (
          <>
            <div aria-hidden="true" className="relative mt-6 h-px bg-borde">
              <div className="absolute inset-0 origin-left bg-tinta" style={{ transform: `scaleX(${cuenta / 3})` }} />
            </div>
            {grupo("1. ¿Qué pieza?", servicios.map((s) => s.titulo), pieza, setPieza)}
            {grupo("2. ¿En qué punto estás?", PUNTOS.map((p) => p[0]), punto, setPunto)}
            {grupo("3. ¿Muestras o medición?", VISITAS.map((v) => v[0]), visita, setVisita)}
          </>
        ) : (
          <p className="medida mt-6 text-cuerpo text-texto-suave">Dinos qué pieza, en qué punto estás y si quieres ver muestras de madera.</p>
        )}
      </div>
      <div className="max-w-[460px] flex-[1_1_340px] border-t border-tinta pt-7">
        <p className="etiqueta m-0 text-texto-suave">Tu mensaje</p>
        <p aria-live="polite" className="titulo mt-4 text-[clamp(1.375rem,1.1rem+1vw,1.75rem)] leading-[1.3]">
          «{mensaje}»
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <BotonWhatsApp numero={numero} mensaje={mensaje} className={BOTON}>
            <IconoWhatsapp />
            <span>Enviar por WhatsApp</span>
          </BotonWhatsApp>
          {llamada}
        </div>
        <p className="mt-3 text-sm text-texto-suave">No guardamos nada: solo se abre WhatsApp con este texto.</p>
      </div>
    </div>
  );
}
