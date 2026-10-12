import type { ReactNode } from "react";

type Props = {
  numero: string;
  mensaje?: string;
  className?: string;
  children?: ReactNode;
};

export function BotonWhatsApp({ numero, mensaje, className, children }: Props) {
  const digitos = numero.replace(/\D/g, "");
  const href = mensaje
    ? `https://wa.me/${digitos}?text=${encodeURIComponent(mensaje)}`
    : `https://wa.me/${digitos}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Escribir por WhatsApp al ${numero}`}
      className={
        className ??
        "inline-block rounded-full border-2 border-current px-6 py-3 font-semibold"
      }
    >
      {children ?? "Escribir por WhatsApp"}
    </a>
  );
}