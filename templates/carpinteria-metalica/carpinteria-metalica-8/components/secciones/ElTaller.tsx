import Link from "next/link";
import { BotonWhatsApp, type SiteConfig } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { IconoWhatsApp } from "@/components/Iconos";
import { pieConjunto, sellos as calcularSellos } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  config: Pick<SiteConfig, "negocio" | "valoracion" | "zonas" | "empresa" | "acreditaciones" | "marcas"> & {
    contacto: Pick<SiteConfig["contacto"], "whatsapp">;
  };
  anioActual: number;
  mensaje: string;
  /** "inicio": cabecera de sección, 2 párrafos y «Conoce el taller». "empresa": toda la historia, sin mini collage (va aparte). */
  modo: "inicio" | "empresa";
};

const GUIJARROS = ["rounded-guijarro-1", "rounded-guijarro-2", "rounded-guijarro-3", "rounded-guijarro-4"];
const FONDOS = ["bg-primario-suave", "bg-alterna", "bg-acento-suave"];
/** Mini collage (entrega): posiciones de las tres fotos del taller. */
const POSICION = [
  "top-0 left-0 w-[66%] aspect-[3/2] rounded-guijarro-1",
  "top-[12%] left-[58%] w-[42%] aspect-[4/5] rounded-guijarro-2",
  "bottom-0 left-[8%] w-[56%] aspect-[3/2] rounded-guijarro-3",
];

/**
 * «El taller», sección estrella (encargo §6.4): sellos de cifras, historia (el primer párrafo en
 * display), mini collage de `empresa.imagenes` con máscaras de guijarro, el equipo en fichas (inicial
 * en un guijarro; foto solo si es real del cliente), la tira de marcas y acreditaciones, «Habla con
 * nosotros» y «Conoce el taller». Cada bloque vacío se oculta; sin ninguno, la sección entera.
 */
export function ElTaller({ config, anioActual, mensaje, modo }: Props) {
  const { empresa, contacto } = config;
  const listaSellos = calcularSellos(config, anioActual);
  const historia = modo === "inicio" ? empresa.historia.slice(0, 2) : empresa.historia;
  // En /empresa la sección no tiene h2 propio: «El equipo» cuelga del h1 de la página.
  const Rotulo = modo === "inicio" ? "h3" : "h2";
  const [primero, ...resto] = historia;
  const fotos = modo === "inicio" ? empresa.imagenes.slice(0, 3) : [];
  const relato = historia.length > 0 || fotos.length > 0;
  const tira = [
    ...config.marcas.map((m) => ({ k: "Trabajamos con", v: m })),
    ...config.acreditaciones.map((a) => ({ k: "", v: a.numero ? `${a.nombre} · ${a.numero}` : a.nombre })),
  ];
  if (listaSellos.length === 0 && !relato && empresa.equipo.length === 0 && tira.length === 0) return null;
  const pieFotos = pieConjunto(fotos);

  return (
    <section
      id={modo === "inicio" ? "taller" : undefined}
      aria-labelledby={modo === "inicio" ? "titulo-taller" : undefined}
      aria-label={modo === "inicio" ? undefined : "El taller en cifras"}
      className="mx-[clamp(8px,2vw,24px)] rounded-[clamp(36px,6vw,80px)_clamp(48px,8vw,110px)_clamp(36px,6vw,80px)_clamp(44px,7vw,96px)] bg-superficie px-[clamp(16px,4.5vw,48px)] py-[clamp(64px,9vw,128px)]"
    >
      <div className="mx-auto flex max-w-[1180px] flex-col gap-[clamp(40px,6vw,72px)]">
        {modo === "inicio" && (
          <div className="flex flex-col gap-3">
            <p className="antetitulo">El taller</p>
            <h2 id="titulo-taller" className="h2">
              Quién hace tu trabajo
            </h2>
          </div>
        )}

        {listaSellos.length > 0 && (
          <ul aria-label="Cifras del taller" className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-[clamp(12px,2vw,24px)] lg:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
            {listaSellos.map((s, i) => (
              <li key={s.linea} className="sello">
                <p className={cn("flex aspect-[1.15] flex-col items-center justify-center gap-1 bg-alterna p-3.5 text-center", GUIJARROS[i % 4])}>
                  <span className="font-titulo text-cifra leading-none font-medium tracking-[-0.02em]">{s.cifra}</span>
                  <span className="max-w-[14ch] text-[15px] leading-[1.3] text-texto-suave">{s.linea}</span>
                </p>
              </li>
            ))}
          </ul>
        )}

        {relato && (
          <div className={cn("grid items-center gap-[clamp(36px,6vw,88px)]", fotos.length > 0 && historia.length > 0 && "lg:grid-cols-2")}>
            {(historia.length > 0 || contacto.whatsapp) && (
              <div className="flex max-w-[62ch] flex-col gap-5">
                {primero && <p className="font-titulo text-[clamp(1.5rem,1.25rem+1vw,1.75rem)] leading-[1.35] text-pretty">{primero}</p>}
                {resto.map((p) => (
                  <p key={p} className="text-texto-suave text-pretty">
                    {p}
                  </p>
                ))}
                {(contacto.whatsapp || modo === "inicio") && (
                  <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-3">
                    {contacto.whatsapp && (
                      <BotonWhatsApp numero={contacto.whatsapp} mensaje={mensaje} className="boton boton-tierra">
                        <IconoWhatsApp />
                        Habla con nosotros
                      </BotonWhatsApp>
                    )}
                    {modo === "inicio" && (
                      <Link href="/empresa" className="enlace">
                        Conoce el taller&nbsp;→
                      </Link>
                    )}
                  </div>
                )}
              </div>
            )}
            {fotos.length > 0 && (
              <div>
                {fotos.length === 1 ? (
                  <Foto imagen={fotos[0]} sinEtiqueta proporcion="3/2" sizes="(min-width: 1024px) 560px, calc(100vw - 48px)" className="rounded-guijarro-1" />
                ) : (
                  <div className="relative aspect-[1/0.92] w-full">
                    {fotos.map((f, i) => (
                      <div key={f.src} data-aparecer className={cn("absolute overflow-hidden border-[5px] border-superficie", POSICION[i])}>
                        <Foto imagen={f} sinEtiqueta proporcion="relleno" sizes="(min-width: 1024px) 380px, 66vw" className="size-full rounded-none" />
                      </div>
                    ))}
                  </div>
                )}
                {pieFotos && <p className="pie-foto mt-3">{pieFotos}</p>}
              </div>
            )}
          </div>
        )}

        {empresa.equipo.length > 0 && (
          <div className="flex flex-col gap-5">
            <Rotulo className="font-titulo text-2xl font-medium">El equipo</Rotulo>
            <ul className="grid gap-4 lg:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
              {empresa.equipo.map((p, i) => (
                <li key={p.nombre} className="flex items-center gap-3.5 rounded-tarjeta border-[1.5px] border-borde py-3 ps-3 pe-4">
                  {p.foto ? (
                    <Foto imagen={p.foto} proporcion="1/1" sizes="56px" className={cn("w-14 flex-none", GUIJARROS[i % 4])} claseFigura="flex-none" />
                  ) : (
                    <span aria-hidden="true" className={cn("flex h-[52px] w-14 flex-none items-center justify-center font-titulo text-2xl font-medium", GUIJARROS[i % 4], FONDOS[i % 3])}>
                      {p.nombre.charAt(0)}
                    </span>
                  )}
                  <span className="flex flex-col leading-[1.3]">
                    <strong className="font-titulo text-[19px] font-medium">{p.nombre}</strong>
                    {p.cargo && <span className="text-[15px] text-texto-suave">{p.cargo}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tira.length > 0 && (
          <ul aria-label="Marcas y acreditaciones" className="flex flex-wrap items-center gap-x-3 gap-y-2.5 border-t-[1.5px] border-dashed border-borde pt-5">
            {tira.map((t) => (
              <li key={t.k + t.v} className="rounded-chip bg-fondo px-3.5 py-1.5 text-[15px] leading-[1.35]">
                {t.k && <span className="text-texto-suave">{t.k} </span>}
                <strong className="font-semibold">{t.v}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
