import { mediaVisible, type SiteConfig } from "@andrei-leads/core";

type Props = {
  anios?: number;
  valoracion: SiteConfig["valoracion"];
  municipios: number;
  tiempoLlegada?: string;
  urgencias24h: boolean;
  acreditaciones: SiteConfig["acreditaciones"];
  garantias: SiteConfig["garantias"];
  /** En el inicio va bajo el hero (sube 28/111 px para encajar las diagonales). */
  bajoHero?: boolean;
};

type Cifra = { valor: number; etiqueta: string };

/**
 * CifrasContador (franja de confianza): banda tinta cortada en diagonal arriba y abajo. Cada cifra
 * numérica (años de oficio, reseñas en Google, municipios) como la esfera de un contador de agua:
 * dígitos en cajas tinta y la última en primario. El tiempo de llegada y «24 h» van como placas de
 * texto, con su etiqueta encima («Llegamos en» / «30 min»). Debajo, acreditaciones con número y
 * garantías separadas por «/». Sin datos, no existe. Sin animación: la cifra se ve siempre.
 */
export function CifrasContador({ anios, valoracion, municipios, tiempoLlegada, urgencias24h, acreditaciones, garantias, bajoHero }: Props) {
  const cifras: Cifra[] = [];
  if (anios) cifras.push({ valor: anios, etiqueta: anios === 1 ? "año de oficio" : "años de oficio" });
  if (valoracion && valoracion.total > 0)
    cifras.push({
      valor: valoracion.total,
      etiqueta: `${valoracion.total === 1 ? "reseña" : "reseñas"} en Google · ${mediaVisible(valoracion.media)} ★`,
    });
  if (municipios > 0) cifras.push({ valor: municipios, etiqueta: municipios === 1 ? "municipio" : "municipios" });
  const placas: { valor: string; etiqueta: string }[] = [];
  if (tiempoLlegada) placas.push({ valor: tiempoLlegada, etiqueta: "Llegamos en" });
  if (urgencias24h) placas.push({ valor: "24 h", etiqueta: "Urgencias" });
  const sello = acreditaciones.length > 0 || garantias.length > 0;
  if (cifras.length + placas.length === 0 && !sello) return null;

  return (
    <section
      aria-label="Datos de confianza"
      className={
        "banda-ambos sobre-tinta relative px-5 py-[68px] lg:px-8 " +
        (bajoHero ? "-mt-7 lg:-mt-[111px] lg:pt-[150px] lg:pb-40" : "lg:py-40")
      }
    >
      <div className="mx-auto max-w-(--container-contenido)">
        {cifras.length + placas.length > 0 && (
          <ul className="m-0 grid list-none grid-cols-2 gap-x-3.5 gap-y-[22px] p-0 lg:flex lg:flex-wrap lg:items-start lg:gap-x-14 lg:gap-y-7">
            {cifras.map((c) => {
              const digitos = String(c.valor).split("");
              return (
                <li key={c.etiqueta}>
                  <span className="sr-only">
                    {c.valor} {c.etiqueta}
                  </span>
                  <span aria-hidden="true" className="inline-flex gap-[3px] bg-sobre-tinta p-1 lg:gap-1 lg:p-[5px]">
                    {digitos.map((d, i) => (
                      <span
                        key={i}
                        className={
                          "grid h-[46px] w-8 place-items-center font-titulo text-[30px] leading-none font-bold tabular-nums lg:h-16 lg:w-[46px] lg:text-[44px] " +
                          (i === digitos.length - 1 ? "bg-primario text-sobre-primario" : "bg-tinta text-white")
                        }
                      >
                        {d}
                      </span>
                    ))}
                  </span>
                  <p aria-hidden="true" className="mt-2 mb-0 text-sm leading-[1.3] font-medium lg:mt-2.5 lg:text-base">
                    {c.etiqueta}
                  </p>
                </li>
              );
            })}
            {placas.map((p) => (
              <li key={p.etiqueta}>
                <span className="sr-only">
                  {p.etiqueta} {p.valor}
                </span>
                <p aria-hidden="true" className="mt-0 mb-2 text-sm leading-[1.3] font-medium lg:mb-2.5 lg:text-base">
                  {p.etiqueta}
                </p>
                <span
                  aria-hidden="true"
                  className="inline-flex h-[54px] items-center border-2 border-sobre-tinta px-4 font-titulo text-[28px] leading-none font-bold text-acento lg:h-[74px] lg:px-[22px] lg:text-[40px]"
                >
                  {p.valor}
                </span>
              </li>
            ))}
          </ul>
        )}
        {sello && (
          <>
            <div aria-hidden="true" className="rayado mt-[26px] text-texto-suave lg:mt-[30px]" />
            <div className="mt-3.5 lg:mt-4 lg:flex lg:flex-wrap lg:items-baseline lg:gap-x-8 lg:gap-y-2">
              {acreditaciones.length > 0 && (
                <ul className="m-0 list-none p-0">
                  {acreditaciones.map((a) => (
                    <li key={a.nombre} className="font-titulo text-base leading-[1.3] font-bold lg:text-[17px]">
                      {a.nombre}
                      {a.numero && ` · ${a.numero}`}
                    </li>
                  ))}
                </ul>
              )}
              {garantias.length > 0 && (
                <p className="mt-1.5 mb-0 text-[15px] leading-normal lg:mt-0 lg:text-base">{garantias.join(" / ")}</p>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
