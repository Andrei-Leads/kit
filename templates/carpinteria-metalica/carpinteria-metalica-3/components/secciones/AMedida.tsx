import type { Servicio } from "@andrei-leads/core";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { serviciosAMedida } from "@/lib/medida";

type Props = {
  servicios: Servicio[];
};

/** Puente hacia los servicios a medida; solo si hay alguno. */
export function AMedida({ servicios }: Props) {
  if (serviciosAMedida(servicios).length === 0) return null;
  return (
    <section className="bg-primario-tinte py-7 md:py-14">
      <div className="contenedor flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
        <div className="flex max-w-[60ch] flex-col gap-1.5">
          <h2 className="m-0 text-[22px] leading-[1.15] font-extrabold text-balance md:text-[30px]">
            También fabricamos a medida
          </h2>
          <p className="m-0 text-tinta-suave">Ventanas, cerramientos, rejas y puertas a medida. Te damos presupuesto.</p>
        </div>
        <Link href="/servicios#a-medida" className={buttonVariants({ variant: "enlaceMedida" })}>
          <span>Ver trabajos a medida</span>
          <ArrowRight aria-hidden="true" className="size-5" />
        </Link>
      </div>
    </section>
  );
}
