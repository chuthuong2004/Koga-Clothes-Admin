import { useCallback, useState } from 'react';
import { ErrCallbackType } from '../types';
import { roleService } from '@/services/role.service';
import { ParamCreateRole } from '@/services/types';
import { handleErrorHooks } from '@/utils';

export function useRole() {
  const [loading, setLoading] = useState(false);
  const handleCreateRole = useCallback(
    async (
      params: ParamCreateRole,
      successCallback: () => void,
      errorCallback?: ErrCallbackType,
    ) => {
      try {
        const newRole = await roleService.create(params);
        console.log('Created role: ', newRole);

        if (newRole) {
          successCallback();
        }
      } catch (error) {
        handleErrorHooks(error, errorCallback);
      } finally {
        setLoading(false);
      }
    },
    [],
  );
  const handleUpdateRole = useCallback(
    async (
      id: string,
      params: ParamCreateRole,
      successCallback: () => void,
      errorCallback?: ErrCallbackType,
    ) => {
      try {
        const updated = await roleService.update(id, params);
        console.log('Created role: ', updated);
        if (updated) {
          successCallback();
        }
      } catch (error) {
        handleErrorHooks(error, errorCallback);
      } finally {
        setLoading(false);
      }
    },
    [],
  );
  return {
    loading,
    onCreateRole: handleCreateRole,
    onUpdateRole: handleUpdateRole,
  };
}
