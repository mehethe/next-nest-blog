'use server';

import actionAsyncHandler from '@/lib/action-async-handler';
import { protectAuth } from '@/lib/auth-handler';
import sendRequest from '@/lib/http-request';
import { revalidatePath } from 'next/cache';

type DeleteBlogProps = {
  id: string;
};

const deleteBlogAction = async ({ id }: DeleteBlogProps) => {
  const endpoint = `/blogs/${id}`;

  const actionResponse = await sendRequest({
    auth: true,
    endpoint,
    method: 'DELETE',
  });

  revalidatePath('/dashboard/blogs');
  revalidatePath('/');

  return actionResponse;
};

export default actionAsyncHandler(deleteBlogAction, protectAuth);
