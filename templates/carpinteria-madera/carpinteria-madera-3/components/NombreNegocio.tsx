import Image from "next/image";
import type { SiteConfig } from "@andrei-leads/core";

/** Nombre del negocio, siempre visible; con logo, el logo de 32 px delante (alt="": el nombre ya está escrito). */
export function NombreNegocio({ nombre, logo }: Pick<SiteConfig["negocio"], "nombre" | "logo">) {
  return (
    <span className="flex min-w-0 items-center gap-2.5">
      {logo && <Image src={logo.src} alt="" width={32} height={32} className="size-8 flex-none object-contain" />}
      <span className="min-w-0 [overflow-wrap:anywhere]">{nombre}</span>
    </span>
  );
}
