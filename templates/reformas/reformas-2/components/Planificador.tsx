"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode, type RefObject } from "react";
// Única importación de valores de core en cliente: con `sideEffects` (core ≥ 0.5.1) solo se lleva
// este botón, sin zod ni el contrato.
import { BotonWhatsApp } from "@andrei-leads/core";

import { IconoWhatsApp } from "@/components/Iconos";
import { OTRA_COSA, PLAZOS, TAMANOS, componerMensaje, mensajeSinJs } from "@/lib/planificador";
// clsx y no cn(): cn arrastra tailwind-merge (~9 KB gzip) al navegador.
import { clsx as cn } from "clsx";

/** Una opción del paso 1. `frase`: el título en minúscula, calculado en el servidor. */
export type OpcionPlanificador = {
  titulo: string;
  frase: string;
  /** Miniatura (next/image de 40–64 px), pintada en el servidor. Sin foto, tarjeta tintada. */
  miniatura?: ReactNode;
};

type Props = {
  opciones: readonly OpcionPlanificador[];
  /** `contacto.whatsapp`. */
  numero: string;
  /** Mensaje antes de elegir nada (el general o el del servicio). */
  mensajeBase: string;
  /** Ficha de servicio: planificador corto de 2 pasos con este servicio ya elegido. */
  servicioFijo?: { titulo: string; frase: string };
  /** `BotonLlamada` «Llamar · {teléfono}», pintado en el servidor. */
  llamada: ReactNode;
  /** Alguna miniatura es de IA: «Imágenes generadas con IA» una vez, junto al progreso. */
  notaIa?: boolean;
};

type Paso = "servicio" | "tamano" | "plazo";
type Eleccion = { titulo: string; frase: string };

const sinSuscripcion = () => () => {};
const MAX_VISIBLES = 5;

const OPCION =
  "opcion flex h-[clamp(52px,1.2rem+5vw,88px)] min-w-0 cursor-pointer items-center gap-2.5 rounded-[14px] border-[1.5px] text-left text-texto no-underline";
const OPCION_SIMPLE =
  "opcion opcion-tinte min-h-[clamp(56px,2rem+2vw,72px)] cursor-pointer rounded-[14px] border-[1.5px] px-3.5 py-2 text-left text-[clamp(14px,0.8rem+0.2vw,16px)] leading-[1.2] font-semibold text-texto";
const LEGEND =
  "mb-2 p-0 font-titulo text-[clamp(1.25rem,1.1rem+0.6vw,1.5rem)] leading-[1.2] font-semibold tracking-[-0.01em] outline-none";

/**
 * Planificador (sección estrella, única isla): qué reformar, tamaño y plazo, y WhatsApp con el
 * mensaje escrito. No pide datos ni calcula precios.
 *
 * Sin JavaScript (y hasta hidratar), cada opción del primer paso es un `BotonWhatsApp` de verdad
 * («Hola, quiero presupuesto para {servicio}») y «Ver más» es un `<details>`. Al hidratar, las
 * opciones pasan a ser botones con `aria-pressed`; cada paso es un `fieldset` con `legend`, el
 * progreso se anuncia (`aria-live`) y el foco va a la `legend` del paso nuevo.
 */
export function Planificador({ opciones, numero, mensajeBase, servicioFijo, llamada, notaIa }: Props) {
  const hidratado = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  const fijo: Eleccion | undefined = servicioFijo ?? (opciones.length === 1 ? opciones[0] : undefined);
  const pasos: Paso[] = fijo ? ["tamano", "plazo"] : ["servicio", "tamano", "plazo"];

  const [indice, setIndice] = useState(0);
  const [servicio, setServicio] = useState<Eleccion | null>(null);
  const [tamano, setTamano] = useState<string | null>(null);
  const [plazo, setPlazo] = useState<string | null>(null);
  const [verMas, setVerMas] = useState(false);
  const [volver, setVolver] = useState(false);
  const [tocado, setTocado] = useState(false);
  const titularRef = useRef<HTMLElement>(null);
  const rejillaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tocado) titularRef.current?.focus({ preventScroll: true });
  }, [indice, tocado]);

  // Al desplegar «Ver más», el foco va a la primera opción nueva (el botón desaparece).
  useEffect(() => {
    if (verMas) rejillaRef.current?.querySelectorAll<HTMLElement>("button")[MAX_VISIBLES]?.focus();
  }, [verMas]);

  const paso: Paso | "resumen" = indice < pasos.length ? pasos[indice] : "resumen";
  const servicioEf = fijo ?? servicio ?? undefined;
  const algo = !!(servicio || tamano || plazo);
  const mensaje = algo ? componerMensaje(mensajeBase, servicioEf?.frase, tamano ?? undefined, plazo ?? undefined) : mensajeBase;

  const avanzar = () => {
    setTocado(true);
    setIndice(volver ? pasos.length : indice + 1);
    setVolver(false);
  };
  const ir = (p: Paso) => {
    setTocado(true);
    setIndice(pasos.indexOf(p));
    setVolver(true);
  };

  const tarjetaServicio = (o: Eleccion & { miniatura?: ReactNode }) => {
    const clase = cn(OPCION, o.miniatura ? "border-borde bg-superficie p-[7px]" : "opcion-tinte px-3 py-2");
    const contenido = (
      <>
        {o.miniatura}
        <span className="line-clamp-3 text-[clamp(13px,0.72rem+0.25vw,15px)] leading-[1.15] font-semibold text-pretty hyphens-auto [overflow-wrap:anywhere]">
          {o.titulo}
        </span>
      </>
    );
    return hidratado ? (
      <button
        key={o.titulo}
        type="button"
        aria-pressed={servicio?.titulo === o.titulo}
        onClick={() => {
          setServicio({ titulo: o.titulo, frase: o.frase });
          avanzar();
        }}
        className={clase}
      >
        {contenido}
      </button>
    ) : (
      <BotonWhatsApp key={o.titulo} numero={numero} mensaje={mensajeSinJs(o.frase)} className={clase}>
        {contenido}
      </BotonWhatsApp>
    );
  };

  const otra = { titulo: OTRA_COSA.titulo, frase: OTRA_COSA.frase };
  const muchas = opciones.length > MAX_VISIBLES;

  const simple = (lista: readonly string[], elegido: string | null, elegir: (t: string) => void, sinJs: (t: string) => string) =>
    lista.map((t) =>
      hidratado ? (
        <button
          key={t}
          type="button"
          aria-pressed={elegido === t}
          onClick={() => {
            elegir(t);
            avanzar();
          }}
          className={OPCION_SIMPLE}
        >
          {t}
        </button>
      ) : (
        <BotonWhatsApp key={t} numero={numero} mensaje={sinJs(t)} className={cn(OPCION_SIMPLE, "no-underline")}>
          {t}
        </BotonWhatsApp>
      ),
    );

  const entra = tocado ? "paso-entra" : undefined;
  const textoWa = paso === "resumen" ? "Abrir WhatsApp con mi mensaje" : algo ? "Enviar por WhatsApp" : "Escribir por WhatsApp";
  const filas = [
    { k: "Reforma", v: servicioEf?.titulo, paso: "servicio" as const, aria: "Cambiar qué quieres reformar" },
    { k: "Tamaño", v: tamano, paso: "tamano" as const, aria: "Cambiar el tamaño" },
    { k: "Para", v: plazo, paso: "plazo" as const, aria: "Cambiar el plazo" },
  ];

  return (
    <div className="@container flex flex-col gap-2 rounded-[20px] bg-superficie p-[clamp(12px,0.3rem+2.2vw,28px)] text-left text-texto shadow-tarjeta">
      <div className="flex flex-col gap-1.5">
        <div aria-hidden="true" className="flex gap-1.5">
          {pasos.map((p, i) => (
            <span key={p} className="h-1.5 flex-1 overflow-hidden rounded-full bg-(--color-pista)">
              <span className={cn("segmento block h-full origin-left rounded-full bg-primario", i <= indice ? "scale-x-100" : "scale-x-0")} />
            </span>
          ))}
        </div>
        <div className="flex h-5 items-center justify-between gap-2">
          <p aria-live="polite" className="text-[13px] font-semibold text-texto-suave">
            {paso === "resumen" ? "Listo: revisa tu mensaje" : `Paso ${indice + 1} de ${pasos.length}`}
          </p>
          {hidratado && indice > 0 && (
            <button
              type="button"
              onClick={() => {
                setTocado(true);
                setIndice(indice - 1);
                setVolver(false);
              }}
              className="-mx-2.5 -my-3 h-11 cursor-pointer px-2.5 text-[13px] font-semibold underline underline-offset-[3px]"
            >
              ← Atrás
            </button>
          )}
          {notaIa && paso === "servicio" && <span className="text-[11px] text-texto-suave">Imágenes generadas con IA</span>}
        </div>
      </div>

      {paso === "servicio" && (
        <fieldset key="servicio" className={cn("m-0 min-w-0 border-0 p-0", entra)}>
          <legend ref={titularRef as RefObject<HTMLLegendElement>} tabIndex={-1} className={LEGEND}>
            ¿Qué quieres reformar?
          </legend>
          <div ref={rejillaRef} className="rejilla-opciones grid grid-cols-2 gap-1.5">
            {!muchas || (hidratado && verMas)
              ? [...opciones, otra].map(tarjetaServicio)
              : hidratado
                ? [
                    ...opciones.slice(0, MAX_VISIBLES).map(tarjetaServicio),
                    <button
                      key="ver-mas"
                      type="button"
                      aria-expanded={false}
                      onClick={() => setVerMas(true)}
                      className={cn(OPCION, "justify-center border-transparent bg-alterna px-3 py-2 text-sm font-semibold")}
                    >
                      Ver más ({opciones.length - MAX_VISIBLES})
                    </button>,
                  ]
                : [
                    ...opciones.slice(0, MAX_VISIBLES).map(tarjetaServicio),
                    // Sin JS, «Ver más» es un <details> en la misma casilla que el botón hidratado:
                    // misma altura antes y después de hidratar (sin salto de maquetación).
                    <details key="ver-mas" className="min-w-0 open:col-span-2">
                      <summary
                        className={cn(OPCION, "list-none justify-center border-transparent bg-alterna px-3 py-2 text-sm font-semibold [&::-webkit-details-marker]:hidden")}
                      >
                        Ver más ({opciones.length - MAX_VISIBLES})
                      </summary>
                      <div className="rejilla-opciones mt-1.5 grid grid-cols-2 gap-1.5">
                        {[...opciones.slice(MAX_VISIBLES), otra].map(tarjetaServicio)}
                      </div>
                    </details>,
                  ]}
          </div>
        </fieldset>
      )}

      {paso === "tamano" && (
        <fieldset key="tamano" className={cn("m-0 min-w-0 border-0 p-0", entra)}>
          <legend ref={titularRef as RefObject<HTMLLegendElement>} tabIndex={-1} className={LEGEND}>
            ¿Qué tamaño tiene?
          </legend>
          <div className="rejilla-opciones grid grid-cols-2 gap-1.5">
            {simple(TAMANOS, tamano, setTamano, (t) => componerMensaje(mensajeBase, servicioEf?.frase, t))}
          </div>
        </fieldset>
      )}

      {paso === "plazo" && (
        <fieldset key="plazo" className={cn("m-0 min-w-0 border-0 p-0", entra)}>
          <legend ref={titularRef as RefObject<HTMLLegendElement>} tabIndex={-1} className={LEGEND}>
            ¿Para cuándo lo quieres?
          </legend>
          <div className="rejilla-opciones grid grid-cols-2 gap-1.5">
            {simple(PLAZOS, plazo, setPlazo, (t) => componerMensaje(mensajeBase, servicioEf?.frase, tamano ?? undefined, t))}
          </div>
        </fieldset>
      )}

      {paso === "resumen" && (
        <div className={cn("flex flex-col gap-3", entra)}>
          <h2 ref={titularRef as RefObject<HTMLHeadingElement>} tabIndex={-1} className={LEGEND}>
            Tu mensaje
          </h2>
          <p className="rounded-[20px_20px_4px_20px] bg-(--color-burbuja) px-4 py-3.5 text-[15px] leading-[1.45] text-pretty">{mensaje}</p>
          <dl className="flex flex-col">
            {filas.map((f) => (
              <div key={f.k} className="flex min-h-11 items-center gap-2 border-b border-borde">
                <dt className="w-16 flex-none text-[13px] text-texto-suave">{f.k}</dt>
                <dd className="min-w-0 flex-1 text-sm leading-[1.25] font-semibold">{f.v ?? "—"}</dd>
                {pasos.includes(f.paso) && (
                <button
                  type="button"
                  onClick={() => ir(f.paso)}
                  aria-label={f.aria}
                  className="h-11 flex-none cursor-pointer px-1 text-[13px] font-semibold underline decoration-primario underline-offset-[3px]"
                >
                  Cambiar
                </button>
                )}
              </div>
            ))}
          </dl>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <BotonWhatsApp
          numero={numero}
          mensaje={mensaje}
          className={cn("boton boton-primario px-[18px]", paso === "resumen" ? "flex-[1_1_100%]" : "flex-[1_1_100%] @min-[30rem]:flex-[1_1_200px]")}
        >
          <IconoWhatsApp />
          {textoWa}
        </BotonWhatsApp>
        {llamada}
      </div>
    </div>
  );
}
