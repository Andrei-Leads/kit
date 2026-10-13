import { Phone } from "lucide-react";

import { telefonoVisible } from "@/lib/formato";
import { cn } from "@/lib/utils";

const TAMANOS = { "31": "text-[31px]", "29": "text-[29px]", "22": "text-[22px]" } as const;

type Props = {
  telefono: string;
  /** Tamaño del número en px: 31 (hero, CTA final), 29 (tarjeta de servicio) o 22. */
  tamanoNumero: keyof typeof TAMANOS;
  /** Versión sobre fondo primario del CTA final: icono con tinte primario y texto heredado. */
  blanco?: boolean;
};

/** Interior de las variantes grandes de llamada: icono + «Llamar ahora» + número. */
export function ContenidoLlamada({ telefono, tamanoNumero, blanco }: Props) {
  return (
    <>
      <span
        aria-hidden="true"
        className={cn(
          "grid size-11 flex-none place-items-center rounded-md",
          blanco ? "bg-primario/10" : "bg-white/16"
        )}
      >
        <Phone className="size-6" />
      </span>
      <span className="flex flex-col leading-[1.1]">
        <span className="text-[15px] font-semibold">Llamar ahora</span>
        <span className={cn("font-extrabold tabular-nums", TAMANOS[tamanoNumero])}>
          {telefonoVisible(telefono)}
        </span>
      </span>
    </>
  );
}
