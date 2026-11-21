import { horarioVisible, type SiteConfig } from "@andrei-leads/core";

import { ParCta } from "@/components/Botones";
import { H2, Rotulo } from "@/components/Rotulo";
import { cn } from "@/lib/utils";

/**
 * `CtaFinal` (encargo §6.10): banda noche con `llamada-dossier` invertido (superficie sobre noche,
 * no depende del primario), `whatsapp-linea` en noche-texto, horario con `formatearHorario` (fila de
 * urgencias solo con `urgencias24h`) y email.
 */
export function CtaFinal({
  contacto,
  mensaje,
  textoWhatsapp,
  titulo,
  rotulo = "Contacto",
  n,
}: {
  contacto: SiteConfig["contacto"];
  mensaje: string;
  textoWhatsapp?: string;
  titulo?: string;
  rotulo?: string;
  n?: string;
}) {
  // «Llámanos y vamos» promete salir: solo con urgencias 24 h.
  const h2 = titulo ?? (contacto.urgencias24h ? "¿Una avería en el edificio? Llámanos y vamos." : "¿Una avería en el edificio? Llámanos.");
  return (
    <section aria-labelledby="h2-cta" className="banda-noche">
      <div className="contenedor grid gap-10 py-16 lg:grid-cols-12 lg:gap-12 lg:py-24">
        <div className="lg:col-span-7">
          <Rotulo n={n} texto={rotulo} sobreNoche />
          <h2 id="h2-cta" className={cn(H2, "mt-4 max-w-[20ch]")}>
            {h2}
          </h2>
          <ParCta contacto={contacto} mensaje={mensaje} textoWhatsapp={textoWhatsapp} invertido className="mt-8" />
        </div>
        <div className="lg:col-span-5 lg:pt-12">
          <dl className="border-t border-linea-plano-noche">
            {horarioVisible(contacto, "24 horas").map((l) => (
              <div key={l.dias} className="flex flex-wrap justify-between gap-x-4 gap-y-0.5 border-b border-linea-plano-noche py-3.5 text-[0.9375rem] sm:text-base">
                <dt>{l.dias}</dt>
                <dd className="whitespace-nowrap text-noche-suave">{l.horas}</dd>
              </div>
            ))}
          </dl>
          <a
            href={`mailto:${contacto.email}`}
            className="mt-4 inline-flex min-h-11 items-center break-all underline decoration-noche-suave decoration-1 underline-offset-[5px] hover:decoration-2 focus-visible:outline-2 focus-visible:outline-foco"
          >
            {contacto.email}
          </a>
        </div>
      </div>
    </section>
  );
}
