import Link from "next/link";
import type { Servicio } from "@andrei-leads/core";
import { ArrowRight } from "lucide-react";

import { Foto } from "@/components/Foto";
import { IconoServicio } from "@/components/IconoServicio";
import { buttonVariants } from "@/components/ui/button";
import { h2, h3 } from "@/lib/estilos";
import { precioDesde } from "@/lib/formato";
import { textos } from "@/lib/textos";
import { cn } from "@/lib/utils";

/** Servicios que salen en el inicio; si hay más, «Ver todos los servicios». */
export const SERVICIOS_EN_INICIO = 6;

type Props = {
  servicios: Servicio[];
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
 * Tarjeta de servicio: un solo enlace a `/servicios/<slug>` con foto 3:2 (`imagenes[0]`, decorativa: el enlace
 * ya se nombra con el h3) o, sin foto, un icono lucide grande sobre piedra-2 con el corte en la esquina; título,
 * descripción, precio (solo con `precioDesde`) y «Ver servicio» en tinta con subrayado primario. Hover:
 * sube 3 px y cambia el borde (`tarjeta-servicio`; con «reducir movimiento», solo el borde). `ancha`: la
 * tarjeta única, foto y texto lado a lado desde tablet.
 */
function TarjetaServicio({ servicio, ancha }: { servicio: Servicio; ancha: boolean }) {
  const foto = servicio.imagenes[0];
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
        <h3 className={h3}>{servicio.titulo}</h3>
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

/**
 * Servicios (Specs §2), en una banda piedra-2: h2, hasta 6 tarjetas aireadas (1 columna en móvil, 3 en
 * escritorio; `auto-fit`) y, con más de 6, «Ver todos los servicios». Con 1 servicio, una tarjeta ancha.
 * Siempre hay al menos 1 servicio (lo exige el contrato), así que la sección sale siempre.
 */
export function Servicios({ servicios }: Props) {
  const visibles = servicios.slice(0, SERVICIOS_EN_INICIO);
  const unico = visibles.length === 1;
  return (
    <section aria-labelledby="titulo-servicios" className="bg-piedra-2 pt-4 pb-16 lg:pt-6 lg:pb-[104px]">
      <div className="contenedor">
        <h2 id="titulo-servicios" className={cn(h2, "mb-7")}>
          {textos.servicios}
        </h2>
        <div
          className={cn(
            "grid gap-5",
            unico ? "grid-cols-1" : "grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))]"
          )}
        >
          {visibles.map((s) => (
            <TarjetaServicio key={s.slug} servicio={s} ancha={unico} />
          ))}
        </div>
        {servicios.length > SERVICIOS_EN_INICIO && (
          <Link href="/servicios" className={cn(buttonVariants({ variant: "enlace" }), "mt-5")}>
            {textos.verTodosServicios}
          </Link>
        )}
      </div>
    </section>
  );
}
