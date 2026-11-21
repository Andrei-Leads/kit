/** Iconos en línea (sin librería): decorativos, el nombre accesible es el texto del botón. */

const TRAZO = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinejoin: "round", strokeLinecap: "round" } as const;

export function IconoTelefono({ className = "size-[22px] flex-none" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className}>
      <path
        {...TRAZO}
        d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"
      />
    </svg>
  );
}

export function IconoWhatsApp({ className = "size-[22px] flex-none" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className}>
      <path {...TRAZO} d="M3.5 20.5l1.4-4.3A8.6 8.6 0 1 1 8 19.3z" />
      <path
        fill="currentColor"
        d="M9.2 7.6c.3-.2.7-.2.9.1l1 1.6c.2.3.1.6-.1.8l-.6.6c.6 1.2 1.6 2.2 2.8 2.8l.6-.6c.2-.2.6-.3.8-.1l1.6 1c.3.2.4.6.1.9l-.7.9c-.4.4-1 .6-1.6.4-2.7-.9-4.9-3.1-5.8-5.8-.2-.6 0-1.2.4-1.6z"
      />
    </svg>
  );
}

/**
 * Pieza de tubería para la tarjeta de servicio sin foto: codo, T, llave y manguito, en ese orden
 * cíclico por posición (no por tema).
 */
export function IconoPieza({ indice }: { indice: number }) {
  const trazo = { stroke: "currentColor", strokeWidth: 5, fill: "none", strokeLinecap: "square" } as const;
  const piezas = [
    <path key="codo" d="M10 36 V12 H36" {...trazo} />,
    <path key="t" d="M4 14 H36 M20 14 V36" {...trazo} />,
    <g key="llave">
      <path d="M4 27 H36 M20 20 V8 M12 8 H28" {...trazo} />
      <rect x={13} y={20} width={14} height={14} fill="currentColor" />
    </g>,
    <g key="manguito">
      <path d="M4 20 H36" {...trazo} />
      <rect x={13} y={12} width={14} height={16} fill="currentColor" />
    </g>,
  ];
  return (
    <svg viewBox="0 0 40 40" width={48} height={48} aria-hidden="true" focusable="false" className="text-tinta">
      {piezas[indice % 4]}
    </svg>
  );
}
