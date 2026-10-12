import config from "@/site.config";
import { BarraMovil } from "@/components/secciones/BarraMovil";
import { Cabecera } from "@/components/secciones/Cabecera";
import { Contacto } from "@/components/secciones/Contacto";
import { Galeria } from "@/components/secciones/Galeria";
import { Hero } from "@/components/secciones/Hero";
import { Pie } from "@/components/secciones/Pie";
import { Preguntas } from "@/components/secciones/Preguntas";
import { Resenas } from "@/components/secciones/Resenas";
import { Servicios } from "@/components/secciones/Servicios";
import { Zonas } from "@/components/secciones/Zonas";
import { anclasMenu, fotoHero } from "@/lib/formato";

export default function Home() {
  const { negocio, contacto, zonas, servicios, resenas, galeria, preguntas, redes } = config;

  return (
    <>
      <Cabecera
        nombre={negocio.nombre}
        logo={negocio.logo}
        telefono={contacto.telefono}
        anclas={anclasMenu(config)}
      />
      <main>
        <Hero
          negocio={{
            nombre: negocio.nombre,
            sector: negocio.sector,
            descripcionCorta: negocio.descripcionCorta,
          }}
          contacto={{
            telefono: contacto.telefono,
            whatsapp: contacto.whatsapp,
            horario: contacto.horario,
          }}
          zonas={zonas}
          resenas={resenas}
          foto={fotoHero(config)}
        />
        <Resenas resenas={resenas} />
        <Servicios servicios={servicios} telefono={contacto.telefono} />
        <Galeria galeria={galeria} />
        <Zonas
          zonas={zonas}
          direccion={{ ciudad: contacto.direccion.ciudad, provincia: contacto.direccion.provincia }}
          telefono={contacto.telefono}
        />
        <Preguntas preguntas={preguntas} />
        <Contacto contacto={contacto} />
      </main>
      <Pie
        negocio={{ nombre: negocio.nombre, nombreLegal: negocio.nombreLegal, nif: negocio.nif }}
        redes={redes}
      />
      <BarraMovil telefono={contacto.telefono} whatsapp={contacto.whatsapp} />
    </>
  );
}
