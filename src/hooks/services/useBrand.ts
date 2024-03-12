import { ParamCreateBrand } from '@/services/types';
import { useCallback, useState } from 'react';
import { ErrCallbackType } from '../types';
import { handleErrorHooks } from '@/utils';
import { brandService } from '@/services';
import { useSWRConfig } from 'swr';
import { StoreBrand } from '@/types/entities';

export function useBrand() {
  const { mutate } = useSWRConfig();
  const [loading, setLoading] = useState(false);
  const handleCreateBrand = useCallback(
    async (params: ParamCreateBrand, successCallback: () => void, errCallback: ErrCallbackType) => {
      try {
        setLoading(true);
        const created = await brandService.create(params);
        console.log('Tạo brand thành công !');

        if (created) {
          mutate('ListBrandManagement');
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
  const handleUpdateBrand = useCallback(
    async (
      id: StoreBrand['_id'],
      params: Partial<ParamCreateBrand>,
      successCallback: () => void,
      errCallback: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const updated = await brandService.update(id, params);
        if (updated) {
          mutate('ListBrandManagement');
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
  const handleDeleteBrand = useCallback(
    async (id: string, successCallback: () => void, errCallback: ErrCallbackType) => {
      try {
        setLoading(true);
        await brandService.delete(id);
        mutate('ListBrandManagement');
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
    onCreateBrand: handleCreateBrand,
    onUpdateBrand: handleUpdateBrand,
    onDeleteBrand: handleDeleteBrand,
  };
}
