import type { ComponentPropsWithoutRef } from "react";

export default function Paragraph(props: ComponentPropsWithoutRef<"p">) {
  return (
    <>
      <p {...props} />
      <br />
    </>
  );
}
