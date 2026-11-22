import Link from "next/link";
import type { SiteConfig } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { mensajeInicio } from "@/lib/mensajes";
import { lineaHorario } from "@/lib/textos";

/**
 * `VolverAPlanificar` (encargo §6.7, entrega v2): banda corta «¿Ya lo tienes más claro?» con un
 * enlace al planificador y la pareja de CTAs. No repite la isla. Sin WhatsApp, no existe.
 */
export function VolverAPlanificar({ contacto }: { contacto: SiteConfig["contacto"] }) {
  if (!contacto.whatsapp) return null;
  return (
    <section aria-labelledby="h2-volver" className="pt-[clamp(40px,1.5rem+3vw,72px)]">
      <div className="contenedor">
        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-4 rounded-[28px] border border-borde bg-superficie p-[clamp(20px,3vw,40px)]">
          <div className="flex flex-[1_1_280px] flex-col gap-1">
            <h2 id="h2-volver" className="font-titulo text-[clamp(1.375rem,1.1rem+1vw,2rem)] font-semibold tracking-[-0.01em]">
              ¿Ya lo tienes más claro?
            </h2>
            <Link href="#planificador" className="enlace self-start">
              Volver al planificador ↑
            </Link>
          </div>
          <div className="flex flex-[1_1_360px] justify-end">
            <Pareja contacto={contacto} mensaje={mensajeInicio(contacto)} nota={lineaHorario(contacto)} />
          </div>
        </div>
      </div>
    </section>
  );
}
