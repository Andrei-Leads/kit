import Link from "next/link";
import type { Servicio } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { TituloSeccion } from "@/components/TituloSeccion";
import { Foto } from "@/components/base/Foto";
import { mensajeDeServicio } from "@/lib/mensajes";
import { numero, type DatosCta } from "@/lib/textos";

const FLECHA = (
  <span aria-hidden="true" className="flecha font-texto text-xl">
    →
  </span>
);

/** Ficha tipográfica de un servicio sin foto (encargo §5): número en cursiva primario y descripción entre filetes. */
function FichaSinFoto({ indice, descripcion }: { indice: number; descripcion: string }) {
  return (
    <span className="grid min-h-[220px] content-between gap-6 border-y border-filete py-5">
      <span aria-hidden="true" className="font-titulo text-[clamp(3.5rem,2.5rem+3vw,5.5rem)] leading-none text-primario-texto italic">
        {numero(indice)}
      </span>
      <span className="text-base text-texto-suave">{descripcion}</span>
    </span>
  );
}

/**
 * «Qué hacemos» del inicio (encargo §6.3): de 2 a 6 servicios, tarjetas con foto 4:5 sin borde y el
 * título en serif con flecha fina (sin foto, la ficha tipográfica). Con 1 servicio, un bloque a dos
 * columnas con su pareja. Con más de 6, lista editorial a una columna con filete entre filas.
 */
export function Servicios({ servicios, cta }: { servicios: readonly Servicio[]; cta: DatosCta }) {
  return (
    <section aria-labelledby="titulo-servicios" className="marco seccion">
      <TituloSeccion id="titulo-servicios" className="mb-[clamp(32px,4vw,56px)]">
        Qué hacemos
      </TituloSeccion>
      {servicios.length === 1 ? (
        <UnServicio servicio={servicios[0]} cta={{ ...cta, mensaje: mensajeDeServicio(servicios[0]) }} />
      ) : servicios.length > 6 ? (
        <ul className="border-t border-filete">
          {servicios.map((s) => (
            <li key={s.slug} className="border-b border-filete">
              <Link href={`/servicios/${s.slug}`} className="con-flecha grid gap-2 py-6 text-texto no-underline lg:grid-cols-2 lg:gap-12">
                <h3 className="flex items-baseline justify-between gap-4 font-titulo text-[clamp(1.5rem,1.2rem+1vw,2rem)] leading-[1.15] font-normal">
                  <span>{s.titulo}</span>
                  {FLECHA}
                </h3>
                <p className="text-texto-suave">{s.descripcion}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-x-[clamp(20px,2.5vw,36px)] gap-y-[clamp(40px,4vw,56px)]">
          {servicios.map((s, i) => (
            <li key={s.slug} data-aparecer>
              <Link href={`/servicios/${s.slug}`} className="con-flecha grid content-start gap-3.5 text-texto no-underline">
                {s.imagenes[0] ? (
                  <Foto imagen={s.imagenes[0]} sizes="(min-width: 1280px) 380px, (min-width: 700px) 45vw, 100vw" proporcion="4/5" decorativa />
                ) : (
                  <FichaSinFoto indice={i} descripcion={s.descripcion} />
                )}
                <h3 className="flex items-baseline justify-between gap-4 font-titulo text-[clamp(1.5rem,1.2rem+1vw,2rem)] leading-[1.15] font-normal tracking-[-0.01em]">
                  <span>{s.titulo}</span>
                  {FLECHA}
                </h3>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/** Un solo servicio (encargo §5): bloque de texto a dos columnas con su pareja. */
function UnServicio({ servicio, cta }: { servicio: Servicio; cta: DatosCta }) {
  const [foto] = servicio.imagenes;
  return (
    <div className="grid items-center gap-x-[clamp(32px,5vw,80px)] gap-y-8 lg:grid-cols-2">
      {foto ? (
        <Foto imagen={foto} sizes="(min-width: 1024px) 45vw, 100vw" proporcion="4/5" className="max-w-[520px]" />
      ) : (
        <FichaSinFoto indice={0} descripcion={servicio.descripcion} />
      )}
      <div className="grid gap-4">
        <h3 className="titulo-h2">{servicio.titulo}</h3>
        {foto && <p className="max-w-[44ch] text-texto-suave">{servicio.descripcion}</p>}
        <Link href={`/servicios/${servicio.slug}`} className="enlace con-flecha justify-self-start py-2.5 text-[15px]">
          Ver el servicio <span aria-hidden="true" className="flecha">→</span>
        </Link>
        <Pareja cta={cta} />
      </div>
    </div>
  );
}
