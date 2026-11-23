"use client";

import { useState, type ReactNode } from "react";
import { BotonWhatsApp } from "@andrei-leads/core";
// clsx y no cn(): cn arrastra tailwind-merge (~9 KB gzip) al navegador.
import { clsx } from "clsx";

type Props = {
  /** Títulos de los servicios (los datos llegan como props desde el servidor). */
  piezas: readonly string[];
  whatsapp: string;
  /** Mensaje si no se elige nada (`contacto.mensajeWhatsapp` o el del template). */
  mensajePorDefecto: string;
  /** Clases del botón de WhatsApp (variante `hero-relleno` del template). */
  claseWhatsapp: string;
  /** Icono del botón de WhatsApp (componente de servidor). */
  icono: ReactNode;
  /** Botón de llamada (componente de servidor), al lado del de WhatsApp. */
  llamar: ReactNode;
};

/** Frases fijas del encargo §3: [botón, frase que entra en el mensaje]. */
const ESTANCIAS = [
  ["La cocina", "Es para la cocina."],
  ["El dormitorio", "Es para el dormitorio."],
  ["El salón", "Es para el salón."],
  ["El baño", "Es para el baño."],
  ["La entrada", "Es para la entrada."],
  ["Otra parte de la casa", "Es para otra parte de la casa."],
] as const;
const PLAZOS = [
  ["Lo necesito este mes", "Lo necesito este mes."],
  ["Sería para dentro de 2 o 3 meses", "Sería para dentro de 2 o 3 meses."],
  ["No tengo prisa", "No tengo prisa."],
] as const;

/** Minúscula inicial salvo siglas, como `minusculaInicial` de core (sin importarla en el cliente). */
const minInicial = (t: string) => (t.length > 1 && /[A-ZÁÉÍÓÚÑ]/.test(t[1]) ? t : t.charAt(0).toLocaleLowerCase("es") + t.slice(1));

const OPCION = "min-h-11 border border-texto px-4 text-[15px] leading-tight font-medium active:scale-[.97]";

function Grupo({
  titulo,
  opciones,
  elegida,
  alElegir,
}: {
  titulo: string;
  opciones: readonly string[];
  elegida: number | null;
  alElegir: (i: number | null) => void;
}) {
  return (
    <fieldset className="m-0 grid min-w-0 gap-3 border-0 p-0">
      <legend className="mb-3 font-titulo text-xl leading-[1.2] italic">{titulo}</legend>
      <div className="flex flex-wrap gap-2">
        {opciones.map((o, i) => (
          <button
            key={o}
            type="button"
            aria-pressed={elegida === i}
            onClick={() => alElegir(elegida === i ? null : i)}
            className={clsx(OPCION, elegida === i ? "bg-texto text-superficie" : "bg-transparent text-texto hover:bg-alterna")}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

/**
 * Asistente «Cuéntanos tu hueco» (encargo §6.7): qué pieza, para qué estancia y para cuándo. Los
 * botones solo componen el `mensaje` de WhatsApp; no guarda ni envía nada. Con un solo servicio,
 * la primera pregunta sobra. Sin JavaScript, las preguntas se ocultan (`scripting: none`) y quedan
 * la frase guía y el botón con el mensaje general, que ya va en el HTML.
 */
export function Asistente({ piezas, whatsapp, mensajePorDefecto, claseWhatsapp, icono, llamar }: Props) {
  const [pieza, setPieza] = useState<number | null>(null);
  const [estancia, setEstancia] = useState<number | null>(null);
  const [plazo, setPlazo] = useState<number | null>(null);
  const conPieza = piezas.length > 1;
  const titulo = conPieza ? (pieza !== null ? piezas[pieza] : undefined) : piezas[0];
  const algoElegido = (conPieza && pieza !== null) || estancia !== null || plazo !== null;
  // «Quiero presupuesto para {servicio}.» y el resto como frases aparte: se lee bien con cualquier título.
  const mensaje = algoElegido
    ? [
        `Hola, quiero presupuesto para ${titulo ? minInicial(titulo) : "un mueble a medida"}.`,
        estancia !== null ? ESTANCIAS[estancia][1] : "",
        plazo !== null ? PLAZOS[plazo][1] : "",
        "Os mando fotos y medidas.",
      ]
        .filter(Boolean)
        .join(" ")
    : mensajePorDefecto;
  let n = 0;
  return (
    <>
      <div className="grid gap-8 [@media(scripting:none)]:hidden">
        {conPieza && <Grupo titulo={`${++n} · Qué pieza`} opciones={piezas} elegida={pieza} alElegir={setPieza} />}
        <Grupo titulo={`${++n} · Para qué estancia`} opciones={ESTANCIAS.map((e) => e[0])} elegida={estancia} alElegir={setEstancia} />
        <Grupo titulo={`${++n} · Para cuándo`} opciones={PLAZOS.map((p) => p[0])} elegida={plazo} alElegir={setPlazo} />
      </div>
      <p className="hidden font-titulo text-[clamp(1.25rem,1.1rem+0.6vw,1.6rem)] leading-[1.35] italic [@media(scripting:none)]:block">
        Dinos qué pieza, para qué estancia y para cuándo.
      </p>
      <div className="grid gap-5 border-t border-filete pt-6">
        <p
          key={mensaje}
          aria-live="polite"
          className="paso-asistente max-w-[52ch] font-titulo text-[clamp(1.25rem,1.1rem+0.6vw,1.6rem)] leading-[1.35] italic [@media(scripting:none)]:hidden"
        >
          «{mensaje}»
        </p>
        <div className="flex w-full max-w-[680px] flex-wrap gap-3">
          <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={clsx(claseWhatsapp, "flex-[1.4_1_250px]")}>
            {icono}
            <span>Enviar por WhatsApp</span>
          </BotonWhatsApp>
          {llamar}
        </div>
      </div>
    </>
  );
}
