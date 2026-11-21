import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Cabecera de página interior: banda clara del primario cortada en diagonal por abajo, que sube bajo
 * la cápsula (como el hero del inicio). El contenido lo pone cada página.
 */
export function BandaCabecera({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={cn(
        "banda-abajo -mt-[72px] bg-banda px-5 pt-24 pb-[calc(10.5vw+24px)] lg:-mt-[74px] lg:px-8 lg:pt-[120px] lg:pb-[calc(10.5vw+16px)]",
        className,
      )}
    >
      <div className="mx-auto max-w-(--container-contenido)">{children}</div>
    </section>
  );
}

/** h1 de las páginas interiores. */
export const H1_INTERIOR = "m-0 font-titulo text-h1 leading-[1.02] font-bold tracking-[-0.03em]";
/** h2 de sección. */
export const H2 = "m-0 font-titulo text-h2 leading-[1.1] font-bold tracking-[-0.02em]";
