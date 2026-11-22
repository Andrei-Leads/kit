import type { Metadata } from "next";
import { BotonLlamada, formatearHorario, listaY, mediaVisible, metadatosPagina, telefonoVisible, urlComoLlegar } from "@andrei-leads/core";

import config from "@/site.config";
import { EnlaceFlecha, Pareja } from "@/components/Botones";
import { MarcaPagina } from "@/components/MarcaPagina";
import { Migas } from "@/components/base/Migas";
import { mensajeInicio } from "@/lib/mensajes";
import { datosCta, lineaHorario } from "@/lib/textos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/contacto", titulo: "Contacto" });

const ETIQUETA = "etiqueta m-0 mb-4";

/**
 * /contacto (encargo §7): hero tipográfico con la `pareja-cta` arriba del todo
 * y el horario; el teléfono a tamaño titular (es un BotonLlamada: el número se
 * lee y se copia en escritorio); después email, horario (formatearHorario, sin
 * urgencias), dirección con «Cómo llegar», ficha de Google y zonas. Sin mapa.
 */
export default function Page() {
  const { contacto, zonas, valoracion } = config;
  const cta = datosCta(contacto, mensajeInicio(contacto));
  const horario = formatearHorario(contacto.horario);
  const { calle, cp, ciudad } = contacto.direccion;
  return (
    <>
      <MarcaPagina pagina="contacto" inicioClaro />
      <section data-tono="claro" aria-labelledby="titulo-pagina" className="bg-fondo pt-5 pb-14 lg:pt-14 lg:pb-24">
        <div className="contenedor flex flex-col gap-5">
          <Migas
            migas={[
              { href: "/", texto: "Inicio" },
              { href: "/contacto", texto: "Contacto" },
            ]}
            className="mb-3 lg:mb-14"
          />
          <p className="etiqueta">Contacto</p>
          <h1 id="titulo-pagina" className="titulo text-[44px] leading-[1.05] lg:text-display">
            Hablemos de <em>tu obra</em>.
          </h1>
          <Pareja cta={cta} tamano="cta" className="mt-4 lg:mt-8" />
          {lineaHorario(contacto.horario) && <p className="m-0 text-sm text-texto-suave">{lineaHorario(contacto.horario)}</p>}
        </div>
      </section>

      <section data-tono="claro" aria-label="Teléfono" className="bg-alterna py-12 lg:py-[72px]">
        <div className="contenedor">
          <BotonLlamada
            telefono={contacto.telefono}
            className="boton flex w-full flex-col items-start gap-1 rounded-[3rem] border-2 border-tinta px-7 py-6 text-tinta no-underline hover:bg-tinta hover:text-white lg:max-w-[1000px] lg:flex-row lg:items-center lg:justify-between lg:rounded-full lg:px-12 lg:py-5"
          >
            <span className="text-[15px] font-medium">Llamar al</span>
            <span className="titulo text-[40px] leading-none sm:text-[56px] lg:text-[88px]">{telefonoVisible(contacto.telefono)}</span>
          </BotonLlamada>
        </div>
      </section>

      <section data-tono="claro" aria-label="Datos de contacto" className="seccion bg-fondo">
        <div className="contenedor flex flex-col gap-16 lg:gap-24">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            <div>
              <h2 className={ETIQUETA}>Email</h2>
              <a href={`mailto:${contacto.email}`} className="relative break-words underline underline-offset-4 hover:text-primario before:absolute before:inset-x-0 before:-inset-y-3 before:content-['']">
                {contacto.email}
              </a>
            </div>
            {horario.length > 0 && (
              <div>
                <h2 className={ETIQUETA}>Horario</h2>
                <dl className="m-0 flex flex-col gap-3">
                  {horario.map((h) => (
                    <div key={h.dias}>
                      <dt>{h.dias}</dt>
                      <dd className="m-0 text-texto-suave">{h.horas}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
            <div>
              <h2 className={ETIQUETA}>Dirección</h2>
              <address className="mb-3 leading-relaxed not-italic">
                {calle}
                <br />
                {cp} {ciudad}
              </address>
              <EnlaceFlecha href={urlComoLlegar(contacto)}>Cómo llegar</EnlaceFlecha>
            </div>
            {contacto.fichaGoogle && (
              <div>
                <h2 className={ETIQUETA}>Google</h2>
                {valoracion && (
                  <p className="m-0 mb-3">
                    {mediaVisible(valoracion.media)} · {valoracion.total} reseñas en Google
                  </p>
                )}
                <EnlaceFlecha href={contacto.fichaGoogle}>Ver la ficha en Google</EnlaceFlecha>
              </div>
            )}
          </div>
          {zonas.length > 0 && (
            <div className="max-w-[640px]">
              <h2 className={ETIQUETA}>Zonas</h2>
              <p className="titulo m-0 text-[24px] leading-[1.3] lg:text-[30px]">{listaY(zonas)}.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
