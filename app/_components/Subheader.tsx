import type { ComponentPropsWithoutRef } from "react";

export default function Subheader(props: ComponentPropsWithoutRef<"h2">) {
  return (
    <>
      <br />
      <h2 {...props} />
    </>
  );
}
