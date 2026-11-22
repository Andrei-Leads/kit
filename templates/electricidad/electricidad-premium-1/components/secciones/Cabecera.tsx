import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { BotonLlamada, BotonWhatsApp, telefonoVisible, type Ancla, type Imagen } from "@andrei-leads/core";

import { cabeceraLlamar, cabeceraWhatsapp, Pareja } from "@/components/Botones";
import { CabeceraInteligente } from "@/components/CabeceraInteligente";
import { IconoWhatsapp } from "@/components/Iconos";
import { numero, type DatosCta } from "@/lib/textos";
import { cn } from "@/lib/utils";

const ID_MENU = "menu";
/** Nombre de más de 28 caracteres: dos líneas (máx. 200 px en móvil) o solo el logo si existe. */
const NOMBRE_LARGO = 28;

type Props = {
  nombre: string;
  logo?: Imagen;
  cta: DatosCta;
  email: string;
  enlaces: readonly Ancla[];
};

function Nombre({ nombre, logo }: { nombre: string; logo?: Imagen }) {
  const largo = nombre.length > NOMBRE_LARGO;
  return (
    <span className="flex min-w-0 items-center gap-2.5">
      {logo && <Image src={logo.src} alt="" width={32} height={32} className="size-8 flex-none object-contain" />}
      <span
        className={cn(
          "font-titulo text-[clamp(17px,0.9rem+0.4vw,21px)] leading-tight font-medium tracking-[-0.01em]",
          largo ? "line-clamp-2 max-w-[200px] md:max-w-[320px]" : "whitespace-nowrap",
          largo && logo && "max-sm:sr-only",
        )}
      >
        {nombre}
      </span>
    </span>
  );
}

/**
 * Cabecera inteligente (encargo §12) y menú a pantalla completa (MenuPantalla,
 * popover nativo: abre y cierra sin JS y con Esc, el foco vuelve a «Menú»).
 * Arriba es transparente sobre el hero; al bajar se compacta (CSS). Desde
 * 1024 px se esconde al bajar y aparece la pareja flotante (ParejaFlotante).
 * En móvil nunca se esconde: su «Llamar» sigue a la vista junto a la barra.
 */
export function Cabecera({ nombre, logo, cta, email, enlaces }: Props) {
  const { telefono, whatsapp, mensaje } = cta;
  return (
    <header className="cabecera">
      <div aria-hidden="true" className="cabecera-fondo" />
      <div className="cabecera-fila contenedor flex h-full items-center justify-between gap-3">
        <Link href="/" className="inline-flex min-h-11 min-w-0 items-center no-underline">
          <Nombre nombre={nombre} logo={logo} />
        </Link>
        <div className="flex flex-none items-center gap-2">
          <button
            type="button"
            popoverTarget={ID_MENU}
            className="min-h-11 px-3 text-sm font-medium tracking-[0.02em] underline decoration-1 underline-offset-[6px]"
          >
            Menú
          </button>
          <BotonLlamada telefono={telefono} className={cabeceraLlamar}>
            <span className="lg:hidden">Llamar</span>
            <span className="hidden lg:inline">Llamar al {telefonoVisible(telefono)}</span>
          </BotonLlamada>
          {whatsapp && (
            <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(cabeceraWhatsapp, "hidden lg:inline-flex")}>
              <IconoWhatsapp className="size-[18px]" />
              WhatsApp
            </BotonWhatsApp>
          )}
        </div>
      </div>

      <div id={ID_MENU} popover="auto" className="menu-pantalla">
        <CabeceraInteligente idMenu={ID_MENU} />
        <div className="contenedor flex min-h-[var(--alto-cabecera)] flex-row-reverse items-center justify-between gap-3">
          {/* «Cerrar» es lo primero enfocable del panel (un popover no atrapa el foco). */}
          <button
            type="button"
            popoverTarget={ID_MENU}
            popoverTargetAction="hide"
            className="min-h-11 flex-none rounded-boton border border-[var(--color-linea)] px-5 text-sm font-medium"
          >
            Cerrar
          </button>
          <span className="min-w-0">
            <Nombre nombre={nombre} logo={logo} />
          </span>
        </div>
        <nav aria-label="Principal" className="contenedor flex flex-1 flex-col justify-center py-10">
          <ul className="m-0 flex list-none flex-col p-0">
            {enlaces.map((e, i) => (
              <li key={e.href} className="border-b border-[var(--color-linea)]">
                <Link
                  href={e.href}
                  data-ruta={e.href}
                  style={{ "--i": i } as CSSProperties}
                  className="menu-enlace flex min-h-14 items-baseline gap-4 py-3 font-titulo text-[clamp(2.25rem,1.2rem+4.4vw,4rem)] leading-none font-normal tracking-[-0.02em] no-underline hover:text-acento"
                >
                  <span className="etiqueta text-acento">{numero(i)}</span>
                  {e.texto}
                  <span className="marca-actual etiqueta self-center text-texto-suave">
                    <span aria-hidden="true">·</span> estás aquí
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="contenedor flex flex-col gap-5 pb-[calc(32px+env(safe-area-inset-bottom))]">
          <Pareja cta={cta} />
          <a href={`mailto:${email}`} className="self-start text-texto-suave underline">
            {email}
          </a>
        </div>
      </div>
    </header>
  );
}
