export const config = {
  matcher: ["/", "/art/:path*", "/dev/:path*"],
};

import { rewrite } from "@vercel/edge";
import { get } from "@vercel/edge-config";

export default async function middleware(request) {
  if (process.env.PRODUCTION) {
    if (await get("maintenance")) {
      return rewrite(new URL("/maintenance", request.url));
    }
  }
}
