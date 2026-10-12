import Image from "next/image";
import { BotonLlamada, BotonWhatsApp, type SiteConfig } from "@andrei-leads/core";

import { buttonVariants } from "@/components/ui/button";
import { contenedor } from "@/components/TituloSeccion";
import {
  esNombreLargo,
  horarioCorto,
  resumenResenas,
  resumenZonas,
  telefonoVisible,
  type FotoHero,
} from "@/lib/formato";
import { cn } from "@/lib/utils";

type Props = {
  negocio: Pick<SiteConfig["negocio"], "nombre" | "sector" | "descripcionCorta">;
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp" | "horario">;
  zonas: string[];
  resenas: SiteConfig["resenas"];
  /** Si hay foto, variante foto; si no, hero «rótulo» tipográfico. */
  foto: FotoHero | null;
};

const rejilla = "grid items-end gap-[clamp(20px,4vw,64px)] lg:grid-cols-2";

function Sector({ texto, claro }: { texto: string; claro?: boolean }) {
  return (
    <p className="m-0 flex items-center gap-2.5 text-[13px] font-bold tracking-[0.08em] uppercase">
      <span aria-hidden="true" className={cn("size-3 flex-none", claro ? "bg-white" : "bg-primario")} />
      <span>{texto}</span>
    </p>
  );
}

export function Hero({ negocio, contacto, zonas, resenas, foto }: Props) {
  const largo = esNombreLargo(negocio.nombre);
  const tel = telefonoVisible(contacto.telefono);
  const horario = horarioCorto(contacto.horario);
  const hayZonas = zonas.length > 0;

  if (foto) {
    return (
      <section
        id="inicio"
        className="foco-claro relative overflow-hidden bg-[#2a2d27] text-white"
      >
        <Image
          src={foto.src}
          alt={foto.alt}
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,rgb(12_14_10/0.92)_0%,rgb(12_14_10/0.72)_45%,rgb(12_14_10/0.38)_100%)]"
        />
        <div
          className={cn(
            contenedor,
            rejilla,
            "relative pt-[clamp(56px,10vw,160px)] pb-[clamp(28px,5vw,80px)]"
          )}
        >
          <div className="flex min-w-0 flex-col gap-[clamp(12px,1.6vw,24px)]">
            <Sector texto={negocio.sector} claro />
            <h1
              className={cn(
                "m-0 font-extrabold text-balance wrap-anywhere uppercase font-stretch-66%",
                largo
                  ? "text-[clamp(42px,6.4vw,92px)] leading-[0.9] tracking-[-0.005em] hyphens-auto"
                  : "text-[clamp(56px,9vw,128px)] leading-[0.86] tracking-[-0.01em]"
              )}
            >
              {negocio.nombre}
            </h1>
            <p className="m-0 max-w-[34ch] text-[clamp(18px,1.7vw,23px)] leading-[1.4] text-pretty">
              {negocio.descripcionCorta}
            </p>
            {hayZonas && <p className="m-0 text-[15px] font-semibold">{resumenZonas(zonas)}</p>}
          </div>
          <div className="flex flex-col gap-3">
            <BotonLlamada
              telefono={contacto.telefono}
              className={cn(
                buttonVariants({ variant: "primario", size: "xl" }),
                "justify-between rounded-[8px] shadow-[inset_0_-4px_0_rgb(0_0_0/0.25)]"
              )}
            >
              <span className="text-[19px] font-extrabold">Llamar ahora</span>
              <span className="text-[30px] font-extrabold tracking-[0.02em] font-stretch-68%">{tel}</span>
            </BotonLlamada>
            {contacto.whatsapp && (
              <BotonWhatsApp
                numero={contacto.whatsapp}
                className={cn(buttonVariants({ variant: "contorno-claro", size: "md" }), "rounded-[8px]")}
              >
                Escribir por WhatsApp
              </BotonWhatsApp>
            )}
            <p className="m-0 text-sm font-medium">{horario}</p>
          </div>
        </div>
      </section>
    );
  }

  const opiniones = resenas.length > 0 ? resumenResenas(resenas) : null;

  // Móvil: texto → placa → resumen, para que «Llamar ahora» quede sin scroll a 375×667.
  // Escritorio (lg): texto y resumen a la izquierda, placa a la derecha (como el diseño).
  return (
    <section
      id="inicio"
      className={cn(
        contenedor,
        "grid items-end gap-x-[clamp(20px,4vw,64px)] gap-y-[clamp(12px,1.6vw,24px)] pt-[clamp(24px,5vw,80px)] pb-[clamp(32px,6vw,96px)] lg:grid-cols-2"
      )}
    >
      <div className="flex min-w-0 flex-col gap-[clamp(12px,1.6vw,24px)] lg:col-start-1 lg:row-start-1">
        <Sector texto={negocio.sector} />
        <h1
          className={cn(
            "m-0 font-extrabold text-balance wrap-anywhere uppercase font-stretch-66%",
            largo
              ? "text-[clamp(42px,6.4vw,92px)] leading-[0.9] tracking-[-0.005em] hyphens-auto"
              : "text-[clamp(64px,10vw,140px)] leading-[0.86] tracking-[-0.01em]"
          )}
        >
          {negocio.nombre}
        </h1>
        <p className="m-0 max-w-[34ch] text-[clamp(18px,1.7vw,23px)] leading-[1.4] text-pretty text-tinta-suave">
          {negocio.descripcionCorta}
        </p>
      </div>

      <div className="foco-claro mt-2 flex flex-col gap-3.5 rounded-md lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 bg-primario p-[clamp(18px,2.4vw,32px)] text-sobre-primario shadow-[inset_0_-5px_0_rgb(0_0_0/0.22)]">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <span className="text-[13px] font-bold tracking-[0.08em] uppercase">Llámanos</span>
          <span className="text-sm font-medium">{horario}</span>
        </div>
        <BotonLlamada
          telefono={contacto.telefono}
          className="self-start text-[clamp(46px,5.4vw,76px)] leading-[0.95] font-extrabold tracking-[0.01em] text-sobre-primario no-underline font-stretch-68%"
        >
          {tel}
        </BotonLlamada>
        <BotonLlamada
          telefono={contacto.telefono}
          className={cn(buttonVariants({ variant: "blanco", size: "lg" }), "justify-between")}
        >
          <span>Llamar ahora</span>
          <span aria-hidden="true">→</span>
        </BotonLlamada>
        {contacto.whatsapp && (
          <BotonWhatsApp
            numero={contacto.whatsapp}
            className={buttonVariants({ variant: "contorno-claro", size: "md" })}
          >
            Escribir por WhatsApp
          </BotonWhatsApp>
        )}
      </div>

      {(opiniones || hayZonas) && (
        <div className="flex flex-wrap gap-x-[18px] text-[15px] font-semibold lg:col-start-1 lg:row-start-2">
          {opiniones && (
            <a href="#opiniones" className="flex min-h-11 items-center gap-1.5 text-tinta no-underline">
              <span aria-hidden="true">★</span>
              <span>
                {opiniones.nota} · {opiniones.total}
              </span>
            </a>
          )}
          {hayZonas && (
            <a href="#zonas" className="flex min-h-11 items-center text-tinta underline underline-offset-[3px]">
              {resumenZonas(zonas)}
            </a>
          )}
        </div>
      )}
    </section>
  );
}
