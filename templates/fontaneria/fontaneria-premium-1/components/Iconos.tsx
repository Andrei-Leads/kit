type Props = { className?: string; tamano?: number };

/** Bocadillo de WhatsApp del diseño (trazo de 1,7 px), decorativo: el único icono de los botones. */
export function IconoWhatsapp({ className, tamano = 18 }: Props) {
  return (
    <svg width={tamano} height={tamano} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden="true" className={className}>
      <path d="M3.6 20.4l1.3-4.1A8.4 8.4 0 1 1 8 19.2z" />
      <path d="M9.2 8.6c.2 3.4 2.8 6 6.2 6.2l1-1.5-1.9-.9-.9.7a4.6 4.6 0 0 1-2.4-2.4l.7-.9-.9-1.9z" />
    </svg>
  );
}

/** Teléfono del diseño: solo en la barra móvil (decisión de la entrega). */
export function IconoTelefono({ className, tamano = 18 }: Props) {
  return (
    <svg width={tamano} height={tamano} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden="true" className={className}>
      <path d="M5 4h3.5l1.7 4.2-2.2 1.4a11 11 0 0 0 6.4 6.4l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4z" />
    </svg>
  );
}

/** Estrella rellena de la línea de confianza del hero. */
export function IconoEstrella({ className, tamano = 14 }: Props) {
  return (
    <svg width={tamano} height={tamano} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2.5l2.9 6.2 6.6.7-5 4.5 1.4 6.6L12 17.2l-5.9 3.3 1.4-6.6-5-4.5 6.6-.7z" />
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
