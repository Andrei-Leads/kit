import type { Cifra } from "@/lib/textos";
import { cn } from "@/lib/utils";

/** Cifras de credibilidad sobre terracota (sans a 48 px, sin animar). Cada una solo con su dato. */
export function Cifras({ cifras, className }: { cifras: readonly Cifra[]; className?: string }) {
  if (cifras.length === 0) return null;
  return (
    <dl className={cn("cifras grid w-full grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-x-6 gap-y-5", className)}>
      {cifras.map((c) => (
        <div key={c.l} className="flex flex-col-reverse gap-1 border-t border-(--color-linea-sobre) pt-3.5">
          <dt className="text-sm leading-[1.3]">{c.l}</dt>
          <dd className="font-titulo text-cifra leading-none font-semibold tracking-[-0.02em]">{c.n}</dd>
        </div>
      ))}
    </dl>
  );
}
