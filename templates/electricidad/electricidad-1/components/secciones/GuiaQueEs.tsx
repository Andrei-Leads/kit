import { Regla } from "@/components/Regla";
import { h2, lectura, seccionPlana } from "@/lib/estilos";
import { cn } from "@/lib/utils";

/**
 * «Qué es» (Specs §6): `contenido` tal cual, un `<p>` por párrafo, a 18 px / 1,6 y 66ch.
 * No inventa subtítulos. La página solo la llama si hay `contenido`.
 */
export function GuiaQueEs({ numero, id, contenido }: { numero: string; id: string; contenido: string[] }) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className={seccionPlana}>
      <div className="max-w-[720px]">
        <Regla numero={numero} etiqueta="Qué es" />
        <h2 id={`${id}-titulo`} className={cn(h2, "mt-4")}>
          Qué es
        </h2>
        <div className="mt-5 flex flex-col gap-[18px]">
          {contenido.map((parrafo, i) => (
            <p key={i} className={lectura}>
              {parrafo}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
