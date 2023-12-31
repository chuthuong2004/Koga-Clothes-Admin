import { blogService } from '@/services';
import { ParamCreateBlog } from '@/services/types';
import { StoreBlog } from '@/types/entities';
import { handleErrorHooks } from '@/utils';
import { useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';
import { ErrCallbackType } from '../types';

export function useBlog() {
  const { mutate } = useSWRConfig();
  const [loading, setLoading] = useState(false);
  const handleCreateBlog = useCallback(
    async (params: ParamCreateBlog, successCallback: () => void, errCallback: ErrCallbackType) => {
      try {
        setLoading(true);
        const created = await blogService.create(params);
        console.log('Tạo bài viết thành công !');

        if (created) {
          mutate('ListBlogManagement');
          successCallback();
        }
      } catch (error) {
        handleErrorHooks(error, errCallback);
      } finally {
        setLoading(false);
      }
    },
    [mutate],
  );
  const handleUpdateBlog = useCallback(
    async (
      id: StoreBlog['_id'],
      params: Partial<ParamCreateBlog>,
      successCallback: () => void,
      errCallback: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const updated = await blogService.update(id, params);
        if (updated) {
          mutate('ListBlogManagement');
          successCallback();
        }
      } catch (error) {
        handleErrorHooks(error, errCallback);
      } finally {
        setLoading(false);
      }
    },
    [mutate],
  );
  const handleDeleteBlog = useCallback(
    async (id: string, successCallback: () => void, errCallback: ErrCallbackType) => {
      try {
        setLoading(true);
        await blogService.delete(id);
        mutate('ListBlogManagement');
        successCallback();
      } catch (error) {
        handleErrorHooks(error, errCallback);
      } finally {
        setLoading(false);
      }
    },
    [mutate],
  );
  return {
    loading,
    onCreateBlog: handleCreateBlog,
    onUpdateBlog: handleUpdateBlog,
    onDeleteBlog: handleDeleteBlog,
  };
}
