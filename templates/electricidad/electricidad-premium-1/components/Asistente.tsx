"use client";

import { useState, useSyncExternalStore } from "react";
import { BotonWhatsApp } from "@andrei-leads/core";

/*
 * Isla del asistente de WhatsApp (encargo §6.9). Tres preguntas con botones
 * que solo componen el mensaje precargado de BotonWhatsApp: no guarda ni envía
 * nada. Recibe los datos como props; no importa site.config. Único valor de
 * core en el navegador: BotonWhatsApp (core ≥ 0.5.1 no arrastra zod).
 */
const DONDE: Record<string, string> = {
  Piso: "en un piso",
  "Chalet o adosado": "en un chalet o adosado",
  Local: "en un local",
  "Garaje comunitario": "en un garaje comunitario",
};
const CUANDO: Record<string, string> = {
  "Este mes": "para este mes",
  "En 1–3 meses": "para dentro de 1–3 meses",
  "Estoy comparando presupuestos": "sin fecha todavía (estoy comparando presupuestos)",
};

const opcion =
  "boton inline-flex min-h-12 items-center rounded-tarjeta border px-4 text-[15px] leading-tight aria-pressed:border-acento aria-pressed:text-acento";
const senal =
  "boton inline-flex min-h-14 items-center justify-center gap-2.5 rounded-boton bg-primario px-7 text-[17px] font-medium text-sobre-primario no-underline hover:bg-primario-hover";

function minuscula(t: string) {
  return t.length > 1 && /[A-ZÁÉÍÓÚÑ]/.test(t[1]) ? t : t.charAt(0).toLowerCase() + t.slice(1);
}

type Props = { servicios: readonly string[]; whatsapp: string; mensajeBase: string };

export function Asistente({ servicios, whatsapp, mensajeBase }: Props) {
  const [que, setQue] = useState<string>();
  const [donde, setDonde] = useState<string>();
  const [cuando, setCuando] = useState<string>();
  const partes = [que && minuscula(que), donde && DONDE[donde], cuando && CUANDO[cuando]].filter(Boolean);
  const mensaje = partes.length ? `${mensajeBase} ${partes.join(", ")}.` : mensajeBase;
  const hechas = [que, donde, cuando].filter(Boolean).length;
  // Sin JS (y hasta hidratar) cada opción es un BotonWhatsApp con esa sola respuesta:
  // así ningún botón queda muerto. Misma caja, así que no salta al hidratar.
  const hidratado = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const pregunta = (
    n: number,
    titulo: string,
    opciones: readonly string[],
    valor: string | undefined,
    poner: (v?: string) => void,
    parte: (o: string) => string,
  ) => (
    <fieldset className="m-0 border-0 p-0">
      <legend className="mb-3 flex items-baseline gap-2.5 text-lg">
        <span className="etiqueta text-acento">{n}</span>
        {titulo}
      </legend>
      <div className="flex flex-wrap gap-2">
        {opciones.map((o) =>
          !hidratado ? (
            <BotonWhatsApp key={o} numero={whatsapp} mensaje={`${mensajeBase} ${parte(o)}.`} className={`${opcion} border-borde text-texto no-underline`}>
              {o}
            </BotonWhatsApp>
          ) : (
            <button
              key={o}
              type="button"
              aria-pressed={valor === o}
              onClick={() => poner(valor === o ? undefined : o)}
              className={`${opcion} ${valor === o ? "" : "border-borde text-texto"}`}
            >
              {o}
            </button>
          ),
        )}
      </div>
    </fieldset>
  );

  return (
    <div className="flex flex-col gap-8 border-t border-[var(--color-linea)]">
      <div aria-hidden="true" className="-mt-px h-px w-full">
        <div className="progreso h-px bg-acento" style={{ transform: `scaleX(${hechas / 3})` }} />
      </div>
      {pregunta(1, "¿Qué necesitas?", [...servicios.slice(0, 6), "Otra cosa"], que, setQue, minuscula)}
      {pregunta(2, "¿Dónde?", Object.keys(DONDE), donde, setDonde, (o) => DONDE[o])}
      {pregunta(3, "¿Para cuándo?", Object.keys(CUANDO), cuando, setCuando, (o) => CUANDO[o])}
      <div className="border border-[var(--color-linea)] p-5">
        <p className="etiqueta m-0 mb-2 text-acento">Tu mensaje</p>
        <p className="m-0" aria-live="polite">
          {mensaje}
        </p>
      </div>
      <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={`${senal} self-start`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true" className="size-5 flex-none">
          <path d="M3.5 20.5l1.4-4.2A8.5 8.5 0 1 1 8 19.3z" />
        </svg>
        Enviar por WhatsApp
      </BotonWhatsApp>
    </div>
  );
}
