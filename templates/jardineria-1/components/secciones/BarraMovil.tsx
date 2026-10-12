import { BotonLlamada, BotonWhatsApp } from "@andrei-leads/core";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  telefono: string;
  whatsapp?: string;
};

/** Barra fija abajo, solo en móvil (< 768 px). Sin WhatsApp, «Llamar» ocupa todo. */
export function BarraMovil({ telefono, whatsapp }: Props) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid auto-cols-fr grid-flow-col gap-2 border-t-2 border-tinta bg-papel px-3 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom))] shadow-barra md:hidden">
      <BotonLlamada
        telefono={telefono}
        className={cn(buttonVariants({ variant: "primario", size: "md" }), "text-lg")}
      >
        Llamar
      </BotonLlamada>
      {whatsapp && (
        <BotonWhatsApp numero={whatsapp} className={buttonVariants({ variant: "tinta", size: "md" })}>
          WhatsApp
        </BotonWhatsApp>
      )}
    </div>
  );
}
