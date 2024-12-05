'use server';

import actionAsyncHandler from '@/lib/action-async-handler';
import sendRequest from '@/lib/http-request';

type SignupProps = {
  name: string;
  email: string;
  password: string;
};

const signupAction = async (data: SignupProps) => {
  const endpoint = '/auth/signup';

  const actionResponse = await sendRequest({ endpoint, method: 'POST', data });

  return actionResponse;
};

export default actionAsyncHandler(signupAction);
