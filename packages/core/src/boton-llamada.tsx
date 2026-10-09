import type { ReactNode } from "react";

type Props = {
  telefono: string;
  className?: string;
  children?: ReactNode;
};

export function BotonLlamada({ telefono, className, children }: Props) {
  return (
    <a
      href={`tel:${telefono}`}
      aria-label={`Llamar al ${telefono}`}
      className={
        className ??
        "inline-block rounded-full bg-primario px-6 py-3 font-semibold text-white"
      }
    >
      {children ?? "Llamar ahora"}
    </a>
  );
}