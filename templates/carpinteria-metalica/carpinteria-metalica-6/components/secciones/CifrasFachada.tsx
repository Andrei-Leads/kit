import type { ReactNode } from "react";

import type { Cifra } from "@/lib/textos";
import { cn } from "@/lib/utils";

/**
 * Cifras de credibilidad (encargo §5): de 1 a 4 tarjetas blancas, cada una solo con dato y con la
 * cifra final en el HTML (sin contadores). 4 → 2×2 en móvil y 4 en fila en escritorio; 2 o 3 → en
 * fila; 1 → tarjeta ancha con la cifra al lado; 0 → no existe. Aparecen con `scale(.96→1)`.
 * `children`: la pareja de botones que sigue a las cifras en el inicio.
 */
export function CifrasFachada({ cifras, children, className }: { cifras: readonly Cifra[]; children?: ReactNode; className?: string }) {
  if (cifras.length === 0) return null;
  const n = cifras.length;
  return (
    <section aria-labelledby="titulo-cifras" className={className}>
      <div className="contenedor">
        <h2 id="titulo-cifras" className="sr-only">
          En cifras
        </h2>
        <ul
          className={cn(
            "grid gap-2.5 lg:gap-4",
            n === 4 && "grid-cols-2 lg:grid-cols-4",
            n === 3 && "grid-cols-3",
            n === 2 && "grid-cols-2",
          )}
        >
          {cifras.map((c) => (
            <li
              key={c.texto}
              className={cn(
                "aparecer-cifra tarjeta flex min-w-0",
                n === 1 ? "flex-row items-center gap-[18px] px-6 py-[22px]" : "flex-col items-start gap-2 px-5 pt-[22px] pb-5 max-sm:px-4",
              )}
            >
              <span className="text-cifra font-extrabold tracking-[-0.02em] text-balance text-primario-texto">{c.valor}</span>
              <span className="text-base leading-[1.35] text-balance text-texto-suave">{c.texto}</span>
            </li>
          ))}
        </ul>
        {children}
      </div>
    </section>
  );
}
