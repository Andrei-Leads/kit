import { BotonLlamada, telefonoVisible, type SiteConfig } from "@andrei-leads/core";

import { MarcasCorte } from "@/components/Marcas";
import { NombreNegocio } from "@/components/NombreNegocio";
import { Pareja } from "@/components/Pareja";
import { acreditacionSello, lineaConfianza, siglaSello, valoracionParte } from "@/lib/formato";
import { mensajeAviso } from "@/lib/mensajes";

type Props = Pick<SiteConfig, "negocio" | "contacto" | "acreditaciones" | "valoracion">;

/**
 * HeroParte (encargo §5 y §6.1): cabecera de parte sobre papel con retícula y marcas de corte.
 * Casillas «PARTE DE TRABAJO · nombre», sello rotado con la primera acreditación con número (sin ella,
 * no hay sello), h1 «{sector} en {ciudad}», el teléfono gigante (`BotonLlamada`, el LCP) con su cota
 * roja «Llamar», la pareja de botones y las casillas de valoración, urgencias y llegada (solo con dato).
 * Nada se anima aquí.
 */
export function HeroParte({ negocio, contacto, acreditaciones, valoracion }: Props) {
  const sello = acreditacionSello(acreditaciones);
  const sigla = sello ? siglaSello(sello.nombre) : "";
  const casillas = [
    valoracion && { rotulo: "Valoración", valor: valoracionParte(valoracion) },
    contacto.urgencias24h && { rotulo: "Urgencias", valor: "24 h" },
    contacto.tiempoLlegada && { rotulo: "Llegada estimada", valor: contacto.tiempoLlegada },
  ].filter((c): c is { rotulo: string; valor: string } => Boolean(c));

  return (
    <section id="aviso" aria-labelledby="h1-inicio" className="reticula relative border-b border-texto px-(--pad) pt-6 pb-9">
      <MarcasCorte />
      <div className="flex flex-wrap border border-texto bg-superficie">
        <div className="flex flex-none items-center border-r border-texto px-2.5 py-2 font-titulo text-[0.6875rem] font-bold tracking-[0.06em] text-primario uppercase">
          Parte de trabajo
        </div>
        <div
          className={`flex-1 px-2.5 py-2 font-titulo text-sm leading-tight font-bold uppercase ${
            negocio.nombre.length > 24 ? "min-w-[220px]" : "min-w-[140px]"
          }`}
        >
          <NombreNegocio nombre={negocio.nombre} logo={negocio.logo} />
        </div>
      </div>

      <div className="mt-4.5 flex items-center justify-between gap-4 lg:min-h-[132px]">
        <h1 id="h1-inicio" className="font-titulo text-2xl leading-tight font-medium tracking-[-0.01em]">
          {negocio.sector} en {contacto.direccion.ciudad}
        </h1>
        {sello && (
          <p className="sello flex size-[108px] flex-none -rotate-6 flex-col items-center justify-center gap-0.5 p-2.5 lg:size-[136px]">
            <span className="text-[0.5rem] tracking-[0.02em] lg:text-[0.5625rem] lg:tracking-[0.04em]">Acreditación</span>
            <span
              className={
                sigla.length > 8
                  ? "text-[0.625rem] leading-tight font-extrabold"
                  : "text-[0.9375rem] leading-tight font-extrabold tracking-[0.02em] lg:text-lg"
              }
            >
              {sigla}
            </span>
            <span className="text-[0.625rem] font-semibold [font-stretch:75%]">{sello.numero}</span>
          </p>
        )}
      </div>

      {/* llamada-hero: el número entero es el enlace; la cota roja «Llamar» mide su ancho. */}
      <BotonLlamada telefono={contacto.telefono} className="mt-3.5 inline-flex min-h-11 max-w-full flex-col text-texto no-underline">
        <span className="block font-titulo text-telefono leading-none font-semibold tracking-[-0.02em] [font-stretch:75%]">
          {telefonoVisible(contacto.telefono)}
        </span>
        <span className="mt-2.5 flex items-center text-primario">
          <span aria-hidden="true" className="h-3 w-px bg-current" />
          <span aria-hidden="true" className="size-0 border-y-4 border-r-[7px] border-y-transparent border-r-current" />
          <span aria-hidden="true" className="h-px flex-1 bg-current" />
          <span className="px-2.5 font-titulo text-[0.6875rem] font-bold tracking-[0.08em] uppercase">Llamar</span>
          <span aria-hidden="true" className="h-px flex-1 bg-current" />
          <span aria-hidden="true" className="size-0 border-y-4 border-l-[7px] border-y-transparent border-l-current" />
          <span aria-hidden="true" className="h-3 w-px bg-current" />
        </span>
      </BotonLlamada>

      <Pareja contacto={contacto} mensaje={mensajeAviso(contacto)} confianza={lineaConfianza({ valoracion, contacto })} className="mt-4.5" />

      {casillas.length > 0 && (
        <div className="casillas mt-6">
          {casillas.map((c) => (
            <div key={c.rotulo} className="casilla flex-[1_1_150px] px-2.5 py-2">
              <div className="font-titulo text-[0.6875rem] tracking-[0.06em] text-texto-suave uppercase">{c.rotulo}</div>
              <div className="mt-0.5 text-[0.9375rem] font-semibold">{c.valor}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
