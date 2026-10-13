import Link from "next/link";
import { BotonLlamada, enlacesLegales, type SiteConfig } from "@andrei-leads/core";
import { ExternalLink, Mail, Phone } from "lucide-react";

import { anioActual } from "@/lib/anio";
import { direccionLinea, listaRedes, telefonoVisible, type Ancla } from "@/lib/formato";

type Props = {
  negocio: Pick<SiteConfig["negocio"], "nombre" | "nombreLegal" | "nif">;
  contacto: Pick<SiteConfig["contacto"], "telefono" | "email" | "direccion">;
  redes: SiteConfig["redes"];
  items: Ancla[];
};

const enlacePie = "flex min-h-11 items-center gap-2 text-papel no-underline hover:underline";

export async function Pie({ negocio, contacto, redes, items }: Props) {
  const anio = await anioActual();
  const listaDeRedes = listaRedes(redes);

  return (
    <footer className="foco-claro bg-tinta pt-10 pb-7 text-papel">
      <div className="contenedor flex flex-col gap-7">
        <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col gap-1.5">
            <strong className="text-xl leading-[1.2] font-extrabold">{negocio.nombre}</strong>
            <span className="text-[15px] text-papel/80">{direccionLinea(contacto.direccion)}</span>
          </div>
          <nav aria-label="Pie" className="flex flex-col">
            {items.map((item) => (
              <Link key={item.href} href={item.href} className={enlacePie + " font-semibold"}>
                {item.texto}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col">
            <BotonLlamada
              telefono={contacto.telefono}
              className={enlacePie + " font-bold tabular-nums"}
            >
              <Phone aria-hidden="true" className="size-5 flex-none" />
              <span>{telefonoVisible(contacto.telefono)}</span>
            </BotonLlamada>
            <a href={`mailto:${contacto.email}`} className={enlacePie}>
              <Mail aria-hidden="true" className="size-5 flex-none" />
              <span className="break-all">{contacto.email}</span>
            </a>
            {listaDeRedes.map((red) => (
              <a key={red.href} href={red.href} className={enlacePie}>
                <span>{red.texto}</span>
                <ExternalLink aria-hidden="true" className="size-4 flex-none" />
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-tinta-suave pt-4 text-sm text-papel/80">
          <span className="flex min-h-11 items-center">
            © {anio} {negocio.nombreLegal} · NIF {negocio.nif}
          </span>
          <div className="flex flex-wrap gap-x-[18px] gap-y-1">
            {enlacesLegales.map((enlace) => (
              <Link
                key={enlace.href}
                href={enlace.href}
                className="inline-flex min-h-11 items-center text-papel no-underline hover:underline"
              >
                {enlace.texto}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
