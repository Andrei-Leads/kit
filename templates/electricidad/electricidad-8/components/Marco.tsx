import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { BotonLlamada, BotonWhatsApp, telefonoVisible, type SiteConfig } from "@andrei-leads/core";

import { MenuPopover } from "@/components/base/MenuPopover";
import { IconoBocadillo, IconoTelefono, Rombo } from "@/components/Iconos";
import { franja, paginasMenu, textoLlamar, type IdPagina } from "@/lib/formato";
import { mensajeEdificio } from "@/lib/mensajes";
import { cn } from "@/lib/utils";
import config from "@/site.config";

/**
 * Doble barra (encargo §5): franja superior noche de 36 px (no fija) + barra de menú de papel de
 * 64 px, fija con `position: sticky`. Cada página pinta su Marco para marcar en el servidor la
 * página actual (sin JavaScript). Componente de servidor.
 */
export function Marco({ actual, children }: { actual?: IdPagina; children: ReactNode }) {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only z-50 bg-superficie px-4 py-3 font-semibold focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Saltar al contenido
      </a>
      <Franja config={config} />
      <Cabecera config={config} actual={actual} />
      <main id="contenido" tabIndex={-1} className="focus:outline-none">
        {children}
      </main>
    </>
  );
}

function Franja({ config }: { config: Pick<SiteConfig, "acreditaciones" | "garantias" | "contacto"> }) {
  const { escritorio, movil } = franja(config);
  return (
    <aside aria-label="Habilitación y teléfono" className="bg-noche text-[0.8125rem] leading-tight text-noche-texto">
      <div className="contenedor flex h-9 items-center gap-5">
        {/* Móvil: una sola cosa (acreditación con número o la primera fila del horario). */}
        <p className="flex min-w-0 flex-1 items-center gap-2.5 lg:hidden">
          <span className="truncate">{movil.texto}</span>
          {movil.numero && <span className="shrink-0 whitespace-nowrap text-noche-suave">{movil.numero}</span>}
        </p>
        <ul className="hidden min-w-0 flex-1 items-center gap-2.5 lg:flex">
          {escritorio.map((item, i) => (
            <li key={item.texto} className={cn("flex items-center gap-2.5", i > 0 ? "min-w-0 text-noche-suave" : "min-w-0")}>
              {i > 0 && <Rombo className="mx-1.5" />}
              <span className="truncate">{item.texto}</span>
              {item.numero && <span className="shrink-0 whitespace-nowrap text-noche-suave">{item.numero}</span>}
            </li>
          ))}
        </ul>
        {/* llamada-franja: enlace de texto con icono; zona táctil de 44 px con ::after. */}
        <BotonLlamada
          telefono={config.contacto.telefono}
          className="relative hidden shrink-0 items-center gap-2 font-semibold tracking-[0.02em] text-noche-texto after:absolute after:-inset-y-3 after:inset-x-0 hover:underline focus-visible:outline-2 focus-visible:outline-foco lg:inline-flex [--color-foco:#fff]"
        >
          <IconoTelefono className="size-3.5" />
          {telefonoVisible(config.contacto.telefono)}
        </BotonLlamada>
      </div>
    </aside>
  );
}

function Cabecera({ config, actual }: { config: SiteConfig; actual?: IdPagina }) {
  const { negocio, contacto } = config;
  const paginas = paginasMenu(config);
  // Nombre largo: el número sale de la barra (ya está en la franja) para dejarle sitio al nombre.
  const largo = negocio.nombre.length > 26;
  return (
    <header className="sticky top-0 z-30 border-b border-linea-plano bg-fondo">
      <div className="contenedor flex min-h-16 items-center gap-2 py-2 sm:gap-3 lg:gap-5">
        <Link
          href="/"
          className="mr-auto flex min-h-11 min-w-0 flex-1 items-center gap-2 focus-visible:outline-2 focus-visible:outline-foco sm:max-w-sm xl:mr-0 xl:max-w-[22rem] xl:flex-none"
        >
          {negocio.logo && <Image src={negocio.logo.src} alt="" width={32} height={32} className="size-8 shrink-0 object-contain" />}
          <span
            className={cn(
              "font-titulo leading-[1.15] text-balance",
              largo ? "text-[0.875rem] sm:text-[clamp(0.9375rem,0.8rem+0.7vw,1.25rem)]" : "text-[1.25rem] xl:whitespace-nowrap",
            )}
          >{negocio.nombre}</span>
        </Link>

        <nav aria-label="Principal" className="ml-auto hidden xl:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            {paginas.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  aria-current={p.id === actual ? "page" : undefined}
                  className="inline-flex min-h-11 items-center px-1.5 font-titulo text-[1.0625rem] decoration-1 underline-offset-[10px] hover:underline focus-visible:outline-2 focus-visible:outline-foco aria-[current=page]:underline"
                >
                  {p.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* llamada-menu: rectángulo con borde de 1 px, 44 px. En escritorio ancho, con el número. */}
        <BotonLlamada
          telefono={contacto.telefono}
          className="inline-flex min-h-11 shrink-0 items-center gap-2 border border-texto px-2.5 text-[0.9375rem] font-semibold whitespace-nowrap text-texto hover:bg-noche hover:text-noche-texto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foco active:bg-acento active:text-noche-texto lg:px-4"
        >
          <IconoTelefono className={cn("size-4", largo && "hidden sm:block")} />
          <span className="lg:hidden">Llamar</span>
          <span className="hidden lg:inline">{textoLlamar(contacto)}</span>
          <span className={cn("hidden", !largo && "xl:inline")}>· {telefonoVisible(contacto.telefono)}</span>
        </BotonLlamada>

        {contacto.whatsapp && (
          <BotonWhatsApp
            numero={contacto.whatsapp}
            mensaje={mensajeEdificio(contacto)}
            className="hidden min-h-11 shrink-0 items-center gap-2 font-semibold text-texto focus-visible:outline-2 focus-visible:outline-foco lg:inline-flex"
          >
            <IconoBocadillo />
            <span className="underline decoration-acento decoration-1 underline-offset-[5px] hover:decoration-2">WhatsApp</span>
          </BotonWhatsApp>
        )}

        <MenuPopover
          enlaces={paginas.map((p) => ({ href: p.href, texto: p.texto, actual: p.id === actual }))}
          claseBoton="xl:hidden"
        />
      </div>
    </header>
  );
}
