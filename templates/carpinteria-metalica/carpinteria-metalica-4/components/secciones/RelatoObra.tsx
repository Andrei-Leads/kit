import { pasosProceso, type SiteConfig } from "@andrei-leads/core";

import { Encabezado } from "@/components/Encabezado";
import { dosCifras } from "@/lib/textos";

type Props = {
  proceso: SiteConfig["proceso"];
  n?: string;
};

/** Capas del dibujo, de abajo arriba (encargo §5): muro, premarco, marco, hoja, vidrio y persiana. */
const CAPAS = 6;

/**
 * Sección de una ventana (entrega/dibujo-ventana.svg, 1,3 KB y 15 trazados), decorativa y sin datos.
 * Cada capa lleva `data-paso` con el paso que la descubre; sin él, se ve desde el principio (con
 * menos pasos que capas, las primeras capas). Con «reducir movimiento», sin soporte de
 * scroll-driven o en móvil, el dibujo sale completo (globals.css).
 */
function DibujoVentana({ pasos }: { pasos: number }) {
  // La capa j (0–5) la descubre el paso j − (6 − pasos) + 1; si sale < 1, se ve desde el principio.
  const paso = (j: number) => {
    const k = j - (CAPAS - pasos);
    return k >= 0 ? String(k + 1) : undefined;
  };
  const acento = "var(--color-acento)";
  const claro = "var(--color-sobre-alterna)";
  const tinte = (p: number) => `color-mix(in oklab, var(--color-acento) ${p}%, transparent)`;
  return (
    <svg viewBox="0 0 320 400" aria-hidden="true" focusable="false" className="block size-full">
      <g className="capa" data-paso={paso(0)}>
        <path d="M16 16H304V384H16Z M64 64H256V336H64Z" fillRule="evenodd" fill={tinte(14)} stroke={acento} strokeWidth={1.5} />
        <path d="M16 40L40 16M16 88L64 40M16 136L64 88M256 40L280 16M256 88L304 40M256 136L304 88M16 384L64 336M256 384L304 336" fill="none" stroke={acento} strokeWidth={0.75} opacity={0.6} />
        <path d="M64 356V372M256 356V372M64 364H256M276 64H292M276 336H292M284 64V336" fill="none" stroke={acento} strokeWidth={1} />
      </g>
      <g className="capa" data-paso={paso(1)}>
        <rect x="64" y="64" width="192" height="272" fill="none" stroke={acento} strokeWidth={1} strokeDasharray="5 3" />
      </g>
      <g className="capa" data-paso={paso(2)}>
        <rect x="70" y="106" width="180" height="224" fill="none" stroke={claro} strokeWidth={2.5} />
        <path d="M56 330H264V340H56Z" fill={tinte(25)} stroke={acento} strokeWidth={1} />
      </g>
      <g className="capa" data-paso={paso(3)}>
        <rect x="78" y="114" width="88" height="208" fill="none" stroke={claro} strokeWidth={1.5} />
        <rect x="154" y="114" width="88" height="208" fill="none" stroke={claro} strokeWidth={1.5} />
        <rect x="158" y="206" width="3" height="26" fill={claro} />
      </g>
      <g className="capa" data-paso={paso(4)}>
        <rect x="88" y="124" width="66" height="188" fill={tinte(20)} stroke={acento} strokeWidth={0.75} />
        <rect x="166" y="124" width="66" height="188" fill={tinte(20)} stroke={acento} strokeWidth={0.75} />
        <path d="M98 160L130 128M98 186L146 138M176 160L208 128M176 186L224 138" fill="none" stroke={acento} strokeWidth={0.75} />
      </g>
      <g className="capa" data-paso={paso(5)}>
        <rect x="64" y="64" width="192" height="42" fill="color-mix(in oklab, var(--color-acento) 12%, var(--color-alterna))" stroke={claro} strokeWidth={1.5} />
        <path d="M72 74H248M72 82H248M72 90H248M72 98H248" fill="none" stroke={acento} strokeWidth={1} />
      </g>
    </svg>
  );
}

/**
 * `RelatoObra`, sección estrella (encargo §5): cada paso de `proceso` (o los 4 por defecto de core
 * para «proyecto») es una lámina «01/05». En escritorio, a la izquierda y *sticky*, el dibujo que se
 * construye por capas con `view-timeline` (solo CSS); en móvil, el dibujo arriba (160 px, estático)
 * y los pasos en una columna unidos por una cota vertical. Título fijo: «De la medida a la obra».
 */
export function RelatoObra({ proceso, n }: Props) {
  const pasos = pasosProceso(proceso, "proyecto").slice(0, CAPAS);
  const total = dosCifras(pasos.length);
  return (
    <section id="proceso" aria-labelledby="titulo-proceso" className="relato gutter seccion">
      <Encabezado n={n} etiqueta="PROCESO" titulo="De la medida a la obra" id="titulo-proceso" />
      <div className="ancho grid items-start gap-7 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14">
        <div data-alterna="" className="relato-panel reticula-alterna flex items-center justify-center">
          <DibujoVentana pasos={pasos.length} />
        </div>
        <ol className="relato-pasos flex flex-col">
          {pasos.map((p, i) => (
            <li key={p.titulo} className="relato-paso flex flex-col gap-2.5 pb-9">
              <span className="etiqueta">
                LÁMINA {dosCifras(i + 1)}/{total}
              </span>
              <h3 className="font-titulo text-[clamp(1.125rem,1rem+0.6vw,1.5rem)] leading-[1.25] font-medium tracking-[-0.02em]">{p.titulo}</h3>
              <p className="max-w-[46ch] text-texto-suave text-pretty">{p.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
