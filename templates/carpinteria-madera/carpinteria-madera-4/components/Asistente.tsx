"use client";

import { useState, useSyncExternalStore, type ReactNode } from "react";
// clsx y no cn(): cn arrastra tailwind-merge (~9 KB gzip) al navegador.
import { clsx } from "clsx";
// Única excepción a «nada de core en el cliente» (docs/nuevo-template.md, 6.2): el BotonWhatsApp del
// asistente, porque su mensaje cambia con cada toque. Con core ≥ 0.5.1 no arrastra zod.
import { BotonWhatsApp } from "@andrei-leads/core";

type Props = {
  /** Servicios (solo slug y título). Con uno solo, se salta la primera pregunta. */
  piezas: readonly { slug: string; titulo: string }[];
  whatsapp: string;
  /** Mensaje general: el del botón sin JavaScript (y hasta hidratar). */
  mensajeGeneral: string;
  /** BotonLlamada ya pintado en el servidor (hero-contorno). */
  llamada: ReactNode;
  /** Icono de WhatsApp, pintado en el servidor. */
  icono: ReactNode;
};

/** Madera o acabado (encargo §3): botón y frase aparte, que se lee bien con cualquier servicio. */
const MADERAS = [
  { v: "roble", texto: "Roble", frase: "Me gustaría en roble." },
  { v: "nogal", texto: "Nogal", frase: "Me gustaría en nogal." },
  { v: "fresno", texto: "Fresno", frase: "Me gustaría en fresno." },
  { v: "lacado", texto: "Lacado", frase: "Me gustaría con acabado lacado." },
  { v: "decidir", texto: "Por decidir", frase: "La madera aún está por decidir." },
] as const;

/** Qué tiene el cliente (encargo §3). */
const REFERENCIAS = [
  { v: "plano", texto: "Tengo el plano del interiorista", frase: "Tengo el plano de mi interiorista." },
  { v: "fotos", texto: "Tengo fotos de referencia", frase: "Os mando fotos de referencia." },
  { v: "idea", texto: "De momento solo la idea", frase: "De momento solo tengo la idea." },
] as const;

const sinSuscripcion = () => () => {};

/** Minúscula inicial salvo siglas (la de core, sin importarla aquí para no meter más módulos en el cliente). */
const min = (t: string) => (t.length > 1 && /[A-ZÁÉÍÓÚÑ]/.test(t[1]) ? t : t.charAt(0).toLowerCase() + t.slice(1));

type Clave = "pieza" | "madera" | "referencia";

/**
 * Asistente «Tu pieza en tres toques» (encargo §6.7): qué pieza (servicios), qué madera o acabado y
 * qué tiene el cliente, en casillas cuadradas. Solo compone el `mensaje` de BotonWhatsApp («Hola,
 * quiero presupuesto para {servicio}. Me gustaría en roble. Tengo el plano de mi interiorista.»): no
 * guarda ni envía nada. Un segundo toque en la opción marcada la desmarca.
 *
 * Sin JavaScript (y hasta hidratar): la caja con las preguntas como texto guía y un único
 * BotonWhatsApp con el mensaje general (encargo §5); las casillas solo se pintan al hidratar.
 */
export function Asistente({ piezas, whatsapp, mensajeGeneral, llamada, icono }: Props) {
  const hidratado = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  const unica = piezas.length === 1 ? piezas[0] : undefined;
  const [sel, setSel] = useState<Partial<Record<Clave, string>>>({});
  const pieza = unica ?? piezas.find((p) => p.slug === sel.pieza);
  const madera = MADERAS.find((m) => m.v === sel.madera);
  const referencia = REFERENCIAS.find((r) => r.v === sel.referencia);

  // Sin nada elegido, el mensaje general (también el `contacto.mensajeWhatsapp` del cliente).
  const algoElegido = (!unica && sel.pieza) || madera || referencia;
  const mensaje = hidratado && algoElegido
    ? [`Hola, quiero presupuesto para ${pieza ? min(pieza.titulo) : "un mueble a medida"}.`, madera?.frase, referencia?.frase].filter(Boolean).join(" ")
    : mensajeGeneral;

  const elegir = (clave: Clave, v: string) => setSel((s) => ({ ...s, [clave]: s[clave] === v ? undefined : v }));

  const grupos: { clave: Clave; titulo: string; opciones: { v: string; texto: string }[] }[] = [
    ...(unica ? [] : [{ clave: "pieza" as const, titulo: "Qué pieza", opciones: piezas.map((p) => ({ v: p.slug, texto: p.titulo })) }]),
    { clave: "madera", titulo: "Qué madera o acabado", opciones: MADERAS.map((m) => ({ v: m.v, texto: m.texto })) },
    { clave: "referencia", titulo: "Qué tienes", opciones: REFERENCIAS.map((r) => ({ v: r.v, texto: r.texto })) },
  ];

  return (
    <>
      {hidratado ? (
        grupos.map((g, i) => (
          <fieldset key={g.clave} className="m-0 min-w-0 border-0 p-0">
            <legend className="ft mb-2.5 p-0 text-xl">
              <span className="numero [text-decoration-line:none]">{i + 1}</span> · {g.titulo}
            </legend>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-1.5">
              {g.opciones.map((o) => {
                const on = sel[g.clave] === o.v;
                return (
                  <button
                    key={o.v}
                    type="button"
                    aria-pressed={on}
                    onClick={() => elegir(g.clave, o.v)}
                    className={clsx(
                      "min-h-14 cursor-pointer border-2 border-borde px-3 py-2 text-left text-[0.9375rem] leading-[1.25] font-semibold transition-transform duration-75 active:translate-y-0.5 motion-reduce:active:translate-y-0",
                      on ? "bg-texto text-white" : "bg-superficie text-texto",
                    )}
                  >
                    {o.texto}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))
      ) : (
        <div className="flex flex-col gap-2.5">
          <p className="ft m-0 text-xl">
            {grupos.map((g, i) => (
              <span key={g.clave} className="mr-5 inline-block">
                <span className="numero [text-decoration-line:none]">{i + 1}</span> · {g.titulo}
              </span>
            ))}
          </p>
          <p className="m-0 text-texto-suave">
            Dinos {unica ? "" : "qué pieza, "}en qué madera y qué tienes: plano, fotos o solo la idea.
          </p>
        </div>
      )}
      {hidratado && (
        <div aria-live="polite" className="flex flex-col gap-1.5 border-t-2 border-borde pt-3.5">
          <p className="pie-ficha m-0 text-texto-suave">Tu mensaje</p>
          <p className="m-0 text-[1.0625rem]">{mensaje}</p>
        </div>
      )}
      <div className="pareja max-w-none">
        <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className="boton boton-negro boton-principal">
          {icono}
          Enviar por WhatsApp
        </BotonWhatsApp>
        {llamada}
      </div>
    </>
  );
}
