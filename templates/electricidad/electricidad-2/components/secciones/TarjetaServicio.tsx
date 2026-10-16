import Link from "next/link";
import type { Servicio } from "@andrei-leads/core";
import { ArrowRight } from "lucide-react";

import { Foto } from "@/components/Foto";
import { IconoServicio } from "@/components/IconoServicio";
import { h3 } from "@/lib/estilos";
import { precioDesde } from "@/lib/formato";
import { textos } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  servicio: Servicio;
  /** Tarjeta única: foto y texto lado a lado desde tablet. */
  ancha?: boolean;
  /** Nivel del título: h2 bajo el h1 de /servicios; h3 si va dentro de una sección con h2. */
  nivel?: "h2" | "h3";
  /** Primera tarjeta de la página: la foto carga con prioridad (puede ser el LCP). */
  prioritaria?: boolean;
};

/** Precio de la tarjeta: «desde» solo si el texto empieza por «desde» (decisión de Ysst); si no, tal cual. */
function Precio({ texto }: { texto: string }) {
  const { desde, importe } = precioDesde(texto);
  return (
    <span className="text-lg font-bold">
      {desde && <span className="mr-1.5 text-base font-semibold text-tinta-suave">{textos.desde}</span>}
      {importe}
    </span>
  );
}

/**
 * Tarjeta de servicio de /servicios (mismo diseño que la del inicio, Specs §2): un solo enlace a
 * `/servicios/<slug>` con foto 3:2 (`imagenes[0]`, decorativa: el enlace se nombra con el título) o, sin foto,
 * icono lucide grande sobre piedra-2 con el corte en la esquina; título, descripción, precio (solo con
 * `precioDesde`) y «Ver servicio» en tinta con subrayado primario. Hover: `tarjeta-servicio` (globals.css).
 */
export function TarjetaServicio({ servicio, ancha = false, nivel = "h2", prioritaria = false }: Props) {
  const foto = servicio.imagenes[0];
  const Titulo = nivel;
  return (
    <Link
      href={`/servicios/${servicio.slug}`}
      className={cn(
        "tarjeta-servicio group flex flex-col overflow-hidden rounded-tarjeta bg-tarjeta text-tinta no-underline shadow-resena",
        ancha && "md:flex-row"
      )}
    >
      {foto ? (
        <Foto
          imagen={foto}
          proporcion="3/2"
          decorativa
          priority={prioritaria}
          sizes={ancha ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 384px, (min-width: 768px) 50vw, 100vw"}
          className={cn(ancha && "md:aspect-auto md:min-h-[320px] md:w-1/2 md:flex-none md:self-stretch")}
        />
      ) : (
        <div
          className={cn(
            "relative flex aspect-[3/2] items-center justify-center overflow-hidden bg-piedra-2",
            ancha && "md:aspect-auto md:min-h-[320px] md:w-1/2 md:flex-none md:self-stretch"
          )}
        >
          <IconoServicio titulo={servicio.titulo} className="size-[72px] text-tinta-suave" />
          <div
            aria-hidden="true"
            className="absolute right-0 -bottom-px w-[46%] bg-tarjeta pt-[16%] [clip-path:polygon(0_100%,100%_0,100%_100%)]"
          />
        </div>
      )}
      <div className={cn("flex flex-1 flex-col gap-2 px-6 pt-[18px] pb-[22px]", ancha && "md:justify-center md:p-10")}>
        <Titulo className={h3}>{servicio.titulo}</Titulo>
        <p className="m-0 text-tinta-suave text-pretty">{servicio.descripcion}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-2.5">
          {servicio.precioDesde ? <Precio texto={servicio.precioDesde} /> : <span />}
          <span className="inline-flex min-h-11 items-center gap-1.5 font-bold underline decoration-primario decoration-2 underline-offset-4 group-hover:decoration-4">
            {textos.verServicio}
            <ArrowRight aria-hidden="true" strokeWidth={2} className="size-[18px] flex-none" />
          </span>
        </div>
      </div>
    </Link>
  );
}
