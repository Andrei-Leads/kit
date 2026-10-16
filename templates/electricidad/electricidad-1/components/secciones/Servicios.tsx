import Link from "next/link";
import type { SiteConfig } from "@andrei-leads/core";
import { ArrowRight } from "lucide-react";

import { Regla } from "@/components/Regla";
import { buttonVariants } from "@/components/ui/button";
import { h2, seccionPlana } from "@/lib/estilos";
import { cn } from "@/lib/utils";
import { FilaServicio } from "./FilaServicio";
import { ServicioDestacado } from "./ServicioDestacado";

/** Filas máximas bajo el destacado en el inicio; con más de 6 servicios sale «Ver todos los servicios». */
const MAX_FILAS_INICIO = 5;

type Props = {
  numero: string;
  servicios: SiteConfig["servicios"];
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp">;
};

/**
 * Sección «Servicios» del inicio (Specs §5): un solo h2 con el servicio destacado (`servicios[0]`)
 * y, debajo, hasta 5 filas con el resto. Con 1 servicio, el destacado hace de lista: no hay filas.
 * Más de 6 servicios: «Ver todos los servicios» (las 5 filas del inicio son las siguientes al destacado).
 */
export function Servicios({ numero, servicios, contacto }: Props) {
  const [destacado, ...resto] = servicios;
  const filas = resto.slice(0, MAX_FILAS_INICIO);

  return (
    <section aria-labelledby="titulo-servicios" className={seccionPlana}>
      <Regla numero={numero} etiqueta="Servicios" />
      <h2 id="titulo-servicios" className={cn(h2, "mt-5")}>
        Servicios
      </h2>

      <ServicioDestacado servicio={destacado} contacto={contacto} className="mt-8" />

      {filas.length > 0 && (
        <ul className="m-0 mt-10 list-none border-b border-regla p-0">
          {filas.map((servicio) => (
            <FilaServicio key={servicio.slug} servicio={servicio} />
          ))}
        </ul>
      )}

      {servicios.length > 6 && (
        <Link href="/servicios" className={cn(buttonVariants({ variant: "enlaceFlecha" }), "mt-4")}>
          <span>Ver todos los servicios</span>
          <ArrowRight aria-hidden="true" strokeWidth={2} className="size-[18px] flex-none" />
        </Link>
      )}
    </section>
  );
}
