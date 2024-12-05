'use server';

import actionAsyncHandler from '@/lib/action-async-handler';
import { getServerAuth } from '@/lib/auth-handler';
import sendRequest from '@/lib/http-request';
import FilterOptions from '@/types/filter-options';
import SortOptions from '@/types/sort-options';

type GetBlogsProps = {
  page?: string;
  sort?: SortOptions;
  filter?: FilterOptions;
  isDashboard?: boolean;
};

const getBlogsAction = async ({
  page,
  sort,
  filter,
  isDashboard,
}: GetBlogsProps) => {
  const { user, isAdmin } = await getServerAuth();
  const params = new URLSearchParams();

  if (page) params.append('page', page);
  if (sort) params.append('sort', sort);
  if (filter) params.append('status', filter);
  if (isDashboard && user && !isAdmin) {
    params.append('author', user.id);
  } else if (!isDashboard) {
    params.append('status', 'PUBLISHED');
  }
  const endpoint = `/blogs?${params.toString()}`;

  const actionResponse = await sendRequest({
    endpoint,
  });

  return actionResponse;
};

export default actionAsyncHandler(getBlogsAction);
