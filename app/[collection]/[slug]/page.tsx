import { allPosts } from "content-collections";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import Contents, { type MarkdownHeading } from "../../_components/Contents";
import InlineLink from "../../_components/InlineLink";
import Paragraph from "../../_components/Paragraph";
import Grid from "../../_components/srcl/Grid";
import { createMetadata } from "../../_lib/metadata";

interface BlogPostPageProps {
  params: Promise<{
    collection: string;
    slug: string;
  }>;
}

function getPost(collection: string, slug: string) {
  return allPosts.find(
    (post) => post.published && post._meta.path === `${collection}/${slug}`,
  );
}

function getHeadings(content: string): MarkdownHeading[] {
  const occurrences = new Map<string, number>();

  return Array.from(content.matchAll(/^(#{2,6})\s+(.+?)\s*#*$/gm), (match) => {
    const text = match[2]
      .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
      .replace(/[`*_~]/g, "");
    const baseSlug = text
      .toLowerCase()
      .replace(/[^\p{Letter}\p{Number}\p{Mark}_ -]/gu, "")
      .replace(/ /g, "-");
    const occurrence = occurrences.get(baseSlug) ?? 0;

    occurrences.set(baseSlug, occurrence + 1);

    return {
      depth: match[1].length,
      slug: occurrence === 0 ? baseSlug : `${baseSlug}-${occurrence}`,
      text,
    };
  });
}

export async function generateStaticParams() {
  return allPosts
    .filter((post) => post.published)
    .map((post) => ({
      collection: post._meta.directory,
      slug: post._meta.path.slice(post._meta.directory.length + 1),
    }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { collection, slug } = await params;
  const post = getPost(collection, slug);

  if (!post) notFound();

  const canonicalPath = `/${collection}/${slug}`;
  const description = post.metaDescription.trim();

  return createMetadata({
    title: post.title,
    description,
    canonicalPath,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  "use cache";

  const { collection, slug } = await params;
  const post = getPost(collection, slug);

  if (!post) notFound();

  const { default: Content } = await import(
    `@/posts/${collection}/${slug}.mdx`
  );
  const links = post.links ?? [];

  return (
    <>
      <Grid>
        <h2>Summary</h2>
        <Paragraph>{post.description}</Paragraph>

        {links.length > 0 && (
          <>
            <h2>Links</h2>
            <Paragraph>
              {links.map((link) => (
                <InlineLink href={link.href} key={link.href}>
                  {link.text}
                </InlineLink>
              ))}
            </Paragraph>
          </>
        )}

        <Contents headings={getHeadings(post.content)} />
      </Grid>

      <Grid>
        <Content />
      </Grid>
    </>
  );
}
