/*
 * SVG en línea de «Cuadro». Las piezas del cuadro son <symbol> que se dibujan una sola vez
 * (SimbolosCuadro, en el layout) y se reutilizan con <use>: un solo dibujo para todos los módulos.
 * Sin rayos, chispas ni bombillas (encargo §14).
 */
const pieza = { fill: "var(--color-palanca)", stroke: "var(--color-borde)" };
const ranura = { fill: "var(--color-texto-suave)" };
const maneta = { fill: "var(--color-superficie)", stroke: "var(--color-texto)" };

/** Definiciones del cuadro: cuerpo y maneta del magnetotérmico, general y diferencial. */
export function SimbolosCuadro() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" className="absolute">
      <defs>
        <symbol id="cuerpo" viewBox="0 0 44 72">
          <rect x=".5" y=".5" width="43" height="71" style={pieza} />
          <rect x="14" y="16" width="16" height="40" style={ranura} />
        </symbol>
        <symbol id="maneta" viewBox="0 0 44 72">
          <rect x="14.5" y="18.5" width="15" height="19" style={maneta} />
        </symbol>
        <symbol id="general" viewBox="0 0 64 72">
          <rect x=".5" y=".5" width="63" height="71" style={pieza} />
          <rect x="14" y="12" width="36" height="40" style={ranura} />
          <rect x="16.5" y="14.5" width="31" height="17" style={maneta} />
        </symbol>
        <symbol id="diferencial" viewBox="0 0 64 72">
          <rect x=".5" y=".5" width="63" height="71" style={pieza} />
          <rect x="14" y="12" width="16" height="40" style={ranura} />
          <rect x="14.5" y="14.5" width="15" height="17" style={maneta} />
          <rect x="38.5" y="12.5" width="11" height="11" style={{ fill: "var(--color-alterna)", stroke: "var(--color-borde)" }} />
        </symbol>
      </defs>
    </svg>
  );
}

/** Un magnetotérmico (decorativo). `bajada`: la maneta abajo (el módulo «saltado»). */
export function Palanca({ className, bajada }: { className?: string; bajada?: boolean }) {
  return (
    <svg viewBox="0 0 44 72" aria-hidden="true" focusable="false" className={className}>
      <use href="#cuerpo" width="44" height="72" />
      <use href="#maneta" width="44" height="72" className={bajada ? "maneta-bajada" : "maneta"} />
    </svg>
  );
}

export function IconoTelefono({ className = "size-5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className={`flex-none fill-none stroke-current ${className}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

/** Bocadillo de «Cuéntanoslo por WhatsApp» (encargo §3). */
export function IconoBocadillo({ className = "size-5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className={`flex-none fill-none stroke-current ${className}`} strokeWidth="2" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
