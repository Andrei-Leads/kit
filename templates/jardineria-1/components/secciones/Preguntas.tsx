import type { SiteConfig } from "@andrei-leads/core";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { contenedorSeccion, TituloSeccion } from "@/components/TituloSeccion";
import { cn } from "@/lib/utils";

/** Acordeón de shadcn: una abierta a la vez (la primera, al cargar). */
export function Preguntas({ preguntas }: { preguntas: SiteConfig["preguntas"] }) {
  if (preguntas.length === 0) return null;

  return (
    <section id="preguntas" aria-labelledby="titulo-preguntas" className="border-t-2 border-tinta">
      <div className={cn(contenedorSeccion, "flex flex-wrap gap-[clamp(24px,4vw,64px)]")}>
        <div className="flex-[1_1_280px]">
          <TituloSeccion id="titulo-preguntas">Preguntas frecuentes</TituloSeccion>
        </div>
        <Accordion
          type="single"
          collapsible
          defaultValue="pregunta-0"
          className="min-w-0 flex-[2_1_480px] border-t-2 border-tinta"
        >
          {preguntas.map((q, i) => (
            <AccordionItem key={`pregunta-${i}`} value={`pregunta-${i}`}>
              <AccordionTrigger>{q.pregunta}</AccordionTrigger>
              <AccordionContent>
                <p className="m-0 text-[17px] leading-[1.55] text-pretty text-tinta-suave">
                  {q.respuesta}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
