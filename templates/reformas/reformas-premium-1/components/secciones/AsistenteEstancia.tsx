"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
// Única importación de valores de core en cliente: con core ≥ 0.5.1 (`sideEffects`) solo
// se lleva estos botones, sin zod ni el contrato.
import { BotonLlamada, BotonWhatsApp } from "@andrei-leads/core";
// clsx y no cn(): cn arrastra tailwind-merge al navegador.
import { clsx } from "clsx";

/** Servicio para el paso 1: `enFrase` es el título con minúscula inicial, calculado en el servidor. */
export type ServicioAsistente = { titulo: string; enFrase: string };

type Props = {
  servicios: readonly ServicioAsistente[];
  /** `contacto.whatsapp`. */
  numero: string;
  /** `contacto.telefono` («Prefiero llamar»). */
  telefono: string;
};

const PREGUNTAS = ["¿Qué quieres reformar?", "¿Cómo es la casa?", "¿Para cuándo?"] as const;
const TAMANOS = [
  { texto: "Hasta 60 m²", valor: "una casa de hasta 60 m²" },
  { texto: "De 60 a 120 m²", valor: "una casa de 60 a 120 m²" },
  { texto: "Más de 120 m²", valor: "una casa de más de 120 m²" },
  { texto: "Un ático o un chalé", valor: "un ático o un chalé" },
];
const PLAZOS = [
  { texto: "Este año", valor: "para este año" },
  { texto: "El año que viene", valor: "para el año que viene" },
  { texto: "Estoy comparando", valor: "aunque de momento estoy comparando" },
];

/**
 * «Hola, vengo de vuestra web. Quiero presupuesto para reforma integral en una casa de
 * 60 a 120 m², para este año. ¿Podéis venir a verlo?» (base de la entrega de diseño; «Me
 * interesa» fallaba con títulos en plural: «Me interesa suelos de madera…»).
 */
function componer(r: readonly (string | undefined)[]): string {
  const [servicio, casa, plazo] = r;
  let m = "Hola, vengo de vuestra web.";
  if (servicio) m += ` Quiero presupuesto para ${servicio}`;
  if (casa) m += servicio ? ` en ${casa}` : ` Quiero presupuesto para una reforma en ${casa}`;
  if (plazo) m += `, ${plazo}`;
  if (servicio || casa) m += ".";
  return `${m} ¿Podéis venir a verlo?`;
}

const sinSuscripcion = () => () => {};
const OPCION =
  "inline-flex min-h-12 items-center rounded-boton border border-fondo/60 px-5 text-left text-base leading-tight text-fondo no-underline hover:border-fondo";

/**
 * Asistente «Tu reforma en tres preguntas» (encargo §6.9, ≤ 4 KB). Tres preguntas en
 * píldoras de contorno que solo componen el mensaje de WhatsApp: no guarda ni envía
 * datos. Con un solo servicio, empieza por el tamaño. Sin JavaScript (y hasta hidratar),
 * cada opción es un `BotonWhatsApp` con el mensaje hasta esa respuesta.
 */
export function AsistenteEstancia({ servicios, numero, telefono }: Props) {
  const hidratado = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  const inicio = servicios.length === 1 ? [servicios[0].enFrase] : [];
  const [respuestas, setRespuestas] = useState<string[]>(inicio);
  const preguntaRef = useRef<HTMLParagraphElement>(null);
  const toco = useRef(false);

  useEffect(() => {
    if (!toco.current) return;
    toco.current = false;
    preguntaRef.current?.focus();
  }, [respuestas]);

  const primero = inicio.length;
  const paso = respuestas.length; // 0–2: preguntas; 3: mensaje listo
  const total = 3 - primero;
  const mensaje = componer(respuestas);
  const opciones =
    paso === 0 ? servicios.map((s) => ({ texto: s.titulo, valor: s.enFrase })) : paso === 1 ? TAMANOS : paso === 2 ? PLAZOS : [];

  const ir = (nuevas: string[]) => {
    toco.current = true;
    setRespuestas(nuevas);
  };

  return (
    <div key={paso} className="asistente-paso">
      <div className="flex min-h-11 items-center justify-between gap-4 border-b border-borde-oscuro pb-3">
        <p className="etiqueta text-texto-claro">{paso < 3 ? `${paso - primero + 1} de ${total}` : "Listo para enviar"}</p>
        {hidratado && paso > primero && (
          <button type="button" onClick={() => ir(respuestas.slice(0, -1))} className="min-h-11 px-1 text-[15px] text-texto-claro underline underline-offset-4">
            <span aria-hidden="true">← </span>Atrás
          </button>
        )}
      </div>
      <p ref={preguntaRef} tabIndex={-1} aria-live="polite" className="m-0 mt-8 text-h3 focus:outline-none">
        {paso < 3 ? PREGUNTAS[paso] : "Tu mensaje está listo"}
      </p>
      {paso < 3 ? (
        <div role="group" aria-label={PREGUNTAS[paso]} className="mt-6 flex flex-wrap gap-3">
          {opciones.map((o) =>
            hidratado ? (
              <button key={o.texto} type="button" onClick={() => ir([...respuestas, o.valor])} className={OPCION}>
                {o.texto}
              </button>
            ) : (
              <BotonWhatsApp key={o.texto} numero={numero} mensaje={componer([...respuestas, o.valor])} className={OPCION}>
                {o.texto}
              </BotonWhatsApp>
            ),
          )}
        </div>
      ) : (
        <>
          <blockquote className="m-0 mt-6 border-l border-primario-claro pl-5 font-destacada text-[clamp(1.375rem,1.1rem+1vw,1.75rem)] leading-snug text-fondo italic">
            «{mensaje}»
          </blockquote>
          <div className="mt-8 flex flex-wrap gap-3">
            <BotonWhatsApp numero={numero} mensaje={mensaje} className="cta cta-principal flex-[1_1_auto]">
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
              </svg>
              Enviar por WhatsApp
            </BotonWhatsApp>
            <BotonLlamada telefono={telefono} className="cta cta-secundario-claro flex-[1_1_auto]">
              Prefiero llamar
            </BotonLlamada>
          </div>
          <button type="button" onClick={() => ir(inicio)} className={clsx("mt-4 min-h-11 text-[15px] text-texto-claro underline underline-offset-4")}>
            Empezar de nuevo
          </button>
        </>
      )}
    </div>
  );
}
