import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAccessToken } from "./service/getAccessToken";
import { USER_ROLE } from "./lib/types/enum";

const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = [
  "/",
  "/services",
  "/technicians",
  "/about",
  "/contact",
  ...AUTH_ROUTES,
];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const response = NextResponse.next();

  const { accessToken, role } = await getAccessToken();

  const isPublic = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  // Protected routes
  if (!isPublic && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!accessToken || !role) {
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");

    if (!PUBLIC_ROUTES.includes(pathname)) {
      const loginURL = new URL("/login", request.url);
      loginURL.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(loginURL);
    }

    return response;
  }

  // Authenticated users shouldn't visit login/register
  if (AUTH_ROUTES.includes(pathname)) {
    switch (role) {
      case USER_ROLE.Admin:
        return NextResponse.redirect(new URL("/dashboard/admin", request.url));

      case USER_ROLE.Technician:
        return NextResponse.redirect(
          new URL("/dashboard/technician", request.url),
        );

      default:
        return NextResponse.redirect(
          new URL("/dashboard/customer", request.url),
        );
    }
  }

  // Role-based authorization
  if (pathname.startsWith("/dashboard")) {
    const isAdminRoute = pathname.startsWith("/dashboard/admin");
    const isTechnicianRoute = pathname.startsWith("/dashboard/technician");
    const isCustomerRoute =
      pathname.startsWith("/dashboard/customer") ||
      pathname === "/dashboard/services";

    if (role === USER_ROLE.Admin && !isAdminRoute) {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    }

    if (role === USER_ROLE.Technician && !isTechnicianRoute) {
      return NextResponse.redirect(
        new URL("/dashboard/technician", request.url),
      );
    }

    if (role === USER_ROLE.Customer && !isCustomerRoute) {
      return NextResponse.redirect(new URL("/dashboard/customer", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|webp|jpg)$).*)",
  ],
};
