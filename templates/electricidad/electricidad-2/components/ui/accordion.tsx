"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

/** Filas separadas por líneas de 1 px; la última cierra con línea inferior. */
function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-t border-linea last:border-b", className)}
      {...props}
    />
  );
}

/** Pregunta (h3): botón a todo el ancho (≥ 60 px), en serif 600 de 20 px, con chevrón a la derecha. */
function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="m-0 flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group flex min-h-[60px] w-full cursor-pointer items-center justify-between gap-4 py-3 text-left font-serif text-xl leading-[1.3] font-semibold text-tinta",
          className
        )}
        {...props}
      >
        <span>{children}</span>
        {/* Sin JS el botón no abre nada y todas las respuestas se ven: sin chevrón. */}
        <ChevronDown
          aria-hidden="true"
          strokeWidth={2}
          className="hidden size-5 flex-none [.js_&]:block [.js_&]:group-data-[state=open]:rotate-180"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

/**
 * Respuesta. Siempre montada (`forceMount`): cerrada sigue en el HTML para que los buscadores la lean.
 * Con `forceMount`, Radix no pone `hidden` ni deja de pintar los hijos: la oculta el CSS con
 * `data-[state=closed]:hidden` (display: none, así tampoco la lee un lector de pantalla), y solo
 * bajo `html.js`: sin JavaScript no se podría abrir, así que todas las respuestas se ven.
 * Sin animación de altura (decisión de Ysst): abre y cierra de golpe.
 */
function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      forceMount
      className="[.js_&]:data-[state=closed]:hidden"
      {...props}
    >
      <div className={cn("max-w-[60ch] pb-[18px] text-tinta-suave text-pretty", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
