import { Mancha } from "@/components/Mancha";
import { h2, h3 } from "@/lib/estilos";
import type { Paso } from "@/lib/proceso";
import { cn } from "@/lib/utils";

type Props = {
  /** Pasos (≤ 6): `proceso` del cliente o los pasos por defecto (`pasosProceso`). */
  pasos: Paso[];
  /** Id de la sección (índice lateral). Por defecto `proceso`. */
  id?: string;
  className?: string;
};

/**
 * «Cómo trabajamos» (Specs §2): pasos en filas compactas apiladas (móvil) y en 3 columnas (escritorio; con 4–6
 * pasos, a dos filas). Número sobre una mancha pequeña (aria-hidden: la lista ordenada ya numera). Sin
 * `proceso`, Llamas → Vamos → Lo arreglamos (`lib/proceso.ts`).
 */
export function Proceso({ pasos, id = "proceso", className }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className={cn("pt-11 lg:pt-16", className)}>
      <h2 id={`${id}-titulo`} className={cn(h2, "mb-4")}>
        Cómo trabajamos
      </h2>
      <ol role="list" className="m-0 grid list-none grid-cols-1 gap-2.5 p-0 lg:grid-cols-3">
        {pasos.map((paso, i) => (
          <li key={`${i}-${paso.titulo}`} className="flex items-start gap-3.5 rounded-tarjeta bg-superficie px-4 py-3.5">
            <span
              aria-hidden="true"
              className="relative flex size-[38px] flex-none items-center justify-center text-[17px] font-extrabold"
            >
              <Mancha forma="chica" className="inset-0" />
              <span className="relative z-10">{i + 1}</span>
            </span>
            <div className="min-w-0">
              <h3 className={cn(h3, "text-[17px] leading-[1.3]")}>{paso.titulo}</h3>
              <p className="m-0 text-base leading-[1.4] text-pretty text-texto-suave">{paso.texto}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
