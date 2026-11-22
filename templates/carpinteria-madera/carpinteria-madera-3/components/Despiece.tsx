import type { CSSProperties, ReactNode } from "react";

import { letra } from "@/lib/formato";

/*
 * Despiece explosionado de un mueble (encargo §5), dibujado a 1 px en --color-trazo con cotas y marcas
 * de registro en --color-lapiz. Sin cifras: solo letras y líneas de cota. Es decorativo (aria-hidden):
 * la leyenda de servicios que lo acompaña es la lista de enlaces real.
 *
 * Geometría (viewBox 900×600): puerta, costado izquierdo, techo, balda, costado derecho, trasera, suelo.
 * dx/dy: separación en el despiece; ax/ay: separación de la animación «junta» del CTA final; lb: globo
 * de la letra [x, y] y punto de la pieza al que apunta [x, y].
 */
type Pieza = { x: number; y: number; w: number; h: number; dx: number; dy: number; ax: number; ay: number; puerta?: boolean; lb?: [number, number, number, number] };

const PZ: readonly Pieza[] = [
  { x: 302, y: 142, w: 196, h: 316, dx: 338, dy: 0, puerta: true, ax: 0, ay: 0, lb: [738, 96, 738, 142] },
  { x: 280, y: 120, w: 20, h: 360, dx: -90, dy: 0, ax: -14, ay: 0, lb: [158, 92, 196, 120] },
  { x: 300, y: 120, w: 200, h: 20, dx: 0, dy: -70, ax: 0, ay: -12, lb: [400, 18, 400, 50] },
  { x: 300, y: 292, w: 200, h: 16, dx: 0, dy: 0, ax: 0, ay: 0, lb: [440, 258, 440, 292] },
  { x: 500, y: 120, w: 20, h: 360, dx: 90, dy: 0, ax: 14, ay: 0, lb: [600, 514, 600, 480] },
  { x: 300, y: 140, w: 200, h: 320, dx: 40, dy: -50, ax: 0, ay: 0, lb: [574, 66, 540, 90] },
  { x: 300, y: 460, w: 200, h: 20, dx: 0, dy: 70, ax: 0, ay: 12 },
];

const TRAZO = "var(--color-trazo)";
const LAPIZ = "var(--color-lapiz)";

type Props = {
  /** Piezas con letra (= número de servicios, como mucho 6). */
  n?: number;
  modo?: "explotado" | "montado";
  letras?: boolean;
  /** Pieza resaltada en lápiz (fragmento de un paso del proceso sin foto). */
  resalta?: number;
  /** Pieza que falta (404): línea discontinua y «?» en su globo. */
  falta?: number;
  /** CTA final: cada pieza lleva su separación para la animación «junta» (globals.css, `.junta g`). */
  junta?: boolean;
  className?: string;
};

export function Despiece({ n = 6, modo = "explotado", letras = true, resalta = -1, falta = -1, junta = false, className }: Props) {
  const ex = modo !== "montado";
  const base: CSSProperties = { fill: "none", stroke: TRAZO, strokeWidth: 1, vectorEffect: "non-scaling-stroke" };
  const visible = PZ.map((_, i) => (i < 6 ? i < Math.max(1, n) : n >= 5));
  const els: ReactNode[] = [];
  let k = 0;
  const linea = (x1: number, y1: number, x2: number, y2: number, st: CSSProperties = {}) =>
    els.push(<line key={`l${k++}`} x1={x1} y1={y1} x2={x2} y2={y2} style={{ ...base, ...st }} />);
  const cota = (x1: number, y1: number, x2: number, y2: number) => {
    const s = { stroke: LAPIZ, opacity: 0.8 };
    linea(x1, y1, x2, y2, s);
    linea(x1 - 5, y1 + 5, x1 + 5, y1 - 5, s);
    linea(x2 - 5, y2 + 5, x2 + 5, y2 - 5, s);
  };

  // Orden de pintado: trasera, suelo, costados, techo, balda y la puerta delante.
  [5, 6, 1, 2, 3, 4, 0].forEach((i) => {
    if (!visible[i]) return;
    const p = PZ[i];
    const x = p.x + (ex ? p.dx : 0);
    const y = p.y + (ex ? p.dy : 0);
    const st: CSSProperties = { ...base };
    if (i === 5) st.strokeDasharray = "2 5";
    if (resalta >= 0) {
      if (i === resalta) Object.assign(st, { stroke: LAPIZ, strokeWidth: 1.5, strokeDasharray: "none" });
      else st.opacity = 0.5;
    }
    if (i === falta) Object.assign(st, { stroke: LAPIZ, strokeDasharray: "7 6" });
    const hijos: ReactNode[] = [
      <rect key="r" x={x} y={y} width={p.w} height={p.h} style={{ ...st, fill: !ex && p.puerta ? "var(--color-fondo)" : "none" }} />,
    ];
    if (p.puerta && i !== falta) {
      const ph = p.h / 2 - 33;
      hijos.push(<rect key="a" x={x + 22} y={y + 22} width={p.w - 44} height={ph} style={st} />);
      hijos.push(<rect key="b" x={x + 22} y={y + p.h / 2 + 11} width={p.w - 44} height={ph} style={st} />);
      hijos.push(<circle key="c" cx={x + p.w - 12} cy={y + p.h / 2} r={4} style={st} />);
    }
    const sep = junta ? ({ "--dx": `${p.ax}px`, "--dy": `${p.ay}px` } as CSSProperties) : undefined;
    els.push(
      <g key={`p${i}`} style={sep}>
        {hijos}
      </g>,
    );
  });

  if (ex) {
    if (visible[1]) {
      linea(134, 120, 186, 120, { strokeDasharray: "3 3" });
      linea(134, 480, 186, 480, { strokeDasharray: "3 3" });
      cota(146, 120, 146, 480);
    }
    if (visible[6]) {
      linea(300, 556, 300, 590, { strokeDasharray: "3 3" });
      linea(500, 556, 500, 590, { strokeDasharray: "3 3" });
      cota(300, 580, 500, 580);
    }
    linea(842, 142, 880, 142, { strokeDasharray: "3 3" });
    linea(842, 458, 880, 458, { strokeDasharray: "3 3" });
    cota(868, 142, 868, 458);
    if (letras) {
      PZ.slice(0, 6).forEach((p, i) => {
        if (!visible[i] || !p.lb) return;
        const [bx, by, fx, fy] = p.lb;
        linea(fx, fy, bx, by + (fy > by ? 15 : -15), { stroke: LAPIZ });
        els.push(<circle key={`b${i}`} cx={bx} cy={by} r={15} style={{ fill: "var(--color-fondo)", stroke: LAPIZ, strokeWidth: 1, vectorEffect: "non-scaling-stroke" }} />);
        els.push(
          <text key={`t${i}`} x={bx} y={by + 5} textAnchor="middle" style={{ fill: LAPIZ, fontFamily: "var(--font-titulo)", fontSize: "15px", fontWeight: 600 }}>
            {i === falta ? "?" : letra(i)}
          </text>,
        );
      });
    }
    // Marcas de registro en las cuatro esquinas.
    (
      [
        [20, 20],
        [880, 20],
        [20, 580],
        [880, 580],
      ] as const
    ).forEach(([cx, cy]) => {
      els.push(<circle key={`m${k++}`} cx={cx} cy={cy} r={7} style={{ ...base, stroke: LAPIZ, opacity: 0.6 }} />);
      linea(cx - 12, cy, cx + 12, cy, { stroke: LAPIZ, opacity: 0.6 });
      linea(cx, cy - 12, cx, cy + 12, { stroke: LAPIZ, opacity: 0.6 });
    });
  }

  return (
    <svg
      viewBox={ex ? "0 0 900 600" : "230 96 340 408"}
      width="100%"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ display: "block", height: "auto", maxHeight: "100%", overflow: "visible" }}
    >
      {els}
    </svg>
  );
}
