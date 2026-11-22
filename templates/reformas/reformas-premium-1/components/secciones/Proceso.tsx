import { pasosProceso, type SiteConfig } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { ParejaCta, Titular } from "@/components/Botones";
import { lineaConfianza, num, type DatosCta } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  config: Pick<SiteConfig, "proceso" | "valoracion" | "contacto">;
  datos: DatosCta;
};

/**
 * «Cómo *trabajamos*» sobre tinta (encargo §6.6): `proceso` o los pasos por defecto de
 * proyecto de core. Número en Instrument Serif cursiva a 64 px en `--color-primario-claro`
 * y filete en `--color-borde-oscuro`; rejilla de 3 (o 2) columnas en escritorio, lista en
 * móvil. Con `proceso[].imagen` (core 0.7.0), foto 4:5 encima del paso. Cierra con la pareja.
 */
export function Proceso({ config, datos }: Props) {
  const pasos = pasosProceso(config.proceso, "proyecto");
  const columnas = pasos.length % 3 === 0 || pasos.length === 5 ? "lg:grid-cols-3" : "lg:grid-cols-2";
  return (
    <section data-tono="oscuro" aria-labelledby="titulo-proceso" className="seccion bg-tinta text-fondo">
      <div className="contenedor">
        <p className="etiqueta mb-4 text-texto-claro">Proceso</p>
        <Titular id="titulo-proceso" antes="Cómo" destacada="trabajamos" />
        <ol className={cn("m-0 mt-[clamp(40px,4vw,72px)] grid list-none gap-x-12 gap-y-12 p-0 sm:grid-cols-2", columnas)}>
          {pasos.map((p, i) => (
            <li key={p.titulo} data-aparecer style={{ "--i": i % 3 } as React.CSSProperties} className="border-t border-borde-oscuro pt-6">
              {p.imagen && <Foto imagen={p.imagen} sizes="(min-width: 1024px) 340px, 90vw" proporcion="4/5" className="mb-6" />}
              <span aria-hidden="true" className="block font-destacada text-[64px] leading-none text-primario-claro italic">
                {num(i + 1)}
              </span>
              <h3 className="m-0 mt-4 text-h3">{p.titulo}</h3>
              <p className="m-0 mt-2 max-w-[36ch] text-texto-claro">{p.texto}</p>
            </li>
          ))}
        </ol>
        <ParejaCta datos={datos} fondo="oscuro" confianza={lineaConfianza(config, "horario")} className="mt-[clamp(56px,5vw,96px)]" />
      </div>
    </section>
  );
}
