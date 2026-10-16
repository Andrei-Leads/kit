import { BotonLlamada, type Acreditacion } from "@andrei-leads/core";
import { Check, Phone, ShieldCheck } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cifraGrande, h2, tarjeta } from "@/lib/estilos";
import { acreditacionVisible, telefonoVisible } from "@/lib/formato";
import { textos } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  /** Años desde `anioFundacion` (ya calculados con `aniosEnElBarrio`); `undefined` si no hay o no es positivo. */
  anios?: number;
  acreditaciones: Acreditacion[];
  garantias: string[];
  telefono: string;
};

/**
 * «Por qué fiarte» (Specs §5): ocupa el puesto de las reseñas SOLO si hay 0 reseñas, en la misma banda
 * piedra-2 y con el mismo peso visual. Con lo que haya: años en el barrio (92 px en serif cursiva, como la
 * nota media), acreditaciones en tarjetas (nombre completo y, solo con `numero`, «Nº …»), garantías con check
 * en primario y `llamada-acento`. Sin años, acreditaciones ni garantías la página ni la llama. La franja de
 * confianza no se repite.
 */
export function PorQueFiarte({ anios, acreditaciones, garantias, telefono }: Props) {
  return (
    <section aria-labelledby="titulo-fiarte" className="bg-piedra-2 pt-6 pb-16 lg:pb-[104px]">
      <div className="contenedor">
        <h2 id="titulo-fiarte" className={cn(h2, "mb-6")}>
          {textos.porQueFiarte}
        </h2>

        {anios !== undefined && (
          <p className="m-0 mb-8 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className={cifraGrande}>{anios}</span>
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
                      <Check
                        aria-hidden="true"
                        strokeWidth={2.25}
                        className="mt-0.5 size-[22px] flex-none text-primario"
                      />
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="mt-8">
          <BotonLlamada telefono={telefono} className={buttonVariants({ variant: "llamadaAcento" })}>
            <Phone aria-hidden="true" strokeWidth={2} strokeLinejoin="round" className="size-5 flex-none" />
            <span>
              {textos.llamanos}: {telefonoVisible(telefono)}
            </span>
          </BotonLlamada>
        </div>
      </div>
    </section>
  );
}
