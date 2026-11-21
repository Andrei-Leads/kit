import type { ReactNode } from "react";
import type { Ancla } from "@andrei-leads/core";

import { Migas } from "@/components/base/Migas";

/** Clases del h1 de las páginas interiores. */
export const H1 = "m-0 text-display leading-[1.04] font-black tracking-[-0.02em]";
export const H2 = "m-0 text-h2 leading-[1.1] font-black";

/** Migas + h1 (+ entrada) de una página interior. */
export function Encabezado({ migas, titulo, children }: { migas: readonly Ancla[]; titulo: ReactNode; children?: ReactNode }) {
  return (
    <div className="contenedor pt-5">
      <Migas migas={migas} />
      <h1 className={`${H1} mt-1`}>{titulo}</h1>
      {children}
    </div>
  );
}
