import type { ReactNode } from "react";

import { Marco } from "@/components/Marco";

/**
 * Legales (encargo §7): fondo claro, columna de 68 caracteres dentro de una tarjeta blanca
 * redondeada. El <h1> lo pone core: aquí no se añade ningún título.
 */
export function LecturaLegal({ children }: { children: ReactNode }) {
  return (
    <Marco>
      <section className="px-[clamp(12px,4vw,40px)] pt-[clamp(84px,3rem+6vw,128px)] pb-[clamp(40px,6vw,96px)]">
        <div className="lectura-legal mx-auto flex max-w-[calc(68ch+2*clamp(20px,5vw,64px))] flex-col gap-4 rounded-[28px] bg-superficie p-[clamp(24px,5vw,64px)] shadow-tarjeta">
          <p className="text-[13px] font-semibold tracking-[0.08em] text-texto-suave uppercase">Texto legal</p>
          {children}
        </div>
      </section>
    </Marco>
  );
}
