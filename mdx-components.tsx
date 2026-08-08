import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";
import { Children, isValidElement } from "react";

import ImageModal from "./app/_components/ImageModal";
import CodeBlock from "./app/_components/CodeBlock";
import InlineLink from "./app/_components/InlineLink";
import ListItem from "./app/_components/ListItem";
import Paragraph from "./app/_components/Paragraph";
import Subheader from "./app/_components/Subheader";

function MdxImage({ src, alt }: ComponentPropsWithoutRef<"img">) {
  if (typeof src !== "string") {
    throw new TypeError("MDX images must use a string source.");
  }

  return <ImageModal src={src} alt={alt ?? ""} />;
}

function MdxParagraph({ children, ...props }: ComponentPropsWithoutRef<"p">) {
  const containsImage = Children.toArray(children).some(
    (child) => isValidElement(child) && child.type === MdxImage,
  );

  if (containsImage) {
    return (
      <>
        {children}
        <br />
      </>
    );
  }

  return <Paragraph {...props}>{children}</Paragraph>;
}

const components = {
  p: MdxParagraph,
  a: InlineLink,
  img: MdxImage,
  h2: Subheader,
  li: ListItem,
  pre: CodeBlock,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
