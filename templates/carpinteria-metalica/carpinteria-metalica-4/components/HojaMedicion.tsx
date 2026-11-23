"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode, type RefObject } from "react";
// Única importación de valores de core en cliente: con `sideEffects` (core ≥ 0.5.1) solo se lleva
// este botón, sin zod ni el contrato.
import { BotonWhatsApp } from "@andrei-leads/core";
// clsx y no cn(): cn arrastra tailwind-merge (~9 KB gzip) al navegador.
import { clsx } from "clsx";

import { IconoWhatsApp } from "@/components/Iconos";
import { HUECOS, PERSIANA, mensajeHoja } from "@/lib/hoja";

type Props = {
  /** Títulos de `servicios` (casilla 1). */
  servicios: readonly string[];
  /** `contacto.whatsapp`. */
  numero: string;
  /** `BotonLlamada` «Llamar · {teléfono}», pintado en el servidor. */
  llamada: ReactNode;
};

type Casilla = { n: number; label: string; pregunta: string; opciones: readonly string[] };

const sinSuscripcion = () => () => {};

const OPCION =
  "flex min-h-[52px] w-full cursor-pointer items-center gap-3 border border-borde bg-fondo px-3.5 py-3 text-left text-[15px] leading-[1.35] text-texto no-underline hover:border-texto active:bg-reticula";

/**
 * Asistente «Hoja de medición» (encargo §5), única isla del inicio: 3 casillas (qué cambiar,
 * cuántos huecos, persiana) que solo componen el mensaje de WhatsApp. No pide nombre, teléfono ni
 * email; no guarda ni envía nada.
 *
 * Sin JavaScript (y hasta hidratar), cada opción de la casilla 1 es un `BotonWhatsApp` de verdad con
 * «Hoja de medición: {servicio}». Al hidratar, son botones con `aria-pressed`; cada casilla es un
 * `fieldset` con `legend` y el foco va a la `legend` de la casilla nueva. Con un solo servicio, la
 * casilla 1 ya viene rellena.
 */
export function HojaMedicion({ servicios, numero, llamada }: Props) {
  const hidratado = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  const unico = servicios.length === 1 ? servicios[0] : null;
  const inicial = unico ? 2 : 1;
  const [paso, setPaso] = useState(inicial);
  const [valores, setValores] = useState<(string | null)[]>([unico, null, null]);
  const [tocado, setTocado] = useState(false);
  const titularRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (tocado) titularRef.current?.focus({ preventScroll: false });
  }, [paso, tocado]);

  const casillas: Casilla[] = [
    { n: 1, label: "Trabajo", pregunta: "¿Qué quieres cambiar?", opciones: servicios },
    { n: 2, label: "Huecos", pregunta: "¿Cuántos huecos?", opciones: HUECOS },
    { n: 3, label: "Persiana", pregunta: "¿Y la persiana?", opciones: PERSIANA },
  ];
  const actual = casillas[paso - 1];
  const mensaje = mensajeHoja(valores[0], valores[1], valores[2]);

  const elegir = (i: number, t: string) => {
    setTocado(true);
    setValores((v) => v.map((x, j) => (j === i ? t : x)));
    setPaso(i + 2);
  };

  return (
    <div className="max-w-[820px] border border-texto bg-superficie">
      <dl className="grid grid-cols-3 border-b border-texto">
        {casillas.map((c) => (
          <div
            key={c.n}
            className={clsx("flex min-w-0 flex-col gap-1 border-r border-borde px-3 py-2.5 last:border-r-0", paso === c.n && "bg-reticula")}
          >
            <dt className="etiqueta">
              0{c.n} · {c.label}
            </dt>
            <dd className="truncate text-sm leading-[1.35] text-texto-suave">{valores[c.n - 1] ?? "—"}</dd>
          </div>
        ))}
      </dl>
      <div className="p-[clamp(16px,3vw,28px)]">
        {actual ? (
          <fieldset key={actual.n} className={clsx("m-0 flex min-w-0 flex-col gap-3.5 border-0 p-0", tocado && "paso-entra")}>
            <legend ref={titularRef as RefObject<HTMLLegendElement>} tabIndex={-1} className="mb-3.5 flex flex-col gap-1.5 p-0 outline-none">
              <span className="etiqueta text-texto-suave">CASILLA {actual.n}/3</span>
              <span className="font-titulo text-xl font-medium">{actual.pregunta}</span>
            </legend>
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,230px),1fr))] gap-2">
              {actual.opciones.map((t) => {
                const elegido = valores[actual.n - 1] === t;
                const contenido = (
                  <>
                    <span aria-hidden="true" className="flex size-[18px] flex-none items-center justify-center border-[1.5px] border-texto font-titulo text-[13px]">
                      {elegido ? "×" : ""}
                    </span>
                    <span>{t}</span>
                  </>
                );
                return (
                  <li key={t}>
                    {hidratado ? (
                      <button type="button" aria-pressed={elegido} onClick={() => elegir(actual.n - 1, t)} className={OPCION}>
                        {contenido}
                      </button>
                    ) : (
                      <BotonWhatsApp numero={numero} mensaje={actual.n === 1 ? mensajeHoja(t) : mensajeHoja(valores[0], t)} className={OPCION}>
                        {contenido}
                      </BotonWhatsApp>
                    )}
                  </li>
                );
              })}
            </ul>
            {hidratado && actual.n > inicial && (
              <button
                type="button"
                onClick={() => {
                  setTocado(true);
                  setPaso(paso - 1);
                }}
                className="min-h-11 cursor-pointer self-start font-titulo text-[13px] underline underline-offset-[3px]"
              >
                ← Casilla anterior
              </button>
            )}
          </fieldset>
        ) : (
          <div className={clsx("flex flex-col gap-4", tocado && "paso-entra")}>
            <h3 ref={titularRef as RefObject<HTMLHeadingElement>} tabIndex={-1} className="etiqueta text-texto-suave outline-none">
              ASÍ LLEGARÁ TU MENSAJE
            </h3>
            <p className="border-l-2 border-texto bg-fondo p-4 text-pretty">{mensaje}</p>
            <div className="flex flex-wrap gap-3">
              <BotonWhatsApp numero={numero} mensaje={mensaje} className="boton boton-lamina flex-[1_1_280px]">
                <IconoWhatsApp />
                Enviar la hoja por WhatsApp
              </BotonWhatsApp>
              {llamada}
            </div>
            <button
              type="button"
              onClick={() => {
                setTocado(true);
                setValores([unico, null, null]);
                setPaso(inicial);
              }}
              className="min-h-11 cursor-pointer self-start font-titulo text-[13px] underline underline-offset-[3px]"
            >
              Empezar otra hoja
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
