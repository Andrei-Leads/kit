import { Regla } from "@/components/Regla";
import { h2, seccionPlana } from "@/lib/estilos";
import { cn } from "@/lib/utils";

type Props = {
  numero: string;
  zonas: string[];
  className?: string;
};

/** Zonas (Specs §2): municipios en mono separados por « / ». Solo una lista, nunca páginas por municipio. */
export function Zonas({ numero, zonas, className }: Props) {
  return (
    <section aria-labelledby="titulo-zonas" className={cn(seccionPlana, className)}>
      <Regla numero={numero} etiqueta="Zonas" />
      <h2 id="titulo-zonas" className={cn(h2, "mt-5")}>
        Dónde trabajamos
      </h2>
      <p className="m-0 mt-5 max-w-[60ch] font-mono text-base leading-[1.75] font-medium text-pretty md:text-[19px]">
        {zonas.join(" / ")}
      </p>
    </section>
  );
}
