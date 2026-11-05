import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

const AI_ROUTES = [
  "/api/ayurveda-prakriti", "/api/chadhava", "/api/chakra-scan", "/api/chat",
  "/api/compatibility-calc", "/api/dream-decode", "/api/free-reading", "/api/gemstone-calc",
  "/api/karmic-debt", "/api/name-calc", "/api/palm-scan", "/api/prashna-calc",
  "/api/quick-answer", "/api/vastu-scan",
];

// Generous on purpose: many Indian mobile users share ONE public IP (carrier NAT), so strict limits
// would block real customers. These still stop scripts (hundreds of calls/min) cold.
// Each route has its own allowance, so using several tools never blocks the others.
const QUICK_UNLOCK_PER_MIN = 20;
const AI_PER_ROUTE_PER_MIN = 30;

function getRateRule(pathname: string): { group: string; limit: number } | null {
  if (pathname === "/api/quick-unlock") return { group: pathname, limit: QUICK_UNLOCK_PER_MIN };
  if (AI_ROUTES.includes(pathname)) return { group: pathname, limit: AI_PER_ROUTE_PER_MIN };
  return null;
}

export async function proxy(req: NextRequest) {
  // 0. Routes are case-sensitive: send mixed-case URLs (typed/shared links) to the lowercase page
  const { pathname } = req.nextUrl;
  if (pathname === "/hanuman-Chalisa" || pathname === "/Hanuman-Chalisa") {
    const url = req.nextUrl.clone();
    url.pathname = "/hanuman-chalisa";
    return NextResponse.redirect(url, 308);
  }

  // 0b. Per-IP rate limit on routes that cost us money or send us alerts (POST only)
  if (req.method === "POST" && pathname.startsWith("/api/")) {
    const rule = getRateRule(pathname);
    if (rule) {
      const ip = getClientIp(req.headers);
      const { allowed, retryAfterSec } = rateLimit(`${rule.group}:${ip}`, rule.limit, 60_000);
      if (!allowed) {
        return NextResponse.json(
          { error: `Aaj bahut log aa rahe hain. Kripya ${retryAfterSec} second baad dobara koshish karein. (Too many requests, please retry shortly.)` },
          { status: 429, headers: { "Retry-After": String(retryAfterSec) } }
        );
      }
    }
  }

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
