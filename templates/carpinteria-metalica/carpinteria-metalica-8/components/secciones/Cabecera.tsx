import Image from "next/image";
import Link from "next/link";
import { BotonLlamada, BotonWhatsApp, telefonoVisible, type Ancla, type Imagen } from "@andrei-leads/core";

import { MenuPopover } from "@/components/base/MenuPopover";
import { IconoTelefono, IconoWhatsApp } from "@/components/Iconos";
import { cn } from "@/lib/utils";

type Props = {
  nombre: string;
  logo?: Imagen;
  telefono: string;
  whatsapp?: string;
  mensaje: string;
  enlaces: readonly Ancla[];
};

/**
 * Cabecera (encargo §5 y §6): sticky, transparente sobre el hero y sólida a los 120 px de scroll
 * (solo CSS, `.cabecera::before` en globals.css; sólida sin soporte o con «reducir movimiento»).
 * Móvil (60 px): nombre, «Llamar» y «Menú» (hoja inferior). Desde 1024 px (76 px): enlaces,
 * WhatsApp con icono y «Llamar · {teléfono}».
 * Nombre de más de 22 caracteres: 15 px en 2 líneas; de más de 36, 13 px y «Menú» solo con icono.
 */
export function Cabecera({ nombre, logo, telefono, whatsapp, mensaje, enlaces }: Props) {
  const largo = nombre.length > 22;
  const muyLargo = nombre.length > 36;
  return (
    <header className="cabecera sticky top-0 z-30 isolate flex h-[60px] items-center gap-2 px-[clamp(16px,4vw,40px)] lg:h-[76px] lg:gap-4">
      <Link href="/" className="flex min-h-11 min-w-0 items-center gap-2 text-texto no-underline">
        {logo && <Image src={logo.src} alt="" width={32} height={32} className="size-8 flex-none object-contain" />}
        <span
          className={cn(
            "font-titulo font-semibold tracking-[-0.005em] [overflow-wrap:anywhere] lg:max-w-[260px] lg:text-xl",
            muyLargo ? "text-[13px]" : largo ? "text-[15px]" : "text-xl",
            "leading-[1.1] lg:leading-[1.1]",
          )}
        >
          {nombre}
        </span>
      </Link>

      <nav aria-label="Principal" className="ms-auto hidden gap-7 text-base font-medium lg:flex">
        {enlaces.map((e) => (
          <Link key={e.href} href={e.href} className="border-b-2 border-transparent py-1.5 no-underline hover:border-texto">
            {e.texto}
          </Link>
        ))}
      </nav>

      <div className="ms-auto flex flex-none items-center gap-2 lg:ms-6 lg:gap-2.5">
        {whatsapp && (
          <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className="boton boton-cabecera boton-guijarro hidden lg:inline-flex">
            <IconoWhatsApp tamano={18} />
            WhatsApp
          </BotonWhatsApp>
        )}
        <BotonLlamada telefono={telefono} className="boton boton-cabecera boton-tierra">
          <IconoTelefono tamano={16} />
          <span className="lg:hidden">
            Llamar<span className="sr-only"> al {telefonoVisible(telefono)}</span>
          </span>
          <span className="hidden lg:inline">Llamar ·&nbsp;{telefonoVisible(telefono)}</span>
        </BotonLlamada>
        <MenuPopover
          enlaces={enlaces}
          claseBoton="lg:hidden"
          texto={
            muyLargo ? (
              <>
                <span aria-hidden="true" className="text-lg leading-none">☰</span>
                <span className="sr-only">Menú</span>
              </>
            ) : (
              "Menú"
            )
          }
        />
      </div>
    </header>
  );
}
