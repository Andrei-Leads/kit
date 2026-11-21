import type { ReactNode } from "react";
import type { Ancla } from "@andrei-leads/core";

import { Migas } from "@/components/base/Migas";

type Props = {
  /** Rótulo rojo de la primera casilla («Parte de servicio», «Archivo de partes»…). */
  tipo: string;
  /** Casillas de contexto: cada una solo con dato. */
  casillas?: { rotulo: string; valor: string }[];
  /** h1 de la página. Sin él (legales), el h1 lo pone core más abajo. */
  titulo?: ReactNode;
  entradilla?: string;
  migas?: Ancla[];
  /** Sello rojo de texto (404: «Dirección no encontrada»). */
  sello?: string;
  /** Retícula al 25 % (por defecto) o al 15 % (legales). */
  reticula?: "25" | "15";
  children?: ReactNode;
};

/**
 * Cabecera de parte de las páginas interiores (export: «cabecera de parte pequeña»): migas en mono,
 * fila de casillas con el tipo de parte, h1 en mono, sello opcional y entradilla. Los botones o
 * enlaces de cada página van como `children`.
 */
export function CabeceraParte({ tipo, casillas = [], titulo, entradilla, migas, sello, reticula = "25", children }: Props) {
  return (
    <section className={`${reticula === "15" ? "reticula-15" : "reticula-25"} border-b border-texto px-(--pad) pt-6 pb-8`}>
      {migas && <Migas migas={migas} className="mb-4" />}
      <div className="flex flex-wrap border border-texto bg-superficie">
        <div className="flex flex-none items-center border-r border-texto px-2.5 py-2 font-titulo text-[0.6875rem] font-bold tracking-[0.06em] text-primario uppercase">
          {tipo}
        </div>
        {casillas.map((c) => (
          <div key={c.rotulo} className="flex-[1_1_120px] border-l border-borde px-2.5 py-1.5">
            <div className="rotulo-sm">{c.rotulo}</div>
            <div className="font-titulo text-[0.8125rem] font-semibold">{c.valor}</div>
          </div>
        ))}
      </div>
      {titulo && (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <h1 className="min-w-0 flex-[1_1_12rem] [overflow-wrap:break-word] font-titulo text-h1 leading-[1.15] font-medium tracking-[-0.02em]">{titulo}</h1>
          {sello && (
            <p className="sello flex size-28 flex-none -rotate-[8deg] items-center justify-center p-3.5 text-xs leading-tight font-extrabold max-[22.5rem]:size-24 max-[22.5rem]:p-3 max-[22.5rem]:text-[0.625rem]">
              {sello}
            </p>
          )}
        </div>
      )}
      {entradilla && <p className="mt-3.5 max-w-[60ch] text-cuerpo leading-relaxed">{entradilla}</p>}
      {children}
    </section>
  );
}
