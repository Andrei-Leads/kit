/*
 * Iconos de la entrega (trazo de 1,5 px, 16 × 16), decorativos: el nombre accesible es el texto
 * del botón. Bocadillo para WhatsApp y auricular para Llamar.
 */
export function IconoWhatsApp({ tamano = 16 }: { tamano?: number }) {
  return (
    <svg aria-hidden="true" width={tamano} height={tamano} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} className="flex-none">
      <path d="M2 2.5h12v8.5H7l-3.5 3v-3H2z" />
    </svg>
  );
}

export function IconoTelefono({ tamano = 16 }: { tamano?: number }) {
  return (
    <svg aria-hidden="true" width={tamano} height={tamano} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" className="flex-none">
      <path d="M4.5 1.5h2.5l1 3.5-1.8 1.1a7 7 0 0 0 3.7 3.7L11 8l3.5 1v2.5a1.5 1.5 0 0 1-1.5 1.5A11.5 11.5 0 0 1 3 3a1.5 1.5 0 0 1 1.5-1.5z" />
    </svg>
  );
}
