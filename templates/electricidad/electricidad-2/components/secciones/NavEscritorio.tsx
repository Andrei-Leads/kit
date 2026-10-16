"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Ancla } from "@/lib/formato";

/** "page" si es la ruta exacta, "true" si estamos dentro de la sección (p. ej. /servicios/x). */
export function actual(pathname: string, href: string): "page" | "true" | undefined {
  if (pathname === href) return "page";
  return pathname.startsWith(href + "/") ? "true" : undefined;
}

/** Enlaces del menú en escritorio (desde 1024 px). El activo lleva una línea inferior de 2 px en primario. */
export function NavEscritorio({ items }: { items: Ancla[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Principal" className="mr-2 hidden gap-7 lg:flex">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={actual(pathname, item.href)}
          className="flex min-h-11 items-center font-semibold text-tinta no-underline hover:underline hover:underline-offset-4 aria-[current]:shadow-[inset_0_-2px_0_var(--color-primario)]"
        >
          {item.texto}
        </Link>
      ))}
    </nav>
  );
}
