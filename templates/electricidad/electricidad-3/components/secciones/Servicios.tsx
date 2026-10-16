import Link from "next/link";
import type { Servicio } from "@andrei-leads/core";
import { ChevronRight } from "lucide-react";

import { Foto } from "@/components/Foto";
import { Mancha } from "@/components/Mancha";
import { PastillaPrecio } from "@/components/PastillaPrecio";
import { buttonVariants } from "@/components/ui/button";
import { h2 } from "@/lib/estilos";
import { claveIcono, ICONOS } from "@/lib/iconos";
import { cn } from "@/lib/utils";

type Props = {
  servicios: Servicio[];
  /**
   * Inicio: con 7 o más se pintan 6 y el enlace «Ver todos los servicios». /servicios pasa `limite={undefined}`
   * y los pinta todos.
   */
  limite?: number;
  /** h2 «Servicios». En /servicios el h1 ya lo dice: `false`. */
  conTitulo?: boolean;
  /** Id de la sección (índice lateral). Por defecto `servicios`. */
  id?: string;
  className?: string;
};

/** Tarjeta de servicio (catálogo compacto): foto 1:1 orgánica o icono sobre mancha, título y «desde». Entera enlazada. */
function TarjetaServicio({ servicio, ancha }: { servicio: Servicio; ancha: boolean }) {
  const foto = servicio.imagenes[0];
  const Icono = ICONOS[claveIcono(servicio.titulo)];
  return (
    <Link
      href={`/servicios/${servicio.slug}`}
      className={cn(
        "tarjeta-servicio flex gap-3 rounded-tarjeta bg-superficie p-2.5 text-texto no-underline",
        // Móvil: foto arriba (2 columnas). Escritorio, y la tarjeta ancha en todo: foto a la izquierda.
        ancha ? "col-span-full flex-row items-center" : "flex-col lg:flex-row lg:items-center"
      )}
    >
      <div className={cn("flex-none", ancha ? "w-28" : "w-full lg:w-28")}>
        {foto ? (
          <Foto
            imagen={foto}
            proporcion="1/1"
            sizes="(min-width: 1024px) 112px, 50vw"
            decorativa
            compacta
          />
        ) : (
          <div
            className={cn(
              "relative flex aspect-square items-center justify-center",
              ancha ? "w-24" : "w-16 lg:w-24"
            )}
          >
            <Mancha forma="servicio" className="inset-0" />
            <Icono
              aria-hidden="true"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative z-10 size-7 lg:size-[34px]"
            />
          </div>
        )}
      </div>
      <div className="flex min-w-0 flex-col items-start gap-2 px-1 pb-1">
        <span className="text-base leading-[1.25] font-semibold text-pretty">{servicio.titulo}</span>
        {servicio.precioDesde && (
          <PastillaPrecio precio={servicio.precioDesde} className="max-w-full px-[11px] py-[5px] text-sm" />
        )}
      </div>
    </Link>
  );
}

/**
 * Servicios (Specs §2): rejilla compacta tipo catálogo, 2 columnas en móvil y 3 en escritorio. Un solo servicio:
 * una tarjeta ancha. Con 7 o más y `limite`: los primeros `limite` y «Ver todos los servicios». El «desde» sale
 * tal cual viene en `precioDesde` (decisión 3). Hover: sube 2 px y cambia de fondo (`.tarjeta-servicio`).
 */
export function Servicios({ servicios, limite, conTitulo = true, id = "servicios", className }: Props) {
  const recortar = limite !== undefined && servicios.length > limite;
  const lista = recortar ? servicios.slice(0, limite) : servicios;
  const ancha = lista.length === 1;

  return (
    <section id={id} aria-labelledby={conTitulo ? `${id}-titulo` : undefined} className={cn("pt-11 lg:pt-16", className)}>
      {conTitulo && (
        <h2 id={`${id}-titulo`} className={cn(h2, "mb-4")}>
          Servicios
        </h2>
      )}
      <ul className="m-0 grid list-none grid-cols-2 gap-2.5 p-0 lg:grid-cols-3">
        {lista.map((s) => (
          <li key={s.slug} className={cn("flex *:w-full", ancha && "col-span-full")}>
            <TarjetaServicio servicio={s} ancha={ancha} />
          </li>
        ))}
      </ul>
      {recortar && (
        <Link href="/servicios" className={cn(buttonVariants({ variant: "enlaceFlecha" }), "mt-3.5")}>
          Ver todos los servicios
          <ChevronRight aria-hidden="true" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-[18px]" />
        </Link>
      )}
    </section>
  );
}
