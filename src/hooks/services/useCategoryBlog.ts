import { ParamsCreateCategoryBlog } from '@/services/types';
import { StoreCategoryBlog } from '@/types/entities';
import { handleErrorHooks } from '@/utils';
import { useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';
import { ErrCallbackType } from '../types';
import { categoryBlogService } from '@/services';

export function useCategoryBlog() {
  const { mutate } = useSWRConfig();
  const [loading, setLoading] = useState(false);

  const handleCreateCategoryBlog = useCallback(
    async (
      params: ParamsCreateCategoryBlog,
      successCallback: (category: StoreCategoryBlog) => void,
      errCallback?: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const created = await categoryBlogService.create(params);
        if (created) {
          mutate((key) => typeof key === 'string' && key.startsWith('ListCategory'));
          successCallback(created);
        }
      } catch (error) {
        handleErrorHooks(error, errCallback);
      } finally {
        setLoading(false);
      }
    },
    [mutate],
  );

  const handleUpdateCategoryBlog = useCallback(
    async (
      id: string,
      params: Partial<ParamsCreateCategoryBlog>,
      successCallback: (category: StoreCategoryBlog) => void,
      errCallback?: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const updated = await categoryBlogService.update(id, params);
        if (updated) {
          mutate((key) => typeof key === 'string' && key.startsWith('ListCategoryBlog'));
          successCallback(updated);
        }
      } catch (error) {
        handleErrorHooks(error, errCallback);
      } finally {
        setLoading(false);
      }
    },
    [mutate],
  );

  const handleDeleteCategoryBlog = useCallback(
    async (id: string, successCallback: () => void, errCallback?: ErrCallbackType) => {
      try {
        setLoading(true);
        await categoryBlogService.delete(id);
        mutate((key) => typeof key === 'string' && key.startsWith('ListCategoryBlog'));
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
    onCreateCategoryBlog: handleCreateCategoryBlog,
    onUpdateCategoryBlog: handleUpdateCategoryBlog,
    onDeleteCategoryBlog: handleDeleteCategoryBlog,
  };
}
