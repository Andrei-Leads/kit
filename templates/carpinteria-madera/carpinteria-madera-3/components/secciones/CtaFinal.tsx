import { urlComoLlegar, type SiteConfig } from "@andrei-leads/core";

import { Despiece } from "@/components/Despiece";
import { Pareja } from "@/components/Pareja";
import { TituloSeccion } from "@/components/TituloSeccion";
import { notaHorario } from "@/lib/formato";

type Props = {
  n: string;
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp" | "horario" | "direccion" | "coordenadas">;
  mensaje: string;
};

/**
 * CTA final (encargo §6.10): «Pásate por el taller o escríbenos» con el despiece montado (sus piezas se
 * juntan 8–16 px al hacer scroll, `.junta` en globals.css; con «reducir movimiento», montado y quieto),
 * la pareja con el horario y la dirección del taller con «Cómo llegar» (enlace, nunca mapa).
 */
export function CtaFinal({ n, contacto, mensaje }: Props) {
  const { direccion } = contacto;
  return (
    <section id="taller" aria-labelledby="h2-taller" className="pt-(--sec-grande)">
      <TituloSeccion n={n} id="h2-taller" grande>
        Pásate por el taller o escríbenos
      </TituloSeccion>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-center gap-10">
        <div aria-hidden="true" className="junta w-full max-w-[420px]">
          <Despiece modo="montado" junta />
        </div>
        <div className="flex flex-col gap-6">
          <Pareja contacto={contacto} mensaje={mensaje} textoWhatsapp="Escríbenos por WhatsApp" nota={notaHorario(contacto)} />
          <address className="flex flex-col gap-1 border-t border-tinta pt-4 not-italic">
            <span className="etiqueta text-texto-suave">Taller</span>
            <span>{direccion.calle}</span>
            <span>
              {direccion.cp} {direccion.ciudad} ({direccion.provincia})
            </span>
            <a href={urlComoLlegar(contacto)} target="_blank" rel="noopener" className="enlace-mono min-h-11 self-start">
              Cómo llegar →
            </a>
          </address>
        </div>
      </div>
    </section>
  );
}
