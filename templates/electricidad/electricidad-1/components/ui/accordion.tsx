"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

/** Filas separadas por reglas de 1 px; la última cierra con regla inferior. */
function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-t border-regla last:border-b", className)}
      {...props}
    />
  );
}

/** Pregunta (h3): botón a todo el ancho (≥ 56 px) con indicador +/− en un cuadrado de 28 px en mono. */
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
          "group flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 py-4 text-left text-[17px] leading-[1.35] font-bold text-tinta",
          className
        )}
        {...props}
      >
        <span>{children}</span>
        <span
          aria-hidden="true"
          className="flex size-7 flex-none items-center justify-center border border-tinta font-mono text-base leading-none font-bold group-hover:bg-papel-2"
        >
          <span className="group-data-[state=open]:hidden">+</span>
          <span className="hidden group-data-[state=open]:inline">−</span>
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

/**
 * Respuesta. Siempre montada (`forceMount`): cerrada sigue en el HTML para que los buscadores la lean.
 * Con `forceMount`, Radix no pone `hidden` ni deja de pintar los hijos: la oculta el CSS con
 * `data-[state=closed]:hidden` (display: none, así tampoco la lee un lector de pantalla).
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
      className="data-[state=closed]:hidden"
      {...props}
    >
      <div className={cn("max-w-[66ch] pr-11 pb-5 text-tinta-cuerpo text-pretty", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
