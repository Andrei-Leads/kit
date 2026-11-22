import { ViewTransition, type ReactNode } from "react";

/**
 * Transición miniatura → ficha (recurso 6): la foto de la tarjeta lleva
 * `foto-{slug}` y pasa al hero de su ficha. Es mejora: sin soporte, con
 * «reducir movimiento» (globals.css) o sin nombre, no hace nada.
 */
export function Transicion({ nombre, children }: { nombre?: string; children: ReactNode }) {
  if (!nombre) return <>{children}</>;
  return (
    <ViewTransition name={nombre} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}
