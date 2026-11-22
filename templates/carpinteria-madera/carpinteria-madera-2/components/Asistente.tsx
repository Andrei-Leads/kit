"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode, type RefObject } from "react";
// Única importación de valores de core en cliente: con `sideEffects` (core ≥ 0.5.1) solo se lleva
// este botón, sin zod ni el contrato.
import { BotonWhatsApp } from "@andrei-leads/core";

import { IconoWhatsApp } from "@/components/Iconos";
import { ACABADOS, TAMANOS, componerMensaje } from "@/lib/asistente";
// clsx y no cn(): cn arrastra tailwind-merge (~9 KB gzip) al navegador.
import { clsx as cn } from "clsx";

/** Una pieza del paso 1, ya preparada en el servidor (`AsistenteServidor`). */
export type OpcionAsistente = {
  titulo: string;
  slug: string;
  /** El título en minúscula para meterlo en la frase («Quiero armarios empotrados…»). */
  frase: string;
  /** Mensaje del enlace sin JavaScript: `servicios[].mensajeWhatsapp` o el del template. */
  mensaje: string;
  /** Miniatura 1:1 (next/image de 96 px con su etiqueta «IA»), pintada en el servidor. */
  miniatura?: ReactNode;
};

type Props = {
  opciones: readonly OpcionAsistente[];
  /** `contacto.whatsapp`. */
  numero: string;
  /** Mensaje antes de elegir nada (el general). */
  mensajeBase: string;
  /** Ficha de servicio: empieza en el paso 2 con este servicio elegido. */
  servicioInicial?: string;
  /** Algún servicio tiene foto: tarjetas con miniatura; si no, píldoras de texto. */
  conMiniaturas: boolean;
};

type Estado = { srv: string | null; t: number | null; a: number | null; paso: 1 | 2 | 3 | 4 };

const sinSuscripcion = () => () => {};
const VISIBLES = 5;

const LEGEND = "mb-1.5 block w-full p-0 font-titulo text-[clamp(1.375rem,1.2rem+0.6vw,1.75rem)] leading-[1.15] font-bold tracking-[-0.015em] outline-none";
const TARJETA = "opcion relative flex min-w-0 cursor-pointer flex-col gap-2 rounded-[20px] px-1.5 pt-1.5 pb-3 text-left text-texto no-underline";
const PILDORA = "opcion flex min-h-[60px] cursor-pointer items-center justify-between gap-3 rounded-full py-2.5 pr-3 pl-[22px] text-left text-base leading-[1.25] font-semibold text-texto no-underline";
const FILA = "opcion flex min-h-[60px] cursor-pointer items-center gap-2.5 rounded-[18px] px-3.5 py-2.5 text-left text-[15.5px] leading-[1.2] font-semibold text-texto no-underline";
const ACABADO = "opcion flex min-h-28 cursor-pointer flex-col items-start gap-3.5 rounded-[20px] p-3.5 text-left text-[15.5px] leading-[1.2] font-semibold text-texto no-underline";
const MUESTRA: Record<string, string> = {
  madera: "border-borde bg-[#c9a77c]",
  lacado: "border-borde bg-white",
  ninguno: "border-dashed border-borde bg-transparent",
};

function estadoInicial(opciones: readonly OpcionAsistente[], servicioInicial?: string, slug?: string): Estado {
  const elegido = slug ?? servicioInicial;
  const srv = opciones.length === 1 ? opciones[0].slug : opciones.some((o) => o.slug === elegido) ? elegido! : null;
  return { srv, t: null, a: null, paso: srv ? 2 : 1 };
}

/**
 * Asistente «A medida» (sección estrella y única isla de la home, encargo §5): pieza, tamaño del
 * hueco y acabado, y WhatsApp con el mensaje escrito. No pide datos ni calcula precios. El botón de
 * WhatsApp vive siempre en la base de la tarjeta (pegada con `position: sticky`) y se va
 * completando con cada respuesta.
 *
 * Sin JavaScript (y hasta hidratar), cada opción es un `BotonWhatsApp` de verdad: en el paso 1, el
 * mensaje del servicio; en la ficha (paso 2), servicio + tamaño. «Otra cosa» es un `<details>`.
 * Cada opción del paso 1 lleva `id="asistente-{slug}"`: «Configurar» (`/#asistente-{slug}`) baja a
 * ella sin JS y, con JS, la elige y salta al paso 2. Al hidratar, las opciones son botones con
 * `aria-pressed`; cada paso es un `fieldset` con `legend`, el foco va a la `legend` del paso nuevo y
 * un `aria-live` anuncia el mensaje.
 */
export function Asistente({ opciones, numero, mensajeBase, servicioInicial, conMiniaturas }: Props) {
  const hidratado = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  const unico = opciones.length === 1;
  const total = unico ? 2 : 3;

  const [estado, setEstado] = useState<Estado>(() => estadoInicial(opciones, servicioInicial));
  const [otra, setOtra] = useState(false);
  const [tocado, setTocado] = useState(false);
  const tarjetaRef = useRef<HTMLDivElement>(null);
  const titularRef = useRef<HTMLElement>(null);
  const rejillaRef = useRef<HTMLDivElement>(null);
  const desplazar = useRef(false);

  const { srv, t, a, paso } = estado;
  const servicio = opciones.find((o) => o.slug === srv);
  const resumen = paso === 4;
  const mensaje = componerMensaje(mensajeBase, servicio?.frase, t ?? undefined, a ?? undefined);

  // Cambio de paso: el foco va a la legend nueva (sin desplazar la página, salvo al llegar desde «Configurar»).
  useEffect(() => {
    if (!tocado) return;
    if (desplazar.current) {
      desplazar.current = false;
      tarjetaRef.current?.scrollIntoView({ block: "start" });
    }
    titularRef.current?.focus({ preventScroll: true });
  }, [estado, tocado]);

  // Al desplegar «Otra cosa», el foco va a la primera opción nueva (el botón desaparece).
  useEffect(() => {
    if (otra) rejillaRef.current?.querySelectorAll<HTMLElement>("button")[VISIBLES]?.focus();
  }, [otra]);

  const aplicarAncla = useCallback(
    (hash: string, reiniciar: boolean) => {
      if (hash.startsWith("#asistente-")) {
        const slug = decodeURIComponent(hash.slice("#asistente-".length));
        if (!opciones.some((o) => o.slug === slug)) return false;
        setEstado(estadoInicial(opciones, servicioInicial, slug));
      } else if (hash === "#asistente") {
        if (reiniciar) {
          setEstado(estadoInicial(opciones, servicioInicial));
          setOtra(false);
        }
      } else return false;
      desplazar.current = true;
      setTocado(true);
      return true;
    },
    [opciones, servicioInicial],
  );

  // «Configurar» desde otra página (/#asistente-{slug}): se lee el ancla al montar. En la misma
  // página, el clic se intercepta (con el mismo ancla dos veces no hay `hashchange`).
  useEffect(() => {
    // En un callback (no en el cuerpo del efecto) para no encadenar renders al montar.
    const marco = requestAnimationFrame(() => {
      if (window.location.hash.startsWith("#asistente-")) aplicarAncla(window.location.hash, false);
    });
    const alPulsar = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const enlace = (e.target as Element | null)?.closest?.("a");
      if (!enlace || enlace.origin !== window.location.origin || enlace.pathname !== window.location.pathname) return;
      if (aplicarAncla(enlace.hash, enlace.dataset.asistente === "reiniciar")) e.preventDefault();
    };
    document.addEventListener("click", alPulsar);
    return () => {
      cancelAnimationFrame(marco);
      document.removeEventListener("click", alPulsar);
    };
  }, [aplicarAncla]);

  const ir = (nuevo: Partial<Estado>) => {
    setTocado(true);
    setEstado((e) => ({ ...e, ...nuevo }));
  };
  const elegirServicio = (slug: string) => ir({ srv: slug, paso: t !== null && a !== null ? 4 : 2 });
  const elegirTamano = (i: number) => ir({ t: i, paso: a !== null ? 4 : 3 });
  const elegirAcabado = (i: number) => ir({ a: i, paso: 4 });

  const numeroPaso = unico ? paso - 1 : paso;
  const progreso = resumen ? 1 : numeroPaso / total;
  const puedeAtras = hidratado && !resumen && paso > (unico ? 2 : 1);
  const entra = tocado ? "paso-entra" : undefined;
  const legendRef = titularRef as RefObject<HTMLLegendElement>;

  /** Una opción: botón con `aria-pressed` al hidratar; antes, un WhatsApp real con su mensaje. */
  // Cada opción va en una caja con el `id` del ancla (BotonWhatsApp de core no admite `id`).
  const opcion = (clave: string, clase: string, elegida: boolean, alElegir: () => void, mensajeSinJs: string, contenido: ReactNode, id?: string) => (
    <div key={clave} id={id} className="flex min-w-0 scroll-mt-28">
      {hidratado ? (
        <button type="button" aria-pressed={elegida} onClick={alElegir} className={cn(clase, "w-full")}>
          {contenido}
        </button>
      ) : (
        <BotonWhatsApp numero={numero} mensaje={mensajeSinJs} className={cn(clase, "w-full")}>
          {contenido}
        </BotonWhatsApp>
      )}
    </div>
  );

  const pieza = (o: OpcionAsistente) =>
    opcion(
      o.slug,
      conMiniaturas ? TARJETA : PILDORA,
      srv === o.slug,
      () => elegirServicio(o.slug),
      o.mensaje,
      conMiniaturas ? (
        <>
          {o.miniatura ?? (
            <span aria-hidden="true" className="flex aspect-square items-center justify-center rounded-[14px] bg-alterna font-titulo text-[44px] font-bold">
              {o.titulo.charAt(0)}
            </span>
          )}
          <span className="px-1.5 text-[15px] leading-[1.25] font-semibold text-pretty [overflow-wrap:anywhere]">{o.titulo}</span>
          <span aria-hidden="true" className="check absolute top-3 left-3 z-[3] size-7 items-center justify-center rounded-full bg-primario text-sobre-primario">
            <MarcaCheck />
          </span>
        </>
      ) : (
        <>
          <span className="[overflow-wrap:anywhere]">{o.titulo}</span>
          <span aria-hidden="true" className="marca flex size-7 flex-none items-center justify-center rounded-full border-2 border-borde text-sobre-primario">
            <MarcaCheck tamano={14} />
          </span>
        </>
      ),
      `asistente-${o.slug}`,
    );

  const muchas = opciones.length > 6;
  const resto = opciones.length - VISIBLES;
  const otraContenido = conMiniaturas ? (
    <>
      <span aria-hidden="true" className="font-titulo text-[32px] leading-none">
        +
      </span>
      <span className="text-[15px] font-bold">Otra cosa</span>
      <span className="text-[13px] text-texto-suave">{resto} más</span>
    </>
  ) : (
    <>
      + Otra cosa <span className="font-medium text-texto-suave">({resto} más)</span>
    </>
  );
  const claseOtra = conMiniaturas
    ? "opcion-otra flex min-h-[150px] cursor-pointer flex-col items-center justify-center gap-1.5 rounded-[20px] border-2 border-dashed border-borde text-texto"
    : "opcion-otra flex min-h-[60px] cursor-pointer items-center gap-1 rounded-full border-2 border-dashed border-borde px-[22px] text-left font-bold text-texto";
  const rejilla = conMiniaturas ? "grid grid-cols-[repeat(auto-fill,minmax(128px,1fr))] gap-3" : "grid grid-cols-[repeat(auto-fill,minmax(min(100%,220px),1fr))] gap-2.5";

  return (
    <div
      ref={tarjetaRef}
      id="asistente"
      className="tarjeta-clara relative scroll-mt-24 rounded-tarjeta bg-superficie text-left text-texto shadow-tarjeta"
    >
      <div className="flex flex-col gap-2.5 px-5 pt-[18px]">
        <div className="flex min-h-7 items-center justify-between gap-3">
          <p className="text-sm font-bold tracking-[0.02em] text-texto-suave tabular-nums">
            {resumen ? (
              "Listo para enviar"
            ) : (
              <>
                <span className="sr-only">Paso </span>
                {numeroPaso} de {total}
              </>
            )}
          </p>
          {puedeAtras && (
            <button
              type="button"
              onClick={() => ir({ paso: (paso - 1) as Estado["paso"] })}
              className="-my-2 -mr-2.5 min-h-11 cursor-pointer rounded-full px-3.5 text-[15px] font-semibold hover:bg-alterna"
            >
              ← Atrás
            </button>
          )}
        </div>
        <div aria-hidden="true" className="h-1.5 overflow-hidden rounded-full bg-alterna">
          <div className="progreso h-full rounded-full bg-primario" style={{ transform: `scaleX(${progreso})` }} />
        </div>
      </div>

      {paso === 1 && (
        <fieldset key="pieza" className={cn("m-0 min-w-0 border-0 px-5 pt-[18px] pb-[22px]", entra)}>
          <legend ref={legendRef} tabIndex={-1} className={cn(LEGEND, "float-left mb-4")}>
            ¿Qué necesitas?
          </legend>
          <div ref={rejillaRef} className={cn("clear-both", rejilla)}>
            {!muchas || (hidratado && otra) ? (
              opciones.map(pieza)
            ) : hidratado ? (
              <>
                {opciones.slice(0, VISIBLES).map(pieza)}
                <button type="button" aria-expanded={false} onClick={() => setOtra(true)} className={claseOtra}>
                  {otraContenido}
                </button>
              </>
            ) : (
              <>
                {opciones.slice(0, VISIBLES).map(pieza)}
                {/* Sin JS, «Otra cosa» es un <details> en la misma casilla: misma altura antes y después de hidratar. */}
                <details className="min-w-0 open:col-span-full">
                  <summary className={cn(claseOtra, "list-none [&::-webkit-details-marker]:hidden")}>{otraContenido}</summary>
                  <div className={cn("mt-3", rejilla)}>{opciones.slice(VISIBLES).map(pieza)}</div>
                </details>
              </>
            )}
          </div>
        </fieldset>
      )}

      {paso === 2 && (
        <fieldset key="tamano" className={cn("m-0 min-w-0 border-0 px-5 pt-[18px] pb-[22px]", entra)}>
          <legend ref={legendRef} tabIndex={-1} className={cn(LEGEND, "float-left")}>
            ¿Cuánto mide el hueco?
          </legend>
          <p className="clear-both mb-4 text-[15px] text-texto-suave">
            De lado a lado, a ojo vale{servicio && !unico && <> · <strong className="font-semibold text-texto">{servicio.titulo}</strong></>}
          </p>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-2.5">
            {TAMANOS.map(([texto], i) =>
              opcion(
                texto,
                FILA,
                t === i,
                () => elegirTamano(i),
                componerMensaje(mensajeBase, servicio?.frase, i),
                <>
                  <span aria-hidden="true" className="marca size-[22px] flex-none rounded-full border-2 border-borde" />
                  <span>{texto}</span>
                </>,
              ),
            )}
          </div>
        </fieldset>
      )}

      {paso === 3 && (
        <fieldset key="acabado" className={cn("m-0 min-w-0 border-0 px-5 pt-[18px] pb-[22px]", entra)}>
          <legend ref={legendRef} tabIndex={-1} className={cn(LEGEND, "float-left")}>
            ¿Qué acabado prefieres?
          </legend>
          <p className="clear-both mb-4 text-[15px] text-texto-suave">Te enseñamos muestras al medir.</p>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(128px,1fr))] gap-2.5">
            {ACABADOS.map(([texto, , muestra], i) =>
              opcion(
                texto,
                ACABADO,
                a === i,
                () => elegirAcabado(i),
                componerMensaje(mensajeBase, servicio?.frase, t ?? undefined, i),
                <>
                  <span aria-hidden="true" className={cn("size-10 rounded-full border-2", MUESTRA[muestra])} />
                  <span>{texto}</span>
                </>,
              ),
            )}
          </div>
        </fieldset>
      )}

      {resumen && (
        <fieldset key="resumen" className={cn("m-0 min-w-0 border-0 px-5 pt-[18px] pb-[18px]", entra)}>
          <legend ref={legendRef} tabIndex={-1} className={cn(LEGEND, "float-left mb-3")}>
            Tu mensaje está listo
          </legend>
          <dl className="clear-both flex flex-col">
            {[
              ...(unico ? [] : [{ k: "Pieza", v: servicio?.titulo ?? "—", paso: 1 as const, aria: "Cambiar la pieza" }]),
              { k: "Hueco", v: t !== null ? TAMANOS[t][0] : "Sin indicar", paso: 2 as const, aria: "Cambiar el tamaño del hueco" },
              { k: "Acabado", v: a !== null ? ACABADOS[a][0] : "Sin indicar", paso: 3 as const, aria: "Cambiar el acabado" },
            ].map((f) => (
              <div key={f.k} className="flex items-center gap-3 border-b border-borde py-1.5">
                <dt className="w-[72px] flex-none text-sm text-texto-suave">{f.k}</dt>
                <dd className="min-w-0 flex-1 font-semibold">{f.v}</dd>
                <button
                  type="button"
                  onClick={() => ir({ paso: f.paso })}
                  aria-label={f.aria}
                  className="min-h-11 flex-none cursor-pointer rounded-full border-2 border-borde px-4 text-sm font-semibold hover:border-texto"
                >
                  Cambiar
                </button>
              </div>
            ))}
          </dl>
        </fieldset>
      )}

      <div className="asistente-base flex flex-col gap-2.5 rounded-b-tarjeta border-t border-borde bg-superficie px-4 pt-3 pb-4 shadow-[0_-12px_18px_-16px_rgb(0_0_0/0.25)]">
        <div aria-live="polite">
          {resumen ? (
            <blockquote className="rounded-[20px_20px_20px_6px] bg-alterna px-4 py-3.5 leading-[1.45]">{mensaje}</blockquote>
          ) : (
            <p className="line-clamp-2 text-sm leading-[1.4] text-texto-suave">
              <strong className="font-bold text-texto">Tu mensaje: </strong>
              {mensaje}
            </p>
          )}
        </div>
        <BotonWhatsApp numero={numero} mensaje={mensaje} className="boton boton-acento w-full px-6">
          <IconoWhatsApp />
          Enviar por WhatsApp
        </BotonWhatsApp>
        {resumen && <p className="text-center text-sm text-texto-suave">Al abrirse WhatsApp, añade una foto del hueco.</p>}
      </div>
    </div>
  );
}

function MarcaCheck({ tamano = 16 }: { tamano?: number }) {
  return (
    <svg width={tamano} height={tamano} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}
