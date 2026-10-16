import type { SiteConfig } from "@andrei-leads/core";
import { Award, Check } from "lucide-react";

import { ContadorAnios } from "@/components/ContadorAnios";
import { Mancha } from "@/components/Mancha";
import { acreditacionVisible, aniosDeTrayectoria } from "@/lib/formato";

type Props = {
  anioFundacion?: number;
  /** Año del servidor (`anioActual()`): nunca `new Date()` en el render. */
  anio: number;
  acreditaciones: SiteConfig["acreditaciones"];
  garantias: SiteConfig["garantias"];
};

/**
 * Datos de confianza de /empresa (Pantalla, `empresa`): tarjeta de años (con contador, valor final del servidor),
 * una tarjeta por acreditación (el número solo si existe; nunca «Nº undefined») y las garantías como chips con un
 * check sobre mancha. A diferencia del inicio, las tarjetas pasan a la línea siguiente (sin scroll horizontal).
 * Cada bloque sale solo con datos.
 */
export function EmpresaDatos({ anioFundacion, anio, acreditaciones, garantias }: Props) {
  const anios = aniosDeTrayectoria(anioFundacion, anio);
  const conAnios = anios !== undefined && anios > 0;
  return (
    <>
      {(conAnios || acreditaciones.length > 0) && (
        <div className="flex flex-wrap gap-2.5">
          {conAnios && (
            <div className="flex flex-none flex-col justify-center rounded-tarjeta bg-superficie px-5 py-3.5">
              <span className="text-[30px] leading-[1.05] font-extrabold tabular-nums">
                <ContadorAnios valor={anios} /> {anios === 1 ? "año" : "años"}
              </span>
              <span className="text-[15px] text-texto-suave">Desde {anioFundacion}</span>
            </div>
          )}
          {acreditaciones.map((a, i) => {
            const { nombre, numero } = acreditacionVisible(a);
            return (
              <div
                key={`${i}-${nombre}`}
                className="flex min-w-0 flex-[1_1_260px] items-start gap-3 rounded-tarjeta bg-superficie px-[18px] py-3.5"
              >
                <span className="relative flex size-10 flex-none items-center justify-center">
                  <Mancha forma="chica" className="inset-0" />
                  <Award aria-hidden="true" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="relative z-10 size-5" />
                </span>
                <div className="min-w-0">
                  <p className="m-0 text-[15px] leading-[1.3] font-semibold">{nombre}</p>
                  {numero && <p className="m-0 mt-1 text-sm text-texto-suave tabular-nums">{numero}</p>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {garantias.length > 0 && (
        <ul aria-label="Garantías" className="m-0 flex list-none flex-wrap gap-2 p-0">
          {garantias.map((g) => (
            <li
              key={g}
              className="inline-flex min-h-[38px] items-center gap-2 rounded-pastilla bg-superficie py-1.5 pr-3.5 pl-[7px] text-[15px] leading-tight font-semibold"
            >
              <span aria-hidden="true" className="flex size-6 flex-none items-center justify-center rounded-full bg-mancha">
                <Check strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="size-3.5" />
              </span>
              {g}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
