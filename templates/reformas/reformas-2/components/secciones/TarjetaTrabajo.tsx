import Image from "next/image";
import Link from "next/link";
import type { Imagen, Servicio, Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";

const SIZES = "(min-width: 1024px) 380px, calc(100vw - 72px)";

/** «Chamberí · 86 m² · 10 semanas»: solo los datos que hay. */
export function metaTrabajo(t: Pick<Trabajo, "ubicacion" | "superficie" | "duracion">): string {
  return [t.ubicacion, t.superficie, t.duracion].filter(Boolean).join(" · ");
}

/**
 * Ficha de trabajo (encargo §6.2): foto 4:3 arriba, pastilla con el servicio, título y la línea de
 * datos. Con `antes`, una miniatura redonda de 56 px con la etiqueta «Antes» solapada en la esquina
 * de la foto (las dos son de IA: la etiqueta de la foto lo dice en plural).
 */
export function TarjetaTrabajo({ trabajo, servicio, nivel = "h3" }: { trabajo: Trabajo; servicio?: Pick<Servicio, "titulo">; nivel?: "h2" | "h3" }) {
  const Titulo = nivel;
  const foto = trabajo.imagenes[0];
  const meta = metaTrabajo(trabajo);
  return (
    <Link
      href={`/trabajos/${trabajo.slug}`}
      className="flex h-full min-w-0 flex-col rounded-tarjeta bg-superficie p-2 text-texto no-underline shadow-tarjeta motion-safe:transition-transform motion-safe:duration-200 hover:-translate-y-[3px]"
    >
      <div className="relative">
        <Foto imagen={foto} sizes={SIZES} decorativa />
        {trabajo.antes && <MiniaturaAntes imagen={trabajo.antes} />}
      </div>
      <div className="flex flex-col items-start gap-2 px-2 pt-3.5 pb-2">
        {servicio && <span className="max-w-[calc(100%-72px)] rounded-full bg-alterna px-2.5 py-1 text-xs font-semibold">{servicio.titulo}</span>}
        <Titulo className="font-titulo text-xl leading-[1.2] font-semibold tracking-[-0.01em] text-balance">{trabajo.titulo}</Titulo>
        {meta && <p className="text-sm text-texto-suave">{meta}</p>}
      </div>
    </Link>
  );
}

function MiniaturaAntes({ imagen }: { imagen: Imagen }) {
  return (
    <div className="absolute right-3 -bottom-[26px] z-[3] size-14 rounded-full border-[3px] border-superficie bg-alterna shadow-[0_2px_8px_rgb(42_29_23/0.18)]">
      <Image src={imagen.src} alt="" width={56} height={56} sizes="56px" quality={60} className="size-full rounded-full object-cover" />
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-texto px-2 py-0.5 text-[11px] font-bold text-fondo">Antes</span>
    </div>
  );
}

/** Sin trabajos: una foto de la galería en la misma tarjeta, con su `titulo`. */
export function TarjetaGaleria({ imagen, nivel = "h3" }: { imagen: Imagen & { titulo?: string }; nivel?: "h2" | "h3" }) {
  const Titulo = nivel;
  return (
    <figure className="flex h-full min-w-0 flex-col rounded-tarjeta bg-superficie p-2 shadow-tarjeta">
      <Foto imagen={imagen} sizes={SIZES} />
      {imagen.titulo && (
        <figcaption className="px-2 pt-3.5 pb-2">
          <Titulo className="font-titulo text-xl leading-[1.2] font-semibold tracking-[-0.01em] text-balance">{imagen.titulo}</Titulo>
        </figcaption>
      )}
    </figure>
  );
}
