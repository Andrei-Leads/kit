import type { SiteConfig } from "@andrei-leads/core";

import { ParCta } from "@/components/Botones";

/** Pareja Llamar + WhatsApp entre bloques del inicio, con una pregunta corta a la izquierda. */
export function ParEntreBloques({ contacto, mensaje, pregunta }: { contacto: SiteConfig["contacto"]; mensaje: string; pregunta: string }) {
  return (
    <div className="contenedor pt-[clamp(32px,1.5rem+2vw,56px)]">
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <p className="m-0 text-[clamp(1.25rem,1.1rem+0.6vw,1.6rem)] leading-tight font-black">{pregunta}</p>
        <ParCta contacto={contacto} mensaje={mensaje} className="flex-[0_1_560px]" />
      </div>
    </div>
  );
}
