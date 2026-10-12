import * as React from "react";

import { cn } from "@/lib/utils";

/** Tarjeta del diseño «Rótulo»: papel claro, filete de 2 px y radio de 10 px. */
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "flex flex-col rounded-md border-2 border-tinta bg-tarjeta text-tinta",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("flex flex-col p-[clamp(18px,2vw,28px)]", className)}
      {...props}
    />
  );
}

export { Card, CardContent };
