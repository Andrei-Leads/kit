import { numeroSeccion } from "@/lib/estilos";
import { cn } from "@/lib/utils";

type Props = {
  /** «02», «03»… ya recalculado según las secciones visibles. */
  numero: string;
  /** Rótulo en mayúsculas a la derecha: «TRÁMITE», «PREGUNTAS»… */
  etiqueta?: string;
  className?: string;
};

/**
 * Regla de sección (Specs §7): 2 px de tinta al inicio de cada sección, con su número en mono
 * («02 —») debajo. La regla se dibuja al entrar en pantalla (data-anim="regla", Specs §8).
 * Decorativa; el título de la sección es el h2 que va a continuación.
 */
export function Regla({ numero, etiqueta, className }: Props) {
  return (
    <div className={className}>
      <div data-anim="regla" aria-hidden="true" className="h-0.5 origin-left bg-tinta" />
      <div className={cn("flex justify-between pt-3", numeroSeccion)}>
        <span>{numero} —</span>
        {etiqueta && <span className="uppercase">{etiqueta}</span>}
      </div>
    </div>
  );
}
