"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b-2 border-tinta", className)}
      {...props}
    />
  );
}

/** Pregunta: botón a todo el ancho con el indicador +/– de 44 px del diseño. */
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
          "group flex min-h-16 w-full cursor-pointer items-center justify-between gap-4 py-3.5 text-left text-[clamp(18px,1.6vw,21px)] leading-[1.3] font-bold",
          className
        )}
        {...props}
      >
        <span>{children}</span>
        <span
          aria-hidden="true"
          className="flex size-11 flex-none items-center justify-center rounded-sm border-2 border-tinta text-2xl leading-none font-medium"
        >
          <span className="group-data-[state=open]:hidden">+</span>
          <span className="hidden group-data-[state=open]:inline">–</span>
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden motion-safe:data-[state=closed]:animate-acordeon-cerrar motion-safe:data-[state=open]:animate-acordeon-abrir"
      {...props}
    >
      <div className={cn("pr-[60px] pb-5", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
