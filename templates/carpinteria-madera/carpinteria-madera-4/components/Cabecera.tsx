import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { BotonLlamada, BotonWhatsApp, telefonoVisible, type Ancla, type Imagen } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { CerrarMenu } from "@/components/CerrarMenu";
import { IconoWhatsapp } from "@/components/Iconos";
import { numeroPieza } from "@/lib/piezas";
import { cn } from "@/lib/utils";

const ID_MENU = "menu";
/** A partir de aquí el nombre baja de tamaño para caber en 2 líneas sin cortarse (nombre de 54 a 375 px). */
const NOMBRE_LARGO = 22;

type Props = {
  nombre: string;
  logo?: Imagen;
  telefono: string;
  whatsapp?: string;
  mensaje: string;
  enlaces: readonly Ancla[];
};

const BOTON_CAB = "boton min-h-12 px-3.5 text-[1.0625rem] lg:px-4";

function Nombre({ nombre, logo }: { nombre: string; logo?: Imagen }) {
  const largo = nombre.length > NOMBRE_LARGO;
  return (
    <span className="flex min-w-0 items-center gap-2.5">
      {logo && <Image src={logo.src} alt="" width={32} height={32} className="size-8 flex-none object-contain" />}
      <span
        className={cn(
          "ft min-w-0 leading-none tracking-[0.02em] text-balance",
          largo ? "text-[15px] leading-[1.05] lg:text-xl" : "text-lg lg:text-2xl",
        )}
      >
        {nombre}
      </span>
    </span>
  );
}

/**
 * Cabecera de todas las páginas (entrega §11): 56 px en móvil y 72 px en escritorio, línea negra de
 * 2 px debajo, fija arriba. Nombre en condensada mayúscula a la izquierda (nunca cortado). Móvil:
 * «Llamar» (contorno) y «Menú» (negro); la barra lleva los dos CTA. Escritorio: WhatsApp (negro con
 * icono), «Llamar · 633 917 204» (contorno) y «Menú» subrayado.
 *
 * Menú a pantalla completa (`MenuPantalla`, encargo §7): `popover` nativo blanco con los enlaces
 * numerados en condensada de 48–64 px y los dos botones al pie. Sin JS abre y cierra; Esc y
 * «Cerrar» lo cierran y el foco vuelve a «Menú».
 */
export function Cabecera({ nombre, logo, telefono, whatsapp, mensaje, enlaces }: Props) {
  return (
    <header className="sticky top-0 z-30 border-b-2 border-borde bg-fondo">
      <div className="contenedor flex min-h-14 items-center gap-1.5 py-1 lg:min-h-[72px] lg:gap-2">
        <Link href="/" className="me-auto flex min-h-11 min-w-0 flex-1 items-center text-texto no-underline">
          <Nombre nombre={nombre} logo={logo} />
        </Link>
        {whatsapp && (
          <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(BOTON_CAB, "boton-negro hidden gap-2 lg:flex")}>
            <IconoWhatsapp className="size-[18px] flex-none" />
            WhatsApp
          </BotonWhatsApp>
        )}
        <BotonLlamada telefono={telefono} className={cn(BOTON_CAB, "boton-contorno flex-none")}>
          <span>
            Llamar
            <span className="sr-only lg:not-sr-only">
              {" "}
              <span aria-hidden="true">·</span> {telefonoVisible(telefono)}
            </span>
          </span>
        </BotonLlamada>
        <button
          type="button"
          popoverTarget={ID_MENU}
          className={cn(
            "ft min-h-12 flex-none cursor-pointer border-2 border-texto bg-texto px-3 text-[1.0625rem] tracking-[0.04em] text-white",
            "lg:ms-2 lg:border-0 lg:border-b-2 lg:bg-transparent lg:px-1.5 lg:text-xl lg:text-texto",
            "[@media(hover:hover)]:hover:bg-hover-tinta lg:[@media(hover:hover)]:hover:bg-transparent lg:[@media(hover:hover)]:hover:text-texto-suave",
          )}
        >
          Menú
        </button>
        <div id={ID_MENU} popover="auto" aria-label="Menú" className="menu-pantalla">
          <CerrarMenu idMenu={ID_MENU} />
          <div className="contenedor flex min-h-14 flex-none items-center gap-2 border-b-2 border-borde py-1 lg:min-h-[72px]">
            <span className="me-auto min-w-0">
              <Nombre nombre={nombre} />
            </span>
            <button
              type="button"
              popoverTarget={ID_MENU}
              popoverTargetAction="hide"
              className="ft min-h-12 flex-none cursor-pointer border-2 border-texto bg-transparent px-3.5 text-[1.0625rem] tracking-[0.04em] text-texto [@media(hover:hover)]:hover:bg-hover-claro"
            >
              Cerrar <span aria-hidden="true">✕</span>
            </button>
          </div>
          <nav aria-label="Principal" className="contenedor flex-[1_0_auto] py-2">
            <ul className="m-0 list-none p-0">
              {enlaces.map((e, i) => (
                <li key={e.href} style={{ "--i": i } as CSSProperties} className="border-b-2 border-borde">
                  <Link
                    href={e.href}
                    data-ruta={e.href}
                    className="flex items-baseline gap-4 py-2.5 text-texto no-underline decoration-primario [@media(hover:hover)]:hover:text-texto-suave"
                  >
                    <span aria-hidden="true" className="ft numero text-xl [text-decoration-line:none]">
                      {numeroPieza(i)}
                    </span>
                    <span className="ft text-[clamp(3rem,2.4rem+1.6vw,4rem)] leading-[0.95]">{e.texto}</span>
                    <span className="actual-sr sr-only">, página actual</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="contenedor flex-none pt-4 pb-[calc(16px+env(safe-area-inset-bottom))]">
            <Pareja telefono={telefono} whatsapp={whatsapp} mensaje={mensaje} textoWhatsapp="WhatsApp" className="max-w-none [&>.boton]:flex-[1_1_260px]" />
          </div>
        </div>
      </div>
    </header>
  );
}
