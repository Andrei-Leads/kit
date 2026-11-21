import { cn } from "@/lib/utils";

/**
 * Estrellas en primario (las vacías en --color-borde). Decorativas: la cifra va siempre en texto al
 * lado, salvo en las reseñas, donde `etiqueta` da el «5 de 5 estrellas» al lector de pantalla.
 */
export function Estrellas({ valor, etiqueta, className }: { valor: number; etiqueta?: string; className?: string }) {
  const llenas = Math.max(0, Math.min(5, Math.round(valor)));
  return (
    <span
      {...(etiqueta ? { role: "img", "aria-label": etiqueta } : { "aria-hidden": true })}
      className={cn("leading-none tracking-[1px] text-primario", className)}
    >
      {"★".repeat(llenas)}
      <span className="text-borde">{"★".repeat(5 - llenas)}</span>
    </span>
  );
}
