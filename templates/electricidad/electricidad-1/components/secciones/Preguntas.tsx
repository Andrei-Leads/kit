import type { SiteConfig } from "@andrei-leads/core";

import { Regla } from "@/components/Regla";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { h2, seccionPlana } from "@/lib/estilos";
import { cn } from "@/lib/utils";

type Props = {
  numero: string;
  preguntas: SiteConfig["preguntas"];
  className?: string;
};

/**
 * Preguntas frecuentes (Specs §2): shadcn Accordion (`single`, `collapsible`) con la primera abierta.
 * Las respuestas cerradas siguen en el HTML (`forceMount` en `AccordionContent`, ocultas por CSS con `data-[state=closed]:hidden`)
 * y abrir/cerrar no anima la altura. Es contenido para buscadores. Cada pregunta es un h3.
 */
export function Preguntas({ numero, preguntas, className }: Props) {
  return (
    <section aria-labelledby="titulo-preguntas" className={cn(seccionPlana, className)}>
      <Regla numero={numero} etiqueta="Preguntas" />
      <h2 id="titulo-preguntas" className={cn(h2, "mt-5")}>
        Preguntas frecuentes
      </h2>
      <Accordion type="single" collapsible defaultValue="pregunta-0" className="mt-6 max-w-[820px]">
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
