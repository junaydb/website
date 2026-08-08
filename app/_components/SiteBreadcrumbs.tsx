"use client";

import { usePathname } from "next/navigation";

import Breadcrumbs, { type BreadcrumbItem } from "./srcl/Breadcrumbs";

interface PostBreadcrumb {
  path: string;
  title: string;
}

interface SiteBreadcrumbsProps {
  posts: readonly PostBreadcrumb[];
}

export default function SiteBreadcrumbs({ posts }: SiteBreadcrumbsProps) {
  const pathname = usePathname();
  const post = posts.find(({ path }) => pathname === `/${path}`);
  const items: BreadcrumbItem[] = [{ name: "Junayd Bhoyroo", url: "/" }];

  if (post) {
    const [collection] = post.path.split("/");

    items.push(
      {
        name: collection.charAt(0).toUpperCase() + collection.slice(1),
      },
      { name: post.title },
    );
  }

  return <Breadcrumbs items={items} />;
}
