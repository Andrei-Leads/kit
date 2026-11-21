import { mediaVisible, type Imagen, type SiteConfig } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { Pareja } from "@/components/Botones";
import { Estrellas, IconoExterno } from "@/components/Iconos";
import { anioActual } from "@/lib/anio";
import { partirAcreditacion, partirCifra, valoracionCompleta, type DatosCta } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  negocio: Pick<SiteConfig["negocio"], "sector" | "descripcionCorta" | "anioFundacion">;
  contacto: Pick<SiteConfig["contacto"], "direccion" | "urgencias24h" | "tiempoLlegada" | "fichaGoogle">;
  valoracion: SiteConfig["valoracion"];
  acreditacion?: SiteConfig["acreditaciones"][number];
  zonas: readonly string[];
  imagen?: Imagen;
  cta: DatosCta;
};

type Cifra = "valoracion" | "llegada" | "anios" | "habilitacion" | "zonas";

const TARJETA = "cifra-tarjeta relative flex min-h-[176px] flex-col rounded-tarjeta bg-superficie p-[18px] text-texto lg:min-h-[216px] lg:p-[26px]";
const ETIQUETA = "m-0 text-sm font-semibold text-texto-suave";

/**
 * Hero «bento» sobre la banda de color pleno (encargo §5). Tarjetas en el orden
 * del DOM: Titular → cifras (valoración, llegada, años, habilitación, zonas;
 * cada una solo con su dato) → foto. La rejilla la coloca globals.css
 * (`.hero-bento`, con data-cifras y data-foto). Nada se anima: es la primera
 * pantalla. Cada cifra lleva el texto completo para el lector de pantalla.
 */
export async function HeroBento({ negocio, contacto, valoracion, acreditacion, zonas, imagen, cta }: Props) {
  const cifras: Cifra[] = [];
  if (valoracion) cifras.push("valoracion");
  if (contacto.tiempoLlegada) cifras.push("llegada");
  if (negocio.anioFundacion) cifras.push("anios");
  if (acreditacion) cifras.push("habilitacion");
  if (zonas.length > 0) cifras.push("zonas");

  // Móvil (2 columnas): sin foto, la valoración pasa a tarjeta ancha; con un número
  // impar de cifras en parejas, la última ocupa las dos columnas.
  const anchas = new Set<Cifra>();
  const emparejadas = !imagen && valoracion ? cifras.filter((c) => c !== "valoracion") : cifras;
  if (!imagen && valoracion) anchas.add("valoracion");
  if (emparejadas.length % 2 === 1) anchas.add(emparejadas[emparejadas.length - 1]);

  const anioHoy = negocio.anioFundacion ? await anioActual() : 0;

  const clase = (c: Cifra) => cn(TARJETA, anchas.has(c) && "ancha-movil", c === cifras[cifras.length - 1] && "cifra-ultima");

  function tarjeta(c: Cifra) {
    switch (c) {
      case "valoracion": {
        const v = valoracion!;
        return (
          <div key={c} className={clase(c)}>
            <span className="sr-only">{valoracionCompleta(v)}</span>
            <p aria-hidden="true" className={ETIQUETA}>
              Google
            </p>
            {contacto.fichaGoogle && (
              <a
                href={contacto.fichaGoogle}
                rel="noopener"
                className="boton absolute top-3 right-3 grid size-11 place-items-center rounded-full bg-primario-suave text-texto lg:top-4 lg:right-4"
              >
                <IconoExterno />
                <span className="sr-only">Ver reseñas en Google</span>
              </a>
            )}
            <p aria-hidden="true" className="m-0 mt-auto flex items-baseline gap-1.5 pt-3">
              <span className="cifra">{mediaVisible(v.media)}</span>
              <span className="text-lg font-bold">/5</span>
            </p>
            <span aria-hidden="true" className="raya-acento mt-2" />
            <Estrellas puntuacion={v.media} className="mt-2" />
            <p aria-hidden="true" className="m-0 mt-1 text-[0.9375rem] text-texto-suave">
              {v.total} {v.total === 1 ? "reseña" : "reseñas"} en Google
            </p>
          </div>
        );
      }
      case "llegada": {
        const { numero, unidad } = partirCifra(contacto.tiempoLlegada!);
        return (
          <div key={c} className={clase(c)}>
            <span className="sr-only">Llegamos en {contacto.tiempoLlegada}</span>
            <p aria-hidden="true" className={ETIQUETA}>
              Llegamos en
            </p>
            <p aria-hidden="true" className="m-0 mt-auto flex items-baseline gap-1.5 pt-3">
              <span className={unidad ? "cifra" : "font-titulo text-[1.75rem] leading-tight font-bold"}>{numero}</span>
              {unidad && <span className="text-xl font-bold">{unidad}</span>}
            </p>
            <span aria-hidden="true" className="raya-acento mt-2" />
          </div>
        );
      }
      case "anios": {
        const anios = anioHoy - negocio.anioFundacion!;
        return (
          <div key={c} className={clase(c)}>
            <span className="sr-only">Desde {negocio.anioFundacion}</span>
            <p aria-hidden="true" className={ETIQUETA}>
              Desde
            </p>
            <p aria-hidden="true" className="cifra m-0 mt-auto pt-3">
              {negocio.anioFundacion}
            </p>
            <span aria-hidden="true" className="raya-acento mt-2" />
            {anios > 1 && (
              <p className="m-0 mt-2 text-[0.9375rem] text-texto-suave">
                {anios} años en {contacto.direccion.ciudad}
              </p>
            )}
          </div>
        );
      }
      case "habilitacion": {
        const a = acreditacion!;
        const { corto, largo } = partirAcreditacion(a.nombre);
        return (
          <div key={c} className={clase(c)}>
            <span className="sr-only">
              {a.nombre}
              {a.numero && `, número ${a.numero}`}
            </span>
            <p aria-hidden="true" className={ETIQUETA}>
              Habilitados
            </p>
            {corto ? (
              <p aria-hidden="true" className="cifra m-0 mt-auto pt-3">
                {corto}
              </p>
            ) : (
              <p aria-hidden="true" className="m-0 mt-auto pt-3 font-titulo text-xl leading-tight font-bold text-balance wrap-anywhere">
                {largo}
              </p>
            )}
            <span aria-hidden="true" className="raya-acento mt-2" />
            {(corto || a.numero) && (
              <p aria-hidden="true" className="m-0 mt-2 text-[0.9375rem] leading-snug text-texto-suave">
                {corto && largo}
                {corto && a.numero && " · "}
                {a.numero && `n.º ${a.numero}`}
              </p>
            )}
          </div>
        );
      }
      case "zonas": {
        const n = zonas.length;
        return (
          <div key={c} className={clase(c)}>
            <span className="sr-only">
              {n === 1 ? `Trabajamos en ${zonas[0]}` : `${n} municipios: ${zonas.slice(0, 3).join(", ")}${n > 3 ? "…" : ""}`}
            </span>
            <p aria-hidden="true" className={ETIQUETA}>
              Trabajamos en
            </p>
            <p aria-hidden="true" className="m-0 mt-auto flex items-baseline gap-1.5 pt-3">
              <span className="cifra">{n}</span>
              <span className="text-xl font-bold">{n === 1 ? "municipio" : "municipios"}</span>
            </p>
            <span aria-hidden="true" className="raya-acento mt-2" />
            <p aria-hidden="true" className="m-0 mt-2 text-[0.9375rem] leading-snug text-texto-suave">
              {zonas.slice(0, 3).join(", ")}
              {n > 3 && "…"}
            </p>
          </div>
        );
      }
    }
  }

  return (
    <section aria-label="Presentación" className="sobre-pleno bg-pleno pt-4 pb-[clamp(2.5rem,1.5rem+3vw,4rem)] text-sobre-primario">
      <div className="contenedor">
        <div className="hero-bento" data-cifras={cifras.length} data-foto={imagen ? "si" : "no"}>
          <div className="titular flex flex-col justify-center py-2 lg:py-8 lg:pr-8">
            {contacto.urgencias24h && (
              <p className="m-0 mb-5">
                <span className="inline-flex min-h-9 items-center gap-2 rounded-boton border-2 border-sobre-primario px-3 text-sm font-bold">
                  <span aria-hidden="true" className="size-2.5 rounded-full bg-acento" />
                  Urgencias 24 h
                </span>
              </p>
            )}
            <h1 className="m-0 max-w-[14ch] font-titulo text-display leading-[1] font-[750] tracking-[-0.035em] text-balance">
              {negocio.sector} en {contacto.direccion.ciudad}
            </h1>
            <p className="mt-4 mb-0 max-w-[36ch] text-[1.0625rem] leading-normal lg:text-xl">{negocio.descripcionCorta}</p>
            <Pareja cta={cta} tono="pleno" className="mt-6" />
          </div>
          {cifras.map(tarjeta)}
          {imagen && (
            <div className="foto rounded-tarjeta bg-superficie p-2.5">
              <Foto
                imagen={imagen}
                sizes="(min-width: 1024px) 40vw, 100vw"
                proporcion="relleno"
                preload
                className="aspect-[4/3] w-full lg:aspect-auto lg:h-full lg:min-h-[280px]"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
