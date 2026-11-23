"use client";

import { useState, useSyncExternalStore, type ReactNode } from "react";
import { BotonWhatsApp } from "@andrei-leads/core";

// clsx y no cn(): cn arrastra tailwind-merge (~9 KB gzip) al navegador.
import { clsx } from "clsx";

type Props = {
  /** `h2` de la sección, pintado en el servidor. */
  titulo: ReactNode;
  /** Títulos de `servicios` (primera pregunta). */
  soluciones: readonly string[];
  whatsapp: string;
  /** Mensaje si no se ha elegido nada (el general). */
  mensajeVacio: string;
  /** `BotonLlamada` de la pareja, pintado en el servidor. */
  llamada: ReactNode;
};

const SALUDO = "Hola, os escribo desde vuestra web.";
const OBRAS: [string, string][] = [
  ["Vivienda nueva", "una vivienda nueva"],
  ["Reforma de un piso", "la reforma de un piso"],
  ["Chalet o ático", "un chalet o ático"],
  ["Encargo de un estudio de arquitectura", "un encargo de un estudio de arquitectura"],
];
const FASES = ["Tengo planos", "La obra ya ha empezado", "Todavía es una idea"];

const sinSuscripcion = () => () => {};

/** Minúscula inicial salvo siglas (copia local: un archivo cliente no importa valores de core). */
const minuscula = (t: string) => (t.length > 1 && /[A-ZÁÉÍÓÚÑ]/.test(t[1]) ? t : t.charAt(0).toLowerCase() + t.slice(1));

/**
 * Asistente «Consulta» (encargo §5): tres preguntas con botones (`aria-pressed`; tocar otra vez
 * deselecciona) que solo componen el mensaje de WhatsApp, visible en directo en serif cursiva.
 * No pide ni guarda datos. Sin JS (y hasta hidratar), cada opción es un `BotonWhatsApp` con esa
 * sola respuesta en el mensaje (misma caja, sin salto), y el botón final lleva el mensaje general.
 */
export function Consulta({ titulo, soluciones, whatsapp, mensajeVacio, llamada }: Props) {
  const [r, setR] = useState<(number | null)[]>([null, null, null]);
  const hidratado = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  const grupos = [
    { titulo: "¿Qué solución?", opciones: soluciones },
    { titulo: "¿Para qué obra?", opciones: OBRAS.map((o) => o[0]) },
    { titulo: "¿En qué punto estás?", opciones: FASES },
  ];
  const respuestas = (rr: readonly (number | null)[]) => {
    const [s, o, f] = rr;
    return {
      sol: s !== null ? soluciones[s] : undefined,
      obra: o !== null ? OBRAS[o][1] : undefined,
      fase: f !== null ? FASES[f] : undefined,
    };
  };
  const componer = (rr: readonly (number | null)[]) => {
    const { sol, obra, fase } = respuestas(rr);
    return !sol && !obra && !fase
      ? mensajeVacio
      : [
          SALUDO,
          sol && `Os consulto por ${minuscula(sol)}${obra ? ` para ${obra}` : ""}.`,
          !sol && obra && `Es para ${obra}.`,
          fase && `${fase}.`,
        ]
          .filter(Boolean)
          .join(" ");
  };
  const { sol, obra, fase } = respuestas(r);
  // «Os consulto por {título}» vale en singular y en plural («Me interesa puertas…» no). Hueco
  // «…» sin punto detrás (nada de «….» en la vista previa).
  const vista = `${SALUDO} Os consulto por ${sol ? minuscula(sol) : "…"} para ${obra ? `${obra}.` : "…"}${fase ? ` ${fase}.` : ""}`;
  const mensaje = componer(r);
  const respondidas = r.filter((v) => v !== null).length;

  const elegir = (g: number, v: number) => {
    const n = [...r];
    n[g] = n[g] === v ? null : v;
    setR(n);
  };

  return (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
        {titulo}
        <p className="versalitas" aria-live="polite">
          {respondidas} de 3 respondidas
        </p>
      </div>
      <p className="m-0 mt-4 max-w-[52ch] text-texto-suave">Tres preguntas. Te dejamos el mensaje escrito; tú lo envías por WhatsApp. No te pedimos ningún dato.</p>
      <div className="mt-[clamp(32px,5vw,56px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-[clamp(24px,3vw,48px)] gap-y-10">
        {grupos.map((g, gi) => (
          <div key={g.titulo} role="group" aria-labelledby={`consulta-${gi}`} className="border-t border-anodizado pt-5">
            <p id={`consulta-${gi}`} className="m-0 mb-4 flex items-baseline gap-3 font-titulo text-[22px] leading-[1.25]">
              <span aria-hidden="true" className="text-anodizado italic">
                {String(gi + 1).padStart(2, "0")}
              </span>
              {g.titulo}
            </p>
            <div className="flex flex-col gap-2">
              {g.opciones.map((op, v) => {
                const sel = r[gi] === v;
                if (!hidratado) {
                  const sola = [null, null, null].map((_, i) => (i === gi ? v : null));
                  return (
                    <BotonWhatsApp
                      key={op}
                      numero={whatsapp}
                      mensaje={componer(sola)}
                      className="flex min-h-11 items-center gap-3 rounded-boton border border-borde bg-transparent px-3.5 py-2.5 text-left text-[15px] leading-[1.35] text-texto no-underline hover:border-anodizado"
                    >
                      <span aria-hidden="true" className="size-2.5 flex-none border border-anodizado" />
                      {op}
                    </BotonWhatsApp>
                  );
                }
                return (
                  <button
                    key={op}
                    type="button"
                    aria-pressed={sel}
                    onClick={() => elegir(gi, v)}
                    className={clsx(
                      "flex min-h-11 cursor-pointer items-center gap-3 rounded-boton border px-3.5 py-2.5 text-left text-[15px] leading-[1.35] text-texto hover:border-anodizado active:scale-[0.99]",
                      sel ? "border-anodizado bg-[#1f2225]" : "border-borde bg-transparent",
                    )}
                  >
                    <span aria-hidden="true" className={clsx("size-2.5 flex-none border border-anodizado", sel && "bg-anodizado")} />
                    {op}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-[clamp(40px,5vw,64px)] flex flex-wrap items-end gap-x-[clamp(32px,5vw,80px)] gap-y-6 border-t border-anodizado pt-7">
        <div className="flex-[2_1_360px]">
          <p className="m-0 mb-2.5 text-xs font-medium tracking-[0.12em] text-texto-suave uppercase">Así llegará tu mensaje</p>
          <p aria-live="polite" className="m-0 font-titulo text-[clamp(1.375rem,1.1rem+1vw,1.875rem)] leading-[1.35] italic">
            «{vista}»
          </p>
        </div>
        <div className="flex max-w-[520px] flex-[1_1_300px] flex-wrap gap-x-3 gap-y-2">
          <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className="boton boton-anodizado min-h-14 flex-[1_1_250px]">
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.4" style={{ flex: "none" }}>
              <circle cx="9.5" cy="8.5" r="6.5" />
              <path d="M5 13.2 3 16l3.4-1.3" />
            </svg>
            <span>Enviar consulta por WhatsApp</span>
          </BotonWhatsApp>
          {llamada}
        </div>
      </div>
    </>
  );
}
