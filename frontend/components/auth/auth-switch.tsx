import Link from 'next/link';

type Props = {
  isSignup: boolean;
};

export default function AuthSwitch({ isSignup }: Props) {
  return (
    <p className='text-muted-foreground text-xs'>
      {`${isSignup ? 'Already' : "Don't"} have an acoount? `}
      <Link
        className='text-blue-500 font-semibold'
        href={`/auth${isSignup ? '' : '?type=signup'}`}
      >
        {isSignup ? 'Sign in' : 'Sign up'}
      </Link>
    </p>
  );
}
