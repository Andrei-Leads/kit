import Link from "next/link";
import type { Servicio } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { cn } from "@/lib/utils";

type Props = {
  servicios: readonly Servicio[];
  titulo: string;
  /** Con WhatsApp, cada tarjeta lleva «Configurar», que lleva al asistente con el servicio elegido. */
  conAsistente: boolean;
  /** Ancla del asistente: «/#asistente-» (inicio) o «#asistente-» (el de la propia página). */
  baseConfigurar?: string;
};

/**
 * Servicios (encargo §6.4), sobre blanco: tarjetas crema de 24 px con miniatura 1:1 de 96 px (sin
 * foto, cuadrado alterno con la inicial), título, descripción y `precioDesde` tal cual en una
 * píldora. «Configurar» (`tarjeta-configurar`, solo con WhatsApp) y «Ver detalles».
 */
export function ServiciosTarjetas({ servicios, titulo, conAsistente, baseConfigurar = "/#asistente-" }: Props) {
  return (
    <section aria-labelledby="h2-servicios" className="seccion bg-superficie">
      <div className="contenedor">
        <h2 id="h2-servicios" className="h2 mb-8 max-w-[18ch]">
          {titulo}
        </h2>
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,340px),1fr))] gap-4">
          {servicios.map((s) => {
            const foto = s.imagenes[0];
            return (
              <li key={s.slug} data-aparecer="" className="flex flex-col gap-4 rounded-tarjeta bg-fondo p-4">
                <div className="flex items-start gap-4">
                  {foto ? (
                    <Foto imagen={foto} decorativa compacta proporcion="1/1" sizes="96px" calidad={60} className="w-24 flex-none rounded-2xl" />
                  ) : (
                    <span aria-hidden="true" className="flex aspect-square w-24 flex-none items-center justify-center rounded-2xl bg-alterna font-titulo text-5xl font-bold">
                      {s.titulo.charAt(0)}
                    </span>
                  )}
                  <div className="flex min-w-0 flex-col gap-1.5">
                    <h3 className="font-titulo text-[19px] leading-[1.2] font-bold tracking-[-0.01em]">
                      <Link href={`/servicios/${s.slug}`} className="no-underline hover:underline">
                        {s.titulo}
                      </Link>
                    </h3>
                    <p className="text-[15.5px] leading-[1.45] text-texto-suave">{s.descripcion}</p>
                    {s.precioDesde && (
                      <span className="mt-1 self-start rounded-full border border-borde bg-superficie px-3 py-1 text-sm font-bold tabular-nums">{s.precioDesde}</span>
                    )}
                  </div>
                </div>
                <div className="mt-auto flex gap-2.5">
                  {conAsistente && (
                    <a href={`${baseConfigurar}${s.slug}`} className="boton boton-compacto boton-contorno flex-1 px-[18px]">
                      Configurar<span className="sr-only">: {s.titulo}</span>
                    </a>
                  )}
                  <Link
                    href={`/servicios/${s.slug}`}
                    className={cn("inline-flex min-h-12 flex-1 items-center justify-center px-[18px] text-[15.5px] font-semibold underline underline-offset-4")}
                  >
                    Ver detalles<span className="sr-only">: {s.titulo}</span>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
