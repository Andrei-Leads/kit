import type { ReactNode } from "react";
import type { Paso } from "@andrei-leads/core";

/**
 * ComoTrabajamos: tramos de tubería (8 px tinta) unidos por codos, con el número de cada paso en una
 * caja blanca. Móvil: montante vertical; escritorio: tramo horizontal por paso y codo final hacia
 * abajo. Los pasos salen de `proceso` o de los de «Llegamos» (pasosProceso).
 */
export function ComoTrabajamos({ pasos, children }: { pasos: readonly Paso[]; children?: ReactNode }) {
  return (
    <section className="contenedor pt-10 pb-2 lg:pt-16 lg:pb-4">
      <h2 className="m-0 mb-[22px] font-titulo text-h2 leading-[1.1] font-bold tracking-[-0.02em] lg:mb-0">Cómo trabajamos</h2>
      <ol className="m-0 ml-3 list-none border-l-8 border-tinta p-0 lg:mt-[30px] lg:ml-0 lg:grid lg:grid-cols-3 lg:border-l-0">
        {pasos.map((p, i) => (
          <li key={p.titulo} data-aparecer="" className="relative pb-[22px] pl-[26px] lg:pt-14 lg:pr-10 lg:pb-0 lg:pl-0">
            <span aria-hidden="true" className="absolute top-3 right-0 left-0 hidden h-2 bg-tinta lg:block" />
            {i === pasos.length - 1 && <span aria-hidden="true" className="absolute top-3 right-0 hidden h-11 w-2 bg-tinta lg:block" />}
            <span
              aria-hidden="true"
              className="absolute top-0 -left-5 grid size-8 place-items-center border-3 border-tinta bg-white font-titulo text-base leading-none font-bold lg:left-0"
            >
              {i + 1}
            </span>
            <h3 className="m-0 font-titulo text-xl leading-8 font-bold lg:text-[22px] lg:leading-[1.2]">{p.titulo}</h3>
            <p className="mt-0.5 mb-0 max-w-[32ch] text-texto-suave lg:mt-1.5">{p.texto}</p>
          </li>
        ))}
      </ol>
      {children && <div className="mt-3 lg:mt-8">{children}</div>}
    </section>
  );
}
