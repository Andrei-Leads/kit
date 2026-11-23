import Link from "next/link";
import { BotonWhatsApp, type Trabajo } from "@andrei-leads/core";

import { enlaceWhatsapp } from "@/components/Botones";
import { IconoEtiqueta, IconoFlecha, IconoRegla, IconoReloj, IconoUbicacion, IconoWhatsapp } from "@/components/Iconos";
import { AntesDespues } from "@/components/base/AntesDespues";
import { Foto } from "@/components/base/Foto";
import { mensajeDeTrabajo, TEXTO_WA_TARJETA } from "@/lib/mensajes";
import { cn } from "@/lib/utils";

type Props = {
  trabajo: Trabajo;
  whatsapp?: string;
  /** Tarjeta ancha (la tercera de cada tres en escritorio, o la única): foto a la izquierda y descripción. */
  ancha?: boolean;
  nivel?: "h2" | "h3";
  /** Primera tarjeta de /trabajos: su foto es el LCP. */
  preload?: boolean;
};

/** Línea de contexto con iconos de trazo: ubicación · superficie · duración · precio. Lo que falta desaparece. */
export function DatosTrabajo({ trabajo, className }: { trabajo: Pick<Trabajo, "ubicacion" | "superficie" | "duracion" | "precio">; className?: string }) {
  const datos = [
    { v: trabajo.ubicacion, icono: <IconoUbicacion tamano={16} />, nombre: "Lugar" },
    { v: trabajo.superficie, icono: <IconoRegla tamano={16} />, nombre: "Tamaño" },
    { v: trabajo.duracion, icono: <IconoReloj tamano={16} />, nombre: "Plazo" },
    { v: trabajo.precio, icono: <IconoEtiqueta tamano={16} />, nombre: "Precio aproximado" },
  ].filter((d) => d.v);
  if (datos.length === 0) return null;
  return (
    <ul className={cn("flex flex-wrap gap-x-4 gap-y-1.5 text-[15px] leading-[1.4] text-texto-suave", className)}>
      {datos.map((d) => (
        <li key={d.nombre} className="flex items-center gap-1.5">
          {d.icono}
          <span className="sr-only">{d.nombre}: </span>
          {d.v}
        </li>
      ))}
    </ul>
  );
}

/**
 * Tarjeta de fachada (encargo §6.3): deslizador 4:5 (o la foto sola con la pastilla «Terminado»),
 * título, la línea de contexto, «Ver el trabajo →» y «Quiero este cambio» (WhatsApp con el mensaje
 * del trabajo). Aparece con `translateY(20px→0)` al entrar (globals.css).
 */
export function TarjetaFachada({ trabajo, whatsapp, ancha, nivel = "h3", preload }: Props) {
  const Titulo = nivel;
  const sizes = ancha ? "(min-width: 1024px) 460px, 100vw" : "(min-width: 1024px) 560px, 100vw";
  return (
    <article
      data-servicio={trabajo.servicio}
      className={cn(
        "aparecer-fachada flex flex-col gap-4",
        ancha && "lg:col-span-full lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-14 lg:gap-y-5",
      )}
    >
      <div className={cn("w-full", ancha && "lg:max-w-[460px] lg:flex-[1_1_320px]")}>
        {trabajo.antes ? (
          <AntesDespues
            antes={trabajo.antes}
            despues={trabajo.imagenes[0]}
            titulo={trabajo.titulo}
            proporcion="4/5"
            sizes={sizes}
            preload={preload}
            antesInmediata={preload}
          />
        ) : (
          <Foto imagen={trabajo.imagenes[0]} proporcion="4/5" sizes={sizes} preload={preload}>
            <span className="absolute top-3 left-3 z-[3] rounded-pastilla bg-primario px-3 py-[7px] text-[13px] leading-none font-bold text-sobre-primario">
              Terminado
            </span>
          </Foto>
        )}
      </div>
      <div className={cn("flex flex-col gap-2.5", ancha && "lg:flex-[1_1_300px] lg:gap-3.5")}>
        <Titulo className="text-[clamp(1.25rem,1.1rem+0.5vw,1.5rem)] leading-[1.2] font-extrabold">{trabajo.titulo}</Titulo>
        <DatosTrabajo trabajo={trabajo} />
        {ancha && <p className="hidden max-w-[36rem] text-texto-suave lg:block">{trabajo.descripcion}</p>}
        <div className="flex flex-wrap gap-x-5">
          <Link href={`/trabajos/${trabajo.slug}`} className="inline-flex min-h-11 items-center gap-1.5 font-bold underline underline-offset-4">
            Ver el trabajo<span className="sr-only">: {trabajo.titulo}</span>
            <IconoFlecha />
          </Link>
          {whatsapp && (
            <BotonWhatsApp numero={whatsapp} mensaje={mensajeDeTrabajo(trabajo)} className={enlaceWhatsapp}>
              <IconoWhatsapp tamano={18} />
              {TEXTO_WA_TARJETA}
            </BotonWhatsApp>
          )}
        </div>
      </div>
    </article>
  );
}

/** Rejilla de tarjetas (inicio, /trabajos, servicio): 1 por fila en móvil; 2 + 1 ancha en escritorio. */
export function RejillaFachadas({
  trabajos,
  whatsapp,
  nivel,
  preloadPrimera,
}: {
  trabajos: readonly Trabajo[];
  whatsapp?: string;
  nivel?: "h2" | "h3";
  preloadPrimera?: boolean;
}) {
  return (
    <div className="grid gap-x-8 gap-y-12 lg:grid-cols-2">
      {trabajos.map((t, i) => (
        <TarjetaFachada
          key={t.slug}
          trabajo={t}
          whatsapp={whatsapp}
          nivel={nivel}
          ancha={trabajos.length === 1 || i % 3 === 2}
          preload={preloadPrimera && i === 0}
        />
      ))}
    </div>
  );
}
