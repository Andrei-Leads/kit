import type { Cifra } from "@/lib/textos";
import { cn } from "@/lib/utils";

/**
 * Cifras de credibilidad sobre el campo pleno (encargo §6.2): número grande (tabular) y texto
 * debajo. En escritorio, columnas de 230 px como mínimo: con 150 px «Desde 2009» pisaba a la cifra de al lado (también en el diseño). Cada cifra existe solo con su dato y la fila se recompone de 1 a 4 (auto-fit); sin
 * ninguna, no pinta nada. El número final está en el HTML; aparecen con `aparecer.css`.
 */
export function Cifras({ cifras, className }: { cifras: readonly Cifra[]; className?: string }) {
  if (cifras.length === 0) return null;
  return (
    <dl
      className={cn(
        "cifras grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-x-6 lg:grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-y-7 border-t border-(--color-linea-pleno) pt-7",
        className,
      )}
    >
      {cifras.map((c) => (
        <div key={c.texto} data-aparecer="" className="flex flex-col-reverse gap-1.5">
          <dt className="text-[15px] leading-[1.3]">{c.texto}</dt>
          <dd className="font-titulo text-cifra leading-none font-bold tracking-[-0.03em] tabular-nums">
            {c.previo && <span className="mr-1.5 text-[0.32em] font-semibold tracking-normal">{c.previo}</span>}
            {c.numero}
          </dd>
        </div>
      ))}
    </dl>
  );
}
