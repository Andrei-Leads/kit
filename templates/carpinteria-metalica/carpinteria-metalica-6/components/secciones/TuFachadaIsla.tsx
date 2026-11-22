"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
// Única importación de valores de core en cliente: con core ≥ 0.5.1 (`sideEffects`) solo se lleva
// este botón, sin zod ni el contrato.
import { BotonWhatsApp } from "@andrei-leads/core";
// clsx y no cn(): cn arrastra tailwind-merge (~9 KB gzip) al navegador.
import { clsx } from "clsx";

/** Servicio de la pregunta 1: `enFrase` es el título con minúscula inicial, calculado en el servidor. */
export type ServicioAsistente = { titulo: string; enFrase: string };

type Props = {
  servicios: readonly ServicioAsistente[];
  /** `contacto.whatsapp`. */
  numero: string;
  /** `BotonLlamada` «Llamar», pintado en el servidor. */
  llamada: ReactNode;
  /** h2 y entradilla, pintados en el servidor. */
  cabeza: ReactNode;
};

const CUANTAS = ["1 o 2 ventanas", "De 3 a 5", "Toda la vivienda", "Todo el edificio"];
const DONDE = ["un piso", "una casa", "un bajo", "una comunidad"];
const INICIO = "Hola, os escribo desde vuestra web.";
const FINAL = "Os mando una foto de la fachada.";

/**
 * «Hola, os escribo desde vuestra web. Os consulto por {servicio}: {cuántas}, en {vivienda}. Os mando
 * una foto de la fachada.» «Os consulto por» vale con cualquier título («Quiero cambio de ventanas
 * sin obra» no), y la coma evita «toda la vivienda en una casa».
 */
export function componerMensaje(servicio?: string, cuantas?: string, donde?: string): string {
  if (!servicio) return `${INICIO} ${FINAL}`;
  let m = `${INICIO} Os consulto por ${servicio}`;
  if (cuantas) m += `: ${cuantas.charAt(0).toLowerCase()}${cuantas.slice(1)}`;
  if (donde) m += cuantas ? `, en ${donde}` : ` para ${donde}`;
  return `${m}. ${FINAL}`;
}

const sinSuscripcion = () => () => {};
const mayuscula = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
const OPCION =
  "boton flex min-h-14 cursor-pointer items-center rounded-2xl px-4 py-3 text-left text-base leading-[1.3] font-bold text-texto no-underline";
const PASTILLA =
  "boton inline-flex min-h-14 flex-[1_1_240px] items-center justify-center gap-2.5 rounded-boton border-2 border-primario bg-primario px-[22px] text-[17px] font-bold text-sobre-primario no-underline hover:border-primario-hover hover:bg-primario-hover";
const ENLACE = "inline-flex min-h-11 cursor-pointer items-center gap-1.5 self-start text-[15px] font-bold text-texto";

/**
 * Isla del asistente «Tu fachada» (encargo §5): 3 pasos (qué, cuántas, dónde) que solo componen el
 * mensaje de WhatsApp; no guarda ni envía nada. Con un solo servicio, se salta el primero. Al
 * cambiar de paso, el foco va a la pregunta nueva. Sin JavaScript (y hasta hidratar), cada opción
 * de la primera pregunta es un `BotonWhatsApp` con el mensaje hasta esa respuesta.
 */
export function TuFachadaIsla({ servicios, numero, llamada, cabeza }: Props) {
  const hidratado = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  const unico = servicios.length === 1 ? servicios[0].enFrase : undefined;
  const [servicio, setServicio] = useState<string | undefined>(unico);
  const [cuantas, setCuantas] = useState<string>();
  const [donde, setDonde] = useState<string>();
  const [paso, setPaso] = useState(0);
  const titulo = useRef<HTMLHeadingElement>(null);
  const interaccion = useRef(false);

  const preguntas = [
    ...(unico
      ? []
      : [
          {
            titulo: "¿Qué quieres cambiar?",
            opciones: servicios.map((s) => ({ texto: s.titulo, valor: s.enFrase })),
            valor: servicio,
            elegir: setServicio,
            mensaje: (v: string) => componerMensaje(v),
          },
        ]),
    {
      titulo: "¿Cuántas?",
      opciones: CUANTAS.map((c) => ({ texto: c, valor: c })),
      valor: cuantas,
      elegir: setCuantas,
      mensaje: (v: string) => componerMensaje(servicio, v),
    },
    {
      titulo: "¿Dónde?",
      opciones: DONDE.map((d) => ({ texto: mayuscula(d), valor: d })),
      valor: donde,
      elegir: setDonde,
      mensaje: (v: string) => componerMensaje(servicio, cuantas, v),
    },
  ];
  const total = preguntas.length;
  const final = hidratado && paso >= total;
  const actual = preguntas[Math.min(paso, total - 1)];
  const mensaje = componerMensaje(servicio, cuantas, donde);

  // El foco sigue al paso nuevo (solo tras un toque: nunca al cargar la página).
  useEffect(() => {
    if (interaccion.current) titulo.current?.focus();
  }, [paso]);

  const ir = (n: number) => {
    interaccion.current = true;
    setPaso(n);
  };
  const reiniciar = () => {
    setServicio(unico);
    setCuantas(undefined);
    setDonde(undefined);
    ir(0);
  };

  return (
    <div className="flex flex-wrap gap-x-14 gap-y-6 rounded-3xl border border-borde bg-superficie p-[clamp(20px,0.75rem+3vw,48px)] shadow-tarjeta">
      <div className="flex flex-[1_1_280px] flex-col gap-3">
        {cabeza}
        <div aria-hidden="true" className="mt-2 flex gap-1.5">
          {Array.from({ length: total }, (_, i) => (
            <span
              key={i}
              className={clsx(
                "h-1.5 flex-1 rounded-full",
                i < paso || final ? "bg-primario" : i === paso ? "bg-[color-mix(in_oklab,var(--color-primario)_40%,white)]" : "bg-borde",
              )}
            />
          ))}
        </div>
        <span className="text-sm text-texto-suave">{final ? "Listo para enviar" : `Paso ${Math.min(paso, total - 1) + 1} de ${total}`}</span>
      </div>
      <div className="flex min-w-0 flex-[1.4_1_320px] flex-col gap-3.5">
        {!final ? (
          <div key={paso} role="group" aria-labelledby="pregunta-asistente" className="paso-asistente flex flex-col gap-3.5">
            <h3 id="pregunta-asistente" ref={titulo} tabIndex={-1} className="text-xl leading-[1.25] font-extrabold focus:outline-none focus-visible:outline-3">
              {actual.titulo}
            </h3>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-2">
              {actual.opciones.map((o) =>
                hidratado ? (
                  <button
                    key={o.texto}
                    type="button"
                    aria-pressed={actual.valor === o.valor}
                    onClick={() => {
                      actual.elegir(o.valor);
                      ir(paso + 1);
                    }}
                    className={clsx(
                      OPCION,
                      actual.valor === o.valor ? "border-2 border-primario bg-primario-suave" : "border border-borde bg-fondo hover:bg-primario-suave",
                    )}
                  >
                    {o.texto}
                  </button>
                ) : (
                  <BotonWhatsApp key={o.texto} numero={numero} mensaje={actual.mensaje(o.valor)} className={clsx(OPCION, "border border-borde bg-fondo")}>
                    {o.texto}
                  </BotonWhatsApp>
                ),
              )}
            </div>
            {hidratado && paso > 0 && (
              <button type="button" onClick={() => ir(paso - 1)} className={ENLACE}>
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Atrás
              </button>
            )}
          </div>
        ) : (
          <div className="paso-asistente flex flex-col gap-3.5">
            <h3 ref={titulo} tabIndex={-1} className="text-xl leading-[1.25] font-extrabold focus:outline-none focus-visible:outline-3">
              Así te llegará el mensaje
            </h3>
            <p className="rounded-[20px_20px_20px_6px] bg-primario-suave px-[18px] py-4 text-[17px] leading-normal">{mensaje}</p>
            <div className="flex flex-wrap gap-2.5">
              <BotonWhatsApp numero={numero} mensaje={mensaje} className={PASTILLA}>
                <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89A11.82 11.82 0 0 0 12.05 0Zm5.42 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49 2.49 1.08 3 .86 3.57.81.57-.05 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35Z" />
                </svg>
                Enviar por WhatsApp
              </BotonWhatsApp>
              {llamada}
            </div>
            <button type="button" onClick={reiniciar} className={clsx(ENLACE, "underline underline-offset-3")}>
              Empezar de nuevo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
