import { z, ZodType } from 'zod';

export enum Status {
  PENDING = 'PENDING',
  PUBLISHED = 'PUBLISHED',
}

export interface BlogData {
  title: string;
  content: string;
  cover: string;
  status?: Status;
}

const BlogSchema: ZodType<BlogData> = z.object({
  title: z
    .string({ message: 'Required' })
    .min(6, { message: 'Must be longer than 6 characters' }),
  content: z
    .string({ message: 'Required' })
    .min(6, { message: 'Must be longer than 6 characters' }),
  cover: z
    .string({ message: 'Required' })
    .min(6, { message: 'Invalid cover image' }),
  status: z
    .enum(Object.values(Status) as [Status, ...Status[]], {
      message: 'Required',
    })
    .optional(),
});

export default BlogSchema;
