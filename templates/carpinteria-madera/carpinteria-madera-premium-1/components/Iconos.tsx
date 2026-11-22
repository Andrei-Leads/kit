type Props = { className?: string; tamano?: number };

/** Bocadillo de WhatsApp del diseño (trazo de 1,6 px), decorativo. */
export function IconoWhatsapp({ className, tamano = 20 }: Props) {
  return (
    <svg width={tamano} height={tamano} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M4.5 19.5l1.2-3.6A8 8 0 1 1 8.4 18.6z" />
    </svg>
  );
}

/** Teléfono del diseño (trazo de 1,6 px), decorativo. */
export function IconoTelefono({ className, tamano = 20 }: Props) {
  return (
    <svg width={tamano} height={tamano} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M6.6 3.5h2.8l1.4 3.8-1.9 1.3a10.5 10.5 0 0 0 6.5 6.5l1.3-1.9 3.8 1.4v2.8a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z" />
    </svg>
  );
}
