import Link from "next/link";
import { BotonWhatsApp, type Imagen, type Servicio, type SiteConfig, type Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { agruparObras, obrasTexto, type Grupo } from "@/lib/galeria";
import { mensajeDeTrabajo } from "@/lib/mensajes";
import { etiquetaPieza } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  trabajos: readonly Trabajo[];
  servicios: readonly Pick<Servicio, "slug" | "titulo">[];
  galeria?: readonly (Imagen & { titulo?: string })[];
  /** Título y entradilla de la sección (sin título en /trabajos: lo pone la cabecera). */
  titulo?: string;
  entradilla?: string;
  /** Inicio: como mucho 4 grupos × 2 obras (6 fotos de galería) y «Ver las n obras». */
  resumen?: boolean;
  /** Ficha de servicio: solo el grupo de ese slug, sin chips. */
  soloServicio?: string;
  /** «Quiero una así →» bajo cada obra (solo /trabajos, con WhatsApp). */
  whatsapp?: SiteConfig["contacto"]["whatsapp"];
};

const ESQUINA = "corte-tarjeta";

/**
 * GaleriaPorTipo, sección estrella (encargo §5): trabajos agrupados por servicio, con chips de
 * ancla (#slug, sin `searchParams` ni JS). En móvil, 2 columnas de fotos 1:1; desde 1024 px, cada
 * grupo es una fila (título 3/12, fotos en 3 columnas; la primera ocupa 2 a 4:3). Solo con
 * `galeria`, un bloque «Galería» de 2–3 columnas. Sin nada, no se pinta.
 */
export function GaleriaPorTipo({ trabajos, servicios, galeria = [], titulo, entradilla, resumen, soloServicio, whatsapp }: Props) {
  let grupos: Grupo[] = agruparObras(trabajos, servicios);
  if (soloServicio) grupos = grupos.filter((g) => g.id === soloServicio);
  const todos = grupos;
  if (resumen) grupos = grupos.slice(0, 4).map((g) => ({ ...g, obras: g.obras.slice(0, 2) }));
  const conObras = trabajos.length > 0;
  const fotos = !conObras ? (resumen ? galeria.slice(0, 6) : galeria) : [];
  if ((conObras && grupos.length === 0) || (!conObras && fotos.length === 0)) return null;

  const mostradas = grupos.reduce((n, g) => n + g.obras.length, 0);
  const verMas = resumen && (conObras ? mostradas < trabajos.length : galeria.length > fotos.length);
  // Los chips enlazan solo a los grupos pintados (en inicio, los 4 primeros), con su total de obras.
  const chips = conObras && !soloServicio && grupos.length > 1;
  const totalDe = (id: string) => todos.find((t) => t.id === id)?.obras.length ?? 0;
  // Sin título de sección (en /trabajos el h1 lo pone la cabecera), los grupos son h2.
  const TituloGrupo = titulo ? "h3" : "h2";

  return (
    <section aria-labelledby={titulo ? "titulo-galeria" : undefined} aria-label={titulo ? undefined : "Obras por tipo de pieza"} className="pt-[clamp(40px,6vw,88px)] pb-[clamp(24px,3vw,48px)]">
      <div className="contenedor">
        {titulo && (
          <>
            <h2 id="titulo-galeria" className="h2">
              {titulo}
            </h2>
            {entradilla && <p className="mt-2 max-w-[46ch] text-pretty text-texto-suave">{entradilla}</p>}
          </>
        )}

        {chips && (
          <nav aria-label="Tipos de pieza" className={cn("hierro mt-[18px] p-2", ESQUINA)}>
            <ul className="relative flex snap-x snap-mandatory gap-1.5 overflow-x-auto [scrollbar-width:none]">
              {grupos.map((g) => (
                <li key={g.id} className="flex-none snap-start">
                  <a
                    href={`#${g.id}`}
                    className="chip flex min-h-11 items-center gap-2 border border-borde px-3.5 font-titulo text-[17px] font-bold tracking-[0.06em] whitespace-nowrap uppercase no-underline hover:border-acento focus-visible:-outline-offset-2"
                  >
                    {g.titulo}
                    <span aria-hidden="true" className="text-acento">
                      {totalDe(g.id)}
                    </span>
                    <span className="sr-only">, {obrasTexto(totalDe(g.id))}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {conObras &&
          grupos.map((g) => {
            const total = totalDe(g.id);
            return (
              <div
                key={g.id}
                id={soloServicio ? undefined : g.id}
                className="mt-8 lg:mt-11 lg:grid lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:gap-8 lg:border-t lg:border-borde lg:pt-5"
              >
                <TituloGrupo data-titulo-grupo className="mb-3 flex items-baseline gap-2 font-titulo text-[30px] leading-none font-extrabold uppercase lg:mb-0 lg:block lg:text-[40px] lg:leading-[0.95] lg:text-balance">
                  {g.titulo}
                  <span className="text-xl text-texto-suave lg:mt-1.5 lg:block lg:text-[22px]">
                    · <span className="lg:hidden">{total}</span>
                    <span className="hidden lg:inline">{obrasTexto(total)}</span>
                  </span>
                </TituloGrupo>
                <ul className="grid grid-cols-2 items-start gap-x-3 gap-y-5 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-7">
                  {g.obras.map(({ trabajo, indice }, j) => (
                    <li key={trabajo.slug} data-aparecer className={j === 0 ? "lg:col-span-2" : undefined}>
                      <Link href={`/trabajos/${trabajo.slug}`} className="block no-underline focus-visible:outline-offset-3">
                        <Foto
                          imagen={trabajo.imagenes[0]}
                          sizes={j === 0 ? "(min-width: 1024px) 560px, calc(50vw - 22px)" : "(min-width: 1024px) 270px, calc(50vw - 22px)"}
                          proporcion="relleno"
                          etiquetaCompacta
                          className={cn(ESQUINA, "aspect-square", j === 0 && "lg:aspect-[4/3]")}
                        />
                        <p className="etiqueta mt-2 text-texto-suave lg:mt-2.5">{etiquetaPieza(trabajo, indice)}</p>
                        <p className="mt-0.5 text-[15px] leading-[1.3] font-semibold text-pretty lg:text-[17px]">{trabajo.titulo}</p>
                      </Link>
                      {whatsapp && (
                        <BotonWhatsApp numero={whatsapp} mensaje={mensajeDeTrabajo(trabajo)} className="enlace text-base whitespace-nowrap">
                          Quiero una así →
                        </BotonWhatsApp>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

        {fotos.length > 0 && (
          <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-5 lg:grid-cols-3">
            {fotos.map((f) => (
              <li key={f.src} data-aparecer>
                <figure>
                  <Foto imagen={f} sizes="(min-width: 1024px) 380px, calc(50vw - 22px)" proporcion="1/1" etiquetaCompacta className={ESQUINA} />
                  {f.titulo && <figcaption className="mt-2 text-[15px] leading-[1.3] font-semibold">{f.titulo}</figcaption>}
                </figure>
              </li>
            ))}
          </ul>
        )}

        {verMas && (
          <Link href="/trabajos" className="boton boton-hierro mt-7 inline-flex gap-3 px-[26px] whitespace-nowrap">
            {conObras ? `Ver las ${trabajos.length} obras` : "Ver toda la galería"}
            <span aria-hidden="true" className="text-acento">
              →
            </span>
          </Link>
        )}
      </div>
    </section>
  );
}
