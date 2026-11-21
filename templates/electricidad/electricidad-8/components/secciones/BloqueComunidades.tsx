import Link from "next/link";
import type { Comunidades, SiteConfig } from "@andrei-leads/core";

import { LlamadaDossier, PresupuestoJunta } from "@/components/Botones";
import { Flecha, Rombo } from "@/components/Iconos";
import { H2, Rotulo } from "@/components/Rotulo";
import { cn } from "@/lib/utils";

/**
 * Bloque `Comunidades` del inicio (encargo §6.5; excepción del encargo §4): párrafos a la izquierda
 * y `puntos` como lista con filete a la derecha, `presupuesto-junta` y enlace a /comunidades. Sin el
 * bloque `comunidades`, no existe.
 */
export function BloqueComunidades({
  comunidades,
  contacto,
  n,
}: {
  comunidades?: Comunidades;
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp" | "urgencias24h">;
  n: string;
}) {
  if (!comunidades) return null;
  return (
    <section aria-labelledby="h2-comunidades" className="bg-alterna">
      <div className="contenedor grid gap-10 py-14 lg:grid-cols-12 lg:gap-12 lg:py-24">
        <div className="lg:col-span-6">
          <Rotulo n={n} texto="Comunidades" />
          <h2 id="h2-comunidades" className={cn(H2, "mt-4")}>
            Para administradores de fincas y comunidades
          </h2>
          <div className="mt-6 flex max-w-[60ch] flex-col gap-4">
            {comunidades.texto.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className="lg:col-span-5 lg:col-start-8 lg:pt-14">
          <PuntosComunidades comunidades={comunidades} />
          <div className="mt-6 flex flex-col items-start gap-3">
            {contacto.whatsapp ? <PresupuestoJunta numero={contacto.whatsapp} /> : <LlamadaDossier contacto={contacto} />}
            <Link
              href="/comunidades"
              className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-acento underline decoration-1 underline-offset-[5px] hover:decoration-2 focus-visible:outline-2 focus-visible:outline-foco"
            >
              Todo para comunidades <Flecha />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** `puntos` con rombo y filete; con `ieev`, el aviso del catálogo («¿Tu edificio tiene más de 50 años?»). */
export function PuntosComunidades({ comunidades }: { comunidades: Comunidades }) {
  return (
    <>
      {comunidades.puntos.length > 0 && (
        <ul className="border-t border-texto">
          {comunidades.puntos.map((p) => (
            <li key={p} className="flex items-baseline gap-3 border-b border-linea-plano py-3.5 font-titulo text-[1.1875rem] leading-snug">
              <Rombo className="-translate-y-0.5" />
              {p}
            </li>
          ))}
        </ul>
      )}
      {comunidades.ieev && (
        <p className="mt-5 border-l-2 border-primario pl-4">
          <strong className="font-titulo text-[1.1875rem] font-normal">¿Tu edificio tiene más de 50 años?</strong>
          <br />
          <span className="text-[0.9375rem] text-texto-suave">Te ayudamos con la parte eléctrica de lo que pida su inspección.</span>
        </p>
      )}
    </>
  );
}
