import type { Servicio } from "@andrei-leads/core";

import { Regla } from "@/components/Regla";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { h2, seccionPlana } from "@/lib/estilos";
import { minusculaInicial } from "@/lib/formato";
import { cn } from "@/lib/utils";

/**
 * «Preguntas sobre {titulo}»: las `preguntas` del servicio en el Accordion de shadcn (primera
 * abierta; respuestas cerradas siempre en el HTML y sin animación de altura, ver ui/accordion).
 * La página solo la llama si el servicio tiene preguntas.
 */
export function GuiaPreguntas({
  numero,
  id,
  titulo,
  preguntas,
}: {
  numero: string;
  id: string;
  titulo: string;
  preguntas: Servicio["preguntas"];
}) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className={seccionPlana}>
      <div className="max-w-[820px]">
        <Regla numero={numero} etiqueta="Preguntas" />
        <h2 id={`${id}-titulo`} className={cn(h2, "mt-4")}>
          Preguntas sobre {minusculaInicial(titulo)}
        </h2>
        <Accordion type="single" collapsible defaultValue="pregunta-0" className="mt-6">
          {preguntas.map((p, i) => (
            <AccordionItem key={`${i}-${p.pregunta}`} value={`pregunta-${i}`}>
              <AccordionTrigger>{p.pregunta}</AccordionTrigger>
              <AccordionContent>{p.respuesta}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
