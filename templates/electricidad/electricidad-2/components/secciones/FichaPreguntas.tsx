import type { Pregunta } from "@andrei-leads/core";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { h2 } from "@/lib/estilos";
import { textos } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  /** Preguntas del servicio (al menos 1). */
  preguntas: Pregunta[];
  /** id del h2 (único en la página). */
  idTitulo: string;
};

/**
 * «Preguntas» de la ficha (mockup 2b/2i): h2 corto y el mismo shadcn Accordion que el inicio (`single`,
 * `collapsible`, primera abierta, `forceMount`: las respuestas cerradas siguen en el HTML y las oculta el CSS
 * solo con JS). No reutiliza `Preguntas` porque aquel pone el h2 «Preguntas frecuentes» del inicio.
 */
export function FichaPreguntas({ preguntas, idTitulo }: Props) {
  return (
    <section aria-labelledby={idTitulo} className="min-w-0">
      <h2 id={idTitulo} className={cn(h2, "mb-5")}>
        {textos.preguntasFrecuentes}
      </h2>
      <Accordion type="single" collapsible defaultValue="pregunta-0">
        {preguntas.map((p, i) => (
          <AccordionItem key={`${i}-${p.pregunta}`} value={`pregunta-${i}`}>
            <AccordionTrigger>{p.pregunta}</AccordionTrigger>
            <AccordionContent>{p.respuesta}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
