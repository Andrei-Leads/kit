import { cn } from "@/lib/utils";

/**
 * Número de sección como en un plano: «01 ── PRESENTACIÓN ─────────» (encargo §5). El trazo corto
 * es primario; el filete largo se dibuja desde la izquierda al entrar (`data-dibujar`). Sin número
 * (sección sin numerar), solo el rótulo. Decorativo salvo el texto, que sí se lee.
 */
export function Rotulo({ n, texto, sobreNoche, className }: { n?: string; texto: string; sobreNoche?: boolean; className?: string }) {
  return (
    <p className={cn("flex items-center gap-3", className)}>
      {n && (
        <span className={cn("cifras-antiguas font-titulo text-[1.0625rem]", sobreNoche ? "text-noche-texto" : "text-texto")}>{n}</span>
      )}
      <span aria-hidden="true" className="h-px w-7 shrink-0 bg-primario" />
      <span className={cn("versalitas", sobreNoche ? "text-noche-suave" : "text-texto-suave")}>{texto}</span>
      <span
        aria-hidden="true"
        data-dibujar=""
        className={cn("h-px min-w-6 flex-1", sobreNoche ? "bg-linea-plano-noche" : "bg-linea-plano")}
      />
    </p>
  );
}

/** h2 de sección en la serif. */
export const H2 = "font-titulo text-h2 leading-[1.08] font-normal tracking-[-0.01em]";
/** h1 de páginas interiores (el del inicio usa text-display). */
export const H1 = "font-titulo text-[clamp(2.25rem,1.6rem+2.6vw,4.25rem)] leading-[1.04] font-normal tracking-[-0.015em]";
