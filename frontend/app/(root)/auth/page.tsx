'use client';

import AuthFormFields from '@/components/auth/auth-form-fields';
import Form from '@/components/form';
import { useAuthUser } from '@/hooks/use-auth-user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function AuthPage() {
  const { isSignup, schema, defaultValues, onSubmit } = useAuthUser();

  const form = useForm({
    resolver: zodResolver(schema),
    shouldFocusError: false,
    defaultValues,
  });

  const {
    reset,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <section className='page-container flex justify-center items-center'>
      <Form
        form={form}
        onSubmit={onSubmit}
        title={isSignup ? 'Sign Up' : 'Sign In'}
        description={
          isSignup
            ? 'Join us today and start your journey'
            : 'Access your account and explore more'
        }
        buttonLabel={isSignup ? 'Sign Up' : 'Sign In'}
        buttonClassName='w-full'
      >
        <AuthFormFields isSignup={isSignup} isSubmitting={isSubmitting} />
      </Form>
    </section>
  );
}
