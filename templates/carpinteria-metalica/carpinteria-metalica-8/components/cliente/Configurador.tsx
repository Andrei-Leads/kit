"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
// Excepción permitida (docs/nuevo-template.md §6.2): el botón final cambia con los toques.
// Con core ≥ 0.5.1 (`sideEffects`) solo trae ese módulo.
import { BotonWhatsApp } from "@andrei-leads/core";
// clsx y no cn(): cn arrastra tailwind-merge (~9 KB gzip) al navegador.
import { clsx } from "clsx";

export type OpcionServicio = {
  titulo: string;
  /** El título dentro de una frase («persianas de librillo»), calculado en el servidor. */
  enFrase: string;
  /** Foto o azulejo de la tarjeta, pintado en el servidor (sin next/image en el cliente). */
  medio?: ReactNode;
};

type Props = {
  servicios: OpcionServicio[];
  /** Nombre del negocio (≤ 24 caracteres: «Enviar a {nombre}»). */
  nombre: string;
  whatsapp: string;
  /** «Prefiero llamar · {teléfono}»: BotonLlamada pintado en el servidor. */
  llamada: ReactNode;
  /** Pie común de las fotos (etiqueta de IA), si alguna tarjeta lleva foto. */
  pieFotos?: string;
};

const DONDES = ["un piso", "un local o comercio", "una comunidad", "una casa"] as const;
const CUANDOS = ["esta semana", "este mes", "sin prisa"] as const;
const GUIJARROS = ["rounded-guijarro-1", "rounded-guijarro-2", "rounded-guijarro-3", "rounded-guijarro-4"];
const PUNTOS = ["bg-primario-suave", "bg-alterna", "bg-acento-suave"];

const mayuscula = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

/**
 * Configurador (encargo §5): tres pasos con barra de progreso y un resumen con el mensaje tal como
 * llegará. Solo compone el `mensaje` de `BotonWhatsApp`: no pide ni guarda datos. Sin JS no se ve
 * (`scripting: none`): la sección de servidor pinta la lista de servicios y el WhatsApp genérico.
 */
export function Configurador({ servicios, nombre, whatsapp, llamada, pieFotos }: Props) {
  const [paso, setPaso] = useState(1);
  const [servicio, setServicio] = useState<OpcionServicio | null>(null);
  const [donde, setDonde] = useState<string | null>(null);
  const [cuando, setCuando] = useState<string | null>(null);
  const titulo = useRef<HTMLElement | null>(null);
  const fijarTitulo = (el: HTMLElement | null) => {
    titulo.current = el;
  };
  const [tocado, setTocado] = useState(false);

  // Al cambiar de paso, el foco va al título del paso nuevo (no en la primera pintura).
  useEffect(() => {
    if (tocado) titulo.current?.focus();
  }, [paso, tocado]);

  const siguiente = (s: { servicio: unknown; donde: unknown; cuando: unknown }) => (!s.donde ? 2 : !s.cuando ? 3 : 4);
  const ir = (n: number) => {
    setTocado(true);
    setPaso(n);
  };

  const mensaje =
    servicio && donde && cuando
      ? `Hola, os escribo desde vuestra web. Necesito ${servicio.enFrase} para ${donde}, ${cuando}. ¿Cuándo podéis pasar a verlo?`
      : "";
  const progreso = paso === 1 ? 0.33 : paso === 2 ? 0.66 : 1;
  const conFoto = servicios.slice(0, 6);
  const compactos = servicios.slice(6);
  const leyenda = "mb-[18px] font-titulo text-[clamp(1.375rem,1.2rem+0.7vw,1.75rem)] font-medium outline-none";

  const opciones = (lista: readonly string[], actual: string | null, elegir: (t: string) => void) => (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,200px),1fr))] gap-3">
      {lista.map((t, i) => (
        <button
          key={t}
          type="button"
          aria-pressed={actual === t}
          onClick={() => elegir(t)}
          className={clsx("opcion flex min-h-16 items-center gap-3.5 border-2 px-[18px] py-2.5 text-left font-titulo text-[19px] font-medium text-texto", GUIJARROS[i % 4])}
        >
          <span aria-hidden="true" className={clsx("h-6 w-[26px] flex-none rounded-guijarro-1", PUNTOS[i % 3])} />
          {mayuscula(t)}
        </button>
      ))}
    </div>
  );

  return (
    <div className="[@media(scripting:none)]:hidden">
      <div className="mb-7 flex items-center gap-4">
        <span aria-live="polite" className="flex-none text-[15px] font-semibold">
          Paso {Math.min(paso, 3)} de 3
        </span>
        <div aria-hidden="true" className="h-2.5 flex-1 overflow-hidden rounded-full bg-alterna">
          <div className="progreso h-full origin-left rounded-full bg-primario" style={{ transform: `scaleX(${progreso})` }} />
        </div>
      </div>

      {paso === 1 && (
        <fieldset key="p1" className="paso-entra m-0 border-0 p-0">
          <legend className="p-0">
            <span ref={fijarTitulo} tabIndex={-1} className={clsx(leyenda, "block")}>
              ¿Qué necesitas?
            </span>
          </legend>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3 lg:grid-cols-[repeat(auto-fill,minmax(170px,1fr))]">
            {conFoto.map((s) => (
              <button
                key={s.titulo}
                type="button"
                aria-pressed={servicio?.titulo === s.titulo}
                onClick={() => {
                  setServicio(s);
                  ir(siguiente({ servicio: s, donde, cuando }));
                }}
                className="opcion flex flex-col gap-2.5 rounded-[24px_24px_24px_8px] border-2 px-2 pt-2 pb-3.5 text-left text-texto"
              >
                {s.medio}
                <span className="px-1.5 font-titulo text-[17px] leading-[1.2] font-medium">{s.titulo}</span>
              </button>
            ))}
          </div>
          {compactos.length > 0 && (
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              {compactos.map((s) => (
                <button
                  key={s.titulo}
                  type="button"
                  aria-pressed={servicio?.titulo === s.titulo}
                  onClick={() => {
                    setServicio(s);
                    ir(siguiente({ servicio: s, donde, cuando }));
                  }}
                  className="opcion min-h-[52px] rounded-boton border-2 px-4 py-2 text-left font-titulo text-[17px] leading-[1.2] font-medium text-texto"
                >
                  {s.titulo}
                </button>
              ))}
            </div>
          )}
          {pieFotos && <p className="pie-foto mt-3">{pieFotos}</p>}
        </fieldset>
      )}

      {paso === 2 && (
        <fieldset key="p2" className="paso-entra m-0 border-0 p-0">
          <legend className="p-0">
            <span ref={fijarTitulo} tabIndex={-1} className={clsx(leyenda, "block")}>
              ¿Dónde?
            </span>
          </legend>
          {opciones(DONDES, donde, (t) => {
            setDonde(t);
            ir(siguiente({ servicio, donde: t, cuando }));
          })}
        </fieldset>
      )}

      {paso === 3 && (
        <fieldset key="p3" className="paso-entra m-0 border-0 p-0">
          <legend className="p-0">
            <span ref={fijarTitulo} tabIndex={-1} className={clsx(leyenda, "block")}>
              ¿Para cuándo?
            </span>
          </legend>
          {opciones(CUANDOS, cuando, (t) => {
            setCuando(t);
            ir(siguiente({ servicio, donde, cuando: t }));
          })}
        </fieldset>
      )}

      {paso === 4 && servicio && donde && cuando && (
        <div key="p4" className="paso-entra grid items-start gap-[clamp(20px,4vw,48px)] lg:grid-cols-2">
          <div className="flex flex-col gap-3">
            <h3 ref={fijarTitulo} tabIndex={-1} className="mb-1.5 font-titulo text-[clamp(1.375rem,1.2rem+0.7vw,1.75rem)] font-medium outline-none">
              Tu mensaje
            </h3>
            {[
              { k: "Qué", v: servicio.titulo, p: 1 },
              { k: "Dónde", v: mayuscula(donde), p: 2 },
              { k: "Cuándo", v: mayuscula(cuando), p: 3 },
            ].map((r) => (
              <div key={r.k} className="flex items-center justify-between gap-3 rounded-boton bg-fondo py-2.5 ps-4 pe-2.5">
                <span className="flex flex-col leading-[1.3]">
                  <span className="text-[13px] text-texto-suave">{r.k}</span>
                  <strong className="font-semibold">{r.v}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => ir(r.p)}
                  className="min-h-11 rounded-chip border-[1.5px] border-texto px-3.5 text-[15px] font-semibold text-texto"
                >
                  Cambiar<span className="sr-only"> {r.k.toLowerCase()}</span>
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <p className="rounded-[24px_24px_24px_6px] bg-primario-suave px-[22px] py-5 text-[17px] leading-[1.55]">
              <span className="mb-1.5 block text-[13px] font-semibold text-texto-suave">Así llegará a {nombre}</span>
              {mensaje}
            </p>
            <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className="boton boton-grande boton-guijarro">
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
              </svg>
              {nombre.length <= 24 ? `Enviar a ${nombre}` : "Enviar por WhatsApp"}
            </BotonWhatsApp>
            {llamada}
          </div>
        </div>
      )}

      {paso > 1 && paso < 4 && (
        <button
          type="button"
          onClick={() => ir(paso - 1)}
          className="mt-5 min-h-11 px-1.5 font-semibold text-texto underline underline-offset-[5px]"
        >
          ← Paso anterior
        </button>
      )}
    </div>
  );
}
