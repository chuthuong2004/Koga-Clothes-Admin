import { ParamCreateRepository } from '@/services/types';
import { useCallback, useState } from 'react';
import { ErrCallbackType } from '../types';
import { handleErrorHooks } from '@/utils';
import { repositoryService } from '@/services';
import { useSWRConfig } from 'swr';
import { StoreRepository } from '@/types/entities';

export function useRepository() {
  const { mutate } = useSWRConfig();
  const [loading, setLoading] = useState(false);
  const handleCreateRepository = useCallback(
    async (
      params: ParamCreateRepository,
      successCallback: () => void,
      errCallback: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const created = await repositoryService.create(params);
        console.log('Tạo kho thành công !');
        if (created) {
          mutate('ListRepositoryManagement');
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
  const handleUpdateRepository = useCallback(
    async (
      id: StoreRepository['_id'],
      params: Partial<ParamCreateRepository>,
      successCallback: () => void,
      errCallback: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const updated = await repositoryService.update(id, params);
        if (updated) {
          mutate('ListRepositoryManagement');
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
  const handleDeleteRepository = useCallback(
    async (id: string, successCallback: () => void, errCallback: ErrCallbackType) => {
      try {
        setLoading(true);
        await repositoryService.delete(id);
        mutate('ListRepositoryManagement');
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
    onCreateRepository: handleCreateRepository,
    onUpdateRepository: handleUpdateRepository,
    onDeleteRepository: handleDeleteRepository,
  };
}
