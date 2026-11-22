import { cn } from "@/lib/utils";

/** Ficha de una obra en tabla de filetes (Superficie, Plazo, Año, Precio aproximado…). */
export function FichaObra({ filas, tono = "claro", className }: { filas: { k: string; v: string }[]; tono?: "claro" | "oscuro"; className?: string }) {
  if (filas.length === 0) return null;
  return (
    <dl className={cn("m-0 border-t", tono === "claro" ? "border-borde" : "border-borde-oscuro", className)}>
      {filas.map((f) => (
        <div key={f.k} className={cn("flex justify-between gap-6 border-b py-3 text-[15px]", tono === "claro" ? "border-borde" : "border-borde-oscuro")}>
          <dt className={tono === "claro" ? "text-texto-suave" : "text-texto-claro"}>{f.k}</dt>
          <dd className="m-0 text-right">{f.v}</dd>
        </div>
      ))}
    </dl>
  );
}
