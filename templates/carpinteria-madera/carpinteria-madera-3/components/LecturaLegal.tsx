import type { ReactNode } from "react";

import { Migas } from "@/components/base/Migas";
import { Marco } from "@/components/Marco";
import config from "@/site.config";

/**
 * Legales (encargo §7): columna de 66 caracteres sobre el kraft, con migas en mono y sin índice de
 * secciones (decidido en la revisión). El texto y el h1 los pone core; aquí solo el marco.
 */
export function LecturaLegal({ ruta, titulo, children }: { ruta: string; titulo: string; children: ReactNode }) {
  return (
    <Marco config={config} rotulo="Legal">
      <Migas
        className="pt-7"
        migas={[
          { href: "/", texto: "Inicio" },
          { href: ruta, texto: titulo },
        ]}
      />
      <div className="legal-banco pt-6">{children}</div>
    </Marco>
  );
}
