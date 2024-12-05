import { authOptions } from '@/config/next-auth';
import { AuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth/next';

export const getServerAuth = async () => {
  try {
    const session = await getServerSession(
      authOptions as unknown as AuthOptions
    );

    const user =
      !session || !session.user ? null : (session.user as SessionUser);

    const isAdmin = user?.isAdmin;
    const token = user?.token;

    return { user, isAdmin, token };
  } catch (error) {
    console.error(error);
    return { user: null, isAdmin: false };
  }
};

export const protectAuth = async () => {
  const { user } = await getServerAuth();

  if (!user) {
    throw new Error('Not authorized');
  }

  return user;
};

export const adminAuth = async () => {
  const { user, isAdmin } = await getServerAuth();

  if (!user || !isAdmin) {
    throw new Error('Not authorized as admin');
  }

  return user;
};
