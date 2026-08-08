import {
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import {
  bundledLanguages,
  bundledLanguagesAlias,
  codeToHtml,
  type BundledLanguage,
} from "shiki";

interface CodeElementProps {
  children?: ReactNode;
  className?: string;
}

function getCode(props: ComponentPropsWithoutRef<"pre">) {
  if (!isValidElement<CodeElementProps>(props.children)) {
    return { code: String(props.children ?? ""), language: "text" };
  }

  const { children, className } = props.children.props;
  const language = className?.match(/(?:^|\s)language-([^\s]+)/)?.[1] ?? "text";

  return { code: String(children ?? ""), language };
}

function isBundledLanguage(language: string): language is BundledLanguage {
  return language in bundledLanguages || language in bundledLanguagesAlias;
}

export default async function CodeBlock(
  props: ComponentPropsWithoutRef<"pre">,
) {
  const { code, language } = getCode(props);
  const html = await codeToHtml(code, {
    lang: isBundledLanguage(language) ? language : "text",
    themes: {
      light: "github-light-high-contrast",
      dark: "github-dark-high-contrast",
    },
  });

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
