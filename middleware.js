import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname.startsWith("/create-prompt") &&
      !req.nextauth?.token?.role
    ) {
      return NextResponse.rewrite(new URL("/denied", req.url));
    }

    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth?.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/denied", req.url));
    }
  },
  {
    callbacks: {
      authorized({ req, token }) {
        return !!token;
      },
    },
  }
);

export const config = { matcher: ["/create-prompt", "/admin"] };
