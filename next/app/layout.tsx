import { allPosts } from "content-collections";
import { JetBrains_Mono, Recursive } from "next/font/google";
import { Suspense, type ReactNode } from "react";
import type { Metadata } from "next";

import SiteBreadcrumbs from "./_components/SiteBreadcrumbs";
import Breadcrumbs from "./_components/srcl/Breadcrumbs";
import Grid from "./_components/srcl/Grid";
import { createMetadata } from "./_lib/metadata";
import styles from "./layout.module.scss";
import "./globals.scss";

const recursive = Recursive({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-recursive",
  weight: "400",
});

const jetBrainsMono = JetBrains_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: "500",
});

export const metadata: Metadata = createMetadata();

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  "use cache";

  const posts = allPosts
    .filter((post) => post.published)
    .map((post) => ({ path: post._meta.path, title: post.title }));

  return (
    <html
      lang="en"
      className={`dark ${recursive.variable} ${jetBrainsMono.variable}`}
    >
      <head>
        <link rel="sitemap" href="/sitemap.xml" />
      </head>
      <body className={styles.body}>
        <main className={styles.main}>
          <Grid>
            <Suspense
              fallback={
                <Breadcrumbs items={[{ name: "Junayd Bhoyroo", url: "/" }]} />
              }
            >
              <SiteBreadcrumbs posts={posts} />
            </Suspense>
          </Grid>
          {children}
        </main>
        <div className={styles.scanlines} aria-hidden="true" />
      </body>
    </html>
  );
}
