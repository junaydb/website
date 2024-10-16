export const config = {
  matcher: ["/", "/art/:path*", "/dev/:path*"],
};

import { rewrite } from "@vercel/edge";

export default function middleware(request) {
  if (process.env.MAINTENANCE_MODE === "1") {
    return rewrite(new URL("/maintenance", request.url));
  }
}
