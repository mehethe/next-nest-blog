import FormInput from '../form/form-input';
import AuthSwitch from './auth-switch';

type Props = { isSignup: boolean; isSubmitting: boolean };

export default function AuthFormFields({ isSignup, isSubmitting }: Props) {
  return (
    <>
      {isSignup && (
        <FormInput
          name='name'
          label='Name'
          placeholder='John Doe'
          disabled={isSubmitting}
          required
        />
      )}
      <FormInput
        name='email'
        label='Email'
        placeholder='johndoe@email.com'
        disabled={isSubmitting}
        required
      />
      <FormInput
        name='password'
        label='Password'
        type='password'
        placeholder='******'
        disabled={isSubmitting}
        required
      />
      <AuthSwitch isSignup={isSignup} />
    </>
  );
}
