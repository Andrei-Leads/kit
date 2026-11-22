import { hayTrabajos } from "@andrei-leads/core";

import { Marco } from "@/components/Marco";
import { AsistenteTaller } from "@/components/secciones/AsistenteTaller";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Garantias } from "@/components/secciones/Garantias";
import { HeroDespiece } from "@/components/secciones/HeroDespiece";
import { Piezas } from "@/components/secciones/Piezas";
import { PreguntasFrecuentes } from "@/components/secciones/PreguntasFrecuentes";
import { ProcesoTaller } from "@/components/secciones/ProcesoTaller";
import { Referencias } from "@/components/secciones/Referencias";
import { Resenas } from "@/components/secciones/Resenas";
import { Zonas } from "@/components/secciones/Zonas";
import { notaHorario, pasosTaller } from "@/lib/formato";
import { mensajeTaller } from "@/lib/mensajes";
import { numerar, numeroDe } from "@/lib/navegacion";
import config from "@/site.config";

/**
 * Inicio (encargo §6): hero tipográfico sobre el despiece, referencias, piezas, proceso del taller
 * (estrella), garantías, reseñas, asistente, zonas, preguntas y CTA final. Cada sección sin datos se
 * oculta y sale del índice lateral, que se renumera. Las láminas se numeran en el orden de la página.
 */
export default function Page() {
  const { negocio, contacto, servicios, trabajos, galeria, resenas, valoracion, garantias, acreditaciones, marcas, zonas, preguntas } = config;
  const pasos = pasosTaller(config.proceso);
  const mensaje = mensajeTaller(contacto);
  const foto = config.imagenesHero[0];
  const hay = {
    referencias: hayTrabajos(config),
    garantias: garantias.length > 0 || acreditaciones.length > 0 || marcas.length > 0 || Boolean(negocio.anioFundacion),
    resenas: resenas.length > 0,
    zonas: zonas.length > 0,
    preguntas: preguntas.length > 0,
  };
  const secciones = numerar([
    hay.referencias && { id: "referencias", texto: "Referencias" },
    { id: "piezas", texto: "Piezas" },
    { id: "proceso", texto: "Proceso" },
    hay.garantias && { id: "garantias", texto: "Garantías" },
    hay.resenas && { id: "resenas", texto: "Reseñas" },
    Boolean(contacto.whatsapp) && { id: "asistente", texto: "Asistente" },
    hay.zonas && { id: "zonas", texto: "Zonas" },
    hay.preguntas && { id: "preguntas", texto: "Preguntas" },
    { id: "taller", texto: "El taller" },
  ]);
  const n = (id: string) => numeroDe(secciones, id);

  // Láminas numeradas en el orden en que salen: hero, referencias, miniaturas de piezas y pasos.
  let lamina = 0;
  if (foto) lamina++;
  const primeraReferencia = lamina + 1;
  if (hay.referencias) lamina += Math.min(3, trabajos.length > 0 ? trabajos.length : galeria.length);
  const laminasPiezas = servicios.map((s) => (s.imagenes.length > 0 ? ++lamina : undefined));
  const primeraPaso = lamina + 1;

  const conTestimonio = trabajos.findIndex((t) => t.testimonio);

  return (
    <Marco config={config} pagina="inicio" rotulo="Índice de la hoja" secciones={secciones}>
      <HeroDespiece negocio={negocio} contacto={contacto} valoracion={valoracion} servicios={servicios} foto={foto} mensaje={mensaje} />
      {hay.referencias && <Referencias n={n("referencias")} trabajos={trabajos} galeria={galeria} primeraLamina={primeraReferencia} />}
      <Piezas n={n("piezas")} servicios={servicios} laminas={laminasPiezas} contacto={contacto} mensaje={mensaje} />
      <ProcesoTaller n={n("proceso")} pasos={pasos} primeraLamina={primeraPaso} contacto={contacto} mensaje={mensaje} nota={notaHorario(contacto)} />
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
        <Resenas
          n={n("resenas")}
          resenas={resenas}
          valoracion={valoracion}
          fichaGoogle={contacto.fichaGoogle}
          testimonio={conTestimonio >= 0 ? { trabajo: trabajos[conTestimonio], indice: conTestimonio } : undefined}
          contacto={contacto}
          mensaje={mensaje}
        />
      )}
      {contacto.whatsapp && <AsistenteTaller n={n("asistente")} servicios={servicios} contacto={{ telefono: contacto.telefono, whatsapp: contacto.whatsapp }} mensaje={mensaje} />}
      {hay.zonas && <Zonas n={n("zonas")} zonas={zonas} />}
      {hay.preguntas && <PreguntasFrecuentes n={n("preguntas")} preguntas={preguntas} />}
      <CtaFinal n={n("taller")} contacto={contacto} mensaje={mensaje} />
    </Marco>
  );
}
