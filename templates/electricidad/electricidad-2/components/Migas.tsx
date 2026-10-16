import { Fragment } from "react";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type Item = { href?: string; texto: string };

/** Migas (shadcn Breadcrumb): Inicio / Servicios / … El último elemento es la página actual. Zonas táctiles de 44 px. */
export function Migas({ items }: { items: Item[] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, i) => {
          const ultimo = i === items.length - 1;
          return (
            <Fragment key={`${i}-${item.texto}`}>
              <BreadcrumbItem>
                {item.href && !ultimo ? (
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.texto}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.texto}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {!ultimo && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
