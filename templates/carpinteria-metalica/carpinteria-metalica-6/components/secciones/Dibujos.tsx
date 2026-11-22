/*
 * Dibujos de trazo de 2 px redondeado (encargo §5 y §7), en línea y decorativos (`aria-hidden`):
 * no llevan datos. Heredan el color del texto.
 */

/** Hero sin fotos: una ventana con la persiana torcida y otra nueva. */
export function DosVentanas({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 260 130"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="6" y="6" width="104" height="118" rx="8" />
      <path d="M6 22l104 4M6 36l104 6M6 50l90 8M6 64l64 6M58 70v54" />
      <rect x="150" y="6" width="104" height="118" rx="8" />
      <rect x="150" y="6" width="104" height="22" rx="8" />
      <path d="M202 28v96M190 72v8M214 72v8" />
    </svg>
  );
}

/** 404: una ventana con la persiana bajada del todo. */
export function PersianaBajada({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 130"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="6" y="6" width="108" height="118" rx="8" />
      <path d="M6 24h108M60 18v6" />
      <path d="M6 38h108M6 52h108M6 66h108M6 80h108M6 94h108M6 108h108" />
    </svg>
  );
}
