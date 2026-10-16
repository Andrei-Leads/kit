import { buttonVariants } from "@/components/ui/button";
import { ID_LISTA_TRABAJOS, type Filtro } from "@/lib/trabajos";

/**
 * Filtro de /trabajos: chips de ≥ 44 px que son enlaces ancla (estático, sin JS). «Todos» lleva al
 * inicio de la lista; cada servicio, a su primera tarjeta. No lleva `aria-current`: con anclas
 * estáticas no se puede saber cuál está «activo» sin JavaScript.
 */
export function FiltroTrabajos({ chips }: { chips: Filtro["chips"] }) {
  return (
    <nav aria-label="Filtrar por servicio" className="mb-7">
      <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
        <li>
          <a href={`#${ID_LISTA_TRABAJOS}`} className={buttonVariants({ variant: "chipFiltro" })}>
            Todos
          </a>
        </li>
        {chips.map((chip) => (
          <li key={chip.id}>
            <a href={`#${chip.id}`} className={buttonVariants({ variant: "chipFiltro" })}>
              {chip.texto}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
