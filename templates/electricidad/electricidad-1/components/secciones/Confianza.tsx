import { Fragment, type ReactNode } from "react";
import type { SiteConfig } from "@andrei-leads/core";
import { Check } from "lucide-react";

import { Campo } from "@/components/Campo";
import { ContadorAnios } from "@/components/ContadorAnios";
import { anioActual } from "@/lib/anio";
import { etiquetaCampo } from "@/lib/estilos";
import { campoAcreditacion } from "@/lib/formato";

type Props = {
  negocio: Pick<SiteConfig["negocio"], "anioFundacion">;
  acreditaciones: SiteConfig["acreditaciones"];
  garantias: SiteConfig["garantias"];
};

type Celda = { clave: string; ancho: 1 | 2; nodo: (clase: string) => ReactNode };

const SPAN_MOVIL = { 1: "col-span-1", 2: "col-span-2" } as const;
const SPAN_ESCRITORIO = { 1: "md:col-span-1", 2: "md:col-span-2", 3: "md:col-span-3", 4: "md:col-span-4" } as const;

/**
 * Anchos reales de cada celda en una rejilla de `columnas`, ensanchando la anterior cuando la
 * siguiente no cabe en la fila o cuando es la última y deja la fila a medias. Los huecos de 1 px
 * de la rejilla hacen de reglas: una celda vacía se vería como un bloque gris.
 */
function rellenar(anchos: number[], columnas: number): number[] {
  const final = [...anchos];
  let usado = 0;
  final.forEach((ancho, i) => {
    if (usado + ancho > columnas) {
      final[i - 1] += columnas - usado;
      usado = 0;
    }
    usado += ancho;
    if (usado === columnas) usado = 0;
  });
  if (usado > 0) final[final.length - 1] += columnas - usado;
  return final;
}

/**
 * Franja de confianza (Specs §2): campos de documento «AÑOS» (desde `anioFundacion`), uno por
 * acreditación y las `garantias` a lo ancho; 2 columnas en móvil y 4 en escritorio. Se recompone
 * con lo que haya; sin nada, no existe. No lleva número de sección.
 *
 * El año actual sale de `anioActual()` (cacheado): nada de `new Date()` en el render.
 */
export async function Confianza({ negocio, acreditaciones, garantias }: Props) {
  const anio = await anioActual();
  const anios = negocio.anioFundacion ? anio - negocio.anioFundacion : 0;

  const celdas: Celda[] = [];
  if (negocio.anioFundacion && anios > 0) {
    celdas.push({
      clave: "anios",
      ancho: 1,
      nodo: (clase) => (
        <Campo etiqueta="Años" agrupado className={clase} detalle={`Desde ${negocio.anioFundacion}`}>
          <span className="text-[30px] leading-[1.1]">
            <ContadorAnios valor={anios} />
          </span>
        </Campo>
      ),
    });
  }
  for (const a of acreditaciones) {
    const campo = campoAcreditacion(a);
    celdas.push({
      clave: `${a.nombre}-${a.numero ?? ""}`,
      ancho: 1,
      nodo: (clase) => (
        <Campo etiqueta={campo.etiqueta} agrupado className={clase} detalle={campo.detalle}>
          {campo.valor}
        </Campo>
      ),
    });
  }
  if (garantias.length > 0) {
    celdas.push({
      clave: "garantias",
      ancho: 2,
      nodo: (clase) => (
        <div className={`flex min-w-0 flex-col gap-2 bg-papel-2 px-4 py-3.5 ${clase}`}>
          <h3 className={`${etiquetaCampo} m-0`}>Garantías</h3>
          <ul className="m-0 grid list-none grid-cols-1 gap-x-5 gap-y-1.5 p-0 md:grid-cols-2">
            {garantias.map((g) => (
              <li key={g} className="flex items-start gap-2.5 text-[15px] leading-[1.4]">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex size-4 flex-none items-center justify-center border-2 border-primario text-primario"
                >
                  <Check strokeWidth={4} className="size-2.5" />
                </span>
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    });
  }

  if (celdas.length === 0) return null;

  const movil = rellenar(celdas.map((c) => c.ancho), 2);
  const escritorio = rellenar(celdas.map((c) => c.ancho), 4);

  return (
    <section aria-labelledby="titulo-confianza" className="border-y border-regla bg-papel-2">
      <h2 id="titulo-confianza" className="sr-only">
        Datos de la empresa
      </h2>
      <div className="contenedor py-6">
        <div className="grid grid-cols-2 gap-px border border-regla bg-regla md:grid-cols-4">
          {celdas.map((celda, i) => (
            <Fragment key={celda.clave}>
              {celda.nodo(`${SPAN_MOVIL[movil[i] as 1 | 2]} ${SPAN_ESCRITORIO[escritorio[i] as 1 | 2 | 3 | 4]}`)}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
