import type { Servicio, SiteConfig } from "@andrei-leads/core";

import { FilaIndice, ListaIndice } from "@/components/FilaIndice";
import { FilaLlamada } from "@/components/FilaLlamada";
import { ParCta } from "@/components/ParCta";
import { numeroOrden } from "@/lib/navegacion";

type Props = {
  sector: string;
  contacto: SiteConfig["contacto"];
  servicios: readonly Servicio[];
  mensaje: string;
  textoLlamar: string;
  /** Línea de confianza bajo la pareja (valoración o, sin ella, horario). */
  confianza: string;
};

/**
 * Sección estrella: el índice por síntomas. Móvil: h1, chips, pareja de llamada y WhatsApp y, debajo,
 * «¿Qué te pasa?» con una fila por servicio + `llamada-fila`. Escritorio: dos columnas (5/12 fija con
 * sticky y 7/12 con el índice a --text-display, al 70 % desde 7 servicios). No usa fotos aunque haya
 * `imagenesHero`. Nada animado (LCP: el h1 o la primera fila).
 */
export function HeroIndice({ sector, contacto, servicios, mensaje, textoLlamar, confianza }: Props) {
  const chips = [...(contacto.urgencias24h ? ["24 h"] : []), ...(contacto.tiempoLlegada ? [`Llegamos en ${contacto.tiempoLlegada}`] : [])];
  const tam = servicios.length >= 7 ? "indice-70" : "indice";
  return (
    <section className="mx-auto grid max-w-[1200px] items-start gap-y-8 px-4 pt-5 pb-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-x-16 lg:px-10 lg:pt-14 lg:pb-24">
      <div className="lg:sticky lg:top-[88px]">
        <h1 className="condensada text-[clamp(2.25rem,1.5rem+2.6vw,4.25rem)] leading-[0.98]">
          {sector} en {contacto.direccion.ciudad}
        </h1>
        {chips.length > 0 && (
          <ul className="mt-2.5 flex flex-wrap gap-2">
            {chips.map((c) => (
              <li key={c} className="inline-flex h-7 items-center border border-primario-luz px-2.5 text-xs font-bold tracking-[0.06em] text-primario-luz uppercase">
                {c}
              </li>
            ))}
          </ul>
        )}
        <ParCta
          className="mt-5"
          grande
          telefono={contacto.telefono}
          whatsapp={contacto.whatsapp}
          mensaje={mensaje}
          textoLlamar={textoLlamar}
          confianza={confianza}
        />
      </div>
      <div className="min-w-0">
        <p className="rotulo mb-3 text-primario-luz">¿Qué te pasa?</p>
        <nav aria-label="Problemas que resolvemos">
          <ListaIndice>
            {servicios.map((s, i) => (
              <FilaIndice key={s.slug} href={`/servicios/${s.slug}`} numero={numeroOrden(i)} titulo={s.titulo} detalle={s.precioDesde} tam={tam} />
            ))}
            <FilaLlamada telefono={contacto.telefono} tam={tam} />
          </ListaIndice>
        </nav>
      </div>
    </section>
  );
}
