'use client';

import { useSession } from 'next-auth/react';

export default function useAuth() {
  const { data: session } = useSession();

  const user = !session || !session.user ? null : (session.user as SessionUser);

  const isAdmin = user?.isAdmin;
  const token = user?.token;

  return { user, isAdmin, token };
}
