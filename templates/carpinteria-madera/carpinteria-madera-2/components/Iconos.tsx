/** Bocadillo de WhatsApp de la entrega (trazo, decorativo: el nombre accesible es el texto del botón). */
export function IconoWhatsApp({ tamano = 22 }: { tamano?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={tamano}
      height={tamano}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinejoin="round"
      className="flex-none"
    >
      <path d="M4.5 19.5l1.2-3.6A8 8 0 1 1 8.4 18.6z" />
    </svg>
  );
}

export function IconoTelefono({ tamano = 20 }: { tamano?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={tamano}
      height={tamano}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="flex-none"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

/** Check en un círculo del primario (garantías, «Incluye», opción elegida del asistente). */
export function Check({ tamano = 32, className }: { tamano?: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      style={{ width: tamano, height: tamano }}
      className={`flex flex-none items-center justify-center rounded-full bg-primario text-sobre-primario ${className ?? ""}`}
    >
      <svg width={tamano / 2} height={tamano / 2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
    </span>
  );
}
