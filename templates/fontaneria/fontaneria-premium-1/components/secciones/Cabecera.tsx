import Link from "next/link";
import { BotonLlamada, BotonWhatsApp, telefonoVisible, type Ancla, type Imagen } from "@andrei-leads/core";

import { CabeceraScroll } from "@/components/CabeceraScroll";
import { ALTURA, Pareja, llamarBlanco, waRelleno } from "@/components/Botones";
import { IconoWhatsapp } from "@/components/Iconos";
import { MenuPopover } from "@/components/base/MenuPopover";
import type { DatosCta } from "@/lib/textos";
import { cn } from "@/lib/utils";

import { Nombre } from "./Nombre";

const ID_MENU = "menu";

type Props = {
  nombre: string;
  logo?: Imagen;
  cta: DatosCta;
  enlaces: Ancla[];
  enlacesMenu: Ancla[];
};

/**
 * Cabecera inteligente de «Caudal» (encargo §5.2), fija. 60 px en móvil (nombre,
 * «Llamar» y menú) y 72 px en escritorio (nombre, páginas, Llamar con el número y
 * WhatsApp). Colores por variables (--cab-*), que cambian con `data-sobre`.
 * En móvil no se esconde nunca; la barra móvil lleva los dos botones.
 */
export function Cabecera({ nombre, logo, cta, enlaces, enlacesMenu }: Props) {
  const { telefono, whatsapp, mensaje } = cta;
  const contorno = cn(llamarBlanco, "border-current text-[var(--cab-texto)] hover:bg-[var(--cab-texto)] hover:text-[var(--cab-inverso)]");
  return (
    <header className="cabecera fixed inset-x-0 top-0 z-50 isolate h-[var(--alto-cabecera)]">
      <div className="mx-auto flex h-full max-w-[calc(1120px+2*var(--margen)+80px)] items-center justify-between gap-3 pr-2 pl-4 lg:px-10">
        <Nombre nombre={nombre} logo={logo} />
        <nav aria-label="Principal" className="nav-principal max-lg:hidden">
          <ul className="m-0 flex list-none gap-9 p-0">
            {enlaces.map((e) => (
              <li key={e.href}>
                <Link href={e.href} data-ruta={e.href} className="inline-flex min-h-11 items-center text-[15px] no-underline">
                  {e.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-none items-center gap-1 lg:gap-2.5">
          <BotonLlamada telefono={telefono} className={cn(contorno, "h-11 px-[18px] text-[15px]")}>
            <span className="lg:hidden">Llamar</span>
            <span className="max-lg:hidden">Llamar al {telefonoVisible(telefono)}</span>
          </BotonLlamada>
          {whatsapp && (
            <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(waRelleno, "h-11 px-5 text-[15px] max-lg:hidden")}>
              <IconoWhatsapp />
              WhatsApp
            </BotonWhatsApp>
          )}
          <MenuPopover
            id={ID_MENU}
            enlaces={enlacesMenu}
            marca={<Nombre nombre={nombre} logo={logo} className="text-white [--cab-suave:var(--color-sobre-tinta-suave)]" />}
            pie={<Pareja cta={cta} tamano="hero" tono="oscuro" />}
          />
        </div>
      </div>
      <CabeceraScroll idMenu={ID_MENU} />
    </header>
  );
}

/**
 * Pareja flotante (escritorio, encargo §3): Llamar | WhatsApp de 48 px en una
 * cápsula tinta al 94 % abajo a la derecha, solo cuando la cabecera se esconde
 * (`data-scroll="abajo"`). Sin JS no existe: la cabecera nunca se esconde.
 */
export function ParejaFlotante({ cta }: { cta: DatosCta }) {
  const { telefono, whatsapp, mensaje } = cta;
  return (
    <div className="pareja-flotante sobre-tinta fixed right-6 bottom-6 z-40 gap-2 rounded-boton bg-tinta/94 p-1.5 backdrop-blur-[12px]">
      <BotonLlamada telefono={telefono} className={cn(llamarBlanco, ALTURA.cierre)}>
        Llamar
        <span className="sr-only"> al {telefonoVisible(telefono)}</span>
      </BotonLlamada>
      {whatsapp && (
        <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(waRelleno, ALTURA.cierre)}>
          <IconoWhatsapp />
          WhatsApp
        </BotonWhatsApp>
      )}
    </div>
  );
}
