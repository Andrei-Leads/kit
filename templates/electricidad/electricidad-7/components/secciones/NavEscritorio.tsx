"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// clsx y no cn(): cn arrastra tailwind-merge (~9 KB gzip) al navegador.
import { clsx } from "clsx";

/**
 * Enlaces de la cápsula en escritorio con la página actual marcada (píldora --color-alterna y
 * `aria-current="page"`). Isla mínima: solo necesita la ruta (`usePathname`); recibe los enlaces
 * como props planas. `/servicios/x` marca «Servicios» y `/trabajos/x`, «Trabajos».
 */
export function NavEscritorio({ items }: { items: readonly { href: string; texto: string }[] }) {
  const ruta = usePathname();
  return (
    <nav aria-label="Principal" className="hidden flex-1 justify-center lg:flex">
      <ul className="m-0 flex list-none gap-0.5 p-0">
        {items.map((e) => {
          const actual = ruta === e.href || ruta.startsWith(`${e.href}/`);
          return (
            <li key={e.href}>
              <Link
                href={e.href}
                aria-current={actual ? "page" : undefined}
                className={clsx(
                  "flex min-h-11 items-center rounded-boton px-4 text-[15px] no-underline",
                  actual ? "bg-alterna font-extrabold" : "font-bold hover:bg-fondo",
                )}
              >
                {e.texto}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
