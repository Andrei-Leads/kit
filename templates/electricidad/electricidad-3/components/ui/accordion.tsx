"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

/** Filas separadas por una línea sólida de 1 px (borde inferior de cada una). */
function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-linea", className)}
      {...props}
    />
  );
}

/** Pregunta (h3): botón a todo el ancho (≥ 56 px) con un chevron que gira 180° al abrir (transform, 200 ms; sin «reducir movimiento» queda fijo). */
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
          "group flex min-h-14 w-full cursor-pointer items-center justify-between gap-3 py-3 text-left text-[17px] leading-[1.35] font-semibold text-texto",
          className
        )}
        {...props}
      >
        <span>{children}</span>
        <ChevronDown
          aria-hidden="true"
          strokeWidth={2}
          strokeLinecap="round"
          className="size-5 flex-none transition-transform duration-200 [.js_&]:group-data-[state=open]:rotate-180"
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
 * Sin animación de altura (decisión de Ysst): abre y cierra de golpe, sin keyframes.
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
      <div className={cn("max-w-[66ch] pr-8 pb-5 text-texto-suave text-pretty", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
