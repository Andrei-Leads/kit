import type { SiteConfig } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { cn } from "@/lib/utils";

type Props = {
  garantias: readonly string[];
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp">;
  mensaje: string;
  /** En el inicio, sobre `alterna` (empalma con el proceso); en /empresa, sobre el fondo. */
  sobreAlterna?: boolean;
};

const GUIJARROS = ["rounded-guijarro-1", "rounded-guijarro-2", "rounded-guijarro-3", "rounded-guijarro-4"];

/** Garantías (encargo §6.7): lista con viñetas de guijarro y la pareja de CTAs. Sin datos, fuera. */
export function Garantias({ garantias, contacto, mensaje, sobreAlterna }: Props) {
  if (garantias.length === 0) return null;
  return (
    <section aria-labelledby="titulo-garantias" className={cn("seccion", sobreAlterna && "sobre-alterna bg-alterna")}>
      <div className="contenedor grid items-start gap-[clamp(32px,5vw,72px)] lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <p className="antetitulo">Garantías</p>
          <h2 id="titulo-garantias" className="h2">
            Nuestras garantías
          </h2>
        </div>
        <div className="flex flex-col gap-8">
          <ul>
            {garantias.map((g, i) => (
              <li key={g} className="flex items-center gap-[18px] border-b-[1.5px] border-dashed border-borde py-4">
                <span aria-hidden="true" className={cn("h-[19px] w-[22px] flex-none bg-primario", GUIJARROS[i % 4])} />
                <span className="font-titulo text-[clamp(1.25rem,1.1rem+0.5vw,1.5rem)] leading-[1.3]">{g}</span>
              </li>
            ))}
          </ul>
          <Pareja contacto={contacto} mensaje={mensaje} />
        </div>
      </div>
    </section>
  );
}
