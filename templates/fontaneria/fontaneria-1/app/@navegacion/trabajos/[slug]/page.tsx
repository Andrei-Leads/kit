import { parametrosTrabajos } from "@andrei-leads/core";

import config from "@/site.config";
import { Navegacion } from "@/components/Navegacion";

// Igual que la página principal: estática y 404 desde la primera petición si el slug no existe.
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return parametrosTrabajos(config);
}

// Slot de la cabecera en una ficha: marca la sección («/trabajos»).
export default function Page() {
  return <Navegacion actual="/trabajos" />;
}
