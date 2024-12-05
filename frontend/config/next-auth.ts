import CredentialsProvider from 'next-auth/providers/credentials';
import jwt, { JwtPayload } from 'jsonwebtoken';

type UserData = Omit<SessionUser, 'token'>;

const jwtSecret = process.env.NEXTAUTH_SECRET;
const tokenExpiry = '30d';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.BACKEND}/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const { success, message, data } = await res.json();

        if (!res.ok || !success) {
          throw new Error(message);
        }

        return data;
      },
    }),
  ],
  callbacks: {
    //
    async jwt({ token, user }: { token: any; user: UserData }) {
      if (user) {
        // Generate a custom token structure: { id }
        token.customToken = jwt.sign({ id: user.id }, jwtSecret!, {
          expiresIn: tokenExpiry,
        });
        token.user = user;
      }

      return token;
    },
    // Modifies the session object
    async session({
      session,
      token,
    }: {
      session: { jwt: string; user: SessionUser | null };
      token: { customToken: string; user: UserData };
    }) {
      // Attach the custom token and user to the session object if available
      if (token.user && token.customToken) {
        try {
          // Decode the token without verifying to check expiration date
          const decodedToken = jwt.decode(token.customToken) as JwtPayload;

          if (
            decodedToken.exp &&
            (decodedToken.exp as number) > Date.now() / 1000
          ) {
            // Token is valid
            session.user = { ...token.user, token: token.customToken };
          } else {
            // Token is expired
            session.user = null;
          }
        } catch (err: any) {
          console.error('Error decoding token:', err.message);
          session.user = null;
        }
      } else {
        session.user = null;
      }

      return session;
    },
  },
  pages: {
    signIn: '/auth',
    error: '/auth',
  },
  session: {
    strategy: 'jwt' as 'jwt',
  },
  secret: jwtSecret,
};
