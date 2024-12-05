import {
  createBlogAction,
  deleteBlogAction,
  updateBlogAction,
  updateBlogStatusAction,
} from '@/actions/blog';
import FormFileInput from '@/components/form/form-file-input';
import FormInput from '@/components/form/form-input';
import FormSelect from '@/components/form/form-select';
import FormTextarea from '@/components/form/form-textarea';
import Table from '@/types/table';
import BlogSchema from '@/validation/blog-schema';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

type Props = {
  edit?: 'user' | 'admin';
  table: Table;
};

export default function useTableForm({ table, edit }: Props) {
  const isAdminEdit = edit === 'admin';
  const isBlogTable = table === 'blog';
  const router = useRouter();

  if (isBlogTable) {
    const title = 'Blog';
    const description = edit
      ? isAdminEdit
        ? 'Update blog status to publish or unpublish'
        : 'Make changes to your blog'
      : 'Add your new blog';

    const editedFiledsCheck = useMemo(
      () =>
        edit ? (isAdminEdit ? ['status'] : ['title', 'content', 'cover']) : [],
      [isAdminEdit]
    );

    const defaultValues = useMemo(
      () =>
        isAdminEdit
          ? { title: '', content: '', cover: '', status: '' }
          : { title: '', content: '', cover: '' },
      [isAdminEdit]
    );

    const schema = BlogSchema;

    const action = edit
      ? isAdminEdit
        ? updateBlogStatusAction
        : updateBlogAction
      : createBlogAction;

    const renderFormFields = (isLoading: boolean) => {
      const CommonFields = (
        <>
          <FormFileInput
            name='cover'
            label='Cover'
            disabled={isLoading}
            required
          />
          <FormInput
            name='title'
            label='Title'
            placeholder='This is my blog'
            disabled={isLoading}
            required
          />
          <FormTextarea
            name='content'
            label='Content'
            placeholder='This is my blog content.'
            disabled={isLoading}
            required
          />
        </>
      );

      const AdminFields = (
        <>
          <FormInput
            name='title'
            label='Title'
            placeholder='This is my blog'
            disabled={true}
          />
          <FormSelect
            name='status'
            label='Status'
            disabled={isLoading}
            options={[
              { id: 'PENDING', name: 'Pending' },
              { id: 'PUBLISHED', name: 'Published' },
            ]}
            required
          />
        </>
      );

      return isAdminEdit ? AdminFields : CommonFields;
    };

    const deleteAction = deleteBlogAction;

    const handleView = (id: string) => router.push(`/blogs/${id}`);

    return {
      title,
      description,
      editedFiledsCheck,
      defaultValues,
      schema,
      action,
      renderFormFields,
      deleteAction,
      handleView,
    };
  } else {
    return {};
  }
}
