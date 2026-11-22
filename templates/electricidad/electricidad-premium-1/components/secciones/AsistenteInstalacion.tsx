import { Asistente } from "@/components/Asistente";
import { Antetitulo, Senal, Titular } from "@/components/Titular";

type Props = { servicios: readonly string[]; whatsapp?: string; mensajeBase: string };

/**
 * AsistenteInstalacion (encargo §6.9, sobre --color-superficie): tres preguntas
 * que componen el mensaje de WhatsApp. Sin WhatsApp, no se pinta.
 */
export function AsistenteInstalacion({ servicios, whatsapp, mensajeBase }: Props) {
  if (!whatsapp) return null;
  return (
    <section data-tono="oscuro" aria-labelledby="titulo-asistente" className="seccion bg-superficie">
      <div className="contenedor grid gap-x-[clamp(32px,5vw,96px)] gap-y-12 lg:grid-cols-[5fr_7fr]">
        <div className="flex flex-col gap-6">
          <Antetitulo>Presupuesto por WhatsApp</Antetitulo>
          <Titular
            id="titulo-asistente"
            lineas={[
              "Cuéntanos",
              <>
                tu <Senal>obra</Senal>.
              </>,
            ]}
          />
          <p className="m-0 max-w-[40ch] text-texto-suave">Tres preguntas y te dejamos el mensaje escrito. No guardamos nada: lo envías tú.</p>
        </div>
        <Asistente servicios={servicios} whatsapp={whatsapp} mensajeBase={mensajeBase} />
      </div>
    </section>
  );
}
