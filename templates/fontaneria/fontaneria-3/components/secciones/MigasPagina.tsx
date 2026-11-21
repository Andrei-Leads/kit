import type { Ancla } from "@andrei-leads/core";

import { Migas } from "@/components/base/Migas";

/** Migas de la pieza base, en el contenedor de la página. La última es la página actual. */
export function MigasPagina({ migas }: { migas: readonly (Omit<Ancla, "href"> & { href?: string })[] }) {
  return (
    <div className="contenedor pt-[clamp(1rem,0.8rem+1vw,2rem)]">
      <Migas migas={migas.map((m) => ({ href: m.href ?? "#", texto: m.texto }))} className="text-[0.9375rem]" />
    </div>
  );
}
