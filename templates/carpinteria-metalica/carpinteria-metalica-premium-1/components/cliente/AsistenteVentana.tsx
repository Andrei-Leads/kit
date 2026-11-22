"use client";

import { useState, type ReactNode } from "react";
import { BotonWhatsApp } from "@andrei-leads/core";

import { IconoWhatsapp } from "@/components/Iconos";

type Props = {
  /** Títulos de `servicios` (primera pregunta). */
  soluciones: readonly string[];
  whatsapp: string;
  /** Mensaje si no se ha elegido nada (el general). */
  mensajeVacio: string;
  /** `BotonLlamada` «Prefiero llamar», pintado en el servidor. */
  llamada: ReactNode;
  confianza: string;
};

const PREGUNTAS = ["¿Qué necesitas?", "¿Dónde?", "¿Qué te importa más?"] as const;
const DONDE = ["Un piso", "Una casa o adosado", "Un ático o terraza", "Un local"];
const IMPORTA = ["Que entre más luz", "Quitar el ruido", "El frío y el calor", "La seguridad"];

const minuscula = (t: string) => (t.length > 1 && /[A-ZÁÉÍÓÚÑ]/.test(t[1]) ? t : t.charAt(0).toLowerCase() + t.slice(1));

/**
 * Asistente «Tu ventana» (encargo §5.4, ≈ 3 KB): tres preguntas con radios en píldora de
 * contorno que solo componen el mensaje de WhatsApp. No pide ni guarda datos. La opción
 * elegida va en relleno claro sobre tinta (nunca en primario). Sin JS, los botones
 * funcionan con el mensaje general.
 */
export function AsistenteVentana({ soluciones, whatsapp, mensajeVacio, llamada, confianza }: Props) {
  const [paso, setPaso] = useState(0);
  const [r, setR] = useState<(string | undefined)[]>([]);
  const opciones = [soluciones, DONDE, IMPORTA];
  const hecho = paso >= 3;
  const q = Math.min(paso, 2);
  const [a, b, c] = r;
  // Hueco «…» sin punto detrás (nada de «….» en la vista previa).
  const h = (x: string | undefined, fin = "") => (x ? `${minuscula(x)}${fin}` : "…");
  const vista = `Hola, os escribo desde vuestra web. Quiero presupuesto de ${h(a)} para ${h(b, ".")} Lo que más me importa: ${h(c, ".")} ¿Podéis venir a medir?`;
  const mensaje = !a && !b && !c
    ? mensajeVacio
    : ["Hola, os escribo desde vuestra web.", a && `Quiero presupuesto de ${minuscula(a)}${b ? ` para ${minuscula(b)}` : ""}.`, !a && b && `Es para ${minuscula(b)}.`, c && `Lo que más me importa: ${minuscula(c)}.`, "¿Podéis venir a medir?"]
        .filter(Boolean)
        .join(" ");

  const elegir = (o: string) => {
    const n = [...r];
    n[q] = o;
    setR(n);
    setPaso(Math.min(paso + 1, 3));
  };

  return (
    <div className="rejilla gap-y-12">
      <div className="lg:col-[1/7]">
        <div aria-hidden="true" className="grid grid-cols-3 gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`h-0.5 ${i < paso ? "bg-sobre-tinta" : i === paso ? "bg-acento" : "bg-borde-tinta"}`} />
          ))}
        </div>
        <div key={paso} className="paso-asistente">
          <p className="etiqueta mt-6" aria-live="polite">
            {hecho ? "Listo" : `Paso ${paso + 1} de 3`}
          </p>
          {hecho ? (
            <p className="fino m-0 mt-3 text-[26px] leading-tight lg:text-[28px]">Tu mensaje está listo.</p>
          ) : (
            <fieldset className="m-0 mt-3 border-0 p-0">
              <legend className="fino p-0 text-[26px] leading-tight lg:text-[28px]">{PREGUNTAS[q]}</legend>
              <div className="mt-5 flex flex-wrap gap-2">
                {opciones[q].map((o) => (
                  <label key={o} className="relative cursor-pointer">
                    <input type="radio" name={`ventana-${q}`} value={o} checked={r[q] === o} onChange={() => elegir(o)} className="peer sr-only" />
                    <span className="inline-flex min-h-11 items-center rounded-boton border border-sobre-tinta-suave px-4 text-sm text-sobre-tinta peer-checked:border-sobre-tinta peer-checked:bg-sobre-tinta peer-checked:text-tinta peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-white hover:border-sobre-tinta">
                      {o}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}
          {paso > 0 && (
            <button
              type="button"
              onClick={() => (hecho ? (setR([]), setPaso(0)) : setPaso(paso - 1))}
              className="mt-5 min-h-11 cursor-pointer border-0 bg-transparent p-0 text-sm font-medium text-sobre-tinta underline decoration-1 underline-offset-4"
            >
              {hecho ? "Empezar de nuevo" : "Atrás"}
            </button>
          )}
        </div>
      </div>
      <div className="border-t border-borde-tinta pt-6 lg:col-[8/13]">
        <p className="etiqueta">Tu mensaje</p>
        <p className="fino m-0 mt-4 text-[22px] leading-snug italic lg:text-[26px]">{vista}</p>
        <div className="mt-8 flex flex-wrap gap-2">
          <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className="boton boton-wa sobre-tinta min-h-14 flex-[1_1_auto] px-[26px] lg:flex-none">
            <IconoWhatsapp />
            <span>Enviar por WhatsApp</span>
          </BotonWhatsApp>
          {llamada}
        </div>
        <p className="m-0 mt-3 text-sm text-sobre-tinta-suave">{confianza}</p>
      </div>
    </div>
  );
}
