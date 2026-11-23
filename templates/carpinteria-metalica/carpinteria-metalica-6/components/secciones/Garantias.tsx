import type { SiteConfig } from "@andrei-leads/core";

import { IconoCheck, IconoSello } from "@/components/Iconos";
import { cn } from "@/lib/utils";

type Props = Pick<SiteConfig, "garantias" | "acreditaciones" | "marcas"> & {
  nivel?: "h2" | "h3";
  className?: string;
};

/** Texto de una acreditación: «Nombre · n.º …» si hay número. */
export function textoAcreditacion(a: SiteConfig["acreditaciones"][number]): string {
  return a.numero ? `${a.nombre} · ${a.numero}` : a.nombre;
}

/** Lista de garantías y acreditaciones en tarjetas y las marcas en pastillas grises. */
export function ListaGarantias({ garantias, acreditaciones, marcas, columnas = true }: Pick<SiteConfig, "garantias" | "acreditaciones" | "marcas"> & { columnas?: boolean }) {
  return (
    <>
      {(garantias.length > 0 || acreditaciones.length > 0) && (
        <ul className={cn("grid gap-3", columnas && "grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))]")}>
          {garantias.map((g) => (
            <li key={g} className="tarjeta flex items-start gap-3.5 px-5 py-[18px]">
              <span className="flex size-[30px] flex-none items-center justify-center rounded-full bg-primario text-sobre-primario">
                <IconoCheck />
              </span>
              <span className="pt-[3px] text-[17px] leading-[1.35] font-bold">{g}</span>
            </li>
          ))}
          {acreditaciones.map((a) => (
            <li key={a.nombre} className="tarjeta flex items-start gap-3.5 px-5 py-[18px]">
              <span className="flex size-[30px] flex-none items-center justify-center rounded-full bg-primario-suave text-texto">
                <IconoSello />
              </span>
              <span className="pt-[3px] text-base leading-[1.4]">{textoAcreditacion(a)}</span>
            </li>
          ))}
        </ul>
      )}
      {marcas.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[15px] text-texto-suave">Trabajamos con</span>
          <ul className="contents">
            {marcas.map((m) => (
              <li key={m} className="rounded-pastilla bg-alterna px-4 py-2 text-[15px] leading-[1.2] font-bold">
                {m}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

/**
 * Garantías (encargo §6.7): «Nuestras garantías» (regla común de Ysst) con un check en primario,
 * las acreditaciones con un sello y las marcas en pastillas grises. Cada bloque solo con datos; sin
 * ninguno, no existe.
 */
export function Garantias({ garantias, acreditaciones, marcas, className }: Props) {
  if (garantias.length === 0 && acreditaciones.length === 0 && marcas.length === 0) return null;
  return (
    <section aria-labelledby="titulo-garantias" className={cn("pt-[clamp(56px,2rem+6vw,96px)]", className)}>
      <div className="contenedor">
        <h2 id="titulo-garantias" className="titulo-seccion mb-7">
          {garantias.length > 0 ? "Nuestras garantías" : "Con quién trabajamos"}
        </h2>
        <ListaGarantias garantias={garantias} acreditaciones={acreditaciones} marcas={marcas} />
      </div>
    </section>
  );
}
