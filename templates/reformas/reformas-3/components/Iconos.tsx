/** Bocadillo de WhatsApp del diseño (trazo de 2,2). Decorativo: el texto del botón da el nombre. */
export function IconoWhatsapp({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true" className={className}>
      <path d="M4 20l1.4-4.2A8 8 0 1 1 8.3 19z" />
    </svg>
  );
}
