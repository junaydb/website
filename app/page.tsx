"use cache";

import { allPosts } from "content-collections";

import ActionListItem from "./_components/srcl/ActionListItem";
import Grid from "./_components/srcl/Grid";

export default async function HomePage() {
  const projects = allPosts
    .filter((post) => post.published && post._meta.directory === "projects")
    .sort((a, b) => b.order - a.order);

  return (
    <>
      <Grid>
        <h2>Bio</h2>
        <p>
          London-based software engineer. I&apos;m constantly learning through
          building. Currently focused on back-end engineering and fintech, but
          my projects span a range of areas.
        </p>
      </Grid>

      <Grid>
        <h2>Projects</h2>
        {projects.map((project) => (
          <ActionListItem
            date={project.date}
            href={`/${project._meta.path}`}
            key={project._meta.path}
          >
            {project.title}
          </ActionListItem>
        ))}
      </Grid>
    </>
  );
}
