"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
// Única importación de valores de core en cliente (excepción del kit: el mensaje cambia con los
// toques). Con core ≥ 0.5.1 (`sideEffects`) solo se lleva este botón, sin zod ni el contrato.
import { BotonWhatsApp } from "@andrei-leads/core";

import { IconoCamara, IconoClip } from "@/components/Iconos";
import { CUANDO, DONDE, LISTO, OTRA_COSA, PREGUNTAS, componerMensaje } from "@/lib/asistente";
// clsx y no cn(): cn arrastra tailwind-merge (~9 KB gzip) al navegador.
import { clsx as cn } from "clsx";

/** Servicio para el paso 1: `enFrase` es el título con minúscula inicial, calculado en el servidor. */
export type ServicioAsistente = { titulo: string; slug: string; enFrase: string };

type Props = {
  servicios: readonly ServicioAsistente[];
  /** `contacto.whatsapp`. */
  numero: string;
  /** Inicio del mensaje («Hola, os escribo desde vuestra web.»). */
  mensajeBase: string;
  /** Mensaje del enlace «Prefiero escribir directamente». */
  mensajeDirecto: string;
  /** Nombre del negocio (cabecera del chat y nombre de la conversación). */
  nombre: string;
  /** Avatar de la cabecera (logo o inicial), pintado en el servidor. */
  avatar: ReactNode;
  /** «Llama al {número}»: `BotonLlamada` en enlace de texto, pintado en el servidor. */
  llamada: ReactNode;
  /** Versión corta de `/servicios/[slug]`: empieza en el paso 2 con este servicio elegido. */
  servicioInicial?: string;
  /** Alto mínimo de la conversación (evita saltos al avanzar). */
  corta?: boolean;
  className?: string;
};

const sinSuscripcion = () => () => {};
const RESPUESTA =
  "pulsable inline-flex min-h-11 max-w-[280px] items-center rounded-boton border-[1.5px] border-borde-respuesta bg-superficie px-4 py-2.5 text-left text-base leading-tight font-semibold text-texto no-underline hover:bg-burbuja-sale";
const ENTRA = "m-0 self-start max-w-[85%] border border-linea bg-superficie px-[15px] py-2.5 text-[17px] leading-snug font-bold burbuja-entra";
const SALE = "m-0 self-end max-w-[85%] bg-burbuja-sale px-[15px] py-2.5 text-[17px] leading-snug font-semibold burbuja-sale";

type Opcion = { texto: string; frase: string };

/**
 * Asistente de WhatsApp con aspecto de chat (sección estrella). Tres preguntas con respuestas
 * rápidas que solo componen el texto; al final, el mensaje exacto y «Abrir WhatsApp y adjuntar la
 * foto». No pide datos, no guarda nada ni sube la foto (la adjunta el visitante en WhatsApp).
 *
 * Sin JavaScript (y hasta hidratar), cada respuesta es un `BotonWhatsApp` con el mensaje hasta
 * esa respuesta. Al hidratar pasan a ser botones. Cada paso se anuncia (`role="log"`) y el foco va
 * a la primera respuesta nueva.
 */
export function Asistente({
  servicios,
  numero,
  mensajeBase,
  mensajeDirecto,
  nombre,
  avatar,
  llamada,
  servicioInicial,
  corta,
  className,
}: Props) {
  const hidratado = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  const inicial = servicioInicial ? servicios.find((s) => s.titulo === servicioInicial) : undefined;
  const inicio: Opcion[] = inicial ? [{ texto: inicial.titulo, frase: inicial.enFrase }] : [];
  const [respuestas, setRespuestas] = useState<Opcion[]>(inicio);
  const opcionesRef = useRef<HTMLDivElement>(null);
  const toco = useRef(false);

  useEffect(() => {
    if (!toco.current) return;
    toco.current = false;
    opcionesRef.current?.querySelector<HTMLElement>("button, a")?.focus();
  }, [respuestas]);

  const paso = respuestas.length + 1; // 1–3: preguntas; 4: resumen
  const [r1, r2, r3] = respuestas;
  const mensaje = componerMensaje(mensajeBase, r1?.frase, r2?.frase, r3?.frase);

  const elegir = (o: Opcion) => {
    toco.current = true;
    setRespuestas([...respuestas, o]);
  };
  const reiniciar = () => {
    toco.current = true;
    setRespuestas(inicio);
  };

  let opciones: Opcion[] = [];
  if (paso === 1) opciones = [...servicios.map((s) => ({ texto: s.titulo, frase: s.enFrase }))];
  else if (paso === 2) opciones = CUANDO.map((c) => ({ texto: c.texto, frase: c.frase }));
  else if (paso === 3) opciones = DONDE.map((d) => ({ texto: d.texto, frase: d.frase }));
  // ≥ 7 servicios: 6 a la vista + «Ver más (n)»; «Otra cosa» siempre al final de las visibles.
  const extra = paso === 1 && opciones.length >= 7 ? opciones.slice(6) : [];
  if (paso === 1) opciones = [...opciones.slice(0, 6), { texto: OTRA_COSA.titulo, frase: OTRA_COSA.enFrase }];

  /** Mensaje de un enlace sin JS: el compuesto hasta esa respuesta. */
  const mensajeHasta = (o: Opcion) => {
    const r = [...respuestas, o].map((x) => x.frase);
    return componerMensaje(mensajeBase, r[0], r[1], r[2]);
  };

  const pintar = (o: Opcion) =>
    hidratado ? (
      <button key={o.texto} type="button" onClick={() => elegir(o)} className={RESPUESTA}>
        {o.texto}
      </button>
    ) : (
      <BotonWhatsApp key={o.texto} numero={numero} mensaje={mensajeHasta(o)} className={RESPUESTA}>
        {o.texto}
      </BotonWhatsApp>
    );

  const llenos = Math.min(paso, 3);
  const historial = respuestas.flatMap((r, i) => [
    { texto: r.texto, sale: true, nueva: i >= inicio.length },
    { texto: i + 1 < 3 ? PREGUNTAS[i + 1] : LISTO, sale: false, nueva: i >= inicio.length },
  ]);

  return (
    <div className={cn("w-full overflow-hidden rounded-tarjeta border border-linea-fuerte bg-superficie text-left shadow-chat", className)}>
      <div className="flex items-center gap-3 border-b border-alterna py-3.5 pr-4 pl-[18px]">
        {avatar}
        <div className="min-w-0 flex-1">
          <p className="m-0 text-base leading-tight font-extrabold">{nombre}</p>
          <p className="m-0 flex items-center gap-1.5 text-sm leading-snug text-texto-suave">
            <IconoCamara tamano={15} className="flex-none text-acento" />
            Te contestamos por WhatsApp
          </p>
        </div>
        <div className="flex flex-none flex-col items-end gap-1.5">
          <span className="text-[13px] font-bold whitespace-nowrap text-texto-suave">{paso <= 3 ? `Paso ${paso} de 3` : "Mensaje listo"}</span>
          <span aria-hidden="true" className="flex gap-[5px]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={cn("block size-[9px] rounded-full", i < llenos ? "bg-acento" : "border-[1.5px] border-borde")}
              />
            ))}
          </span>
        </div>
      </div>

      <div className={cn("flex flex-col gap-4 bg-fondo px-4 py-[18px]", corta ? "min-h-[260px]" : "min-h-[340px]")}>
        <div role="log" aria-live="polite" aria-label={`Conversación con ${nombre}`} className="flex flex-col gap-2">
          <p className={ENTRA}>{PREGUNTAS[0]}</p>
          {historial.map((h, i) =>
            h.sale ? (
              <p key={i} className={cn(SALE, h.nueva && "burbuja-nueva-sale")}>
                <span className="sr-only">Has respondido: </span>
                {h.texto}
              </p>
            ) : (
              <p key={i} className={cn(ENTRA, h.nueva && "burbuja-nueva-entra")}>
                {h.texto}
              </p>
            ),
          )}
          {paso === 4 && (
            <div className="burbuja-nueva-sale ml-6 self-stretch bg-burbuja-sale px-4 py-3.5 burbuja-sale">
              <p className="m-0 mb-1 text-[13px] font-extrabold tracking-[0.02em] text-texto-suave">Tu mensaje</p>
              <p className="m-0 text-base leading-normal">{mensaje}</p>
            </div>
          )}
        </div>

        <div ref={opcionesRef} className="flex flex-col gap-3">
          {paso <= 3 && (
            <>
              <div role="group" aria-label={PREGUNTAS[paso - 1]} className="flex flex-wrap justify-end gap-2">
                {opciones.map(pintar)}
              </div>
              {extra.length > 0 && (
                <details className="max-w-full self-end">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-end px-1 text-[15px] font-extrabold underline underline-offset-[3px]">
                    Ver más ({extra.length})
                  </summary>
                  <div className="flex flex-wrap justify-end gap-2 pt-1">{extra.map(pintar)}</div>
                </details>
              )}
            </>
          )}
          {paso === 4 && (
            <>
              <BotonWhatsApp
                numero={numero}
                mensaje={mensaje}
                className="pulsable flex min-h-14 items-center justify-center gap-2.5 rounded-boton bg-primario px-[22px] text-center text-[17px] leading-tight font-extrabold text-sobre-primario no-underline hover:bg-primario-hover"
              >
                <IconoClip />
                Abrir WhatsApp y adjuntar la foto
              </BotonWhatsApp>
              <p className="m-0 text-[15px] leading-normal text-texto-suave">
                En WhatsApp, pulsa el clip y elige la foto del cuadro o del enchufe.
              </p>
              <p className="m-0 text-[15px] leading-normal">¿Es urgente? {llamada}</p>
            </>
          )}
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
            {hidratado && respuestas.length > inicio.length && (
              <button
                type="button"
                onClick={reiniciar}
                className="min-h-11 px-0.5 text-[15px] font-bold text-texto-suave underline underline-offset-[3px]"
              >
                Empezar de nuevo
              </button>
            )}
            {paso <= 3 && (
              <BotonWhatsApp
                numero={numero}
                mensaje={mensajeDirecto}
                className="ml-auto inline-flex min-h-11 items-center text-[15px] font-bold text-texto underline underline-offset-[3px]"
              >
                Prefiero escribir directamente<span className="sr-only"> por WhatsApp</span>
              </BotonWhatsApp>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
