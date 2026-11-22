import Link from "next/link";
import type { ReactNode } from "react";
import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

// Las clases de las variantes viven en `clases-boton.ts` (sin `cn`), para que la isla
// AsistentePresupuesto no arrastre tailwind-merge (~30 KB) al navegador.
import { ALTURA, llamarBlanco, llamarTinta, waRelleno } from "@/components/clases-boton";
import { IconoWhatsapp } from "@/components/Iconos";
import type { DatosCta } from "@/lib/textos";
import { cn } from "@/lib/utils";

export { ALTURA, llamarBlanco, llamarTinta, waRelleno };

type PropsPareja = {
  cta: DatosCta;
  /** hero / *-hero (56 px, apilados en móvil) · cierre / pareja-cierre (48 px, en fila) · cta / pareja-cta (60 px, apilados en móvil). */
  tamano?: keyof typeof ALTURA;
  /** Fondo sobre el que va: cambia el contorno de Llamar. */
  tono?: "claro" | "oscuro";
  /** Texto de WhatsApp (por defecto, «Pedir presupuesto por WhatsApp»; en cierre móvil, «Pedir por WhatsApp»). */
  textoWhatsapp?: ReactNode;
  className?: string;
};

/**
 * Pareja de CTA: WhatsApp primero (relleno) + Llamar (contorno) con el número.
 * Sin WhatsApp, Llamar pasa a relleno y ocupa el sitio de los dos.
 */
export function Pareja({ cta, tamano = "cierre", tono = "claro", textoWhatsapp, className }: PropsPareja) {
  const { telefono, whatsapp, mensaje } = cta;
  const numero = telefonoVisible(telefono);
  const apilada = tamano !== "cierre";
  const llamar = tono === "oscuro" ? llamarBlanco : llamarTinta;
  const fila = apilada ? "w-full lg:w-auto" : "max-lg:flex-1";

  const textoWa = textoWhatsapp ?? (
    apilada ? (
      "Pedir presupuesto por WhatsApp"
    ) : (
      <>
        <span className="lg:hidden">Pedir por WhatsApp</span>
        <span className="max-lg:hidden">Pedir presupuesto por WhatsApp</span>
      </>
    )
  );
  const textoLlamar = apilada ? (
    `Llamar al ${numero}`
  ) : (
    <>
      <span className="lg:hidden">Llamar ahora</span>
      <span className="max-lg:hidden">Llamar al {numero}</span>
    </>
  );

  return (
    <div className={cn("flex gap-2.5", apilada ? "flex-col lg:flex-row lg:flex-wrap" : "flex-row flex-wrap", className)}>
      {whatsapp ? (
        <>
          <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(waRelleno, ALTURA[tamano], fila, !apilada && "max-lg:flex-[1.45] max-lg:px-3.5")}>
            <IconoWhatsapp tamano={tamano === "cierre" ? 18 : 20} />
            <span>{textoWa}</span>
          </BotonWhatsApp>
          <BotonLlamada telefono={telefono} className={cn(llamar, ALTURA[tamano], fila, !apilada && "max-lg:px-3.5")}>
            {textoLlamar}
          </BotonLlamada>
        </>
      ) : (
        <BotonLlamada telefono={telefono} className={cn(waRelleno, ALTURA[tamano], "w-full lg:w-auto")}>
          Llamar al {numero}
        </BotonLlamada>
      )}
    </div>
  );
}

/** Enlace de navegación con línea de 1 px y «→» (nunca para llamar ni escribir). */
export function EnlaceFlecha({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const contenido = (
    <>
      {children}
      <span aria-hidden="true" className="flecha">
        →
      </span>
    </>
  );
  return href.startsWith("/") ? (
    <Link href={href} className={cn("enlace-flecha", className)}>
      {contenido}
    </Link>
  ) : (
    <a href={href} className={cn("enlace-flecha", className)}>
      {contenido}
    </a>
  );
}
