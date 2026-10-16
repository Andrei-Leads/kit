import * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/** Migas (shadcn Breadcrumb): nav con lista ordenada; la página actual lleva aria-current="page". */
function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="Migas" data-slot="breadcrumb" {...props} />;
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn("m-0 flex list-none flex-wrap items-center p-0 text-base text-tinta-suave", className)}
      {...props}
    />
  );
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li data-slot="breadcrumb-item" className={cn("inline-flex items-center", className)} {...props} />;
}

/** Enlace de miga: texto tinta suave subrayado, zona táctil de 44 px de alto. */
function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "a";
  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("inline-flex min-h-11 min-w-11 items-center text-tinta-suave underline underline-offset-[3px] hover:text-tinta", className)}
      {...props}
    />
  );
}

/** Página actual: tinta, 600, sin enlace. */
function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      aria-current="page"
      className={cn("inline-flex min-h-11 items-center font-semibold text-tinta", className)}
      {...props}
    />
  );
}

function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("inline-flex items-center px-2", className)}
      {...props}
    >
      {children ?? "/"}
    </li>
  );
}

export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator };
