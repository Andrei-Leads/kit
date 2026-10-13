import type { Acreditacion } from "@andrei-leads/core";
import { BadgeCheck } from "lucide-react";

type Props = {
  anioFundacion?: number;
  acreditaciones: Acreditacion[];
  garantias: string[];
};

/** Tira de confianza: datos reales, nada pulsable. */
export function Confianza({ anioFundacion, acreditaciones, garantias }: Props) {
  const items: string[] = [];
  if (anioFundacion) items.push(`Desde ${anioFundacion}`);
  for (const a of acreditaciones) items.push(a.numero ? `${a.nombre} · ${a.numero}` : a.nombre);
  items.push(...garantias.slice(0, 3));
  if (items.length === 0) return null;

  return (
    <section className="bg-primario-tinte py-5 md:py-8">
      <div className="contenedor">
        <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-x-6 gap-y-2.5 p-0">
          {items.map((t, i) => (
            <li key={`${t}-${i}`} className="flex items-center gap-2.5 font-semibold">
              <BadgeCheck aria-hidden="true" className="size-5 flex-none text-acero" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
