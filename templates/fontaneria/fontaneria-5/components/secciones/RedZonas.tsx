import type { Red } from "@/lib/red";
import { cn } from "@/lib/utils";

/**
 * RedZonas: SVG en línea de la red de tuberías (componente de servidor; la geometría sale de
 * `calcularRed`, lib/red.ts). Es decorativo (`aria-hidden`): la lista real de municipios es la
 * `<ol aria-label="Municipios donde trabajamos">` que lo acompaña. Los nodos NO son enlaces.
 *
 * `animada`: solo en «Dónde trabajamos» (los tramos se dibujan al entrar, con view()). En el hero,
 * estática.
 */
export function RedZonas({ red, animada, className }: { red: Red; animada?: boolean; className?: string }) {
  const T = "var(--color-tinta)";
  const ox = red.origen.x;
  return (
    <svg
      viewBox={`0 0 ${red.ancho} ${red.alto}`}
      width={red.ancho}
      height={red.alto}
      aria-hidden="true"
      focusable="false"
      className={cn("block h-auto max-w-full overflow-visible", red.centrada && "mx-auto", animada && "red-animada", className)}
    >
      {red.tramos.map((t, i) => (
        <path
          key={`t${i}`}
          d={t.d}
          data-tubo={animada ? t.sentido : undefined}
          stroke={T}
          strokeWidth={8}
          fill="none"
          strokeLinecap="square"
        />
      ))}
      {red.tapon && <rect x={red.tapon.x - 5} y={red.tapon.y - 15} width={10} height={30} fill={T} />}
      {red.ramas.map((r, i) => (
        <g key={`r${i}`}>
          <path
            d={`M${r.x} ${r.y} V${r.ny}`}
            data-tubo={animada ? (r.baja ? "rama-baja" : "rama-sube") : undefined}
            stroke={T}
            strokeWidth={4}
            fill="none"
          />
          <rect x={r.x - 8} y={r.y - 8} width={16} height={16} fill={T} />
          <g data-nodo={animada ? "" : undefined}>
            <circle cx={r.x} cy={r.ny} r={5} fill="#ffffff" stroke="var(--color-primario)" strokeWidth={3} />
            <text textAnchor="middle" fill={T} fontSize={16} fontWeight={600} className="red-texto">
              {r.lineas.map((l, j) => (
                <tspan key={j} x={r.x} y={l.y}>
                  {l.texto}
                </tspan>
              ))}
            </text>
          </g>
        </g>
      ))}
      <rect x={ox - 11} y={red.origen.y - 11} width={22} height={22} fill="var(--color-primario)" stroke={T} strokeWidth={4} />
      {red.ciudad.map((c, j) => (
        <text key={`c${j}`} x={ox - 13} y={c.y} fill={T} fontSize={30} fontWeight={700} letterSpacing="-0.02em" className="red-texto">
          {c.texto}
        </text>
      ))}
      <text x={ox - 12} y={red.salimosY} fill={T} fontSize={12} fontWeight={600} letterSpacing="0.14em" className="red-texto-sans">
        SALIMOS DE
      </text>
      {red.placa && (
        <g>
          <path
            d={`M${ox - 13} ${red.placa.y} H${ox - 13 + 176} L${ox - 13 + 186} ${red.placa.y + 10} V${red.placa.y + 34} H${ox - 13} Z`}
            fill={T}
          />
          <text x={ox - 1} y={red.placa.y + 23} fill="#f4f6f7" fontSize={15} fontWeight={500} className="red-texto-sans">
            Llegamos en{" "}
            <tspan fontSize={17} fontWeight={700} className="red-texto">
              {red.placa.tiempo}
            </tspan>
          </text>
        </g>
      )}
    </svg>
  );
}
