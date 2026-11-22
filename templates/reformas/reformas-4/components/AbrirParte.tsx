"use client";

import { useState, useSyncExternalStore } from "react";
import { clsx } from "clsx";
import { BotonLlamada, BotonWhatsApp } from "@andrei-leads/core";

type Props = {
  /** Títulos de los servicios. Con uno solo, se salta la primera pregunta. */
  servicios: readonly string[];
  whatsapp: string;
  telefono: string;
  telefonoVisible: string;
};

const SUPERFICIES = ["Hasta 10 m²", "10–60 m²", "Más de 60 m²", "Casa entera"];
const INICIOS = ["Cuanto antes", "En unos meses", "Solo comparo"];
const FRASE_INICIO: Record<string, string> = {
  "Cuanto antes": "Me gustaría empezar cuanto antes.",
  "En unos meses": "Me gustaría empezar en unos meses.",
  "Solo comparo": "De momento estoy comparando presupuestos.",
};

const sinSuscripcion = () => () => {};

/** Minúscula inicial salvo siglas (la de core, sin importarla aquí para no meter más módulos). */
const min = (t: string) => (t.length > 1 && /[A-ZÁÉÍÓÚÑ]/.test(t[1]) ? t : t.charAt(0).toLowerCase() + t.slice(1));

/**
 * Asistente «Abrir parte» (encargo §6.7): Obra, Superficie e Inicio con botones de borde fino (la
 * marcada en latón) y el mensaje en mono dentro de un recuadro con esquinas de cota. Solo compone el
 * `mensaje` de `BotonWhatsApp`: no guarda ni envía nada. Lo que no se ha elegido no va en el mensaje
 * (en el recuadro sale «…»). Sin WhatsApp, la página no lo pinta. Sin JS (y hasta hidratar), cada
 * opción es un `BotonWhatsApp` con esa sola respuesta en el mensaje (misma caja: sin salto).
 */
export function AbrirParte({ servicios, whatsapp, telefono, telefonoVisible }: Props) {
  const unico = servicios.length === 1 ? servicios[0] : undefined;
  const [sel, setSel] = useState<{ obra?: string; sup?: string; ini?: string }>({});
  const hidratado = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  const obra = unico ?? sel.obra;

  const preguntas = [
    ...(unico ? [] : [{ clave: "obra" as const, texto: "Obra", opciones: servicios }]),
    { clave: "sup" as const, texto: "Superficie", opciones: SUPERFICIES },
    { clave: "ini" as const, texto: "Inicio", opciones: INICIOS },
  ];
  const valor = (k: "obra" | "sup" | "ini") => (k === "obra" ? obra : sel[k]);

  // «Quiero empezar: solo comparo» no se entiende en un WhatsApp: cada inicio, dicho como frase.
  const frase = (ini: string) => FRASE_INICIO[ini] ?? `Inicio: ${min(ini)}.`;
  const vista = `Hola, quiero presupuesto para ${obra ? `${min(obra)}.` : "…"} Superficie aproximada: ${sel.sup ? `${min(sel.sup)}.` : "…"} ${sel.ini ? frase(sel.ini) : "Inicio: …"}`;
  const componer = (o: string | undefined, s: { sup?: string; ini?: string }) =>
    [
      o ? `Hola, quiero presupuesto para ${min(o)}.` : "Hola, quiero presupuesto para una obra.",
      s.sup && `Superficie aproximada: ${min(s.sup)}.`,
      s.ini && frase(s.ini),
    ]
      .filter(Boolean)
      .join(" ");
  const mensaje = componer(obra, sel);

  const esquina = "absolute size-3.5 border-primario-claro";
  return (
    <div className="grid max-w-[880px] gap-7 border border-borde bg-superficie p-[clamp(20px,1rem+2vw,40px)]">
      {preguntas.map((q, i) => (
        <fieldset key={q.clave} className="m-0 min-w-0 border-0 p-0">
          <legend className="mono mb-3 p-0 text-xs tracking-[0.08em] text-texto-suave uppercase">
            <span className="font-semibold text-primario-claro">{String(i + 1).padStart(2, "0")}</span>
            {"  "}
            {q.texto}
          </legend>
          <div className="flex flex-wrap gap-2">
            {q.opciones.map((o) => {
              const on = valor(q.clave) === o;
              const clase = clsx(
                "mono inline-flex min-h-11 cursor-pointer items-center rounded-boton border px-3.5 py-2.5 text-left text-[13px] leading-snug no-underline transition-colors hover:border-primario-claro",
                on ? "border-primario-claro bg-primario text-sobre-primario" : "border-borde bg-transparent text-texto",
              );
              return hidratado ? (
                <button key={o} type="button" aria-pressed={on} onClick={() => setSel((s) => ({ ...s, [q.clave]: o }))} className={clase}>
                  {o}
                </button>
              ) : (
                <BotonWhatsApp
                  key={o}
                  numero={whatsapp}
                  mensaje={q.clave === "obra" ? componer(o, {}) : componer(unico, { [q.clave]: o })}
                  className={clase}
                >
                  {o}
                </BotonWhatsApp>
              );
            })}
          </div>
        </fieldset>
      ))}
      <div className="relative px-[22px] pt-[22px] pb-6">
        <span aria-hidden="true" className={clsx(esquina, "top-0 left-0 border-t border-l")} />
        <span aria-hidden="true" className={clsx(esquina, "top-0 right-0 border-t border-r")} />
        <span aria-hidden="true" className={clsx(esquina, "bottom-0 left-0 border-b border-l")} />
        <span aria-hidden="true" className={clsx(esquina, "right-0 bottom-0 border-r border-b")} />
        <p className="mono mb-2 text-[11px] tracking-[0.08em] text-texto-suave uppercase">Mensaje que se enviará</p>
        <p aria-live="polite" className="mono text-[13px] leading-[1.7] [overflow-wrap:anywhere] text-texto">
          {vista}
        </p>
      </div>
      <div className="flex w-full flex-wrap gap-3">
        <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className="btn btn-wa max-w-[400px] flex-[1_1_260px]">
          <span aria-hidden="true" className="bocadillo" />
          <span>Enviar parte por WhatsApp</span>
        </BotonWhatsApp>
        <BotonLlamada telefono={telefono} className="btn btn-tel max-w-[400px] flex-[1_1_260px]">
          Llamar · {telefonoVisible}
        </BotonLlamada>
      </div>
    </div>
  );
}
