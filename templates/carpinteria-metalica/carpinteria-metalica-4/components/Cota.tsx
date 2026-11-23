import { cn } from "@/lib/utils";

type Props = {
  /** El dato real que mide la cota. Sin dato, no hay cota (encargo §5.2). */
  texto: string;
  /** Dónde va la etiqueta respecto a la línea. */
  etiqueta?: "encima" | "debajo";
  /** Fuera del hero: la línea se dibuja con scaleX al entrar en pantalla (solo CSS). */
  animada?: boolean;
  className?: string;
};

/**
 * `CotaDato` (encargo §5.2): línea con dos topes a 45° y la etiqueta en mono, siempre con un dato
 * real dentro. La línea va en `--color-cota`; la etiqueta, en texto (≥ 13 px).
 */
export function CotaDato({ texto, etiqueta = "encima", animada, className }: Props) {
  const label = <span className="cota-texto etiqueta self-center bg-fondo px-1.5 text-center">{texto}</span>;
  return (
    <div className={cn("flex min-w-0 flex-col gap-1", animada && "cota-animada", className)}>
      {etiqueta === "encima" && label}
      <span aria-hidden="true" className="cota-linea">
        <span className="cota-trazo" />
      </span>
      {etiqueta === "debajo" && label}
    </div>
  );
}

/** Cota sin etiqueta (alrededor de una foto): solo línea, nunca un número inventado. */
export function CotaLinea({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("cota-linea", className)}>
      <span className="cota-trazo" />
    </span>
  );
}

/** Cota vertical sin etiqueta, a la derecha de una foto. */
export function CotaVertical({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("cota-vertical", className)}>
      <span />
    </span>
  );
}
