import type { SiteConfig } from "@andrei-leads/core";
import { Check } from "lucide-react";

import { Campo } from "@/components/Campo";
import { ContadorAnios } from "@/components/ContadorAnios";
import { anioActual } from "@/lib/anio";
import { etiquetaCampo } from "@/lib/estilos";
import { cn } from "@/lib/utils";

type Props = {
  negocio: Pick<SiteConfig["negocio"], "anioFundacion">;
  garantias: SiteConfig["garantias"];
  marcas: SiteConfig["marcas"];
};

/**
 * AÑOS y GARANTÍAS de /empresa (Specs §2) en una rejilla de campos con huecos de 1 px (columna de años
 * y garantías a 1 : 2 en escritorio; apilados en móvil). Las `marcas`, si las hay, van debajo en texto
 * (a lo ancho). Cada celda sale solo con datos; sin ninguno, no hay bloque.
 * El año actual sale de `anioActual()` (cacheado): nada de `new Date()` en el render.
 */
export async function EmpresaDatos({ negocio, garantias, marcas }: Props) {
  const anio = await anioActual();
  const anios = negocio.anioFundacion ? anio - negocio.anioFundacion : 0;
  const hayAnios = anios > 0;
  const hayGarantias = garantias.length > 0;
  const hayMarcas = marcas.length > 0;
  if (!hayAnios && !hayGarantias && !hayMarcas) return null;

  const dosColumnas = hayAnios && hayGarantias;
  return (
    <section aria-labelledby="titulo-datos-empresa" className="mt-4 md:mt-8">
      <h2 id="titulo-datos-empresa" className="sr-only">
        Datos de la empresa
      </h2>
      <div
        className={cn(
          "grid grid-cols-1 gap-px border border-regla bg-regla",
          dosColumnas && "md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"
        )}
      >
        {hayAnios && (
          <Campo etiqueta="Años" agrupado detalle={`Desde ${negocio.anioFundacion}`}>
            <span className="text-[30px] leading-[1.1]">
              <ContadorAnios valor={anios} />
            </span>
          </Campo>
        )}
        {hayGarantias && (
          <div className="flex min-w-0 flex-col gap-2 bg-papel-2 px-4 py-3.5">
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
        )}
        {hayMarcas && (
          <div className={cn("flex min-w-0 flex-col gap-2 bg-papel-2 px-4 py-3.5", dosColumnas && "md:col-span-2")}>
            <h3 className={`${etiquetaCampo} m-0`}>Marcas</h3>
            <p className="m-0 font-mono text-[15px] leading-[1.6] font-medium text-pretty">{marcas.join(" / ")}</p>
          </div>
        )}
      </div>
    </section>
  );
}
