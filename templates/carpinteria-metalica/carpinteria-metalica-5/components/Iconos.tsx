/** Bocadillo de WhatsApp del diseño (va solo en sus botones). Decorativo. */
export function IconoWhatsapp({ tamano = 18 }: { tamano?: number }) {
  return (
    <svg width={tamano} height={tamano} viewBox="0 0 18 18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.4" style={{ flex: "none" }}>
      <circle cx="9.5" cy="8.5" r="6.5" />
      <path d="M5 13.2 3 16l3.4-1.3" />
    </svg>
  );
}
