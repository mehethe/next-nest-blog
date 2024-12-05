'use server';

import actionAsyncHandler from '@/lib/action-async-handler';
import { protectAuth } from '@/lib/auth-handler';
import sendRequest from '@/lib/http-request';
import { revalidatePath } from 'next/cache';

type CreateBlogProps = {
  title: string;
  cover: string;
  content: string;
};

const createBlogAction = async (data: CreateBlogProps) => {
  const endpoint = '/blogs';

  const actionResponse = await sendRequest({
    auth: true,
    endpoint,
    method: 'POST',
    data,
  });

  revalidatePath('/dashboard/blogs');

  return actionResponse;
};

export default actionAsyncHandler(createBlogAction, protectAuth);
