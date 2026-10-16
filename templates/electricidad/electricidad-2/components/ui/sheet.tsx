"use client";

import * as React from "react";
import { Dialog as SheetPrimitive } from "radix-ui";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

/** Hoja inferior (Dialog de Radix: Esc cierra, foco atrapado y devuelto al botón, aria-expanded en el disparador). */
function Sheet(props: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger(props: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose(props: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

/**
 * Hoja que sube desde abajo (side="bottom", la única que usa este diseño), blanca, sobre una capa
 * tinta al 50 %. Lleva su botón «Cerrar» como PRIMER elemento (Radix da el foco al primer enfocable
 * al abrir). El corte diagonal de arriba (Specs §6) es un elemento propio que sobresale por encima
 * de la hoja: por eso el scroll interno va en un div aparte y la hoja no recorta (`overflow` visible).
 * Entra con translateY(100 % → 0) + opacity del fondo en 240 ms (animate-hoja / animate-fondo, solo
 * al abrir; con «reducir movimiento» aparece sin desplazamiento).
 */
function SheetContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content>) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay
        data-slot="sheet-overlay"
        className="fixed inset-0 z-40 bg-tinta/50 data-[state=open]:animate-fondo"
      />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 bg-white text-tinta data-[state=open]:animate-hoja",
          className
        )}
        {...props}
      >
        {/* Corte diagonal arriba: sube hacia la derecha, siempre en el mismo sentido que el resto del diseño. */}
        <div aria-hidden="true" className="corte absolute inset-x-0 bottom-[calc(100%-1px)] bg-white" />
        <div className="max-h-[calc(100dvh-5rem)] overflow-y-auto px-5 pt-1 pb-[calc(24px+env(safe-area-inset-bottom))]">
          <div className="flex justify-end">
            <SheetPrimitive.Close className="inline-flex min-h-12 cursor-pointer items-center gap-1.5 border-0 bg-transparent px-1 font-semibold text-tinta">
              <X aria-hidden="true" strokeWidth={2} className="size-5" />
              <span>Cerrar</span>
            </SheetPrimitive.Close>
          </div>
          {children}
        </div>
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  );
}

/** Título accesible de la hoja (solo para lectores de pantalla: la hoja no lleva título visible). */
function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("sr-only", className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("sr-only", className)}
      {...props}
    />
  );
}

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetTitle, SheetDescription };
