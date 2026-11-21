import { cn } from "@/lib/utils";

/* Iconos en SVG en línea (sin librería). Todos decorativos: aria-hidden. */

type Props = { className?: string };

const BASE = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function IconoTelefono({ className }: Props) {
  return (
    <svg {...BASE} className={cn("size-5 flex-none", className)}>
      <path d="M5 4h3.5l1.6 4-2.2 1.4a11 11 0 0 0 6.7 6.7l1.4-2.2 4 1.6V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

/** Bocadillo de conversación (WhatsApp sin la marca). */
export function IconoWhatsapp({ className }: Props) {
  return (
    <svg {...BASE} className={cn("size-5 flex-none", className)}>
      <path d="M20 11.5a8 8 0 0 1-11.7 7.1L4 20l1.4-4.1A8 8 0 1 1 20 11.5Z" />
    </svg>
  );
}

export function IconoFlecha({ className }: Props) {
  return (
    <svg {...BASE} className={cn("size-5 flex-none", className)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconoExterno({ className }: Props) {
  return (
    <svg {...BASE} className={cn("size-4 flex-none", className)}>
      <path d="M8 16 16 8M9 8h7v7" />
    </svg>
  );
}

export function IconoCheck({ className }: Props) {
  return (
    <svg {...BASE} strokeWidth={2.4} className={cn("size-5 flex-none", className)}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function IconoMenu({ className }: Props) {
  return (
    <svg {...BASE} className={cn("size-5 flex-none", className)}>
      <path d="M5 9h14M5 15h14" />
    </svg>
  );
}

export function IconoCerrar({ className }: Props) {
  return (
    <svg {...BASE} className={cn("size-5 flex-none", className)}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

/** Cinco estrellas en color texto (el primario del cliente, p. ej. #facc15, no llega a 3:1). El texto para el lector lo pone quien lo usa. */
export function Estrellas({ puntuacion, className }: { puntuacion: number; className?: string }) {
  const llenas = Math.round(puntuacion);
  return (
    <span aria-hidden="true" className={cn("inline-flex gap-0.5 text-texto", className)}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24" className="size-4" fill={i < llenas ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.6}>
          <path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8Z" />
        </svg>
      ))}
    </span>
  );
}
