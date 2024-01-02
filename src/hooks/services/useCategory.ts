import { ParamsCreateCategory } from '@/services/types';
import { useCallback, useState } from 'react';
import { ErrCallbackType } from '../types';
import { handleErrorHooks } from '@/utils';
import { categoryService } from '@/services';
import { useSWRConfig } from 'swr';
import { StoreCategory } from '@/types/entities';

export function useCategory() {
  const { mutate } = useSWRConfig();
  const [loading, setLoading] = useState(false);

  const handleCreateCategory = useCallback(
    async (
      params: ParamsCreateCategory,
      successCallback: (category: StoreCategory) => void,
      errCallback?: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const created = await categoryService.create(params);
        if (created) {
          mutate('');
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

  const handleUpdateCategory = useCallback(
    async (
      id: string,
      params: Partial<ParamsCreateCategory>,
      successCallback: (category: StoreCategory) => void,
      errCallback?: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const updated = await categoryService.update(id, params);
        if (updated) {
          mutate('');
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
  return {
    loading,
    onCreateCategory: handleCreateCategory,
    onUpdateCategory: handleUpdateCategory,
  };
}
