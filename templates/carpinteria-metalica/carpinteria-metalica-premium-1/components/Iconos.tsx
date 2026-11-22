type Props = { className?: string; tamano?: number };

/** Bocadillo de WhatsApp del diseño (único icono permitido: va en su botón). Decorativo. */
export function IconoWhatsapp({ className, tamano = 20 }: Props) {
  return (
    <svg width={tamano} height={tamano} viewBox="0 0 24 24" aria-hidden="true" className={className} style={{ flex: "none" }}>
      <circle cx="12.6" cy="11.4" r="8" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M6.6 16.6 4.2 20.8l4.6-1.6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}
