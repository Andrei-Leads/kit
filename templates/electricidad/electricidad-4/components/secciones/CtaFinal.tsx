import { direccionLinea, horarioVisible, type SiteConfig } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";

/**
 * CTA final (encargo §6.9): banda casi negra con el pulsador y WhatsApp, y el horario de core en
 * filas (con la de urgencias si `urgencias24h`). El título y el mensaje cambian por página.
 */
export function CtaFinal({
  contacto,
  mensaje,
  titulo = "¿Ha saltado algo? Llámanos.",
  textoWhatsapp,
}: {
  contacto: SiteConfig["contacto"];
  mensaje: string;
  titulo?: string;
  textoWhatsapp?: string;
}) {
  return (
    <section aria-labelledby="h2-cta" className="banda-oscura mt-[clamp(48px,7vw,88px)] bg-texto text-superficie">
      <div className="contenedor grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-[clamp(28px,4vw,56px)] py-[clamp(36px,6vw,72px)]">
        <div className="flex flex-col gap-4">
          <h2 id="h2-cta" className="text-cta leading-[1.05] font-semibold">
            {titulo}
          </h2>
          {contacto.urgencias24h && <p className="text-[17px] text-carril">Atendemos urgencias las 24 horas.</p>}
          <Pareja contacto={contacto} mensaje={mensaje} textoWhatsapp={textoWhatsapp} />
        </div>
        <div>
          <h3 className="rotulo mb-1.5 text-carril">Horario</h3>
          <dl className="border-b border-texto-suave">
            {horarioVisible(contacto, "24 horas").map((h) => (
              <div key={h.dias} className="flex flex-wrap justify-between gap-x-4 gap-y-1 border-t border-texto-suave py-2.5 text-[17px]">
                <dt>{h.dias}</dt>
                <dd className="cifras">{h.horas}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-carril">{direccionLinea(contacto.direccion)}</p>
        </div>
      </div>
    </section>
  );
}
