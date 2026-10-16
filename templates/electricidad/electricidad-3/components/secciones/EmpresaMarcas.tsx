import { h2 } from "@/lib/estilos";
import { listaY } from "@/lib/formato";
import { cn } from "@/lib/utils";

/** Marcas de /empresa: título y los nombres en texto corrido («Schneider, Legrand y Simon»). Sin marcas, no se pinta. */
export function EmpresaMarcas({ marcas }: { marcas: string[] }) {
  if (marcas.length === 0) return null;
  return (
    <section aria-labelledby="titulo-marcas" className="pt-11 lg:pt-16">
      <h2 id="titulo-marcas" className={cn(h2, "mb-3")}>
        Marcas con las que trabajamos
      </h2>
      <p className="m-0 max-w-[60ch] text-[18px] leading-[1.6] font-semibold text-pretty">{listaY(marcas)}.</p>
    </section>
  );
}
