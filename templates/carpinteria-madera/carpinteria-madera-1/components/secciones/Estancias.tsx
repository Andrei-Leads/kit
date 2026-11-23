import Link from "next/link";
import { BotonLlamada, BotonWhatsApp, type SiteConfig } from "@andrei-leads/core";

import { contorno } from "@/components/Botones";
import { Foto } from "@/components/base/Foto";
import { mensajeDeServicio, mensajeInicio, TEXTO_ESTANCIA, TEXTO_ESTANCIA_LLAMAR } from "@/lib/mensajes";
import { cuentaTrabajos, numero, pieTrabajo, type Estancia, type FotoEstancia } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Contacto = SiteConfig["contacto"];

/** estancia-texto (entrega, desviación 1): botón de contorno de 2 px con flecha, 48 px. */
const ESTANCIA = cn(contorno, "con-flecha min-h-12 px-5 text-base");

/** «Quiero algo así →» con el mensaje del servicio del grupo; sin WhatsApp, «Llamar para algo así». */
export function BotonEstancia({ estancia, contacto }: { estancia: Estancia; contacto: Contacto }) {
  const flecha = (
    <span aria-hidden="true" className="flecha">
      →
    </span>
  );
  if (!contacto.whatsapp) {
    return (
      <BotonLlamada telefono={contacto.telefono} className={ESTANCIA}>
        {TEXTO_ESTANCIA_LLAMAR}
        {flecha}
      </BotonLlamada>
    );
  }
  const mensaje = estancia.servicio ? mensajeDeServicio(estancia.servicio) : mensajeInicio(contacto);
  return (
    <BotonWhatsApp numero={contacto.whatsapp} mensaje={mensaje} className={ESTANCIA}>
      {TEXTO_ESTANCIA}
      {flecha}
    </BotonWhatsApp>
  );
}

/** Fila de anclas a cada grupo (solo con 2 grupos o más: entrega, desviación 2). */
export function AnclasEstancias({ estancias }: { estancias: readonly Estancia[] }) {
  if (estancias.length < 2) return null;
  return (
    <nav aria-label="Estancias" className="flex flex-wrap gap-x-6 gap-y-1 border-b border-filete py-3 text-[15px]">
      {estancias.map((e) => (
        <a key={e.id} href={`#${e.id}`} className="enlace inline-flex min-h-11 items-center">
          {e.titulo}
        </a>
      ))}
    </nav>
  );
}

/** Cabecera de un grupo: número en cursiva, título gigante y cuántos trabajos. */
export function CabeceraEstancia({ estancia, indice, nivel }: { estancia: Estancia; indice: number; nivel: "h2" | "h3" }) {
  const Titulo = nivel;
  return (
    <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
      <span aria-hidden="true" className="font-titulo text-[clamp(1.25rem,1rem+1vw,2rem)] leading-none text-texto-suave italic">
        {numero(indice)}
      </span>
      <Titulo data-aparecer className="flex-[1_1_auto] font-titulo text-estancia font-normal tracking-[-0.03em]">
        {estancia.titulo}
      </Titulo>
      <span className="text-[15px] text-texto-suave">{cuentaTrabajos(estancia.trabajos.length)}</span>
    </div>
  );
}

/** Foto pequeña (4:5) con su pie en cursiva; todo el bloque enlaza a la ficha del trabajo. */
export function FotoPequena({ foto, sizes }: { foto: FotoEstancia; sizes: string }) {
  return (
    <Link href={`/trabajos/${foto.trabajo.slug}`} className="foto-estancia grid content-start gap-2.5 no-underline">
      <Foto imagen={foto.imagen} sizes={sizes} proporcion="4/5" decorativa />
      <span className="pie-foto text-[15px]">{foto.pie}</span>
    </Link>
  );
}

/**
 * Un grupo del inicio (encargo §6.2): una pantalla con el título del servicio en serif gigante,
 * una foto a sangre (4:5 en móvil, 16:9 en escritorio) y hasta dos pequeñas a columna, cada foto
 * con su pie en cursiva y enlazada a su ficha; al final, «Quiero algo así».
 */
export function GrupoInicio({ estancia, indice, contacto }: { estancia: Estancia; indice: number; contacto: Contacto }) {
  const { grande, pequenas } = estancia;
  return (
    <div id={estancia.id} className="scroll-mt-20 pt-[clamp(56px,8vw,128px)]">
      <div className="marco">
        <CabeceraEstancia estancia={estancia} indice={indice} nivel="h3" />
      </div>
      <Link href={`/trabajos/${grande.trabajo.slug}`} className="foto-estancia mt-[clamp(24px,3vw,40px)] block no-underline">
        <Foto imagen={grande.imagen} sizes="100vw" proporcion="relleno" decorativa className="aspect-[4/5] lg:aspect-video" />
        <span className="marco pie-foto mt-3 block">{grande.pie}</span>
      </Link>
      {pequenas.length > 0 && (
        <div className="marco mt-[clamp(28px,4vw,56px)] ml-auto grid max-w-[760px] grid-cols-2 gap-[clamp(12px,2vw,28px)]">
          {pequenas.map((p) => (
            <FotoPequena key={p.imagen.src + p.trabajo.slug} foto={p} sizes="(min-width: 1024px) 340px, 45vw" />
          ))}
        </div>
      )}
      <div className="marco pt-[clamp(24px,3vw,40px)]">
        <BotonEstancia estancia={estancia} contacto={contacto} />
      </div>
    </div>
  );
}

/** Un grupo de /trabajos (encargo §7): todos sus trabajos en rejilla 4:5 con pie. */
export function GrupoPagina({ estancia, indice, contacto }: { estancia: Estancia; indice: number; contacto: Contacto }) {
  return (
    <section id={estancia.id} className="marco scroll-mt-20 pt-[clamp(56px,8vw,120px)]">
      <div className="mb-[clamp(24px,3vw,40px)]">
        <CabeceraEstancia estancia={estancia} indice={indice} nivel="h2" />
      </div>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,340px),1fr))] gap-x-6 gap-y-10">
        {estancia.trabajos.map((t) => (
          <li key={t.slug}>
            <FotoPequena
              foto={{ imagen: t.imagenes[0], trabajo: t, pie: pieTrabajo(t) }}
              sizes="(min-width: 1280px) 400px, (min-width: 768px) 45vw, 100vw"
            />
          </li>
        ))}
      </ul>
      <div className="pt-7">
        <BotonEstancia estancia={estancia} contacto={contacto} />
      </div>
    </section>
  );
}
