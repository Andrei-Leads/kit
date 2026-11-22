import type { ReactNode } from "react";

import { Migas } from "@/components/base/Migas";
import { Marco } from "@/components/Marco";
import config from "@/site.config";

/**
 * Legales (encargo §7): migas y cinta «Legal» sobre la retícula, y el texto de core en una hoja de
 * `--color-superficie` a 68 caracteres con los títulos en mono (`.legal-diario`). El h1 lo pone core.
 */
export function LecturaLegal({ ruta, titulo, children }: { ruta: string; titulo: string; children: ReactNode }) {
  return (
    <Marco config={config}>
      <div className="reticula px-(--pad) pt-[clamp(28px,1rem+4vw,88px)] pb-[clamp(48px,3rem+3vw,96px)]">
        <div className="grid max-w-[1040px] justify-items-start gap-5">
          <Migas
            migas={[
              { href: "/", texto: "Inicio" },
              { href: ruta, texto: titulo },
            ]}
          />
          <span className="cinta">Legal</span>
        </div>
        <div className="legal-diario mt-8 max-w-[calc(68ch+80px)] border border-borde bg-superficie p-[clamp(20px,1rem+2vw,40px)]">{children}</div>
      </div>
    </Marco>
  );
}
