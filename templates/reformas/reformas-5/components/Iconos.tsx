type Props = { className?: string; tamano?: number };

/** Bocadillo (WhatsApp) del diseño: trazo de 2 px, decorativo. */
export function IconoWhatsapp({ className, tamano = 22 }: Props) {
  return (
    <svg width={tamano} height={tamano} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

/** Teléfono del diseño: trazo de 2 px, decorativo. */
export function IconoTelefono({ className, tamano = 20 }: Props) {
  return (
    <svg width={tamano} height={tamano} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

/** Estrellas de una puntuación (decorativas: el texto accesible lo pone quien las usa). */
export function Estrellas({ puntuacion, className }: { puntuacion: number; className?: string }) {
  const llenas = Math.round(puntuacion);
  return (
    <span aria-hidden="true" className={className} style={{ letterSpacing: "2px" }}>
      {"★".repeat(llenas)}
      {"☆".repeat(5 - llenas)}
    </span>
  );
}
