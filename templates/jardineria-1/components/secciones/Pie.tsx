import Link from "next/link";
import { enlacesLegales, type SiteConfig } from "@andrei-leads/core";

import { Button } from "@/components/ui/button";
import { contenedor } from "@/components/TituloSeccion";
import { anioActual } from "@/lib/anio";
import { listaRedes } from "@/lib/formato";
import { cn } from "@/lib/utils";

type Props = {
  negocio: Pick<SiteConfig["negocio"], "nombre" | "nombreLegal" | "nif">;
  redes: SiteConfig["redes"];
};

export async function Pie({ negocio, redes }: Props) {
  const anio = await anioActual();
  const lista = listaRedes(redes);

  return (
    <footer className="foco-claro bg-tinta text-papel">
      <div
        className={cn(
          contenedor,
          "flex flex-col gap-6 pt-[clamp(36px,5vw,64px)] pb-[clamp(28px,4vw,48px)]"
        )}
      >
        <div className="flex flex-wrap items-end justify-between gap-5">
          <p className="m-0 max-w-[16ch] text-[clamp(36px,4.6vw,64px)] leading-[0.9] font-extrabold text-balance uppercase font-stretch-66%">
            {negocio.nombre}
          </p>
          {lista.length > 0 && (
            <ul className="m-0 flex list-none gap-2 p-0">
              {lista.map((red) => (
                <li key={red.href}>
                  <Button
                    asChild
                    variant="contorno-claro"
                    size="sm"
                    className="border-papel text-papel"
                  >
                    <a href={red.href} target="_blank" rel="noopener noreferrer">
                      {red.texto}
                    </a>
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-pie-linea pt-4 text-sm">
          <span>
            © {anio} {negocio.nombreLegal} · NIF {negocio.nif}
          </span>
          <nav aria-label="Legal">
            <ul className="m-0 flex list-none flex-wrap gap-x-1 p-0">
              {enlacesLegales.map((e) => (
                <li key={e.href}>
                  <Link
                    href={e.href}
                    className="flex min-h-11 items-center px-2 text-papel underline underline-offset-[3px]"
                  >
                    {e.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      {/* Hueco para que la barra fija móvil no tape el pie. */}
      <div aria-hidden="true" className="h-[calc(76px+env(safe-area-inset-bottom))] md:hidden" />
    </footer>
  );
}
