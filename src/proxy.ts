import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  // Only apply to /admin routes
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;

    // Fail closed in production if credentials are not configured
    if (!username || !password) {
      if (process.env.NODE_ENV === "production") {
        return new NextResponse(
          "Authentication misconfigured. Please contact the administrator.",
          { status: 500 }
        );
      } else {
        console.warn("WARNING: ADMIN_USERNAME and/or ADMIN_PASSWORD are not set in the environment.");
        // Still fail closed to prevent accidental access, but give a helpful dev message
        return new NextResponse(
          "Local Dev Warning: ADMIN_USERNAME and ADMIN_PASSWORD must be set in .env.local to access the admin dashboard.",
          { status: 500 }
        );
      }
    }

    const basicAuth = req.headers.get("authorization");
    
    if (basicAuth) {
      const authValue = basicAuth.split(" ")[1] ?? "";
      const decodedValue = Buffer.from(authValue, "base64").toString("utf-8");
      const [providedUsername, providedPassword] = decodedValue.split(":");

      // Use a secure timing-safe equal comparison if possible, or simple strict equality for MVP
      // Next.js Edge runtime does not have full Node.js crypto timingSafeEqual easily available,
      // so we use simple equality for this basic MVP. 
      // NOTE: This should be replaced with proper session-based authentication before adding multiple admins/staff.
      if (
        providedUsername === username &&
        providedPassword === password
      ) {
        return NextResponse.next();
      }
    }

    // Return 401 with WWW-Authenticate header to trigger the browser's native login prompt
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Admin Area"',
      },
    });
  }

  return NextResponse.next();
}

// Configure the middleware to only run on admin routes to save execution time
export const config = {
  matcher: "/admin/:path*",
};
