'use server';

import actionAsyncHandler from '@/lib/action-async-handler';
import sendRequest from '@/lib/http-request';

type GetBlogsProps = {
  id?: string;
};

const getBlogsAction = async ({ id }: GetBlogsProps) => {
  const endpoint = `/blogs/${id}`;

  const actionResponse = await sendRequest({
    endpoint,
  });

  return actionResponse;
};

export default actionAsyncHandler(getBlogsAction);
