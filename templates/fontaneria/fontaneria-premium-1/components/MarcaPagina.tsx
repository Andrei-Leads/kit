import type { Pagina } from "@/lib/navegacion";

/**
 * Marca invisible que lee globals.css con `body:has(…)`: la página actual en
 * la cabecera y, en las interiores (hero claro), la cabecera clara antes de
 * que CabeceraScroll mida. Funciona sin JavaScript.
 */
export function MarcaPagina({ pagina, inicioClaro }: { pagina?: Pagina; inicioClaro?: boolean }) {
  return <span hidden data-pagina={pagina} data-inicio={inicioClaro ? "claro" : undefined} />;
}
