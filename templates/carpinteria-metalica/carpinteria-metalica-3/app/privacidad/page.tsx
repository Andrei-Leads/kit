import type { Metadata } from "next";
import Link from "next/link";
import { PoliticaPrivacidad } from "@andrei-leads/core";
import config from "@/site.config";

export const metadata: Metadata = { title: "Política de privacidad" };

// El <h1> lo pone core; aquí solo van las migas.
export default function Page() {
  return (
    <>
      <nav aria-label="Migas" className="mx-auto max-w-3xl px-6 pt-6 text-[15px]">
        <Link href="/" className="inline-flex min-h-11 items-center text-tinta underline">
          Inicio
        </Link>
        <span aria-hidden="true"> › </span>
        <span aria-current="page">Política de privacidad</span>
      </nav>
      <PoliticaPrivacidad config={config} />
    </>
  );
}
