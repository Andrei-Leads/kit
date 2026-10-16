import { BotonLlamada, BotonWhatsApp, type Servicio } from "@andrei-leads/core";
import { MessageCircle, Phone } from "lucide-react";

import { Foto } from "@/components/Foto";
import { IconoServicio } from "@/components/IconoServicio";
import { buttonVariants } from "@/components/ui/button";
import { precioDesde, telefonoVisible } from "@/lib/formato";
import { etiquetaWhatsappServicio, mensajeServicio } from "@/lib/mensajes";
import type { ContactoFicha } from "@/lib/servicios";
import { textos } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  servicio: Servicio;
  contacto: ContactoFicha;
};

/** Precio grande de la ficha: etiqueta «desde» solo si el texto empieza por «desde»; si no, el texto tal cual. */
function PrecioFicha({ texto }: { texto: string }) {
  const { desde, importe } = precioDesde(texto);
  return (
    <p className="m-0 flex flex-wrap items-baseline gap-x-2 gap-y-1">
      {desde && <span className="text-tinta-suave">{textos.desde}</span>}
      <span className="font-serif text-4xl leading-none font-semibold">{importe}</span>
    </p>
  );
}

/**
 * Cabecera de la ficha (mockup 2b/2i), bajo el h1: a la izquierda la foto 3:2 (`imagenes[0]`, con su
 * `alt`) o, sin foto, un icono grande sobre piedra-2 con el corte en la esquina; a la derecha la
 * `descripcion` (20 px), el precio (solo con `precioDesde`), `llamada-acento` y, solo con `contacto.whatsapp`,
 * `whatsapp-linea` con el texto «Pide presupuesto de {servicio} por WhatsApp» (decisiones 4 y 7) y el mensaje
 * del servicio. Dos columnas desde 900 px (`auto-fit`: sin hueco si falta algo).
 */
export function FichaCabecera({ servicio, contacto }: Props) {
  const foto = servicio.imagenes[0];
  return (
    <div className="contenedor pb-12">
      <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-2 lg:gap-x-14">
        {foto ? (
          <Foto
            imagen={foto}
            proporcion="3/2"
            priority
            sizes="(min-width: 1024px) 560px, 100vw"
          />
        ) : (
          <div className="relative flex aspect-[3/2] items-center justify-center overflow-hidden bg-piedra-2">
            <IconoServicio titulo={servicio.titulo} className="size-[120px] text-tinta-suave" />
            <div
              aria-hidden="true"
              className="absolute right-0 -bottom-px w-[46%] bg-piedra pt-[16%] [clip-path:polygon(0_100%,100%_0,100%_100%)]"
            />
          </div>
        )}
        <div className="flex flex-col gap-4">
          <p className="m-0 text-xl leading-normal text-pretty">{servicio.descripcion}</p>
          {servicio.precioDesde && <PrecioFicha texto={servicio.precioDesde} />}
          <div className="mt-1 flex flex-col gap-2.5">
            <BotonLlamada
              telefono={contacto.telefono}
              className={cn(buttonVariants({ variant: "llamadaAcento" }), "w-full")}
            >
              <Phone aria-hidden="true" strokeWidth={2} strokeLinejoin="round" className="size-5 flex-none" />
              <span>
                {textos.llamanos}: {telefonoVisible(contacto.telefono)}
              </span>
            </BotonLlamada>
            {contacto.whatsapp && (
              <BotonWhatsApp
                numero={contacto.whatsapp}
                mensaje={mensajeServicio(servicio)}
                className={cn(buttonVariants({ variant: "whatsappLinea" }), "w-full")}
              >
                <MessageCircle aria-hidden="true" strokeWidth={1.75} strokeLinejoin="round" className="size-5 flex-none" />
                <span>{etiquetaWhatsappServicio(servicio)}</span>
              </BotonWhatsApp>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
