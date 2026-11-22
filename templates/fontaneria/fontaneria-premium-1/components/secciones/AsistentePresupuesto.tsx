"use client";

import { useRef, useState, type ReactNode } from "react";
import { BotonWhatsApp } from "@andrei-leads/core";

import { ALTURA, waRelleno } from "@/components/Botones";
import { IconoWhatsapp } from "@/components/Iconos";
import { cn } from "@/lib/utils";

const LUGARES = [
  { texto: "Piso", frase: "un piso" },
  { texto: "Casa o chalé", frase: "una casa o chalé" },
  { texto: "Comunidad de vecinos", frase: "una comunidad de vecinos" },
  { texto: "Local", frase: "un local" },
] as const;
const PLAZOS = ["Este mes", "En 1–3 meses", "Estoy comparando presupuestos"] as const;

type Props = {
  /** Títulos de los servicios (datos que llegan como props: nada de `@/site.config` en cliente). */
  servicios: string[];
  whatsapp: string;
  /** Mensaje general: el que lleva el botón hasta completar los tres pasos (y sin JavaScript). */
  mensajeGeneral: string;
  /** BotonLlamada ya pintado en el servidor (contorno blanco). */
  llamar: ReactNode;
};

const minuscula = (t: string) => t.charAt(0).toLocaleLowerCase("es") + t.slice(1);

/**
 * Asistente de presupuesto (encargo §6.9): tres preguntas con botones que solo
 * componen el `mensaje` de BotonWhatsApp («Hola, quiero presupuesto de {servicio}
 * para {lugar}. Plazo: {plazo}. Os mando fotos y medidas.»). No guarda ni envía
 * nada. Sin JavaScript, las opciones no se muestran y queda la pareja con el
 * mensaje general. Sin WhatsApp, no existe (lo decide la página).
 */
export function AsistentePresupuesto({ servicios, whatsapp, mensajeGeneral, llamar }: Props) {
  const [respuestas, setRespuestas] = useState<string[]>([]);
  const zona = useRef<HTMLDivElement>(null);
  const paso = respuestas.length; // 0, 1, 2 → preguntas; 3 → listo
  // El botón pulsado desaparece al cambiar de paso: el foco pasa al bloque nuevo.
  const responder = (nuevas: string[]) => {
    setRespuestas(nuevas);
    requestAnimationFrame(() => zona.current?.focus());
  };
  const preguntas: { titulo: string; opciones: readonly string[] }[] = [
    { titulo: "¿Qué necesitas?", opciones: servicios },
    { titulo: "¿Dónde es la obra?", opciones: LUGARES.map((l) => l.texto) },
    { titulo: "¿Para cuándo?", opciones: PLAZOS },
  ];
  const listo = paso === 3;
  const mensaje = listo
    ? `Hola, quiero presupuesto de ${minuscula(respuestas[0])} para ${LUGARES.find((l) => l.texto === respuestas[1])?.frase ?? minuscula(respuestas[1])}. Plazo: ${minuscula(respuestas[2])}. Os mando fotos y medidas.`
    : mensajeGeneral;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6 [@media(scripting:none)]:hidden">
        <div aria-hidden="true" className="grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className={cn("h-px", i <= paso ? "bg-white" : "bg-white/25")} />
          ))}
        </div>
        <div ref={zona} tabIndex={-1} className="flex flex-col gap-6 outline-none">
          {listo ? (
            <>
              <p className="m-0 text-xs text-sobre-tinta-suave">Listo: revisa el mensaje y envíalo</p>
              <div className="rounded-tarjeta border border-white/25 p-5">
                <p className="etiqueta mb-3">Tu mensaje</p>
                <p className="m-0 leading-relaxed">{mensaje}</p>
              </div>
            </>
          ) : (
            <>
              <p className="m-0 text-xs text-sobre-tinta-suave">Paso {paso + 1} de 3</p>
              <fieldset className="m-0 flex flex-col gap-5 border-0 p-0">
                <legend className="titulo mb-5 p-0 text-[28px] lg:text-[32px]">{preguntas[paso].titulo}</legend>
                <div className="flex flex-wrap gap-2.5">
                  {preguntas[paso].opciones.map((o) => (
                    <button
                      key={o}
                      type="button"
                      onClick={() => responder([...respuestas, o])}
                      className="boton min-h-12 rounded-full border border-white/40 px-5 py-2.5 text-left text-[15px] text-white hover:border-white hover:bg-white hover:text-tinta"
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </fieldset>
            </>
          )}
          {paso > 0 && (
            <button
              type="button"
              onClick={() => responder(respuestas.slice(0, -1))}
              className="self-start text-sm text-sobre-tinta-suave underline-offset-4 hover:text-white hover:underline"
            >
              ← Paso anterior
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2.5 lg:flex-row lg:flex-wrap">
        <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(waRelleno, ALTURA.hero, "w-full lg:w-auto")}>
          <IconoWhatsapp tamano={20} />
          <span>{listo ? "Enviar por WhatsApp" : "Pedir presupuesto por WhatsApp"}</span>
        </BotonWhatsApp>
        {llamar}
      </div>
    </div>
  );
}
