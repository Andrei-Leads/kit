import Link from "next/link";
import type { Servicio } from "@andrei-leads/core";
import { ArrowRight } from "lucide-react";

import { Foto } from "@/components/Foto";
import { IconoServicio } from "@/components/IconoServicio";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  servicio: Servicio;
  nivelTitulo: "h2" | "h3";
  /** `unica`: fila alta con la descripción completa. `compacta`: 8 o más servicios. `conFoto`: miniatura 4:3 o icono sobre tinte (/servicios). */
  variante?: "normal" | "unica" | "compacta" | "conFoto";
};

/** Fila-placa de una avería: el enlace entero a /servicios/<slug>. */
export function FilaAveria({ servicio, nivelTitulo: Titulo, variante = "normal" }: Props) {
  const unica = variante === "unica";
  const conFoto = variante === "conFoto";
  const foto = conFoto ? servicio.imagenes[0] : undefined;

  return (
    <Link
      href={"/servicios/" + servicio.slug}
      className={cn(buttonVariants({ variant: "filaAveria" }), unica && "min-h-22", conFoto && "min-h-24 py-2.5")}
    >
      <span aria-hidden="true" className="absolute top-[5px] right-[5px] size-1 rounded-full bg-acero" />
      {conFoto ? (
        foto ? (
          <Foto imagen={foto} proporcion="4/3" sizes="104px" decorativa className="w-[104px] flex-none" />
        ) : (
          <span
            aria-hidden="true"
            className="grid h-[76px] w-[104px] flex-none place-items-center rounded-sm bg-primario-tinte text-acero"
          >
            <IconoServicio titulo={servicio.titulo} className="size-8" />
          </span>
        )
      ) : (
        <IconoServicio titulo={servicio.titulo} className="size-[26px] flex-none text-acero" />
      )}
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <Titulo className="m-0 text-lg leading-[1.2] font-bold">{servicio.titulo}</Titulo>
        <span
          className={cn(
            "text-tinta-suave",
            unica ? "pt-0.5 text-base" : "truncate text-[15px] leading-[1.35]"
          )}
        >
          {servicio.descripcion}
        </span>
        {conFoto && servicio.precioDesde && (
          <span className="text-sm font-bold tabular-nums text-tinta">{servicio.precioDesde}</span>
        )}
      </span>
      {!conFoto && servicio.precioDesde && (
        <span className="flex-none text-sm font-bold whitespace-nowrap tabular-nums">
          {servicio.precioDesde}
        </span>
      )}
      <ArrowRight aria-hidden="true" className="size-5 flex-none" />
    </Link>
  );
}
