import { mediaVisible, type Imagen, type SiteConfig } from "@andrei-leads/core";

import { MedioHero } from "@/components/base/MedioHero";
import { Estrellas } from "@/components/Estrellas";
import { Onda } from "@/components/Onda";
import { Pareja } from "@/components/Pareja";
import { primerTramoHorario, type DatosCta } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  sector: string;
  ciudad: string;
  imagen?: Imagen;
  valoracion?: SiteConfig["valoracion"];
  contacto: Pick<SiteConfig["contacto"], "urgencias24h" | "tiempoLlegada" | "horario">;
  cta: DatosCta;
};

/** Chips «24 h» y «Llegamos en X», cada uno solo con su dato. */
function chips({ urgencias24h, tiempoLlegada }: Props["contacto"]): string[] {
  return [urgencias24h ? "24 h" : "", tiempoLlegada ? `Llegamos en ${tiempoLlegada}` : ""].filter(Boolean);
}
const RADIOS_CHIP = ["rounded-piedra-2", "rounded-piedra-3"];

/**
 * Hero de «La furgoneta». Con `imagenesHero[0]`: foto documental a sangre
 * (preload, `sizes="100vw"`, recorte `center 70%`) con velo abajo, la cabecera
 * transparente encima (con su propio velo de tinta, globals.css), chips en tinta al 75 % y una onda arena que «muerde» el borde inferior. Sin foto:
 * hero tipográfico sobre la arena con la ciudad en cursiva y una piedra
 * primario-suave detrás. Nada se anima aquí (LCP y llamada).
 */
export function HeroSangre({ sector, ciudad, imagen, valoracion, contacto, cta }: Props) {
  const lista = chips(contacto);
  const media = valoracion ? mediaVisible(valoracion.media) : undefined;

  if (imagen) {
    return (
      <section data-cabecera-sobre-foto className="relative h-[max(520px,84svh)] overflow-hidden bg-tinta md:h-[88svh]">
        <MedioHero
          imagen={imagen}
          sizes="100vw"
          className="absolute inset-0 rounded-none"
          claseImagen="object-[center_70%]"
          posicionEtiqueta="arriba-derecha"
          claseEtiqueta="top-[clamp(6rem,5rem+3vw,7.5rem)] right-[clamp(1.25rem,0.6rem+3.2vw,4rem)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,rgb(35_33_30/.9)_0%,rgb(35_33_30/.72)_42%,rgb(35_33_30/.3)_68%,transparent_86%)]"
        />
        <div className="absolute inset-x-0 bottom-0 pb-[clamp(3rem,2rem+3vw,6rem)]">
          <div className="contenedor">
            <div className="flex max-w-[560px] flex-col gap-4 text-white">
              <h1 className="m-0 font-titulo text-[clamp(2.5rem,1.6rem+3.8vw,5rem)] leading-none font-medium tracking-[-0.025em] text-balance">
                {sector} en <em className="italic">{ciudad}</em>
              </h1>
              {lista.length > 0 && (
                <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                  {lista.map((c, i) => (
                    <li key={c} className={cn("border border-white/70 bg-tinta/75 px-3.5 py-1 text-[0.9375rem] leading-snug font-semibold", RADIOS_CHIP[i])}>
                      {c}
                    </li>
                  ))}
                </ul>
              )}
              <Pareja
                cta={cta}
                variante="foto"
                className="mt-1"
                linea={
                  valoracion ? (
                    <p className="m-0 text-[0.9375rem] leading-snug font-semibold">
                      <span aria-hidden="true">★ </span>
                      {media} · {valoracion.total} vecinos lo recomiendan en Google
                    </p>
                  ) : null
                }
              />
            </div>
          </div>
        </div>
        <Onda className="absolute inset-x-0 -bottom-px text-fondo" />
      </section>
    );
  }

  const horario = primerTramoHorario(contacto.horario);
  return (
    <section className="relative overflow-hidden pt-[clamp(2rem,1.5rem+3vw,5rem)] pb-[clamp(3.5rem,2.5rem+4vw,7rem)]">
      <div
        aria-hidden="true"
        className="absolute top-[2%] -right-[8%] z-0 aspect-[1/1.05] w-[60%] rounded-[58%_42%_51%_49%/45%_55%_45%_55%] bg-primario-suave"
      />
      <div className="contenedor relative z-[1] flex flex-col gap-[clamp(1.25rem,1rem+1vw,2rem)]">
        <h1 className="m-0 max-w-[12ch] font-titulo text-display leading-[0.95] font-medium tracking-[-0.03em] text-balance">
          {sector} en <em className="text-primario-texto italic">{ciudad}</em>
        </h1>
        {lista.length > 0 && (
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
            {lista.map((c, i) => (
              <li key={c} className={cn("border-2 border-texto bg-superficie px-3.5 py-1 text-[0.9375rem] leading-snug font-bold", RADIOS_CHIP[i])}>
                {c}
              </li>
            ))}
          </ul>
        )}
        {valoracion && (
          <div className="flex items-center gap-4">
            <span className="font-titulo text-[clamp(3.5rem,2.8rem+3vw,5.5rem)] leading-[0.9] font-medium tracking-[-0.03em]">{media}</span>
            <span className="leading-snug">
              <Estrellas puntuacion={valoracion.media} etiqueta={`${media} de 5 estrellas`} className="block text-[1.375rem] text-acento" />
              <span className="font-semibold">{valoracion.total} vecinos lo recomiendan en Google</span>
            </span>
          </div>
        )}
        <Pareja
          cta={cta}
          className="max-w-[560px]"
          linea={horario ? <p className="m-0 text-[0.9375rem] leading-snug font-semibold">{horario}</p> : null}
        />
      </div>
    </section>
  );
}
