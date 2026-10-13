import type { Pregunta } from "@andrei-leads/core";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { h2Seccion, seccion } from "@/lib/estilos";

type Props = {
  preguntas: Pregunta[];
  titulo?: string;
  /** Nivel del título: h2 en el inicio; h3 si va dentro de otra sección. */
  nivel?: "h2" | "h3";
};

/** Preguntas frecuentes. El llamador decide el ancho; esta sección lleva su propio padding. */
export function Preguntas({ preguntas, titulo = "Preguntas frecuentes", nivel: Titulo = "h2" }: Props) {
  if (preguntas.length === 0) return null;
  return (
    <section className={seccion}>
      <div className="contenedor">
        <div className="mx-auto flex max-w-[880px] flex-col gap-2">
          <Titulo className={h2Seccion}>{titulo}</Titulo>
          <Accordion type="single" collapsible>
            {preguntas.map((p, i) => (
              <AccordionItem key={i} value={`p-${i}`}>
                <AccordionTrigger>{p.pregunta}</AccordionTrigger>
                <AccordionContent>{p.respuesta}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
