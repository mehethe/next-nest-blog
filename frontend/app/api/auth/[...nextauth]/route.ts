import { authOptions } from '@/config/next-auth';
import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';

const handler = NextAuth(authOptions as unknown as AuthOptions);

export { handler as GET, handler as POST };
