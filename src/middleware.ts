import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const secret = new TextEncoder().encode(
      process.env.ACCESS_TOKEN_SECRET!
    );

    const { payload } = await jwtVerify(token, secret);
    const timeUntilExpiry = (payload.exp as number) * 1000 - Date.now();

    if(timeUntilExpiry < 5 * 60 * 1000) {
      const refreshResponse = await fetch(
        new URL("/api/auth/refresh-access-token", req.url),
        {method: "POST", headers: {cookie: req.headers.get("cookie") || ""}}
      );
      
      if (refreshResponse.ok) {
        const response = NextResponse.next();
        refreshResponse.headers.getSetCookie().forEach((cookie) => {
          response.headers.append("Set-Cookie", cookie);
        });
        return response;
      } else {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    if (req.nextUrl.pathname.startsWith("/admin")) {
      if ((payload.role as string) !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/logout",
    "/cart/:path*",
    "/products/admin/addProduct",
    "/orders/:path*",
    "/profile"
  ]
}