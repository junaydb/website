import openNextWorker from "./.open-next/worker.js";

const worker = {
  async fetch(request, env, ctx) {
    try {
      const value = await env.CONFIG_STORE.get("maintenance");
      const maintenanceEnabled = value === "true";

      const url = new URL(request.url);
      const isStaging = url.hostname.includes("staging");
      const isMaintenancePage =
        url.pathname === "/maintenance" || url.pathname === "/maintenance/";
      const acceptsHtml = request.headers.get("accept")?.includes("text/html");

      if (
        !isStaging &&
        maintenanceEnabled &&
        acceptsHtml &&
        !isMaintenancePage
      ) {
        url.pathname = "/maintenance";
        url.search = "";

        return Response.redirect(url.toString(), 302);
      }

      return openNextWorker.fetch(request, env, ctx);
    } catch (error) {
      console.error("Worker request failed", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};

export default worker;

export { DOQueueHandler } from "./.open-next/worker.js";
