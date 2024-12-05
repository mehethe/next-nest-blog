import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token, // Ensure token exists for authentication
  },
});

export const config = {
  matcher: ['/dashboard/:path*'], // Define the routes to match
};
