'use server';

import actionAsyncHandler from '@/lib/action-async-handler';
import { protectAuth } from '@/lib/auth-handler';
import sendRequest from '@/lib/http-request';
import { revalidatePath } from 'next/cache';

type UpdateBlogProps = {
  id: string;
  title: string;
  cover: string;
  content: string;
};

const updateBlogAction = async (data: UpdateBlogProps) => {
  const { id, ...rest } = data;
  const endpoint = `/blogs/${id}`;

  const actionResponse = await sendRequest({
    auth: true,
    endpoint,
    method: 'PATCH',
    data: rest,
  });

  revalidatePath('/dashboard/blogs');

  return actionResponse;
};

export default actionAsyncHandler(updateBlogAction, protectAuth);
