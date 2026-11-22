import Image from "next/image";
import Link from "next/link";
import { BotonLlamada, telefonoVisible, type Ancla, type Imagen } from "@andrei-leads/core";

import { IconoTelefono } from "@/components/Iconos";
import { MenuPopover } from "@/components/base/MenuPopover";
import { cn } from "@/lib/utils";

type Props = {
  nombre: string;
  logo?: Imagen;
  telefono: string;
  enlaces: readonly Ancla[];
};

const COMPACTO = "boton inline-flex min-h-11 items-center justify-center gap-2.5 rounded-boton border px-3.5 text-sm leading-none font-semibold";

/**
 * Barra clásica (encargo §5 y tablero Cabecera): nombre en serif de 20 px (hasta 2 líneas con
 * `text-wrap: balance`), enlaces en escritorio con la página actual subrayada (sin JS:
 * `data-pagina`, globals.css), «Llamar» compacto y, en móvil, «Menú» con la hoja desde arriba.
 * Por debajo de 360 px, «Llamar» se queda en icono con el texto oculto accesible.
 */
export function Cabecera({ nombre, logo, telefono, enlaces }: Props) {
  // Nombre largo: en móvil baja a 15 px y hasta 3 líneas, y «Llamar» se queda en icono, para que no pise los botones.
  const largo = nombre.length > 28;
  return (
    <header className="border-b border-filete bg-fondo">
      <div className="contenedor flex min-h-14 items-center justify-between gap-3 py-3">
        <Link href="/" className="flex min-h-11 min-w-0 flex-1 items-center gap-2.5 no-underline lg:flex-initial">
          {logo && <Image src={logo.src} alt="" width={32} height={32} className="h-8 w-auto max-w-16 flex-none object-contain" />}
          <span className={cn("font-titulo text-xl leading-[1.1] font-medium text-balance", largo ? "max-lg:line-clamp-3 max-lg:text-[15px]" : "line-clamp-2")}>{nombre}</span>
        </Link>
        <nav aria-label="Principal" className="nav-principal hidden items-center gap-8 lg:flex">
          {enlaces.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              data-ruta={e.href}
              className="border-b border-transparent py-2 text-[15px] font-medium no-underline hover:border-texto"
            >
              {e.texto}
            </Link>
          ))}
        </nav>
        <div className="flex flex-none items-center gap-2">
          <BotonLlamada telefono={telefono} className={cn(COMPACTO, "border-primario bg-primario text-sobre-primario hover:bg-primario-hover", largo ? "max-sm:px-3" : "max-[359px]:px-3")}>
            <IconoTelefono />
            <span className={largo ? "max-sm:sr-only" : "max-[359px]:sr-only"}>
              Llamar<span className="sr-only"> al {telefonoVisible(telefono)}</span>
            </span>
          </BotonLlamada>
          <div className="lg:hidden">
            <MenuPopover enlaces={enlaces} nombre={nombre} claseBoton={cn(COMPACTO, "border-primario bg-transparent text-primario-texto")} />
          </div>
        </div>
      </div>
    </header>
  );
}
