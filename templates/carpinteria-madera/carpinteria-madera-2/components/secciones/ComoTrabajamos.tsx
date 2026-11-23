import type { Paso, SiteConfig } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";

type Props = {
  pasos: readonly Paso[];
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp">;
  mensaje: string;
};

/** Cómo trabajamos (encargo §6.5): `proceso` o los pasos de proyecto de core, en círculos numerados. Cierra con la pareja. */
export function ComoTrabajamos({ pasos, contacto, mensaje }: Props) {
  return (
    <section aria-labelledby="h2-proceso" className="seccion">
      <div className="contenedor">
        <h2 id="h2-proceso" className="h2 mb-9">
          Cómo trabajamos
        </h2>
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-8 gap-y-7">
          {pasos.map((p, i) => (
            <li key={p.titulo} className="flex items-start gap-4">
              <span aria-hidden="true" className="flex size-[52px] flex-none items-center justify-center rounded-full bg-alterna font-titulo text-xl font-bold tabular-nums">
                {i + 1}
              </span>
              <div className="flex flex-col gap-1 pt-1">
                <h3 className="font-titulo text-[19px] leading-[1.25] font-bold tracking-[-0.01em]">{p.titulo}</h3>
                <p className="text-base text-texto-suave">{p.texto}</p>
              </div>
            </li>
          ))}
        </ol>
        <Pareja contacto={contacto} mensaje={mensaje} textoWhatsapp="Pedir la visita por WhatsApp" className="mt-11" />
      </div>
    </section>
  );
}
