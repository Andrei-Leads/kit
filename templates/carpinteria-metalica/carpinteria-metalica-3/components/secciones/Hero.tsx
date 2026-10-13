import type { SiteConfig } from "@andrei-leads/core";
import { BotonLlamada, BotonWhatsApp } from "@andrei-leads/core";
import { Clock, MessageCircle, Truck } from "lucide-react";

import { ContenidoLlamada } from "@/components/ContenidoLlamada";
import { buttonVariants } from "@/components/ui/button";
import { horarioCorto, mediaVisible } from "@/lib/formato";

type Props = {
  sector: string;
  descripcionCorta: string;
  ciudad: string;
  urgencias24h: boolean;
  tiempoLlegada?: string;
  horario: SiteConfig["contacto"]["horario"];
  telefono: string;
  whatsapp?: string;
  mensajeWhatsapp: string;
  valoracion?: SiteConfig["valoracion"];
  /** Si hay reseñas, el chip de valoración enlaza a #resenas; si no, es un <span>. */
  hayResenas: boolean;
};

const LIMITE_H1 = 44;

const chip =
  "inline-flex min-h-[30px] items-center gap-1.5 rounded-md bg-tinta px-[9px] text-[13px] font-semibold text-white md:min-h-9 md:px-3 md:text-[15px]";

/** Hero tipográfico: sin foto por diseño. Un solo DOM; en md+ las acciones pasan a la tarjeta de chapa. */
export function Hero({
  sector,
  descripcionCorta,
  ciudad,
  urgencias24h,
  tiempoLlegada,
  horario,
  telefono,
  whatsapp,
  mensajeWhatsapp,
  valoracion,
  hayResenas,
}: Props) {
  const titulo = `${sector} en ${ciudad}`;
  const largo = titulo.length > LIMITE_H1;
  const hayChips = urgencias24h || Boolean(tiempoLlegada) || Boolean(valoracion);
  const linea = horarioCorto(horario);

  return (
    <section className="flex min-h-[calc(100svh-64px-72px)] flex-col py-6 md:min-h-[calc(100svh-64px)] md:justify-center md:py-14">
      <div className="contenedor flex w-full flex-1 flex-col gap-3 md:grid md:flex-none md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-center md:gap-16">
        <div className="flex flex-col gap-3 md:gap-5">
          <h1
            className={
              "m-0 font-extrabold tracking-[-0.01em] text-balance md:tracking-[-0.015em] " +
              (largo
                ? "text-[28px] leading-[1.1] md:text-[54px] md:leading-[1.04]"
                : "text-[34px] leading-[1.05] md:text-[66px] md:leading-none")
            }
          >
            {titulo}
          </h1>
          <p className="m-0 max-w-[46ch] text-base text-pretty text-tinta-suave md:text-xl">{descripcionCorta}</p>
          {hayChips ? (
            <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0 md:gap-2">
              {urgencias24h && (
                <li className="flex">
                  <span className={chip}>
                    <Clock aria-hidden="true" className="size-4" />
                    <span>Abrimos hoy · 24 h</span>
                  </span>
                </li>
              )}
              {tiempoLlegada && (
                <li className="flex">
                  <span className={chip}>
                    <Truck aria-hidden="true" className="size-4" />
                    <span>Llegamos en {tiempoLlegada}</span>
                  </span>
                </li>
              )}
              {valoracion && (
                <li className="flex">
                  {hayResenas ? (
                    <a href="#resenas" className="-my-[7px] inline-flex min-h-11 items-center text-white no-underline md:-my-1">
                      <span className={chip}>
                        ★ {mediaVisible(valoracion.media)} · {valoracion.total} reseñas
                      </span>
                    </a>
                  ) : (
                    <span className={chip}>
                      ★ {mediaVisible(valoracion.media)} · {valoracion.total} reseñas
                    </span>
                  )}
                </li>
              )}
            </ul>
          ) : (
            <p className="m-0 flex items-start gap-2 text-[14px] text-tinta-suave md:hidden">
              <Clock aria-hidden="true" className="mt-0.5 size-4 flex-none text-acero" />
              <span>{linea}</span>
            </p>
          )}
        </div>

        <div className="mt-auto flex flex-col gap-2.5 pt-2 md:mt-0 md:gap-3 md:rounded-md md:border-2 md:border-tinta md:bg-tarjeta md:p-6 md:pt-6 md:shadow-placa-lg">
          <BotonLlamada telefono={telefono} className={buttonVariants({ variant: "llamadaHero" })}>
            <ContenidoLlamada telefono={telefono} tamanoNumero="31" />
          </BotonLlamada>
          {whatsapp && (
            <BotonWhatsApp
              numero={whatsapp}
              mensaje={mensajeWhatsapp}
              className={buttonVariants({ variant: "whatsappHero" })}
            >
              <MessageCircle aria-hidden="true" className="size-5" />
              <span>Envíanos una foto del daño</span>
            </BotonWhatsApp>
          )}
          {hayChips && (
            <p className="m-0 flex items-start gap-2 pt-1 text-[14px] text-tinta-suave md:hidden">
              <Clock aria-hidden="true" className="mt-0.5 size-4 flex-none text-acero" />
              <span>{linea}</span>
            </p>
          )}
          <ul className="m-0 hidden list-none flex-col gap-1 border-t border-linea p-0 pt-2 text-[15px] md:flex">
            {horario.map((h) => (
              <li key={h.dias} className="flex justify-between gap-3">
                <span className="text-tinta-suave">{h.dias}</span>
                <span className="text-right font-semibold">{h.horas}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
