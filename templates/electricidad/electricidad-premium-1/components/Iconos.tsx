/** Icono de WhatsApp en línea (bocadillo), decorativo: el nombre del botón es su texto. */
export function IconoWhatsapp({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true" className={`flex-none ${className}`}>
      <path d="M3.5 20.5l1.4-4.2A8.5 8.5 0 1 1 8 19.3z" />
    </svg>
  );
}
