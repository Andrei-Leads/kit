import { BotonLlamada, type SiteConfig } from "@andrei-leads/core";

import { contenedorSeccion, TituloSeccion } from "@/components/TituloSeccion";
import { cn } from "@/lib/utils";

type Props = {
  zonas: string[];
  direccion: Pick<SiteConfig["contacto"]["direccion"], "ciudad" | "provincia">;
  telefono: string;
};

/** Franja primario con los municipios en grande, separados por cuadrados blancos. */
export function Zonas({ zonas, direccion, telefono }: Props) {
  if (zonas.length === 0) return null;

  return (
    <section
      id="zonas"
      aria-labelledby="titulo-zonas"
      className="foco-claro bg-primario text-sobre-primario"
    >
      <div className={cn(contenedorSeccion, "flex flex-col gap-[clamp(20px,3vw,40px)]")}>
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3.5">
          <TituloSeccion id="titulo-zonas" claro>
            Dónde trabajamos
          </TituloSeccion>
          <p className="m-0 max-w-[36ch] text-[17px] leading-[1.4] font-medium">
            Desde {direccion.ciudad} ({direccion.provincia}). Nos desplazamos a estos municipios:
          </p>
        </div>
        <ul className="m-0 flex list-none flex-wrap items-center gap-x-5 gap-y-1 border-t-2 border-white p-0 pt-[clamp(16px,2vw,28px)]">
          {zonas.map((zona, i) => (
            <li
              key={`${zona}-${i}`}
              className="flex items-center gap-5 text-[clamp(36px,5.2vw,76px)] leading-none font-extrabold uppercase font-stretch-66%"
            >
              <span>{zona}</span>
              {i < zonas.length - 1 && (
                <span aria-hidden="true" className="size-2.5 flex-none bg-white" />
              )}
            </li>
          ))}
        </ul>
        <p className="m-0 text-base font-medium">
          ¿Tu municipio no aparece?{" "}
          <BotonLlamada
            telefono={telefono}
            className="inline-flex min-h-11 items-center font-bold text-sobre-primario underline underline-offset-[3px]"
          >
            Llámanos y lo vemos
          </BotonLlamada>
          .
        </p>
      </div>
    </section>
  );
}
