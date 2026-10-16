import { textos } from "@/lib/textos";
import { ID_LISTA_TRABAJOS, type Filtro } from "@/lib/trabajos";
import { cn } from "@/lib/utils";

/** Chip oblicuo (Specs §7: fondo con skewX(-10°), texto recto) de ≥ 44 px. */
const chip =
  "etiqueta-oblicua min-h-11 px-4 py-0 ml-1 font-semibold text-tinta no-underline before:border-[1.5px] before:border-tinta-suave hover:[--etiqueta-fondo:var(--color-piedra-2)]";

/**
 * Filtro de /trabajos (Specs §2): chips oblicuos que son enlaces ancla (estático, sin JS). «Todos» lleva al
 * inicio de la lista, con el relleno tinta del mockup; cada servicio, a su primera tarjeta, con contorno
 * de tinta suave. No lleva `aria-current`: con anclas estáticas no se puede saber cuál está «activo» sin
 * JavaScript. El foco visible es el global (2 px, separado 2 px).
 */
export function FiltroTrabajos({ chips }: { chips: Filtro["chips"] }) {
  return (
    <nav aria-label="Filtrar por servicio" className="mb-7">
      <ul className="m-0 flex list-none flex-wrap gap-x-3.5 gap-y-2.5 p-0">
        <li>
          <a
            href={`#${ID_LISTA_TRABAJOS}`}
            className={cn(chip, "text-white before:border-0 [--etiqueta-fondo:var(--color-tinta)] hover:[--etiqueta-fondo:var(--color-tinta)]")}
          >
            {textos.todos}
          </a>
        </li>
        {chips.map((c) => (
          <li key={c.id}>
            <a href={`#${c.id}`} className={cn(chip, "[--etiqueta-fondo:transparent]")}>
              {c.texto}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
