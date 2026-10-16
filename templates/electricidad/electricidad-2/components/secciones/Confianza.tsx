import type { Acreditacion } from "@andrei-leads/core";
import { Check, ShieldCheck } from "lucide-react";

import { acreditacionVisible } from "@/lib/formato";
import { textos } from "@/lib/textos";

type Props = {
  anios?: number;
  acreditaciones: Acreditacion[];
  garantias: string[];
};

/**
 * Franja de confianza (Specs §2), debajo de las reseñas: años en el barrio, acreditaciones (nombre completo y,
 * solo con `numero`, «Nº …») y garantías con check, en 2 columnas en móvil. Se recompone con lo que haya; sin
 * nada, la página no la llama (y tampoco cuando ya salió «Por qué fiarte»). Va sobre piedra y cierra con una
 * línea fina antes de «Cómo trabajamos».
 */
export function Confianza({ anios, acreditaciones, garantias }: Props) {
  return (
    <section className="pt-4 pb-14 lg:pt-6 lg:pb-16">
      <div className="contenedor">
        <ul
          aria-label={textos.confianza}
          className="m-0 grid list-none grid-cols-2 gap-x-6 gap-y-7 border-b border-linea p-0 pb-10 md:grid-cols-3 lg:grid-cols-[repeat(auto-fit,minmax(220px,1fr))]"
        >
          {anios !== undefined && (
            <li className="flex flex-col gap-1.5">
              <span className="font-serif text-5xl leading-none italic">{anios}</span>
              <span className="text-[17px] leading-[1.35] font-semibold">
                {anios === 1 ? "año" : "años"} {textos.enElBarrio}
              </span>
            </li>
          )}
          {acreditaciones.map((a, i) => {
            const { nombre, numero } = acreditacionVisible(a);
            return (
              <li key={`${nombre}-${i}`} className="col-span-2 flex flex-col gap-1.5 md:col-span-1">
                <ShieldCheck aria-hidden="true" strokeWidth={1.75} className="size-[30px] flex-none text-primario" />
                <span className="text-[17px] leading-[1.35] font-semibold text-pretty">{nombre}</span>
                {numero && <span className="text-base text-tinta-suave">{numero}</span>}
              </li>
            );
          })}
          {garantias.map((g, i) => (
            <li key={`${g}-${i}`} className="flex flex-col gap-1.5">
              <Check aria-hidden="true" strokeWidth={2.25} className="size-7 flex-none text-primario" />
              <span className="text-[17px] leading-[1.35] font-semibold text-pretty">{g}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
