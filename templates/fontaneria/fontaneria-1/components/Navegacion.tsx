import config from "@/site.config";
import { MenuPopover } from "@/components/base/MenuPopover";
import { Cabecera } from "@/components/Cabecera";
import { mensajeInicio } from "@/lib/mensajes";
import { rutas } from "@/lib/navegacion";
import { textoLlamar } from "@/lib/textos";

/**
 * Cabecera + hoja del menú con la sección actual marcada (`aria-current="page"`). Se pinta desde el
 * slot paralelo `app/@navegacion`, que el layout raíz coloca arriba del <body>: cada página del slot
 * sabe su ruta en el servidor, así que no hace falta JavaScript de cliente (usePathname).
 */
export function Navegacion({ actual }: { actual?: string }) {
  const { negocio, contacto } = config;
  const menu = rutas(config);
  return (
    <>
      <Cabecera
        nombre={negocio.nombre}
        logo={negocio.logo}
        telefono={contacto.telefono}
        whatsapp={contacto.whatsapp}
        mensaje={mensajeInicio(contacto)}
        textoLlamar={textoLlamar(contacto)}
        rutas={menu}
        actual={actual}
      />
      <MenuPopover enlaces={menu} id="menu" actual={actual} />
    </>
  );
}
