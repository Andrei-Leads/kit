/* Iconos SVG en línea del diseño (trazo de 2,2; decorativos: el texto del botón es el nombre accesible). */

type Props = { className?: string; tamano?: number };

function Svg({ className, tamano = 20, children, trazo = 2.2 }: Props & { children: React.ReactNode; trazo?: number }) {
  return (
    <svg
      width={tamano}
      height={tamano}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={trazo}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className ?? "flex-none"}
    >
      {children}
    </svg>
  );
}

export function IconoTelefono(p: Props) {
  return (
    <Svg {...p}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </Svg>
  );
}

export function IconoMensaje(p: Props) {
  return (
    <Svg {...p}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </Svg>
  );
}

/** Círculo de verificación en --color-acento («incluido», garantías). */
export function Verificado({ tamano = 28 }: { tamano?: 28 | 32 }) {
  return (
    <span
      aria-hidden="true"
      className={`flex flex-none items-center justify-center rounded-full bg-acento text-white ${tamano === 32 ? "size-8" : "size-7"}`}
    >
      <Svg tamano={16} trazo={3}>
        <path d="M20 6 9 17l-5-5" />
      </Svg>
    </span>
  );
}
