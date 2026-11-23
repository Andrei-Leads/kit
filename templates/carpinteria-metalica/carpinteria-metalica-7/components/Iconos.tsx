/** Icono de WhatsApp del diseño: bocadillo de trazo (decorativo; el nombre accesible es el texto). */
export function IconoWhatsApp({ tamano = 20 }: { tamano?: number }) {
  return (
    <svg width={tamano} height={tamano} viewBox="0 0 20 20" aria-hidden="true" className="flex-none">
      <circle cx="10.5" cy="9.5" r="7.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M2.5 18.5l1.6-5 3.4 3.4z" fill="currentColor" />
    </svg>
  );
}
