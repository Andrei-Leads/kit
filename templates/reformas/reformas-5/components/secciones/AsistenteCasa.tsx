"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
// Única importación de valores de core en cliente: con core ≥ 0.5.1 (`sideEffects`) solo
// se lleva estos botones, sin zod ni el contrato.
import { BotonLlamada, BotonWhatsApp } from "@andrei-leads/core";
// clsx y no cn(): cn arrastra tailwind-merge (~9 KB gzip) al navegador.
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

const PREGUNTAS = ["¿Qué parte de tu casa quieres cambiar?", "¿Qué tamaño tiene?", "¿Cuándo te gustaría empezar?"] as const;
const TAMANOS = ["una estancia pequeña", "una estancia grande", "media casa", "la casa entera"];
const PLAZOS = ["pronto", "después del verano", "cuando lo tenga claro"];

/** «Hola, quiero cambiar mi casa: reforma de baño (una estancia pequeña). Me gustaría empezar pronto. ¿Cuándo podríais venir a verlo?» */
function componer(servicio?: string, tamano?: string, plazo?: string): string {
  let m = "Hola, quiero cambiar mi casa";
  if (servicio) m += `: ${servicio}`;
  if (tamano) m += ` (${tamano})`;
  m += ".";
  if (plazo) m += ` Me gustaría empezar ${plazo}. ¿Cuándo podríais venir a verlo?`;
  return m;
}

/** Mensaje con las respuestas hasta ahora (enlaces sin JS). */
const componerHasta = (r: readonly string[]) => componer(r[0], r[1], r[2]);

const sinSuscripcion = () => () => {};
const OPCION =
  "boton inline-flex min-h-[52px] items-center rounded-boton border-2 border-borde bg-white px-[22px] text-left text-[17px] leading-tight font-medium text-texto no-underline hover:border-primario";
const PRINCIPAL =
  "boton inline-flex min-h-14 flex-[1_1_260px] items-center justify-center gap-2.5 rounded-boton bg-primario px-7 text-lg font-semibold text-sobre-primario no-underline hover:bg-primario-hover";
const SECUNDARIO =
  "boton inline-flex min-h-[52px] flex-[1_1_200px] items-center justify-center rounded-boton border-2 border-texto px-6 text-[17px] font-semibold text-texto no-underline hover:bg-texto hover:text-superficie";

/**
 * Asistente «¿Qué parte de tu casa quieres cambiar?» (encargo §6.7). Tres preguntas en
 * píldoras que solo componen el mensaje de WhatsApp: no guarda ni envía datos. Con un solo
 * servicio, empieza por el tamaño. Sin JavaScript (y hasta hidratar), cada opción es un
 * `BotonWhatsApp` con el mensaje hasta esa respuesta.
 */
export function AsistenteCasa({ servicios, numero, telefono }: Props) {
  const hidratado = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  const inicio = servicios.length === 1 ? [servicios[0].enFrase] : [];
  const [respuestas, setRespuestas] = useState<string[]>(inicio);
  const tituloRef = useRef<HTMLHeadingElement>(null);
  const toco = useRef(false);

  useEffect(() => {
    if (!toco.current) return;
    toco.current = false;
    tituloRef.current?.focus();
  }, [respuestas]);

  const primero = inicio.length;
  const paso = respuestas.length; // 0–2: preguntas; 3: mensaje listo
  const total = 3 - primero;
  const [servicio, tamano, plazo] = respuestas;
  const mensaje = componer(servicio, tamano, plazo);

  const opciones =
    paso === 0 ? servicios.map((s) => ({ texto: s.titulo, valor: s.enFrase })) : paso === 1 ? TAMANOS.map((t) => ({ texto: t, valor: t })) : paso === 2 ? PLAZOS.map((p) => ({ texto: p, valor: p })) : [];

  const ir = (nuevas: string[]) => {
    toco.current = true;
    setRespuestas(nuevas);
  };

  return (
    <section aria-labelledby="titulo-asistente" className="contenedor pt-[clamp(4.5rem,3rem+6vw,8rem)]">
      <div className="mx-auto flex max-w-[880px] flex-col gap-[22px] rounded-[32px] bg-superficie p-[clamp(24px,5vw,64px)]">
        <div className="flex min-h-11 items-center justify-between gap-4">
          <p className="m-0 text-[15px] font-semibold text-texto-suave">{paso < 3 ? `Paso ${paso - primero + 1} de ${total}` : "Listo para enviar"}</p>
          {hidratado && paso > primero && (
            <button type="button" onClick={() => ir(respuestas.slice(0, -1))} className="min-h-11 px-1 text-[15px] font-semibold underline underline-offset-4">
              <span aria-hidden="true">← </span>Atrás
            </button>
          )}
        </div>
        <div aria-hidden="true" className="flex gap-1.5">
          {Array.from({ length: total }, (_, i) => (
            <span key={i} className={clsx("h-1.5 flex-1 rounded-full", i + primero <= paso ? "bg-primario" : "bg-borde")} />
          ))}
        </div>
        <h2 id="titulo-asistente" ref={tituloRef} tabIndex={-1} aria-live="polite" className="titulo-seccion focus:outline-none">
          {paso < 3 ? PREGUNTAS[paso] : "Tu mensaje está listo"}
        </h2>
        {paso < 3 ? (
          <div role="group" aria-label={PREGUNTAS[paso]} className="flex flex-wrap gap-2.5">
            {opciones.map((o) =>
              hidratado ? (
                <button key={o.texto} type="button" onClick={() => ir([...respuestas, o.valor])} className={OPCION}>
                  {o.texto}
                </button>
              ) : (
                <BotonWhatsApp key={o.texto} numero={numero} mensaje={componerHasta([...respuestas, o.valor])} className={OPCION}>
                  {o.texto}
                </BotonWhatsApp>
              ),
            )}
          </div>
        ) : (
          <>
            <p className="m-0 rounded-[24px_24px_24px_6px] bg-primario-suave px-[22px] py-5 text-lg leading-normal">{mensaje}</p>
            <div className="flex flex-wrap items-center gap-3">
              <BotonWhatsApp numero={numero} mensaje={mensaje} className={PRINCIPAL}>
                <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                </svg>
                Enviar por WhatsApp
              </BotonWhatsApp>
              <BotonLlamada telefono={telefono} className={SECUNDARIO}>
                Prefiero llamar
              </BotonLlamada>
            </div>
            <button type="button" onClick={() => ir(inicio)} className="min-h-11 self-start text-[15px] text-texto-suave underline underline-offset-4">
              Empezar de nuevo
            </button>
          </>
        )}
      </div>
    </section>
  );
}
