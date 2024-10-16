export const config = {
  matcher: ["/", "/art/:path*", "/dev/:path*"],
};

import { rewrite } from "@vercel/edge";
import { get } from "@vercel/edge-config";

export default async function middleware(request) {
  if (!process.env.STAGING) {
    const maintenanceMode = await get("maintenance");
    if (maintenanceMode == "1") {
      return rewrite(new URL("/maintenance", request.url));
    }
  }
}
