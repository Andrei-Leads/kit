import type { Acreditacion } from "@andrei-leads/core";
import { Check, ShieldCheck } from "lucide-react";

import { Corte } from "@/components/Corte";
import { cifraGrande, tarjeta } from "@/lib/estilos";
import { acreditacionVisible, listaY } from "@/lib/formato";
import { textos } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  /** Años desde `anioFundacion` (ya calculados con `aniosEnElBarrio`); `undefined` si no hay o no es positivo. */
  anios?: number;
  acreditaciones: Acreditacion[];
  garantias: string[];
  marcas: string[];
};

/** ¿Hay algo que pintar en la banda? */
export function hayEmpresaConfianza({ anios, acreditaciones, garantias, marcas }: Props): boolean {
  return anios !== undefined || acreditaciones.length > 0 || garantias.length > 0 || marcas.length > 0;
}

/**
 * Banda piedra-2 de /empresa (mockup 2f), con su corte de entrada (piedra → piedra-2; el de salida lo
 * dibuja el CTA): años en el barrio (92 px en serif cursiva, «1 año»/«N años»), acreditaciones en tarjetas
 * (nombre completo y, solo con `numero`, «Nº …»), garantías con check y las marcas en una línea de texto
 * (los logos de marcas no se usan). Cada bloque sale solo con datos; sin ninguno, la página no la llama.
 * Lleva un h2 solo para lectores de pantalla («Por qué fiarte»).
 */
export function EmpresaConfianza({ anios, acreditaciones, garantias, marcas }: Props) {
  return (
    <>
      <Corte de="piedra" a="piedra-2" />
      <section aria-labelledby="titulo-confianza-empresa" className="-mt-px bg-piedra-2 pt-4 pb-16 lg:pb-[104px]">
        <h2 id="titulo-confianza-empresa" className="sr-only">
          {textos.porQueFiarte}
        </h2>
        <div className="contenedor">
          {anios !== undefined && (
            <p className={cn("m-0 flex flex-wrap items-baseline gap-x-4 gap-y-1", (acreditaciones.length > 0 || garantias.length > 0) && "mb-8")}>
              <span className={cifraGrande}>{anios}</span>{" "}
              <span className="font-serif text-[26px] leading-[1.2]">
                {anios === 1 ? "año" : "años"} {textos.enElBarrio}
              </span>
            </p>
          )}

          {(acreditaciones.length > 0 || garantias.length > 0) && (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">
              {acreditaciones.map((a, i) => {
                const { nombre, numero } = acreditacionVisible(a);
                return (
                  <div key={`${nombre}-${i}`} className={cn(tarjeta, "flex flex-col gap-2.5 p-6")}>
                    <ShieldCheck aria-hidden="true" strokeWidth={1.75} className="size-8 flex-none text-primario" />
                    <p className="m-0 font-serif text-[21px] leading-[1.3] font-semibold text-pretty">{nombre}</p>
                    {numero && <p className="m-0 text-tinta-suave">{numero}</p>}
                  </div>
                );
              })}
              {garantias.length > 0 && (
                <div className={cn(tarjeta, "p-6")}>
                  <ul className="m-0 flex list-none flex-col gap-3 p-0">
                    {garantias.map((g, i) => (
                      <li key={`${g}-${i}`} className="flex items-start gap-3 text-lg">
                        <Check aria-hidden="true" strokeWidth={2.25} className="mt-0.5 size-[22px] flex-none text-primario" />
                        {g}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {marcas.length > 0 && (
            <p
              className={cn(
                "m-0 max-w-[60ch] text-lg text-pretty",
                (anios !== undefined || acreditaciones.length > 0 || garantias.length > 0) && "mt-8"
              )}
            >
              <strong className="font-semibold">{textos.marcasTrabajamos}</strong> {listaY(marcas)}.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
