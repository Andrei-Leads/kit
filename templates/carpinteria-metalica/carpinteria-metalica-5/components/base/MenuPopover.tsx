import Link from "next/link";
import type { CSSProperties } from "react";
import { BotonLlamada, BotonWhatsApp, telefonoVisible, type Ancla, type LineaHorario } from "@andrei-leads/core";

import { dosCifras } from "@/lib/textos";
import { TEXTO_WA } from "@/lib/mensajes";

type Props = {
  enlaces: readonly Ancla[];
  nombre: string;
  telefono: string;
  whatsapp?: string;
  mensaje: string;
  horario: readonly LineaHorario[];
  /** `id` del panel; el botón que lo abre lleva `popoverTarget={id}`. Único por página. */
  id?: string;
};

const ETIQUETA = "text-xs font-medium tracking-[0.12em] text-texto-suave uppercase";

/**
 * Pieza base del registro (kit/registry/base/MenuPopover.tsx), reestilada a pantalla completa
 * (encargo §6.1): panel negro con los enlaces numerados en serif de 44 px (hasta 80 px)
 * separados por filetes anodizados y, abajo, teléfono, WhatsApp y horario. API `popover`
 * nativa: abre y cierra sin JavaScript, con Esc o con «Cerrar», y el navegador gestiona el foco.
 */
export function MenuPopover({ enlaces, nombre, telefono, whatsapp, mensaje, horario, id = "menu" }: Props) {
  return (
    <>
      <button type="button" popoverTarget={id} className="boton-filete min-w-16">
        Menú
      </button>
      <div id={id} popover="auto" aria-label="Menú" className="menu-pantalla">
        <div className="flex h-16 flex-none items-center justify-between gap-4 border-b border-borde">
          <span className="text-sm font-semibold tracking-[0.14em] uppercase">{nombre}</span>
          <button type="button" popoverTarget={id} popoverTargetAction="hide" className="boton-filete -mr-3">
            Cerrar
          </button>
        </div>
        <nav aria-label="Principal" className="flex max-w-[880px] flex-1 flex-col justify-center py-10">
          <ol className="m-0 list-none p-0">
            {enlaces.map((e, i) => (
              <li key={e.href} className="menu-enlace" style={{ "--i": i } as CSSProperties}>
                <Link
                  href={e.href}
                  className="flex items-baseline gap-[clamp(16px,3vw,32px)] border-b border-anodizado py-[18px] font-titulo text-[clamp(44px,2rem+3vw,80px)] leading-none font-[350] tracking-[-0.02em] text-texto no-underline hover:italic"
                >
                  <span aria-hidden="true" className="min-w-[2.4ch] text-lg tracking-normal text-anodizado italic">
                    {dosCifras(i + 1)}
                  </span>
                  {e.texto}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <div className="grid flex-none grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 border-t border-borde pt-6 text-[15px]">
          <div className="flex flex-col gap-1">
            <span className={ETIQUETA}>Teléfono</span>
            <BotonLlamada telefono={telefono} className="inline-flex min-h-11 items-center font-titulo text-[28px] leading-tight no-underline">
              {telefonoVisible(telefono)}
            </BotonLlamada>
          </div>
          {whatsapp && (
            <div className="flex flex-col gap-1">
              <span className={ETIQUETA}>WhatsApp</span>
              <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className="enlace text-base">
                {TEXTO_WA}
              </BotonWhatsApp>
            </div>
          )}
          {horario.length > 0 && (
            <div className="flex flex-col gap-1">
              <span className={ETIQUETA}>Horario</span>
              {horario.map((h) => (
                <span key={h.dias}>
                  {h.dias} · {h.horas}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
