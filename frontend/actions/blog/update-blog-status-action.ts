'use server';

import actionAsyncHandler from '@/lib/action-async-handler';
import { adminAuth } from '@/lib/auth-handler';
import sendRequest from '@/lib/http-request';
import { Status } from '@/validation/blog-schema';
import { revalidatePath } from 'next/cache';

type UpdateBlogStatusProps = {
  id: string;
  status: Status;
};

const updateBlogStatusAction = async ({
  id,
  status,
}: UpdateBlogStatusProps) => {
  const endpoint = `/blogs/${id}/status`;

  const actionResponse = await sendRequest({
    auth: true,
    endpoint,
    method: 'PATCH',
    data: { status },
  });

  revalidatePath('/dashboard/blogs');
  revalidatePath('/');

  return actionResponse;
};

export default actionAsyncHandler(updateBlogStatusAction, adminAuth);
