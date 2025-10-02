import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Run middleware only for protected routes
export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      // Allow access only if user has a valid token
      authorized: ({ token }) => !!token,
    },
  }
);

// 👇 Configure which routes require authentication
export const config = {
  matcher: [
    "/dashboard/:path*",   // protect dashboard
    "/api/goals/:path*",   // protect Goals API
    "/api/words/:path*",   // protect Words API
  ],
};
