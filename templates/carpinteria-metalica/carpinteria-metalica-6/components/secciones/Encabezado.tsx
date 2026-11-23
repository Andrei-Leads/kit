import Link from "next/link";
import type { ReactNode } from "react";

import { IconoFlecha } from "@/components/Iconos";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  titulo: ReactNode;
  entradilla?: ReactNode;
  /** Enlace a la derecha («Ver todas las fachadas →»). */
  enlace?: { href: string; texto: string };
  className?: string;
};

/** Cabeza de sección: h2 de 24–38 px a 800, entradilla opcional y enlace con flecha a la derecha. */
export function Encabezado({ id, titulo, entradilla, enlace, className }: Props) {
  return (
    <div className={cn("mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-3", className)}>
      <div className="max-w-[40rem]">
        <h2 id={id} className="titulo-seccion">
          {titulo}
        </h2>
        {entradilla && <p className="mt-2.5 text-texto-suave">{entradilla}</p>}
      </div>
      {enlace && (
        <Link href={enlace.href} className="inline-flex min-h-11 items-center gap-1.5 font-bold underline underline-offset-4">
          {enlace.texto}
          <IconoFlecha />
        </Link>
      )}
    </div>
  );
}
