import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function proxy(req: NextRequest) {
  // 1. Only apply basic auth to /admin routes
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

      if (providedUsername === username && providedPassword === password) {
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

  // 2. Supabase auth session refresh for application routes
  let supabaseResponse = NextResponse.next({ request: req });
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
          cookies: {
            getAll() { return req.cookies.getAll(); },
            setAll(cookiesToSet: Array<{ name: string; value: string; options?: Parameters<typeof supabaseResponse.cookies.set>[2] }>) {
              cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value));
              supabaseResponse = NextResponse.next({ request: req });
              cookiesToSet.forEach(({ name, value, options }) =>
                supabaseResponse.cookies.set(name, value, options)
              );
            },
          },
        }
      );
      await supabase.auth.getUser();
    } catch {
      // Safe fallback when offline or during initial startup
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    // Exclude static assets and machine-to-machine webhooks (no session to refresh)
    "/((?!_next/static|_next/image|favicon.ico|icons/|images/|logos/|manifest.json|api/telegram-webhook|api/upi-webhook|api/wallet/topup-confirm).*)",
  ],
};
