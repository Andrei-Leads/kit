import Link from "next/link";
import type { SiteConfig, Trabajo } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { TarjetaGaleria, TarjetaTrabajo } from "@/components/secciones/TarjetaTrabajo";

type Props = {
  trabajos: readonly Trabajo[];
  galeria: SiteConfig["galeria"];
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp">;
  mensaje: string;
};

const SIZES = "(min-width: 1024px) 380px, 80vw";

/**
 * Trabajos del inicio (encargo §6.3): carril horizontal con `scroll-snap` (sin auto-avance) de
 * tarjetas 4:5; en escritorio, rejilla de 3. Sin trabajos, la galería; sin nada, no pinta nada.
 * Cierra con la pareja de CTAs.
 */
export function TrabajosInicio({ trabajos, galeria, contacto, mensaje }: Props) {
  if (trabajos.length === 0 && galeria.length === 0) return null;
  return (
    <section aria-labelledby="h2-trabajos" className="seccion overflow-hidden">
      <div className="contenedor">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 id="h2-trabajos" className="h2 max-w-[18ch]">
            Huecos que ya hemos llenado
          </h2>
          <Link href="/trabajos" className="enlace">
            Ver todos los trabajos →
          </Link>
        </div>
        <ul className="carril carril-rejilla">
          {trabajos.length > 0
            ? trabajos.slice(0, 6).map((t) => (
                <li key={t.slug} data-aparecer="">
                  <TarjetaTrabajo trabajo={t} sizes={SIZES} />
                </li>
              ))
            : galeria.slice(0, 6).map((g) => (
                <li key={g.src} data-aparecer="">
                  <TarjetaGaleria imagen={g} sizes={SIZES} />
                </li>
              ))}
        </ul>
        <Pareja contacto={contacto} mensaje={mensaje} textoWhatsapp="Envíanos la foto por WhatsApp" className="mt-10" />
      </div>
    </section>
  );
}
