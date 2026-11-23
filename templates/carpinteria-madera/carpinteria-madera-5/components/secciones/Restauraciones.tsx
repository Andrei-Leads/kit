import type { SiteConfig, Trabajo } from "@andrei-leads/core";

import { ArcosGaleria, ArcosTrabajos } from "@/components/Arcos";
import { Pareja } from "@/components/Botones";
import { Par } from "@/components/Par";
import { mensajeInicio } from "@/lib/mensajes";
import { trabajoDelHero } from "@/lib/textos";

type Props = Pick<SiteConfig, "trabajos" | "galeria" | "contacto">;
type ConAntes = Trabajo & { antes: NonNullable<Trabajo["antes"]> };

/**
 * Sección estrella (encargo §6.2): los trabajos con `antes` salvo el del hero (máx. 3), cada uno
 * como un par grande; después, los trabajos sin `antes` en arcos pequeños. Si el único par es el
 * del hero, arranca con los arcos. Sin trabajos, la `galeria`. Sin nada, no existe.
 */
export function Restauraciones({ trabajos, galeria, contacto }: Props) {
  const hero = trabajoDelHero(trabajos);
  const pares = trabajos.filter((t): t is ConAntes => Boolean(t.antes) && t !== hero).slice(0, 3);
  const solas = trabajos.filter((t) => !t.antes);
  const usarGaleria = trabajos.length === 0 && galeria.length > 0;
  if (pares.length === 0 && solas.length === 0 && !usarGaleria) return null;

  return (
    <section aria-labelledby="titulo-restauraciones">
      <div className="contenedor seccion">
        <p className="antetitulo">{pares.length > 0 ? "Antes y después" : "Restauraciones"}</p>
        <h2 id="titulo-restauraciones" className="titulo-seccion max-w-[18ch]">
          Piezas que han vuelto a casa
        </h2>
        {pares.length > 0 && <p className="mt-3 max-w-[46ch] text-texto-suave">Desliza sobre cada foto para ver cómo llegaron al taller.</p>}
        {pares.length > 0 && (
          <div className="mt-[clamp(32px,5vw,56px)] flex flex-col gap-[clamp(56px,8vw,96px)]">
            {pares.map((t) => (
              <Par key={t.slug} trabajo={t} whatsapp={contacto.whatsapp} />
            ))}
          </div>
        )}
        {solas.length > 0 && (
          <>
            {pares.length > 0 ? (
              <h3 className="mt-[clamp(56px,8vw,96px)] mb-5 text-[clamp(1.25rem,1.1rem+0.5vw,1.5rem)] font-[620]">Más trabajos</h3>
            ) : (
              <div className="h-[clamp(32px,5vw,56px)]" />
            )}
            <ArcosTrabajos trabajos={solas} />
          </>
        )}
        {usarGaleria && (
          <div className="mt-[clamp(32px,5vw,56px)]">
            <ArcosGaleria galeria={galeria} />
          </div>
        )}
        <Pareja
          cta={{ telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje: mensajeInicio(contacto) }}
          numeroEnLlamar
          className="mt-[clamp(40px,6vw,64px)] max-w-[620px]"
        />
      </div>
    </section>
  );
}
