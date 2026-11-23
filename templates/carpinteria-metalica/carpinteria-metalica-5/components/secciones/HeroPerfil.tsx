import { etiquetaOrigen, type Imagen, type SiteConfig, type VideoHero } from "@andrei-leads/core";

import { Filetes } from "@/components/Filetes";
import { Pareja, type DatosCta } from "@/components/Pareja";
import { CLASE_ETIQUETA } from "@/components/base/Foto";
import { MedioHero } from "@/components/base/MedioHero";
import { TEXTO_WA } from "@/lib/mensajes";
import { llamarHero, textoValoracion } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  sector: string;
  ciudad: string;
  video?: VideoHero;
  imagen?: Imagen;
  valoracion: SiteConfig["valoracion"];
  descripcion: string;
  /** «Lumbral Ventanas · Desde 2009 · Taller en Alcobendas» (fila de escritorio bajo el hero). */
  antetitulo: string;
  cta: DatosCta;
};

/** «{sector} en *{ciudad}*»: la ciudad, en cursiva, sale del dato. */
function Titular({ sector, ciudad }: { sector: string; ciudad: string }) {
  return (
    <>
      {sector} en <em>{ciudad}</em>
    </>
  );
}

function Valoracion({ v, claro }: { v: NonNullable<SiteConfig["valoracion"]>; claro?: boolean }) {
  return (
    <p className={cn("m-0 flex min-h-6 items-center gap-3 text-sm leading-[1.3]", claro ? "text-texto-suave lg:text-texto-medio" : "text-texto-suave")}>
      <Filetes ancho={12} className="lg:[&>span]:w-3.5" />
      <span>{textoValoracion(v)}</span>
    </p>
  );
}

/** Fila de escritorio bajo el hero: antetítulo en versalitas y la descripción en serif. */
function Intro({ antetitulo, descripcion }: { antetitulo: string; descripcion: string }) {
  return (
    <div className="contenedor hidden flex-wrap items-baseline justify-between gap-12 pt-14 lg:flex">
      <p className="versalitas">{antetitulo}</p>
      <p className="m-0 max-w-[34ch] font-titulo text-[28px] leading-[1.35] font-[350]">{descripcion}</p>
    </div>
  );
}

/**
 * Hero «Perfil» (encargo §5). Con vídeo o foto: el medio empieza bajo la cabecera (56 svh en
 * móvil, 88 svh en escritorio) con el `h1` en serif sobre su tercio inferior; debajo (en móvil)
 * o a la derecha del `h1` (en escritorio) la valoración con filetes y la pareja; nada de esto
 * se anima. Sin vídeo ni foto: hero tipográfico con el `h1` más grande y el dibujo de la
 * sección de un perfil en filetes anodizados (decorativo).
 */
export function HeroPerfil({ sector, ciudad, video, imagen, valoracion, descripcion, antetitulo, cta }: Props) {
  const foto = video?.poster ?? imagen;
  const etiqueta = foto && etiquetaOrigen(foto);
  const pareja = <Pareja cta={cta} textoWhatsapp={TEXTO_WA} textoLlamar={cta.whatsapp ? llamarHero(cta.telefono) : undefined} alto={56} />;

  if (!foto) {
    return (
      <>
        <section aria-label="Presentación" className="contenedor pt-6 lg:flex lg:items-end lg:justify-between lg:gap-16 lg:pt-[88px]">
          <PerfilMovil />
          <div className="min-w-0 flex-auto">
            <h1 className="m-0 mt-6 max-w-[12ch] font-titulo text-gigante font-[350] tracking-[-0.025em] lg:mt-0">
              <Titular sector={sector} ciudad={ciudad} />
            </h1>
            <div className="mt-4 flex max-w-[560px] flex-col gap-3 lg:mt-8 lg:gap-4">
              {valoracion && <Valoracion v={valoracion} />}
              {pareja}
              <p className="m-0 mt-3 text-texto-suave lg:hidden">{descripcion}</p>
            </div>
          </div>
          <PerfilEscritorio />
        </section>
        <Intro antetitulo={antetitulo} descripcion={descripcion} />
      </>
    );
  }

  return (
    <>
      <section
        aria-label="Presentación"
        className="relative -mt-(--alto-cabecera) grid grid-cols-[minmax(0,1fr)] grid-rows-[max(300px,56svh)_auto] lg:h-[88svh] lg:min-h-[560px] lg:grid-cols-[minmax(0,1fr)_min(540px,44%)] lg:grid-rows-[1fr_auto] lg:gap-x-12 lg:px-16 lg:pb-20"
      >
        <div className="relative col-start-1 row-start-1 overflow-hidden bg-medio lg:absolute lg:inset-0 lg:col-start-auto lg:row-start-auto">
          <MedioHero video={video} imagen={video ? undefined : imagen} />
          {etiqueta && <span className={cn(CLASE_ETIQUETA, "top-[68px] left-5 lg:top-[84px] lg:left-16")}>{etiqueta}</span>}
        </div>
        <h1 className="relative z-[3] col-start-1 row-start-1 m-0 self-end pr-[76px] pb-5 pl-5 font-titulo text-[min(var(--text-display),8.5svh,12.5vw)] break-words leading-[0.95] font-[350] tracking-[-0.02em] lg:row-start-2 lg:p-0 lg:text-display">
          <span className="block max-w-[12ch]">
            <Titular sector={sector} ciudad={ciudad} />
          </span>
        </h1>
        <div className="relative z-[3] row-start-2 flex flex-col gap-3 px-5 pt-4 lg:col-start-2 lg:gap-4 lg:self-end lg:p-0 lg:pb-1.5">
          {valoracion && <Valoracion v={valoracion} claro />}
          {pareja}
          <p className="m-0 mt-3 text-texto-suave lg:hidden">{descripcion}</p>
        </div>
      </section>
      <Intro antetitulo={antetitulo} descripcion={descripcion} />
    </>
  );
}

/** Sección de un perfil de corredera en filetes de 1 px (móvil). Decorativo, sin datos. */
function PerfilMovil() {
  return (
    <svg aria-hidden="true" viewBox="0 0 240 96" width="100%" height="96" preserveAspectRatio="xMinYMid meet" fill="none" className="stroke-anodizado lg:hidden">
      <rect x="0.5" y="24.5" width="160" height="56" vectorEffect="non-scaling-stroke" />
      <rect x="10.5" y="34.5" width="44" height="36" vectorEffect="non-scaling-stroke" />
      <rect x="62.5" y="34.5" width="8" height="36" vectorEffect="non-scaling-stroke" />
      <rect x="78.5" y="34.5" width="72" height="36" vectorEffect="non-scaling-stroke" />
      <line x1="104.5" y1="0" x2="104.5" y2="24" vectorEffect="non-scaling-stroke" />
      <line x1="118.5" y1="0" x2="118.5" y2="24" vectorEffect="non-scaling-stroke" />
      <line x1="160.5" y1="52.5" x2="240" y2="52.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** La misma sección, con cota, a 380 px (escritorio). */
function PerfilEscritorio() {
  return (
    <svg aria-hidden="true" viewBox="0 0 240 160" width="380" height="253" fill="none" className="hidden flex-none stroke-anodizado lg:block">
      <rect x="0.5" y="40.5" width="200" height="80" vectorEffect="non-scaling-stroke" />
      <rect x="12.5" y="52.5" width="56" height="56" vectorEffect="non-scaling-stroke" />
      <rect x="78.5" y="52.5" width="10" height="56" vectorEffect="non-scaling-stroke" />
      <rect x="98.5" y="52.5" width="90" height="56" vectorEffect="non-scaling-stroke" />
      <rect x="126.5" y="30.5" width="8" height="10" vectorEffect="non-scaling-stroke" />
      <line x1="130.5" y1="0" x2="130.5" y2="30" vectorEffect="non-scaling-stroke" />
      <line x1="146.5" y1="0" x2="146.5" y2="40" vectorEffect="non-scaling-stroke" />
      <line x1="200.5" y1="80.5" x2="240" y2="80.5" vectorEffect="non-scaling-stroke" />
      <line x1="0" y1="140.5" x2="200" y2="140.5" vectorEffect="non-scaling-stroke" />
      <line x1="0.5" y1="134" x2="0.5" y2="146" vectorEffect="non-scaling-stroke" />
      <line x1="200.5" y1="134" x2="200.5" y2="146" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
