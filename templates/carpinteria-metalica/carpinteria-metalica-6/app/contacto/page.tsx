import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BotonLlamada, BotonWhatsApp, formatearHorario, metadatosPagina, telefonoVisible, urlComoLlegar } from "@andrei-leads/core";

import config from "@/site.config";
import { grande, pastilla, pastillaClara } from "@/components/Botones";
import { IconoCorreo, IconoReloj, IconoSalir, IconoTelefono, IconoUbicacion, IconoWhatsapp } from "@/components/Iconos";
import { Migas } from "@/components/base/Migas";
import { ListaZonas } from "@/components/secciones/ZonasPreguntas";
import { mensajeInicio, TEXTO_WA_HERO } from "@/lib/mensajes";
import { cn } from "@/lib/utils";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/contacto", titulo: "Contacto" });

const ROTULO = "flex items-center gap-2.5 text-sm font-bold tracking-[0.04em] uppercase";
const TARJETA_DATO = "flex flex-col gap-2 rounded-tarjeta border border-borde bg-superficie p-5";
const ENLACE_DATO = "inline-flex min-h-11 items-center gap-1.5 self-start font-bold underline underline-offset-4";

function Dato({ icono, rotulo, children }: { icono: ReactNode; rotulo: string; children: ReactNode }) {
  return (
    <div className={TARJETA_DATO}>
      <h2 className={cn(ROTULO, "gap-2")}>
        {icono}
        {rotulo}
      </h2>
      {children}
    </div>
  );
}

/**
 * Contacto (Interiores.dc.html): la tarjeta de WhatsApp (sobre primario suave) y la del teléfono
 * con el número grande; debajo, taller con «Cómo llegar», horario y email (con la ficha de Google
 * si existe); y «Dónde trabajamos». Sin WhatsApp, el teléfono ocupa la fila y su botón es el relleno.
 */
export default function Page() {
  const { contacto, zonas } = config;
  const { direccion, whatsapp } = contacto;
  const tel = telefonoVisible(contacto.telefono);
  const horario = formatearHorario(contacto.horario);

  return (
    <section className="contenedor pt-2 pb-[clamp(56px,2rem+6vw,112px)]">
      <span data-pagina="contacto" hidden />
      <Migas
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/contacto", texto: "Contacto" },
        ]}
      />
      <h1 className="titulo-display mt-2">Contacto</h1>
      <p className="mt-3 max-w-[36rem] text-texto-suave">
        {whatsapp
          ? "La forma más rápida: una foto de tu fachada por WhatsApp. Si lo prefieres, llámanos."
          : "Llámanos y cuéntanos qué quieres cambiar en tu fachada."}
      </p>

      <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-3">
        {whatsapp && (
          <div className="flex flex-col gap-3.5 rounded-tarjeta bg-primario-suave p-[22px]">
            <h2 className={ROTULO}>
              <IconoWhatsapp />
              WhatsApp
            </h2>
            <p className="text-[clamp(1.25rem,1.1rem+0.5vw,1.5rem)] leading-[1.3] font-extrabold text-balance">
              Mándanos una foto desde la acera y te contestamos.
            </p>
            <BotonWhatsApp numero={whatsapp} mensaje={mensajeInicio(contacto)} className={cn(pastilla, grande, "mt-auto")}>
              <IconoWhatsapp tamano={20} />
              <span>{TEXTO_WA_HERO}</span>
            </BotonWhatsApp>
          </div>
        )}
        <div className="tarjeta flex flex-col gap-3.5 p-[22px]">
          <h2 className={ROTULO}>
            <IconoTelefono tamano={20} />
            Teléfono
          </h2>
          <p className="text-[clamp(1.75rem,1.4rem+1.4vw,2.5rem)] leading-[1.1] font-extrabold tracking-[-0.01em]">{tel}</p>
          <BotonLlamada telefono={contacto.telefono} className={cn(whatsapp ? pastillaClara : pastilla, grande, "mt-auto whitespace-nowrap")}>
            <IconoTelefono tamano={20} />
            <span>Llamar · {tel}</span>
          </BotonLlamada>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-3">
        <Dato icono={<IconoUbicacion />} rotulo="Taller">
          <p>
            {direccion.calle}
            <br />
            {direccion.cp} {direccion.ciudad} ({direccion.provincia})
          </p>
          <a href={urlComoLlegar(contacto)} className={ENLACE_DATO}>
            Cómo llegar
            <IconoSalir />
          </a>
        </Dato>
        {horario.length > 0 && (
          <Dato icono={<IconoReloj />} rotulo="Horario">
            <dl className="flex flex-col gap-2">
              {horario.map((f) => (
                <div key={f.dias} className="flex flex-col leading-[1.4]">
                  <dt className="font-bold">{f.dias}</dt>
                  <dd className="text-texto-suave">{f.horas}</dd>
                </div>
              ))}
            </dl>
          </Dato>
        )}
        <Dato icono={<IconoCorreo />} rotulo="Email">
          <a href={`mailto:${contacto.email}`} className="inline-flex min-h-11 items-center font-bold break-all underline underline-offset-4">
            {contacto.email}
          </a>
          {contacto.fichaGoogle && (
            <a href={contacto.fichaGoogle} className={ENLACE_DATO}>
              Nuestra ficha de Google
              <IconoSalir />
            </a>
          )}
        </Dato>
      </div>

      {zonas.length > 0 && (
        <>
          <h2 className="titulo-seccion mt-10 mb-4">Dónde trabajamos</h2>
          <ListaZonas zonas={zonas} />
        </>
      )}
    </section>
  );
}
