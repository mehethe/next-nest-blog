import { z, ZodType } from 'zod';

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export const SignupSchema: ZodType<SignupData> = z.object({
  name: z
    .string({ message: 'Required' })
    .min(2, { message: 'Must be longer than 2 characters' }),
  email: z.string({ message: 'Required' }).email({ message: 'Invalid email' }),
  password: z
    .string({ message: 'Required' })
    .min(6, { message: 'Must be longher than 6 characters' })
    .max(12, { message: 'Must not be longer than 12 characters' })
    .regex(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message:
        'Must contain at least 1 lowercase, 1 uppercase, and 1 number or special character',
    }),
});

export interface SigninData {
  email: string;
  password: string;
}

export const SigninSchema: ZodType<SigninData> = z.object({
  email: z.string({ message: 'Required' }).email({ message: 'Invalid email' }),
  password: z.string().min(1, { message: 'Required' }),
});
