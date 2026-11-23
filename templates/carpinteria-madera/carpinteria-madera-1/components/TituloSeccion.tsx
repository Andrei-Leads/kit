import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** h2 grande seguido de su filete de 1 px, que se dibuja al entrar (encargo §5 y §12). */
export function TituloSeccion({ id, children, className }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h2 id={id} data-aparecer className="titulo-h2">
        {children}
      </h2>
      <div aria-hidden="true" className="filete-dibuja mt-5 h-px bg-filete" />
    </div>
  );
}

/** Filete decorativo suelto. */
export function Filete({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("h-px bg-filete", className)} />;
}
