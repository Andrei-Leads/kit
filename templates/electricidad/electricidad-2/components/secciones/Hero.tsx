import { BotonLlamada, BotonWhatsApp, type SiteConfig } from "@andrei-leads/core";
import { MessageCircle, Phone, Star } from "lucide-react";

import { Foto } from "@/components/Foto";
import { buttonVariants } from "@/components/ui/button";
import { h1 } from "@/lib/estilos";
import { mediaVisible, telefonoVisible, totalResenas } from "@/lib/formato";
import { mensajeGeneral } from "@/lib/mensajes";
import { textos } from "@/lib/textos";

type Props = {
  negocio: Pick<SiteConfig["negocio"], "sector" | "descripcionCorta">;
  contacto: Pick<
    SiteConfig["contacto"],
    "telefono" | "whatsapp" | "mensajeWhatsapp" | "urgencias24h" | "tiempoLlegada" | "direccion"
  >;
  valoracion?: SiteConfig["valoracion"];
  /** `imagenesHero[0]`; sin foto, hero tipográfico sobre tinta con `descripcionCorta` bajo el h1. */
  imagen?: SiteConfig["imagenesHero"][number];
  /** Fondo de la banda que sigue, para el corte diagonal del pie del hero (piedra-2 si sale la estrella). */
  siguiente: "piedra" | "piedra-2";
};

const FONDO_SIGUIENTE = { piedra: "bg-piedra", "piedra-2": "bg-piedra-2" } as const;

/**
 * Hero a sangre (Specs §2): foto con `.capa-hero` (degradado tinta) y el texto abajo, en blanco.
 * Chips oblicuos, valoración y `whatsapp-foto-hero` solo con dato, sin huecos. Sin foto: fondo tinta liso y
 * `descripcionCorta` bajo el h1. La foto lleva `priority` y `sizes="100vw"` (es el LCP); ni ella, ni la
 * capa, ni el h1, ni la valoración, ni `llamada-foto` llevan `data-anim`. El corte del pie es un triángulo
 * absoluto del color de la banda siguiente (`corte`): con foto no puede ser un elemento aparte entre bandas.
 * A 375×667 el h1, la valoración y la llamada con el número quedan por encima de la barra móvil.
 */
export function Hero({ negocio, contacto, valoracion, imagen, siguiente }: Props) {
  const chips: string[] = [];
  if (contacto.urgencias24h) chips.push(textos.urgencias24h);
  if (contacto.tiempoLlegada) chips.push(`${textos.llegamosEn} ${contacto.tiempoLlegada}`);

  return (
    <section
      className={`sobre-foto relative flex flex-col justify-end overflow-hidden bg-tinta text-white ${
        imagen ? "min-h-[520px] lg:min-h-[640px]" : ""
      }`}
    >
      {imagen && (
        <>
          <Foto imagen={imagen} proporcion="relleno" sizes="100vw" priority className="absolute inset-0" />
          <div aria-hidden="true" className="capa-hero absolute inset-0" />
        </>
      )}
      <div className="contenedor relative z-[1] w-full max-w-[1280px] pt-12 pb-[calc(var(--corte-movil)+28px)] lg:pb-[calc(var(--corte-escritorio)+44px)]">
        <div className="max-w-[580px]">
          {chips.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-x-3.5 gap-y-2.5">
              {chips.map((chip) => (
                <span key={chip} className="etiqueta-oblicua text-base font-bold text-white">
                  {chip}
                </span>
              ))}
            </div>
          )}
          <h1 className={`${h1} mb-3`}>
            {negocio.sector} en {contacto.direccion.ciudad}
          </h1>
          {!imagen && (
            <p className="m-0 mb-3.5 max-w-[46ch] text-lg text-linea text-pretty">{negocio.descripcionCorta}</p>
          )}
          {valoracion && (
            <p className="m-0 flex items-center gap-2 text-lg font-semibold">
              <Star aria-hidden="true" fill="currentColor" strokeWidth={0} className="size-[18px] flex-none" />
              <span>
                {mediaVisible(valoracion.media)} · {totalResenas(valoracion.total)}
              </span>
            </p>
          )}
          <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2.5">
            <BotonLlamada telefono={contacto.telefono} className={buttonVariants({ variant: "llamadaFoto" })}>
              <Phone aria-hidden="true" strokeWidth={2} strokeLinejoin="round" className="size-[22px] flex-none" />
              <span className="text-lg font-semibold">{textos.llamar}</span>
              <span className="text-[23px] font-bold tracking-[0.01em] whitespace-nowrap">
                {telefonoVisible(contacto.telefono)}
              </span>
            </BotonLlamada>
            {contacto.whatsapp && (
              <BotonWhatsApp
                numero={contacto.whatsapp}
                mensaje={mensajeGeneral(contacto)}
                className={buttonVariants({ variant: "whatsappFotoHero" })}
              >
                <MessageCircle aria-hidden="true" strokeWidth={1.75} strokeLinejoin="round" className="size-5 flex-none" />
                <span>{textos.fotoAveria}</span>
              </BotonWhatsApp>
            )}
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className={`corte absolute inset-x-0 -bottom-px z-[1] ${FONDO_SIGUIENTE[siguiente]}`}
      />
    </section>
  );
}
