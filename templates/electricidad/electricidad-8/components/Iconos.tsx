/** Iconos SVG en línea (decorativos: el texto del botón da el nombre accesible). */

export function IconoTelefono({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function IconoBocadillo({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round">
      <path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.4L3 21l2.1-5.6A8.5 8.5 0 1 1 21 11.5z" />
    </svg>
  );
}

/** Flecha de los enlaces de línea: se desplaza 4 px al pasar (`.flecha` en globals.css). */
export function Flecha() {
  return (
    <span aria-hidden="true" className="flecha">
      →
    </span>
  );
}

/** Rombo primario: viñeta de garantías, puntos y franja. */
export function Rombo({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`inline-block size-[6px] shrink-0 rotate-45 bg-primario ${className}`} />;
}
