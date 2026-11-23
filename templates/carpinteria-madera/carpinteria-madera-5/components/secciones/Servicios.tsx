import Link from "next/link";
import { precioDesde, type Servicio } from "@andrei-leads/core";

import { IconoPieza, piezaDelServicio } from "@/components/Iconos";
import { Foto } from "@/components/base/Foto";
import { cn } from "@/lib/utils";

/** Precio en píldora ámbar: «desde» en pequeño solo si `precioDesde` empieza por «desde»; si no, el texto tal cual. */
export function PildoraPrecio({ precio, className }: { precio: string; className?: string }) {
  const { desde, importe } = precioDesde(precio);
  return (
    <span className={cn("inline-block self-start rounded-boton border-[1.5px] border-primario px-3 py-1 text-sm font-[560]", className)}>
      {desde && <span className="mr-1 text-[0.85em] font-normal text-texto-suave">desde</span>}
      {importe}
    </span>
  );
}

/** Tarjeta de servicio (encargo §6.3): esquinas desiguales, foto 4:3 o icono-línea de la pieza, título, descripción y precio. */
function Tarjeta({ servicio, nivel }: { servicio: Servicio; nivel: "h2" | "h3" }) {
  const Titulo = nivel;
  const foto = servicio.imagenes[0];
  return (
    <li data-aparecer>
      <Link
        href={`/servicios/${servicio.slug}`}
        className="tarjeta-servicio flex h-full flex-col rounded-tarjeta border border-borde bg-superficie px-2.5 pt-2.5 pb-[22px] text-texto no-underline hover:border-primario"
      >
        {foto ? (
          <Foto
            imagen={foto}
            sizes="(min-width: 1280px) 370px, (min-width: 720px) 45vw, 100vw"
            proporcion="4/3"
            decorativa
            posicionEtiqueta="arriba-derecha"
            className="rounded-foto-tarjeta"
          />
        ) : (
          <div className="flex aspect-[4/3] items-center justify-center rounded-foto-tarjeta bg-alterna text-texto-suave">
            <IconoPieza pieza={piezaDelServicio(servicio.titulo)} />
          </div>
        )}
        <div className="flex flex-1 flex-col gap-2 px-3.5 pt-[18px]">
          <Titulo className="text-[1.375rem] leading-[1.2] font-[620]">{servicio.titulo}</Titulo>
          <p className="text-base leading-[1.55] text-texto-suave">{servicio.descripcion}</p>
          {servicio.precioDesde && <PildoraPrecio precio={servicio.precioDesde} className="mt-1" />}
          <span className="mt-auto pt-2 text-base font-semibold underline decoration-primario decoration-2 underline-offset-[6px]">
            Ver el servicio <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </li>
  );
}

/**
 * Servicios (encargo §5 y §6.3): tarjetas en rejilla; con 1 servicio, un bloque de texto con su
 * enlace; con más de 6, lista a dos columnas con separadores suaves.
 */
export function ListaServicios({ servicios, nivel = "h3" }: { servicios: readonly Servicio[]; nivel?: "h2" | "h3" }) {
  const Titulo = nivel;
  if (servicios.length === 1) {
    const s = servicios[0];
    return (
      <div className="max-w-[62ch]">
        <Titulo className="text-h3 font-[620]">{s.titulo}</Titulo>
        <p className="mt-2 text-entrada">{s.descripcion}</p>
        {s.precioDesde && <PildoraPrecio precio={s.precioDesde} className="mt-4 text-[15px]" />}
        <p className="mt-3">
          <Link href={`/servicios/${s.slug}`} className="enlace inline-flex min-h-12 items-center">
            Ver el servicio <span aria-hidden="true">&nbsp;→</span>
          </Link>
        </p>
      </div>
    );
  }
  if (servicios.length > 6) {
    return (
      <ul className="grid gap-x-12 md:grid-cols-2">
        {servicios.map((s) => (
          <li key={s.slug} className="border-b border-borde">
            <Link href={`/servicios/${s.slug}`} className="group flex min-h-16 flex-col justify-center gap-0.5 py-4 text-texto no-underline">
              <Titulo className="text-xl font-[620] group-hover:underline group-hover:decoration-primario">
                {s.titulo} <span aria-hidden="true">→</span>
              </Titulo>
              <span className="text-[15px] text-texto-suave">{s.descripcion}</span>
              {s.precioDesde && <span className="text-[15px]">{s.precioDesde}</span>}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-5">
      {servicios.map((s) => (
        <Tarjeta key={s.slug} servicio={s} nivel={nivel} />
      ))}
    </ul>
  );
}

/** Sección de servicios del inicio, sobre `alterna`. */
export function Servicios({ servicios }: { servicios: readonly Servicio[] }) {
  return (
    <section aria-labelledby="titulo-servicios" className="bg-alterna">
      <div className="contenedor seccion">
        <p className="antetitulo">Servicios</p>
        <h2 id="titulo-servicios" className="titulo-seccion mb-[clamp(28px,4vw,48px)]">
          Qué recuperamos
        </h2>
        <ListaServicios servicios={servicios} />
      </div>
    </section>
  );
}
