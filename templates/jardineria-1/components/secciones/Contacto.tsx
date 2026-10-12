import { BotonLlamada, BotonWhatsApp, type SiteConfig } from "@andrei-leads/core";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { contenedorSeccion, TituloSeccion } from "@/components/TituloSeccion";
import { enlaceMaps, telefonoVisible } from "@/lib/formato";
import { cn } from "@/lib/utils";

const etiqueta = "m-0 text-[13px] font-bold tracking-[0.08em] uppercase";

export function Contacto({ contacto }: { contacto: SiteConfig["contacto"] }) {
  const { telefono, whatsapp, email, direccion, horario } = contacto;

  return (
    <section
      id="contacto"
      aria-labelledby="titulo-contacto"
      className="border-t-2 border-tinta bg-primario-tinte"
    >
      <div
        className={cn(
          contenedorSeccion,
          "grid grid-cols-[repeat(auto-fit,minmax(min(100%,480px),1fr))] items-start gap-[clamp(28px,4vw,64px)]"
        )}
      >
        <div className="flex min-w-0 flex-col gap-[18px]">
          <TituloSeccion id="titulo-contacto">Contacto</TituloSeccion>
          <BotonLlamada
            telefono={telefono}
            className="self-start text-[clamp(54px,8vw,112px)] leading-[0.9] font-extrabold tracking-[0.005em] text-tinta no-underline font-stretch-66%"
          >
            {telefonoVisible(telefono)}
          </BotonLlamada>
          <div className="flex flex-wrap gap-2.5">
            <BotonLlamada
              telefono={telefono}
              className={cn(
                buttonVariants({ variant: "primario", size: "lg" }),
                "flex-[1_1_220px] justify-between"
              )}
            >
              <span>Llamar ahora</span>
              <span aria-hidden="true">→</span>
            </BotonLlamada>
            {whatsapp && (
              <BotonWhatsApp
                numero={whatsapp}
                className={cn(
                  buttonVariants({ variant: "contorno-tinta", size: "lg" }),
                  "flex-[1_1_220px] text-[17px]"
                )}
              >
                Escribir por WhatsApp
              </BotonWhatsApp>
            )}
          </div>
          <a
            href={`mailto:${email}`}
            className="flex min-h-11 items-center self-start text-lg font-semibold wrap-anywhere text-tinta underline underline-offset-4"
          >
            {email}
          </a>
        </div>

        <Card>
          <div className="flex flex-col gap-2 border-b-2 border-tinta p-[clamp(18px,2vw,28px)]">
            <h3 className={etiqueta}>Dirección</h3>
            <p className="m-0 text-lg leading-[1.4]">
              {direccion.calle}
              <br />
              {direccion.cp} {direccion.ciudad} ({direccion.provincia})
            </p>
            <Button asChild variant="enlace" size="enlace" className="self-start text-tinta">
              <a href={enlaceMaps(direccion)} target="_blank" rel="noopener noreferrer">
                Cómo llegar <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.25">
                  <path d="M4 12 12 4M5.5 4H12v6.5" />
                </svg>
                <span className="sr-only">(Google Maps, se abre en una pestaña nueva)</span>
              </a>
            </Button>
          </div>
          <div className="flex flex-col gap-2.5 p-[clamp(18px,2vw,28px)]">
            <h3 className={etiqueta}>Horario</h3>
            <dl className="m-0 flex flex-col gap-2">
              {horario.map((h, i) => (
                <div key={`${h.dias}-${i}`} className="flex items-baseline gap-2.5 text-[17px]">
                  <dt className="flex flex-1 items-baseline gap-2.5">
                    <span className="flex-none">{h.dias}</span>
                    <span
                      aria-hidden="true"
                      className="flex-1 -translate-y-1 border-b-2 border-dotted border-puntos"
                    />
                  </dt>
                  <dd className="m-0 flex-none font-bold">{h.horas}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Card>
      </div>
    </section>
  );
}
