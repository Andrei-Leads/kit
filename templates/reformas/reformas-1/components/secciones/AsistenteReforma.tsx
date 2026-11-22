"use client";

import { useState, useSyncExternalStore } from "react";
// Única importación de valores de core en cliente: con core ≥ 0.5.1 (`sideEffects`) solo
// se lleva este botón, sin zod ni el contrato.
import { BotonWhatsApp } from "@andrei-leads/core";
// clsx y no cn(): cn arrastra tailwind-merge (~9 KB gzip) al navegador.
import { clsx } from "clsx";

/** Servicio para la pregunta 1: `enFrase` es el título con minúscula inicial, calculado en el servidor. */
export type ServicioAsistente = { titulo: string; enFrase: string };

type Props = {
  servicios: readonly ServicioAsistente[];
  /** `contacto.whatsapp`. */
  numero: string;
};

const TAMANOS = ["hasta 5 m²", "entre 5 y 15 m²", "más de 15 m²", "todo el piso"];
const PLAZOS = [
  { texto: "cuanto antes", frase: "Me gustaría empezar cuanto antes." },
  { texto: "en los próximos meses", frase: "Me gustaría empezar en los próximos meses." },
  { texto: "solo quiero comparar precios", frase: "De momento quiero comparar precios." },
];

/** «Hola, quiero presupuesto para reforma de baño (hasta 5 m²). Me gustaría empezar cuanto antes. Os mando fotos de cómo está ahora.» */
function componer(servicio?: string, tamano?: string, plazo?: string): string {
  let m = "Hola, quiero presupuesto";
  if (servicio) m += ` para ${servicio}`;
  if (tamano) m += ` (${tamano})`;
  m += ".";
  const frase = PLAZOS.find((p) => p.texto === plazo)?.frase;
  if (frase) m += ` ${frase}`;
  return m + " Os mando fotos de cómo está ahora.";
}

const sinSuscripcion = () => () => {};
const OPCION =
  "inline-flex min-h-11 cursor-pointer items-center border-b px-0.5 text-left text-[17px] leading-[1.2] no-underline hover:border-texto";
const PREGUNTA = "mb-2.5 font-titulo text-[clamp(1.375rem,1.1rem+1vw,1.75rem)] leading-[1.2]";

/**
 * Asistente (encargo §6.7, tablero Asistente): tres preguntas como líneas editoriales, con
 * opciones de texto subrayadas con filete, que solo componen el mensaje de WhatsApp (no guarda
 * ni envía datos). Con un solo servicio, se salta la primera. Sin JavaScript (y hasta hidratar),
 * cada opción de la primera pregunta es un `BotonWhatsApp` con el mensaje hasta esa respuesta.
 */
export function AsistenteReforma({ servicios, numero }: Props) {
  const hidratado = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  const unico = servicios.length === 1 ? servicios[0].enFrase : undefined;
  const [servicio, setServicio] = useState<string | undefined>(unico);
  const [tamano, setTamano] = useState<string>();
  const [plazo, setPlazo] = useState<string>();

  const preguntas = [
    ...(unico
      ? []
      : [
          {
            titulo: "¿Qué quieres reformar?",
            opciones: servicios.map((s) => ({ texto: s.titulo, valor: s.enFrase })),
            valor: servicio,
            elegir: (v: string) => {
              setServicio(v);
              setTamano(undefined);
              setPlazo(undefined);
            },
            mensaje: (v: string) => componer(v),
          },
        ]),
    {
      titulo: "¿Qué tamaño tiene, más o menos?",
      opciones: TAMANOS.map((t) => ({ texto: t, valor: t })),
      valor: tamano,
      elegir: (v: string) => {
        setTamano(v);
        setPlazo(undefined);
      },
      mensaje: (v: string) => componer(servicio, v),
    },
    {
      titulo: "¿Para cuándo?",
      opciones: PLAZOS.map((p) => ({ texto: p.texto, valor: p.texto })),
      valor: plazo,
      elegir: (v: string) => setPlazo(v),
      mensaje: (v: string) => componer(servicio, tamano, v),
    },
  ];
  // Se ve cada pregunta cuando la anterior tiene respuesta. Sin JS, solo la primera.
  const visibles = hidratado ? preguntas.filter((_, i) => i === 0 || preguntas[i - 1].valor) : preguntas.slice(0, 1);
  const listo = hidratado && Boolean(servicio && tamano && plazo);
  const mensaje = componer(servicio, tamano, plazo);

  const reiniciar = () => {
    setServicio(unico);
    setTamano(undefined);
    setPlazo(undefined);
  };

  return (
    <div>
      {visibles.map((p, i) => (
        <div
          key={p.titulo}
          role="group"
          aria-labelledby={`pregunta-asistente-${i}`}
          className={clsx("paso-asistente border-t py-[18px]", i === 0 ? "border-texto" : "border-filete")}
        >
          <p id={`pregunta-asistente-${i}`} className={PREGUNTA}>
            {/* El ocre solo llega a AA como texto grande: el número nunca baja de 24 px. */}
            <span className="font-titulo text-[length:max(1em,1.5rem)] text-acento italic">{String(i + 1).padStart(2, "0")}</span> {p.titulo}
          </p>
          <div className="flex flex-wrap gap-x-[18px] gap-y-1">
            {p.opciones.map((o) =>
              hidratado ? (
                <button
                  key={o.texto}
                  type="button"
                  aria-pressed={p.valor === o.valor}
                  onClick={() => p.elegir(o.valor)}
                  className={clsx(
                    OPCION,
                    p.valor === o.valor ? "border-b-2 border-primario font-semibold text-primario-texto" : "border-borde text-texto",
                  )}
                >
                  {o.texto}
                </button>
              ) : (
                <BotonWhatsApp key={o.texto} numero={numero} mensaje={p.mensaje(o.valor)} className={clsx(OPCION, "border-borde text-texto")}>
                  {o.texto}
                </BotonWhatsApp>
              ),
            )}
          </div>
        </div>
      ))}
      <div aria-live="polite">
        {listo && (
          <div className="paso-asistente border-t border-texto pt-[22px]">
            <p className="versalitas mb-2.5">Tu mensaje</p>
            <p className="mb-5 font-titulo text-[clamp(1.25rem,1rem+1vw,1.625rem)] leading-[1.35] italic">«{mensaje}»</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <BotonWhatsApp
                numero={numero}
                mensaje={mensaje}
                className="boton inline-flex min-h-[52px] items-center justify-center gap-2.5 border border-primario bg-primario px-6 text-base font-semibold text-sobre-primario no-underline hover:bg-primario-hover"
              >
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="square" aria-hidden="true">
                  <path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-3.5-.8L4 20z" />
                </svg>
                Enviar por WhatsApp
              </BotonWhatsApp>
              <button type="button" onClick={reiniciar} className={clsx(OPCION, "border-borde text-[15px] text-texto")}>
                Empezar de nuevo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
