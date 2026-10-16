import type { SiteConfig } from "@andrei-leads/core";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { h2 } from "@/lib/estilos";
import { cn } from "@/lib/utils";

type Props = {
  preguntas: SiteConfig["preguntas"];
  /** Id de la sección (índice lateral). Por defecto `preguntas`. */
  id?: string;
  className?: string;
};

/**
 * Preguntas frecuentes (Specs §2): shadcn Accordion (`single`, `collapsible`) con la primera abierta. Las
 * respuestas cerradas siguen en el HTML (`forceMount`; ocultas por CSS solo con JS) y abrir/cerrar no anima
 * la altura. Cada pregunta es un h3. Sin preguntas, no se pinta. También sirve a `servicios[].preguntas`.
 */
export function Preguntas({ preguntas, id = "preguntas", className }: Props) {
  if (preguntas.length === 0) return null;
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className={cn("max-w-[760px] pt-11 lg:pt-16", className)}>
      <h2 id={`${id}-titulo`} className={cn(h2, "mb-2")}>
        Preguntas frecuentes
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
