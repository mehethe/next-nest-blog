import { ActionResponse } from '@/types/action-response';

const actionAsyncHandler =
  <T extends Record<string, any>>(
    fn: (
      data: T,
      sessionUser: SessionUser | undefined
    ) => Promise<ActionResponse>,
    authFn?: () => Promise<undefined | SessionUser>
  ) =>
  async (data: T = {} as T): Promise<ActionResponse> => {
    try {
      // Execute auth function if provided, otherwise undefined
      const userData = authFn ? await authFn() : undefined;

      // Call the main function and pass validated obj and userData
      return await fn(data, userData);
    } catch (err: any) {
      const error = err as Error;

      // Return standardized error response
      return {
        success: false,
        message: error.message || 'Something went wrong!',
        data: null,
      };
    }
  };

export default actionAsyncHandler;
