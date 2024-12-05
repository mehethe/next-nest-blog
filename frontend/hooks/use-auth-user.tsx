'use client';

import {
  SigninData,
  SigninSchema,
  SignupData,
  SignupSchema,
} from '@/validation/auth-schema';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import useNotification from './use-notification';
import useAuth from './use-auth';
import signupAction from '@/actions/signup-action';
import { signIn } from 'next-auth/react';

export function useAuthUser() {
  const router = useRouter();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const showNotification = useNotification();

  const isSignup = searchParams.get('type') === 'signup';

  useEffect(() => {
    if (user) {
      router.replace('/dashboard');
    }
  }, [user]);

  const schema = useMemo(
    () => (isSignup ? SignupSchema : SigninSchema),
    [isSignup]
  );
  const defaultValues = useMemo(
    () =>
      isSignup
        ? { name: '', email: '', password: '' }
        : { email: '', password: '' },
    [isSignup]
  );

  const handleNotification = (errorMsg?: string | null) => {
    if (errorMsg) {
      showNotification({ message: errorMsg, variant: 'error' });
      return;
    }

    showNotification({
      message: isSignup ? 'Account created. Please sign in' : 'Signing in...',
      variant: isSignup ? 'success' : 'promise',
    });

    if (isSignup) {
      router.replace('/auth');
    }
  };

  const onSubmit = async (data: SignupData | SigninData) => {
    let errorMsg;

    if (isSignup) {
      const { success, message } = await signupAction(data as SignupData);

      errorMsg = success ? undefined : message;
    } else {
      const result = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      errorMsg = result?.error;
    }

    handleNotification(errorMsg);
  };

  return { isSignup, schema, defaultValues, onSubmit };
}
