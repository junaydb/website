import { createHighlighterCore } from "@shikijs/core";
import { createJavaScriptRegexEngine } from "@shikijs/engine-javascript";
import c from "@shikijs/langs/c";
import cpp from "@shikijs/langs/cpp";
import go from "@shikijs/langs/go";
import java from "@shikijs/langs/java";
import javascript from "@shikijs/langs/javascript";
import jsx from "@shikijs/langs/jsx";
import python from "@shikijs/langs/python";
import tsx from "@shikijs/langs/tsx";
import typescript from "@shikijs/langs/typescript";
import githubDarkHighContrast from "@shikijs/themes/github-dark-high-contrast";
import githubLightHighContrast from "@shikijs/themes/github-light-high-contrast";
import {
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

const highlighterPromise = createHighlighterCore({
  themes: [githubLightHighContrast, githubDarkHighContrast],
  langs: [c, cpp, go, java, javascript, jsx, python, tsx, typescript],
  engine: createJavaScriptRegexEngine(),
});

const languageAliases = {
  c: "c",
  "c++": "cpp",
  cpp: "cpp",
  cxx: "cpp",
  go: "go",
  golang: "go",
  java: "java",
  javascript: "javascript",
  js: "javascript",
  jsx: "jsx",
  python: "python",
  py: "python",
  typescript: "typescript",
  ts: "typescript",
  tsx: "tsx",
} as const;

type SupportedLanguage =
  | (typeof languageAliases)[keyof typeof languageAliases]
  | "text";

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

function getLanguage(language: string): SupportedLanguage {
  return Object.hasOwn(languageAliases, language)
    ? languageAliases[language as keyof typeof languageAliases]
    : "text";
}

export default async function CodeBlock(
  props: ComponentPropsWithoutRef<"pre">,
) {
  const { code, language } = getCode(props);
  const highlighter = await highlighterPromise;
  const html = highlighter.codeToHtml(code, {
    lang: getLanguage(language),
    themes: {
      light: "github-light-high-contrast",
      dark: "github-dark-high-contrast",
    },
  });

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
