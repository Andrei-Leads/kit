/** Iconos de línea del diseño (SVG en línea, decorativos). */
export function IconoTelefono({ className = "size-5 flex-none" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" fill="currentColor" />
    </svg>
  );
}

export function IconoWhatsApp({ className = "size-5 flex-none" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 .9c-1-.4-2-1.4-2.4-2.4l.9-1-1-2z" fill="currentColor" />
    </svg>
  );
}

/** Casilla marcada (☑) en --color-acento. */
export function CasillaMarcada() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" className="mt-px flex-none text-acento">
      <rect x="1" y="1" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4 9.5l3.2 3L14 5" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
