import type { Paso, SiteConfig } from "@andrei-leads/core";

import { Despiece } from "@/components/Despiece";
import { Lamina } from "@/components/Lamina";
import { Pareja } from "@/components/Pareja";
import { TituloSeccion } from "@/components/TituloSeccion";
import { dosCifras } from "@/lib/formato";

type Props = {
  n: string;
  pasos: readonly Paso[];
  /** Número de la primera lámina (una por paso, con foto o con dibujo). */
  primeraLamina: number;
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp">;
  mensaje: string;
  nota: string;
};

/** Pieza del despiece que se resalta en la lámina sin foto de cada paso (orden del diseño). */
const RESALTA = [1, 2, 5, 3, 0, 4];
const TAM_BLOQUE = "(min-width: 640px) 45vw, 100vw";
const TAM_STICKY = "(min-width: 1280px) 520px, 40vw";

/**
 * Proceso del taller, la sección estrella (encargo §5 y §6.4): «Del tablón a la pieza».
 * - Por defecto (móvil, navegador sin `animation-timeline` o «reducir movimiento»): bloques con su
 *   lámina encima, sin sticky (`.proceso-bloques`).
 * - En escritorio con soporte (`.proceso-sticky`, globals.css): a la izquierda el texto de cada paso
 *   con su número grande («03 / 06»); a la derecha una lámina pegajosa con las fotos apiladas, y la de
 *   cada paso aparece (opacity + translate de 12 px) ligada a la `view-timeline` de su texto.
 * Solo una de las dos estructuras se muestra (la otra va con display: none y sus fotos no se cargan).
 * La foto de cada paso es `proceso[].imagen`; sin ella, el fragmento del despiece de ese paso.
 */
export function ProcesoTaller({ n, pasos, primeraLamina, contacto, mensaje, nota }: Props) {
  const total = dosCifras(pasos.length);
  const lamina = (p: Paso, i: number, sizes: string) => (
    <Lamina imagen={p.imagen} numero={primeraLamina + i} sizes={sizes} dibujo={<Despiece n={6} letras={false} resalta={RESALTA[i % 6]} />} />
  );
  const numero = (i: number, grande: boolean) => (
    <>
      {dosCifras(i + 1)}
      <span className={grande ? "ml-[0.5em] text-[0.3em] text-texto-suave" : "ml-[0.5em] text-[0.32em] text-texto-suave"}>/ {total}</span>
    </>
  );

  return (
    <section id="proceso" aria-labelledby="h2-proceso" className="pt-(--sec-grande)">
      <TituloSeccion n={n} id="h2-proceso" grande className="mb-6">
        Del tablón a la pieza
      </TituloSeccion>
      <p className="mb-10 max-w-[60ch] text-texto-suave">
        Así sale una pieza de nuestro banco: desde que medimos el hueco hasta que volvemos a ajustarla. Sin prisas que luego se pagan.
      </p>

      <ol className="proceso-bloques grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-x-6 gap-y-12">
        {pasos.map((p, i) => (
          <li key={p.titulo} className="flex flex-col gap-3">
            {lamina(p, i, TAM_BLOQUE)}
            <p className="titulo mt-2 text-[clamp(2.5rem,2rem+2vw,4rem)] leading-none text-lapiz">{numero(i, false)}</p>
            <h3 className="titulo text-[1.3125rem] leading-[1.2] tracking-normal">{p.titulo}</h3>
            <p>{p.texto}</p>
          </li>
        ))}
      </ol>

      <div className="proceso-sticky grid-cols-9 gap-6">
        <ol className="col-span-4">
          {pasos.map((p, i) => (
            <li key={p.titulo} className="paso-texto flex min-h-[72vh] flex-col justify-center gap-3.5 border-t border-borde py-8">
              <p className="paso-numero titulo text-[clamp(3rem,2rem+3vw,5.5rem)] leading-none text-lapiz">{numero(i, true)}</p>
              <h3 className="titulo text-[clamp(1.25rem,1rem+1vw,1.75rem)] leading-[1.2] tracking-normal">{p.titulo}</h3>
              <p className="max-w-[44ch]">{p.texto}</p>
            </li>
          ))}
        </ol>
        <div className="sticky top-[104px] col-span-5 col-start-5 mt-[10vh] self-start">
          <div className="relative">
            {pasos.map((p, i) => (
              <div key={p.titulo} className={i === 0 ? "paso-lamina relative bg-fondo" : "paso-lamina absolute inset-x-0 top-0 bg-fondo"}>
                {lamina(p, i, TAM_STICKY)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 max-w-[720px]">
        <Pareja contacto={contacto} mensaje={mensaje} textoWhatsapp="Empezamos por medir: escríbenos" nota={nota} />
      </div>
    </section>
  );
}
