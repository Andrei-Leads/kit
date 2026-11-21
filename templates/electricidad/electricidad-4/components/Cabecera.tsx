import Image from "next/image";
import Link from "next/link";
import { telefonoVisible } from "@andrei-leads/core";

import { MenuPopover } from "@/components/base/MenuPopover";
import { WhatsAppEtiqueta } from "@/components/Botones";
import { BotonLlamadaCabecera } from "@/components/BotonLlamadaCabecera";
import { mensajeCuadro } from "@/lib/mensajes";
import { paginasMenu, type IdPagina } from "@/lib/navegacion";
import config from "@/site.config";

/**
 * Cabecera de barra clásica (encargo §4): marca + nombre, menú en escritorio (≥ 1024), pulsador
 * compacto siempre («Llamar» en móvil, «Llamar · teléfono» desde 768) y WhatsApp desde 1024.
 * Por debajo de 1024, «Menú» abre el panel que baja de la cabecera. La página actual se marca en
 * el servidor (cada página pinta su cabecera con `actual`).
 */
export function Cabecera({ actual }: { actual?: IdPagina }) {
  const { negocio, contacto } = config;
  const paginas = paginasMenu(config).map((p) => ({ ...p, actual: p.id === actual }));
  // Nombre largo (> 22 caracteres): en móvil ocupa su propia fila y los botones bajan a la
  // segunda, para que el nombre quepa en 2 líneas sin cortarse ni romper la cabecera a 375 px.
  // Entre 1024 y 1280 tampoco cabe junto al menú: el menú de escritorio espera a 1280.
  const largo = negocio.nombre.length > 22;
  return (
    <header className="sticky top-0 z-20 border-b border-carril bg-superficie">
      <div className={`contenedor flex min-h-16 items-center gap-3 py-2.5 ${largo ? "flex-wrap md:flex-nowrap" : ""}`}>
        <Link href="/" className={`mr-auto flex min-w-0 items-center gap-2.5 no-underline ${largo ? "basis-full md:basis-auto md:max-w-[320px]" : "max-w-[240px]"}`}>
          {negocio.logo ? (
            <Image src={negocio.logo.src} alt="" width={32} height={32} className="size-8 flex-none object-contain" />
          ) : (
            <span aria-hidden="true" className="flex h-[30px] w-[22px] flex-none justify-center border-2 border-texto pt-1">
              <span className="h-2.5 w-2 bg-primario" />
            </span>
          )}
          <span className="text-lg leading-[1.15] font-semibold text-balance">{negocio.nombre}</span>
        </Link>
        <nav aria-label="Principal" className={`mr-3 hidden gap-0.5 ${largo ? "xl:flex" : "lg:flex"}`}>
          {paginas.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              aria-current={p.actual ? "page" : undefined}
              className="border-b-2 border-transparent px-3 pt-2.5 pb-2 font-medium no-underline hover:border-borde aria-[current=page]:border-b-[3px] aria-[current=page]:border-texto aria-[current=page]:font-semibold"
            >
              {p.texto}
            </Link>
          ))}
        </nav>
        <BotonLlamadaCabecera className={largo ? "ml-auto md:ml-0" : undefined} telefono={contacto.telefono} visible={telefonoVisible(contacto.telefono)} />
        <WhatsAppEtiqueta numero={contacto.whatsapp} mensaje={mensajeCuadro(contacto)} texto="WhatsApp" compacto className="hidden lg:inline-flex" />
        <MenuPopover enlaces={paginas} claseBoton={largo ? "xl:hidden" : "lg:hidden"} className={largo ? "menu-panel-largo xl:hidden" : "lg:hidden"} />
      </div>
    </header>
  );
}
