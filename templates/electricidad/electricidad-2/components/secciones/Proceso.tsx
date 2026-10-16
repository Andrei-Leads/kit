import { h2 } from "@/lib/estilos";
import type { Paso } from "@/lib/proceso";
import { textos } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  pasos: Paso[];
};

/**
 * «Cómo trabajamos» (Specs §2): hasta 6 pasos grandes con el número en serif cursiva y primario. Sin `proceso`
 * en los datos, la página pasa los de urgencias (Llamas → Vamos → Lo arreglamos, `lib/proceso.ts`). Cada paso
 * aparece escalonado al entrar en pantalla (`data-anim="paso"`, `--i`); sin JS se ven todos.
 */
export function Proceso({ pasos }: Props) {
  return (
    <section aria-labelledby="titulo-proceso" className="pt-4 pb-16 lg:pt-6 lg:pb-[104px]">
      <div className="contenedor">
        <h2 id="titulo-proceso" className={cn(h2, "mb-8")}>
          {textos.comoTrabajamos}
        </h2>
        <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-10 gap-y-9 p-0">
          {pasos.map((paso, i) => (
            <li
              key={`${i}-${paso.titulo}`}
              data-anim="paso"
              style={{ "--i": i } as React.CSSProperties}
              className="grid grid-cols-[auto_1fr] items-baseline gap-x-[18px] gap-y-1"
            >
              <span
                aria-hidden="true"
                className="row-span-2 font-serif text-[64px] leading-[0.85] text-primario italic"
              >
                {i + 1}
              </span>
              <span className="font-serif text-[26px] leading-[1.2] font-semibold">{paso.titulo}</span>
              <span className="text-[17px] text-tinta-suave">{paso.texto}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
