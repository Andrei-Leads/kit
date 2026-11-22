import { hayTrabajos, telefonoVisible } from "@andrei-leads/core";

import { AbrirParte } from "@/components/AbrirParte";
import { Marco } from "@/components/Marco";
import { Pareja } from "@/components/Pareja";
import { Rotulo } from "@/components/Rotulo";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { EntradasDiario } from "@/components/secciones/EntradasDiario";
import { Garantias } from "@/components/secciones/Garantias";
import { HeroCronologia } from "@/components/secciones/HeroCronologia";
import { ProcesoRelato } from "@/components/secciones/ProcesoRelato";
import { Resenas } from "@/components/secciones/Resenas";
import { ServiciosLista } from "@/components/secciones/ServiciosLista";
import { ZonasPreguntas } from "@/components/secciones/ZonasPreguntas";
import { horarioLinea, pasosDiario, trabajosOrdenados } from "@/lib/formato";
import { mensajeDiario } from "@/lib/mensajes";
import { numerar, numeroDe } from "@/lib/navegacion";
import config from "@/site.config";

/**
 * Inicio (encargo §6): hero tipográfico con cronología, obras, servicios, proceso (estrella, con el
 * vídeo), garantías, reseñas, «Abrir parte», zonas y preguntas, y el CTA final. Cada sección sin datos
 * se oculta y sale del índice, que se renumera.
 */
export default function Page() {
  const { negocio, contacto, servicios, resenas, valoracion, garantias, acreditaciones, marcas, zonas, preguntas, galeria } = config;
  const trabajos = trabajosOrdenados(config.trabajos);
  const pasos = pasosDiario(config.proceso);
  const mensaje = mensajeDiario(contacto);
  const hay = {
    obras: hayTrabajos(config),
    garantias: garantias.length > 0 || acreditaciones.length > 0 || Boolean(negocio.anioFundacion),
    resenas: resenas.length > 0,
    parte: Boolean(contacto.whatsapp),
    zonas: zonas.length > 0 || preguntas.length > 0,
  };
  const secciones = numerar([
    hay.obras && { id: "obras", texto: "Obras" },
    { id: "servicios", texto: "Servicios" },
    { id: "proceso", texto: "Proceso" },
    hay.garantias && { id: "garantias", texto: "Garantías" },
    hay.resenas && { id: "resenas", texto: "Reseñas" },
    hay.parte && { id: "parte", texto: "Abrir parte" },
    hay.zonas && { id: "zonas", texto: zonas.length > 0 && preguntas.length > 0 ? "Zonas y preguntas" : zonas.length > 0 ? "Zonas" : "Preguntas" },
  ]);
  const n = (id: string) => numeroDe(secciones, id);
  const pareja = <Pareja contacto={contacto} mensaje={mensaje} />;

  return (
    <Marco config={config} pagina="inicio" secciones={secciones}>
      <HeroCronologia negocio={negocio} contacto={contacto} valoracion={valoracion} pasos={pasos} ultima={trabajos[0]} mensaje={mensaje} />
      {hay.obras && <EntradasDiario n={n("obras")} trabajos={trabajos} galeria={galeria} />}
      <ServiciosLista n={n("servicios")} servicios={servicios} titulo="Qué obras hacemos">
        {pareja}
      </ServiciosLista>
      <ProcesoRelato n={n("proceso")} pasos={pasos} video={config.videoPano} contacto={contacto} mensaje={mensaje} />
      {hay.garantias && (
        <Garantias
          n={n("garantias")}
          garantias={garantias}
          acreditaciones={acreditaciones}
          marcas={marcas}
          anioFundacion={negocio.anioFundacion}
          ciudad={contacto.direccion.ciudad}
        />
      )}
      {hay.resenas && (
        <Resenas n={n("resenas")} resenas={resenas} valoracion={valoracion} fichaGoogle={contacto.fichaGoogle} testimonio={trabajos.find((t) => t.testimonio)}>
          {!hay.parte && pareja}
        </Resenas>
      )}
      {contacto.whatsapp && (
        <section id="parte" aria-labelledby="h2-parte" className="border-t border-borde px-(--pad) py-(--sec)">
          <div className="max-w-[1040px]">
            <Rotulo n={n("parte")}>Abrir parte</Rotulo>
            <h2 id="h2-parte" className="h2-diario mb-3">
              Abre el parte de tu obra
            </h2>
            <p className="mb-8 max-w-[52ch] text-cuerpo leading-[1.6] text-texto-suave">
              {servicios.length > 1 ? "Tres" : "Dos"} preguntas. Preparamos el mensaje y tú lo envías por WhatsApp. No se guarda nada.
            </p>
            <AbrirParte
              servicios={servicios.map((s) => s.titulo)}
              whatsapp={contacto.whatsapp}
              telefono={contacto.telefono}
              telefonoVisible={telefonoVisible(contacto.telefono)}
            />
          </div>
        </section>
      )}
      {hay.zonas && <ZonasPreguntas n={n("zonas")} zonas={zonas} preguntas={preguntas} />}
      <CtaFinal contacto={contacto} primerPaso={pasos[0]?.titulo ?? ""} horario={horarioLinea(contacto.horario)} mensaje={mensaje} />
    </Marco>
  );
}
