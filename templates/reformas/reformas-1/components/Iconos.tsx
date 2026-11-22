/** Iconos de trazo fino y remate cuadrado (tablero Sistema). Decorativos: el texto va al lado. */
const TRAZO = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "square" } as const;

export function IconoWhatsapp({ tamano = 18 }: { tamano?: number }) {
  return (
    <svg width={tamano} height={tamano} viewBox="0 0 24 24" {...TRAZO} aria-hidden="true" className="flex-none">
      <path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-3.5-.8L4 20z" />
    </svg>
  );
}

export function IconoTelefono({ tamano = 18 }: { tamano?: number }) {
  return (
    <svg width={tamano} height={tamano} viewBox="0 0 24 24" {...TRAZO} aria-hidden="true" className="flex-none">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A15 15 0 014 5a1 1 0 011-1z" />
    </svg>
  );
}

/** Cinco estrellas: `llenas` en tinta y el resto al 25 %. */
export function Estrellas({ llenas }: { llenas: number }) {
  return (
    <svg width="84" height="16" viewBox="0 0 84 16" aria-hidden="true" className="flex-none">
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          transform={`translate(${i * 17} 0)`}
          d="M8 1l2.1 4.6 5 .5-3.8 3.4 1.1 4.9L8 11.8 3.6 14.4l1.1-4.9L.9 6.1l5-.5z"
          fill="currentColor"
          fillOpacity={i < llenas ? 1 : 0.25}
        />
      ))}
    </svg>
  );
}
