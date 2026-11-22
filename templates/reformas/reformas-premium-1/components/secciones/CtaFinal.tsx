import { Destacada, Pareja } from "@/components/Botones";
import { cn } from "@/lib/utils";
import type { DatosCta } from "@/lib/textos";

type Props = {
  datos: DatosCta;
  /** Textos de la pareja (por defecto «Enséñanos tu casa» · «Llamar al {teléfono}»). */
  textoWa?: React.ReactNode;
  textoLlamar?: React.ReactNode;
  confianza?: string;
  /** Titular (por defecto «¿Hablamos de *tu casa*?»). */
  antes?: string;
  destacada?: string;
  despues?: string;
  className?: string;
};

/**
 * CTA final sobre tinta con la espiga (encargo §6.10): «¿Hablamos de *tu casa*?» a
 * tamaño display y la pareja de 56 px. Cierra todas las páginas.
 */
export function CtaFinal({ datos, textoWa, textoLlamar, confianza, antes = "¿Hablamos de", destacada = "tu casa", despues = "?", className }: Props) {
  return (
    <section data-tono="oscuro" aria-labelledby="titulo-cta" className={cn("espiga seccion text-fondo", className)}>
      <div className="contenedor">
        <h2 id="titulo-cta" className="titulo-display max-w-[16ch]">
          <span className="mascara">
            <span>{antes}</span>
          </span>
          <span className="mascara">
            <span>
              <Destacada>{destacada}</Destacada>
              {despues}
            </span>
          </span>
        </h2>
        <Pareja datos={datos} textoWa={textoWa} textoLlamar={textoLlamar} fondo="oscuro" className="mt-10 flex-col sm:max-w-[620px] sm:flex-row" />
        {confianza && <p className="m-0 mt-3 text-sm text-texto-claro">{confianza}</p>}
      </div>
    </section>
  );
}
