import { User } from '@prisma/client';

export function generateAuthData(user: User) {
  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  };

  return userData;
}
