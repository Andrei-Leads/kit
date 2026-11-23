/** Iconos de trazo de 2 px (entrega de Claude Design). Decorativos: el texto va al lado. */
const TRAZO = { fill: "none", stroke: "currentColor", strokeWidth: 2 } as const;

export function IconoWhatsapp({ tamano = 20 }: { tamano?: number }) {
  return (
    <svg width={tamano} height={tamano} viewBox="0 0 24 24" {...TRAZO} aria-hidden="true" className="flex-none">
      <path d="M4 20l1.4-4.2A8 8 0 1 1 8.2 18.6z" />
    </svg>
  );
}

export function IconoTelefono({ tamano = 18 }: { tamano?: number }) {
  return (
    <svg width={tamano} height={tamano} viewBox="0 0 24 24" {...TRAZO} aria-hidden="true" className="flex-none">
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M11 18h2" />
    </svg>
  );
}

export function IconoMenu() {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true" className="flex-none">
      <path d="M0 1h18M0 6h18M0 11h18" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

/** Pieza genérica para la tarjeta de servicio sin foto (lista cerrada; por defecto, la puerta). */
export type Pieza = "puerta" | "silla" | "tarima" | "ventana";

/** Elige la pieza por palabras del título del servicio. Sin coincidencia, la puerta. */
export function piezaDelServicio(titulo: string): Pieza {
  const t = titulo.toLowerCase();
  if (/ventan/.test(t)) return "ventana";
  if (/tarima|parquet|suelo|acuchill/.test(t)) return "tarima";
  if (/mueble|silla|c[oó]moda|mesa|armario|carcoma|enea/.test(t)) return "silla";
  return "puerta";
}

export function IconoPieza({ pieza }: { pieza: Pieza }) {
  return (
    <svg width="72" height="72" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      {pieza === "puerta" && (
        <>
          <rect x="18" y="6" width="28" height="52" rx="2" />
          <rect x="23" y="12" width="18" height="16" rx="1" />
          <rect x="23" y="34" width="18" height="18" rx="1" />
          <circle cx="42" cy="31" r="1.5" />
        </>
      )}
      {pieza === "silla" && <path d="M22 6v52M42 30v28M22 30h22M22 12h12M22 20h12" />}
      {pieza === "tarima" && <path d="M6 18h52M6 30h52M6 42h52M6 54h52M26 18v12M44 30v12M18 42v12" />}
      {pieza === "ventana" && (
        <>
          <rect x="12" y="8" width="40" height="48" rx="2" />
          <path d="M32 8v48M12 32h40" />
        </>
      )}
    </svg>
  );
}

/** Estrellas de texto: `llenas` en foco y el resto huecas. Decorativas: la nota va en texto. */
export function Estrellas({ puntuacion }: { puntuacion: number }) {
  const n = Math.round(puntuacion);
  return (
    <span aria-hidden="true" className="tracking-[2px] text-foco">
      {"★".repeat(n)}
      {"☆".repeat(5 - n)}
    </span>
  );
}
