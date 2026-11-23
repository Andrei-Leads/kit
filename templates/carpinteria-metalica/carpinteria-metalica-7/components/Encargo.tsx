"use client";

import { useState, useSyncExternalStore, type ReactNode } from "react";
// Única importación de valores de core en cliente (excepción del asistente): con `sideEffects`
// (core ≥ 0.5.1) solo se lleva este botón, sin zod ni el contrato.
import { BotonWhatsApp } from "@andrei-leads/core";
// clsx y no cn(): cn arrastra tailwind-merge (~9 KB gzip) al navegador.
import { clsx } from "clsx";

import { IconoWhatsApp } from "@/components/Iconos";
import { componerEncargo, DONDE, MEDIDAS, mayusculaInicial } from "@/lib/encargo";

/** Una pieza (servicio): `frase` es el título en minúscula inicial, calculado en el servidor. */
export type PiezaEncargo = { titulo: string; frase: string };

type Props = {
  piezas: readonly PiezaEncargo[];
  /** `contacto.whatsapp`. */
  numero: string;
  /** Mensaje general: el que sale mientras no hay ninguna respuesta. */
  mensajeGeneral: string;
  /** `BotonLlamada` «Prefiero llamar», pintado en el servidor. */
  llamada: ReactNode;
};

type Clave = "pieza" | "donde" | "medidas";

const sinSuscripcion = () => () => {};

const OPCION =
  "min-h-11 cursor-pointer px-3.5 py-2 text-left text-[15px] focus-visible:outline-3 focus-visible:-outline-offset-4 focus-visible:outline-acento";

/**
 * Asistente «Encargo» (encargo §5): tres preguntas con botones que solo componen el mensaje y un
 * `BotonWhatsApp` «Enviar el encargo». No pide datos, no guarda ni envía nada. Sin JavaScript (y
 * hasta hidratar), cada opción es un `BotonWhatsApp` con esa sola respuesta en el mensaje (misma
 * caja, sin salto), y «Enviar el encargo» abre WhatsApp con el mensaje general.
 */
export function Encargo({ piezas, numero, mensajeGeneral, llamada }: Props) {
  const [eleccion, setEleccion] = useState<Partial<Record<Clave, string>>>({});
  const hidratado = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  const pieza = piezas.find((p) => p.titulo === eleccion.pieza);
  const mensaje = componerEncargo(mensajeGeneral, pieza?.frase, eleccion.donde, eleccion.medidas);
  const hechos = [eleccion.pieza, eleccion.donde, eleccion.medidas].filter(Boolean).length;

  const elegir = (clave: Clave, valor: string) => setEleccion((e) => ({ ...e, [clave]: e[clave] === valor ? undefined : valor }));

  const pasos: { n: string; titulo: string; clave: Clave; opciones: { valor: string; texto: string }[] }[] = [
    { n: "01", titulo: "¿Qué pieza?", clave: "pieza", opciones: piezas.map((p) => ({ valor: p.titulo, texto: p.titulo })) },
    { n: "02", titulo: "¿Dónde va?", clave: "donde", opciones: DONDE.map((d) => ({ valor: d, texto: mayusculaInicial(d) })) },
    { n: "03", titulo: "¿Tienes medidas?", clave: "medidas", opciones: MEDIDAS.map((m) => ({ valor: m, texto: m })) },
  ];

  return (
    <div className="mt-5 grid items-start gap-2.5 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
      <div className="hierro corte-tarjeta grid gap-[22px] p-[clamp(16px,2vw,28px)]">
        {pasos.map((p) => (
          <fieldset key={p.clave} className="m-0 min-w-0 border-0 p-0">
            <legend className="mb-2.5 flex items-baseline gap-2.5 p-0 font-titulo text-[22px] leading-none font-extrabold uppercase">
              <span className="text-acento">{p.n}</span>
              {p.titulo}
            </legend>
            <div className="flex flex-wrap gap-1.5">
              {p.opciones.map((o) => {
                const marcado = eleccion[p.clave] === o.valor;
                if (!hidratado) {
                  const sola = componerEncargo(
                    mensajeGeneral,
                    p.clave === "pieza" ? piezas.find((x) => x.titulo === o.valor)?.frase : undefined,
                    p.clave === "donde" ? o.valor : undefined,
                    p.clave === "medidas" ? o.valor : undefined,
                  );
                  return (
                    <BotonWhatsApp
                      key={o.valor}
                      numero={numero}
                      mensaje={sola}
                      className={clsx(OPCION, "inline-flex items-center border border-borde font-medium text-inherit no-underline hover:border-texto-suave")}
                    >
                      {o.texto}
                    </BotonWhatsApp>
                  );
                }
                return (
                  <button
                    key={o.valor}
                    type="button"
                    aria-pressed={marcado}
                    onClick={() => elegir(p.clave, o.valor)}
                    className={clsx(
                      OPCION,
                      marcado
                        ? "border border-primario bg-primario font-semibold text-sobre-primario [clip-path:polygon(0_0,calc(100%-8px)_0,100%_8px,100%_100%,0_100%)]"
                        : "border border-borde font-medium hover:border-texto-suave",
                    )}
                  >
                    {o.texto}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>
      <div className="hierro corte-tarjeta p-[clamp(16px,2vw,28px)]">
        <p className="font-titulo text-sm font-bold tracking-[0.08em] text-acento uppercase">Así te llegará el mensaje · {hechos} de 3</p>
        <p aria-live="polite" className="mt-2.5 border border-l-[3px] border-borde border-l-acento px-4 py-3.5 text-base leading-normal text-pretty">
          {mensaje}
        </p>
        <BotonWhatsApp numero={numero} mensaje={mensaje} className="boton boton-chispa mt-3.5">
          <IconoWhatsApp />
          Enviar el encargo
        </BotonWhatsApp>
        <div className="mt-2 grid">{llamada}</div>
      </div>
    </div>
  );
}
