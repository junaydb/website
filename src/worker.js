export default {
  async fetch(request, env) {
    try {
      const value = await env.CONFIG_STORE.get("maintenance");
      const maintenanceEnabled = value === "true";

      const url = new URL(request.url);
      const isMaintenancePage =
        url.pathname === "/maintenance" || url.pathname === "/maintenance/";
      const acceptsHtml = request.headers.get("accept")?.includes("text/html");

      if (maintenanceEnabled && acceptsHtml && !isMaintenancePage) {
        url.pathname = "/maintenance";
        url.search = "";

        return Response.redirect(url.toString(), 302);
      }

      return env.ASSETS.fetch(request);
    } catch (e) {
      return new Response(e.message, { status: 500 });
    }
  },
};
