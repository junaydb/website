interface Env {
  ASSETS: Fetcher;
  MAINTENANCE?: string;
}

const maintenancePath = "/maintenance/";

function isMaintenanceEnabled(env: Env): boolean {
  return env.MAINTENANCE === "1";
}

function acceptsHtml(request: Request): boolean {
  return request.headers.get("accept")?.includes("text/html") ?? false;
}

export default {
  fetch(request, env) {
    const url = new URL(request.url);

    if (
      isMaintenanceEnabled(env) &&
      acceptsHtml(request) &&
      url.pathname !== maintenancePath &&
      url.pathname !== "/maintenance"
    ) {
      url.pathname = maintenancePath;
      url.search = "";

      return Response.redirect(url.toString(), 302);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
