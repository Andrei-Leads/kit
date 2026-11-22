import type { Metadata } from "next";
import { BotonLlamada, direccionLinea, formatearHorario, listaY, metadatosPagina, telefonoVisible, urlComoLlegar } from "@andrei-leads/core";

import config from "@/site.config";
import { ParejaCta } from "@/components/Botones";
import { EnlaceFlecha } from "@/components/EnlaceFlecha";
import { Destacada } from "@/components/Titulo";
import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { mensajeInicio, TEXTO_WA_ESCRIBIR } from "@/lib/mensajes";
import { datosCta, lineaConfianza } from "@/lib/textos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/contacto", titulo: "Contacto" });

/**
 * /contacto «Hablemos de tu pieza» (encargo §7): arriba del todo, los dos botones en
 * grande y el teléfono a tamaño titular como BotonLlamada; después, una foto del
 * taller, el horario en tabla de filetes, la dirección con «Cómo llegar →», las
 * zonas, la ficha de Google y la frase fija de la visita.
 */
export default function Page() {
  const { contacto, empresa, zonas } = config;
  const cta = datosCta(contacto, mensajeInicio(contacto));
  const horario = formatearHorario(contacto.horario);
  const foto = empresa.imagenes[0];

  return (
    <>
      <span data-pagina="contacto" hidden />
      <section data-tono="claro" aria-labelledby="titulo-pagina" className="contenedor pt-[clamp(1.5rem,4vw,4rem)]">
        <Migas
          migas={[
            { href: "/", texto: "Inicio" },
            { href: "/contacto", texto: "Contacto" },
          ]}
          className="mb-8"
        />
        <h1 id="titulo-pagina" className="titulo text-h1">
          Hablemos de tu <Destacada>pieza</Destacada>
        </h1>
        <ParejaCta cta={cta} tono="claro" textoWhatsapp={TEXTO_WA_ESCRIBIR} confianza={lineaConfianza(config, "whatsapp")} className="mt-8" />
        <p className="mt-10 mb-0 border-t border-borde pt-6">
          <span className="etiqueta block text-texto-suave">Teléfono del taller</span>
          <BotonLlamada telefono={contacto.telefono} className="titulo mt-2 inline-block text-h1 tabular-nums underline decoration-1 underline-offset-[0.15em] hover:text-destacado">
            {telefonoVisible(contacto.telefono)}
          </BotonLlamada>
        </p>
        <p className="m-0 mt-3 text-[15px] text-texto-suave">
          <a href={`mailto:${contacto.email}`} className="relative underline underline-offset-4 before:absolute before:inset-x-0 before:-inset-y-3 before:content-['']">
            {contacto.email}
          </a>
        </p>
      </section>

      <section data-tono="claro" aria-label="Dónde y cuándo" className="contenedor mt-(--espacio-seccion) grid items-start gap-x-16 gap-y-12 lg:grid-cols-2">
        {foto && <Foto imagen={foto} sizes="(min-width: 1024px) 560px, 100vw" proporcion="4/5" className="parallax-movil" />}
        <div className="flex flex-col gap-12">
          {horario.length > 0 && (
            <div>
              <h2 className="etiqueta m-0 text-texto-suave">Horario del taller</h2>
              <table className="mt-4 w-full border-collapse text-base">
                <tbody>
                  {horario.map((h) => (
                    <tr key={h.dias} className="border-t border-borde last:border-b">
                      <th scope="row" className="py-4 pr-6 text-left font-normal">
                        {h.dias}
                      </th>
                      <td className="py-4 text-right tabular-nums">{h.horas}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div>
            <h2 className="etiqueta m-0 text-texto-suave">Dirección</h2>
            <p className="mt-4 mb-0 text-cuerpo">{direccionLinea(contacto.direccion, { provincia: contacto.direccion.provincia !== contacto.direccion.ciudad })}</p>
            <div className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
              <EnlaceFlecha href={urlComoLlegar(contacto)} externo>
                Cómo llegar
              </EnlaceFlecha>
              {contacto.fichaGoogle && (
                <EnlaceFlecha href={contacto.fichaGoogle} externo>
                  Ficha de Google
                </EnlaceFlecha>
              )}
            </div>
          </div>
          {zonas.length > 0 && (
            <div>
              <h2 className="etiqueta m-0 text-texto-suave">Dónde montamos</h2>
              <p className="mt-4 text-lg leading-[1.6]">{listaY(zonas)}.</p>
            </div>
          )}
        </div>
      </section>
      <div className="pb-(--espacio-seccion)" />
    </>
  );
}
