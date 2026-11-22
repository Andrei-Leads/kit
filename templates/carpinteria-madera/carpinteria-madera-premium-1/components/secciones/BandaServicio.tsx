import type { Imagen } from "@andrei-leads/core";

import { Veta } from "@/components/Veta";
import { Foto } from "@/components/base/Foto";
import { cn } from "@/lib/utils";

/** Banda 4:1 de un servicio; sin foto, banda de tinta con veta y su número (encargo §5.6). */
export function BandaServicio({ imagen, numero, sizes, className }: { imagen?: Imagen; numero: string; sizes: string; className?: string }) {
  if (imagen) return <Foto imagen={imagen} sizes={sizes} proporcion="4/1" decorativa className={className} />;
  return (
    <div aria-hidden="true" className={cn("relative flex aspect-[4/1] items-center overflow-hidden bg-tinta px-5", className)}>
      <Veta />
      <span className="titulo relative text-[28px] text-papel-suave">{numero}</span>
    </div>
  );
}
