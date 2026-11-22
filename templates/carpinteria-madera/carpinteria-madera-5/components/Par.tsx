import Link from "next/link";
import { BotonWhatsApp, type Servicio, type Trabajo } from "@andrei-leads/core";

import { AntesDespues } from "@/components/base/AntesDespues";
import { mensajeDeTrabajo, TEXTO_WHATSAPP_TRABAJO } from "@/lib/mensajes";
import { fichaTrabajo } from "@/lib/textos";

type Props = {
  trabajo: Trabajo & { antes: NonNullable<Trabajo["antes"]> };
  whatsapp?: string;
  /** h3 en el inicio y en las fichas; h2 en /trabajos. */
  nivel?: "h2" | "h3";
  /** /trabajos: el servicio encima del título y `id` de ancla del filtro. */
  servicio?: Servicio;
  id?: string;
  /** Solo el primer par de /trabajos (LCP). */
  preload?: boolean;
};

/** par-texto (entrega): enlace con subrayado de primario y flecha, 48 px de zona. */
export const PAR_TEXTO =
  "mt-2.5 inline-flex min-h-12 items-center gap-2 rounded-md font-semibold text-texto underline decoration-primario decoration-2 underline-offset-[6px] hover:decoration-[3px]";

/**
 * Un par grande de «Restauraciones» (encargo §6.2): el antes/después en el arco (4:5 en móvil,
 * 3:2 en escritorio) y su ficha: «{ubicación} · {año} · {superficie} · {plazo}», título (enlace a
 * la ficha del trabajo), descripción, `precio` en píldora si existe y «Tengo algo parecido» por
 * WhatsApp con el mensaje del trabajo. Sin WhatsApp, el enlace lleva a la ficha.
 */
export function Par({ trabajo, whatsapp, nivel = "h3", servicio, id, preload }: Props) {
  const Titulo = nivel;
  const ficha = fichaTrabajo(trabajo);
  return (
    <article id={id} data-aparecer className="flex scroll-mt-[calc(var(--alto-cabecera)+16px)] flex-wrap items-end gap-[clamp(20px,3vw,56px)]">
      <div className="min-w-0 flex-[3_1_520px]">
        <AntesDespues
          antes={trabajo.antes}
          despues={trabajo.imagenes[0]}
          titulo={trabajo.titulo}
          sizes="(min-width: 1280px) 760px, (min-width: 1024px) 62vw, 100vw"
          forma="vertical"
          preload={preload}
        />
      </div>
      <div className="min-w-0 flex-[1_1_260px]">
        {servicio && <p className="text-sm text-texto-suave">{servicio.titulo}</p>}
        {!servicio && ficha && <p className="text-sm text-texto-suave">{ficha}</p>}
        <Titulo className="mt-1.5 text-h3 font-[620]">
          <Link href={`/trabajos/${trabajo.slug}`} className="text-texto no-underline decoration-primario decoration-2 underline-offset-4 hover:underline">
            {trabajo.titulo}
          </Link>
        </Titulo>
        {servicio && ficha && <p className="mt-2 text-[15px] text-texto-suave">{ficha}</p>}
        <p className="mt-2.5 text-texto-suave">{trabajo.descripcion}</p>
        {trabajo.precio && (
          <p className="mt-3.5">
            <span className="inline-block rounded-boton border-[1.5px] border-primario px-3.5 py-[5px] text-[15px] font-[560]">{trabajo.precio}</span>
          </p>
        )}
        {whatsapp ? (
          <BotonWhatsApp numero={whatsapp} mensaje={mensajeDeTrabajo(trabajo)} className={PAR_TEXTO}>
            {TEXTO_WHATSAPP_TRABAJO} <span aria-hidden="true">→</span>
          </BotonWhatsApp>
        ) : (
          <Link href={`/trabajos/${trabajo.slug}`} className={PAR_TEXTO}>
            Ver la restauración <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </article>
  );
}
