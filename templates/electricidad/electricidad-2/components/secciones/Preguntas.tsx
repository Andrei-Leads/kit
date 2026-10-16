import type { SiteConfig } from "@andrei-leads/core";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { h2 } from "@/lib/estilos";
import { textos } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  preguntas: SiteConfig["preguntas"];
};

/**
 * Preguntas frecuentes (Specs §2): shadcn Accordion (`single`, `collapsible`) con la primera abierta. Las
 * respuestas cerradas siguen en el HTML (`forceMount` en `AccordionContent`; las oculta el CSS solo con JS) y
 * abrir/cerrar no anima la altura: es contenido para buscadores. Cada pregunta es un h3. Sin padding propio:
 * comparte banda con las zonas (ver `Zonas`).
 */
export function Preguntas({ preguntas }: Props) {
  return (
    <section aria-labelledby="titulo-preguntas" className="min-w-0">
      <h2 id="titulo-preguntas" className={cn(h2, "mb-5")}>
        {textos.preguntasFrecuentesInicio}
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
