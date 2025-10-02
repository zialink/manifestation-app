import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/api/auth/signin", // redirect here if not logged in
  },
});

export const config = {
  matcher: [
    "/api/(?!public/).*",  // protect all /api/* EXCEPT /api/public/*
  ],
};

// BUT: exclude /api/public/*
