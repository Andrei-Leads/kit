import type { ReactNode } from "react";

import { calcularRed } from "@/lib/red";
import { ramasZonas } from "@/lib/formato";
import { Montante } from "./Montante";
import { RedZonas } from "./RedZonas";

type Props = {
  ciudad: string;
  zonas: readonly string[];
  tiempoLlegada?: string;
  titulo?: string;
  /** Frase bajo el título (inicio). */
  intro?: boolean;
  /** Botones al final (llamada-zona). */
  children?: ReactNode;
  id?: string;
};

/**
 * ZonasRed (sección estrella, versión completa): la red entera con todos los municipios en
 * escritorio (7 ramas por vuelta cada 160 px, tramos que se dibujan al entrar) y el montante
 * completo en móvil. Sin zonas (o solo con la ciudad del taller), no existe.
 */
export function ZonasRed({ ciudad, zonas, tiempoLlegada, titulo = "Dónde trabajamos", intro, children, id = "zonas" }: Props) {
  const ramas = ramasZonas(ciudad, zonas);
  if (zonas.length === 0 || ramas.length === 0) return null;
  const red = calcularRed({ ciudad, zonas, paso: 160, porFila: 7, tiempo: tiempoLlegada });
  return (
    <section id={id} className="contenedor pt-10 pb-6 lg:pt-16">
      <h2 className="m-0 font-titulo text-h2 leading-[1.1] font-bold tracking-[-0.02em]">{titulo}</h2>
      {intro && (
        <p className="mt-1.5 mb-4 max-w-[56ch] text-texto-suave lg:mt-2 lg:mb-0">
          Salimos de {ciudad}
          {tiempoLlegada ? ` y llegamos en ${tiempoLlegada}.` : "."}
        </p>
      )}
      <div className="lg:hidden">
        <Montante ciudad={ciudad} ramas={ramas} animada className={intro ? "" : "mt-4"} />
      </div>
      <div className="hidden lg:mt-7 lg:block">
        <RedZonas red={red} animada />
        {ramas.length > 0 && (
          <ol aria-label="Municipios donde trabajamos" className="sr-only">
            {ramas.map((z) => (
              <li key={z}>{z}</li>
            ))}
          </ol>
        )}
      </div>
      {children}
    </section>
  );
}
