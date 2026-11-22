"use client";

import { useState, type ReactNode } from "react";
import { BotonWhatsApp } from "@andrei-leads/core";
import clsx from "clsx";

/** Lo justo de cada servicio para el asistente: los datos llegan como props desde el servidor. */
export type OpcionPieza = { slug: string; titulo: string };

type Props = {
  piezas: readonly OpcionPieza[];
  whatsapp: string;
  /** Mensaje si no se elige nada (el de `contacto.mensajeWhatsapp` o el del template). */
  mensajePorDefecto: string;
  /** Clases del botón de WhatsApp (variante `relleno` + `grande` del template). */
  claseWhatsapp: string;
  /** Icono del botón de WhatsApp (componente de servidor). */
  icono: ReactNode;
  /** Botón de llamada (componente de servidor), al lado del de WhatsApp. */
  llamar: ReactNode;
};

/** Frases fijas del encargo (§3): etiqueta del botón y frase que entra en el mensaje. */
const CANTIDADES = [
  ["Una", "Es una pieza."],
  ["Entre 2 y 4", "Son entre 2 y 4 piezas."],
  ["5 o más", "Son 5 piezas o más."],
] as const;
const DONDE = [
  ["Puedo llevarla al taller", "Puedo llevarla al taller."],
  ["Habría que recogerla", "Habría que recogerla."],
  ["Está fija en casa", "Está fija en casa (puerta, tarima o ventana)."],
] as const;

const OPCION =
  "boton min-h-12 rounded-boton border-[1.5px] px-[18px] text-base font-[560] [-webkit-tap-highlight-color:transparent]";
const ACTIVA = "border-texto bg-texto text-fondo";
const INACTIVA = "border-borde bg-transparent text-texto hover:border-texto";

function Grupo({
  titulo,
  opciones,
  elegida,
  alElegir,
}: {
  titulo: string;
  opciones: readonly string[];
  elegida: number | null;
  alElegir: (i: number) => void;
}) {
  return (
    <fieldset className="paso-asistente m-0 min-w-0 border-0 p-0">
      <legend className="mb-2.5 font-semibold">{titulo}</legend>
      <div className="flex flex-wrap gap-2">
        {opciones.map((o, i) => (
          <button
            key={o}
            type="button"
            aria-pressed={elegida === i}
            onClick={() => alElegir(i)}
            className={clsx(OPCION, elegida === i ? ACTIVA : INACTIVA)}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

/**
 * Asistente «Cuéntanos qué pieza tienes» (encargo §6.7): tres preguntas con botones que solo
 * componen el `mensaje` de WhatsApp. No guarda ni envía nada. Sin JavaScript, las preguntas se
 * ocultan (`scripting: none`) y queda el botón con el mensaje por defecto, que ya va en el HTML.
 * Con un solo servicio, la primera pregunta sobra y no sale.
 */
export function AsistentePieza({ piezas, whatsapp, mensajePorDefecto, claseWhatsapp, icono, llamar }: Props) {
  const [pieza, setPieza] = useState<number | null>(null);
  const [cantidad, setCantidad] = useState<number | null>(null);
  const [donde, setDonde] = useState<number | null>(null);
  const conPieza = piezas.length > 1;
  const elegida = conPieza && pieza !== null ? piezas[pieza] : piezas.length === 1 ? piezas[0] : undefined;
  const algoElegido = (conPieza && pieza !== null) || cantidad !== null || donde !== null;
  const mensaje = algoElegido
    ? [
        `Hola, quiero ${elegida ? elegida.titulo.toLocaleLowerCase("es") : "restaurar una pieza"}.`,
        cantidad !== null ? CANTIDADES[cantidad][1] : "",
        donde !== null ? DONDE[donde][1] : "",
        "Os mando una foto.",
      ]
        .filter(Boolean)
        .join(" ")
    : mensajePorDefecto;
  let n = 0;
  return (
    <>
      <div className="mt-7 flex flex-col gap-6 [@media(scripting:none)]:hidden">
        {conPieza && (
          <Grupo titulo={`${++n} · ¿Qué quieres recuperar?`} opciones={piezas.map((p) => p.titulo)} elegida={pieza} alElegir={setPieza} />
        )}
        <Grupo titulo={`${++n} · ¿Cuántas piezas?`} opciones={CANTIDADES.map((c) => c[0])} elegida={cantidad} alElegir={setCantidad} />
        <Grupo titulo={`${++n} · ¿Dónde está?`} opciones={DONDE.map((c) => c[0])} elegida={donde} alElegir={setDonde} />
        <div className="rounded-[18px_18px_18px_40px] bg-fondo px-5 py-[18px]">
          <p className="mb-1.5 text-[13px] tracking-[0.06em] text-texto-suave uppercase">Tu mensaje</p>
          <p aria-live="polite" className="text-[17px] text-pretty">
            «{mensaje}»
          </p>
        </div>
      </div>
      <p className="mt-4 hidden text-entrada text-texto-suave [@media(scripting:none)]:block">Dinos qué pieza, cuántas y dónde está.</p>
      <div className="mt-6 flex max-w-[620px] flex-wrap gap-2.5">
        <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={clsx(claseWhatsapp, "flex-[1_1_260px]")}>
          {icono}
          <span>Enviar por WhatsApp</span>
        </BotonWhatsApp>
        {llamar}
      </div>
    </>
  );
}
