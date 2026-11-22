import Link from "next/link";
import { servicioDelTrabajo, type Imagen, type Servicio, type Trabajo } from "@andrei-leads/core";

import { Foto, PieFigura, textoPie } from "@/components/base/Foto";
import { CotaLinea, CotaVertical } from "@/components/Cota";
import { refTrabajo } from "@/lib/textos";
import { cn } from "@/lib/utils";

type FotoGaleria = Imagen & { titulo?: string };

type Props = {
  trabajos: readonly Trabajo[];
  servicios: readonly Servicio[];
  /** Sin trabajos, la galería: fichas sin REF con `titulo` como pie. */
  galeria?: readonly FotoGaleria[];
  /** `inicio`: 3 fichas, REF corta y título h3. `pagina` (/trabajos): todas, 2 columnas, REF completa y descripción. */
  modo: "inicio" | "pagina";
};

/**
 * `FichasObra` (encargo §6.3): fichas con la foto dentro de un marco de 1 px y cotas por fuera
 * (ancho y alto como líneas, sin números), el pie de figura y la etiqueta REF con los datos que haya.
 * Una capa en cianotipia destapa la foto al entrar en pantalla (la foto no se anima). Debajo, el
 * título y el enlace al servicio si existe.
 */
export function FichasObra({ trabajos, servicios, galeria = [], modo }: Props) {
  const inicio = modo === "inicio";
  const rejilla = cn(
    "ancho grid gap-x-7",
    inicio ? "grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-y-10" : "grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] gap-y-12",
  );
  const sizes = inicio ? "(min-width: 1024px) 300px, calc(100vw - 62px)" : "(min-width: 1024px) 440px, calc(100vw - 62px)";
  const Titulo = inicio ? "h3" : "h2";

  if (trabajos.length === 0) {
    return (
      <ul className={rejilla}>
        {galeria.map((g, i) => (
          <li key={g.src} data-aparecer="" className="flex flex-col gap-2.5">
            <CotaLinea className="mr-[22px]" />
            <div className="flex gap-2.5">
              <Foto imagen={g} sizes={sizes} className="flex-1">
                <span aria-hidden="true" className="destapa" />
              </Foto>
              <CotaVertical />
            </div>
            <PieFigura texto={textoPie(g, i + 1)} />
            {g.titulo && <p className="font-titulo text-[17px] leading-[1.35] font-medium text-balance">{g.titulo}</p>}
          </li>
        ))}
      </ul>
    );
  }

  const lista = inicio ? trabajos.slice(0, 3) : trabajos;
  return (
    <ul className={rejilla}>
      {lista.map((t, i) => {
        const servicio = servicioDelTrabajo(servicios, t);
        const [foto] = t.imagenes;
        const href = `/trabajos/${t.slug}`;
        return (
          <li key={t.slug} data-aparecer="">
            <article className="flex flex-col gap-2.5">
              <CotaLinea className="mr-[22px]" />
              <div className="flex gap-2.5">
                <Link href={href} tabIndex={-1} aria-hidden="true" className="min-w-0 flex-1">
                  <Foto imagen={foto} sizes={sizes} decorativa>
                    <span aria-hidden="true" className="destapa" />
                  </Foto>
                </Link>
                <CotaVertical />
              </div>
              <PieFigura texto={textoPie(foto, i + 1)} />
              <span className="etiqueta border-t border-texto pt-2.5">{refTrabajo(t, i, inicio ? undefined : servicio?.titulo)}</span>
              <Titulo className={cn("font-titulo leading-[1.35] font-medium text-balance", inicio ? "text-[17px]" : "text-lg")}>
                <Link href={href} className="no-underline hover:underline">
                  {t.titulo}
                </Link>
              </Titulo>
              {inicio && servicio && (
                <Link href={`/servicios/${servicio.slug}`} className="self-start text-[15px] text-texto-suave underline underline-offset-[3px]">
                  {servicio.titulo} <span className="flecha">→</span>
                </Link>
              )}
              {!inicio && <p className="text-[15px] leading-[1.55] text-texto-suave text-pretty">{t.descripcion}</p>}
            </article>
          </li>
        );
      })}
    </ul>
  );
}
