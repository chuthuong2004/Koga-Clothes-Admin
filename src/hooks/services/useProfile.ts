import { useCallback, useState } from 'react';
import { userService } from '@/services';
import { useAppDispatch } from '@/types/commons';
import { ParamChangePassword, ParamCreateAddress, ParamUpdateProfile } from '@/services/types';
import { ErrCallbackType } from '../types';
import { updateProfile } from '@/store/actions';
import { handleErrorHooks } from '@/utils';

export function useProfile() {
  //   ** States Loading
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const handleUpdateProfile = useCallback(
    async (
      params: Partial<ParamUpdateProfile>,
      successCallback: () => void,
      errorCallback?: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const res = await userService.updateProfile(params);
        if (res) {
          dispatch(updateProfile(res));
          successCallback();
        }
      } catch (err) {
        // ** Handle errors
        handleErrorHooks(err, errorCallback);
      } finally {
        setLoading(false);
      }
    },
    [dispatch],
  );

  const handleChangePassword = useCallback(
    async (
      params: ParamChangePassword,
      successCallback: () => void,
      errorCallback?: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const response = await userService.changePassword(params);

        setLoading(false);
        console.log('CHANGE PASSWORD --- USE AUTH : 146 : ', response);
        successCallback();
      } catch (err) {
        // ** Handle errors
        handleErrorHooks(err, errorCallback);
        setLoading(false);
        console.log('errro', err);
      }
    },
    [],
  );

  const handleAddAddress = useCallback(
    async (
      params: ParamCreateAddress,
      successCallback: () => void,
      errorCallback?: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const response = await userService.addAddress(params);
        dispatch(updateProfile(response));
        console.log('CHANGE PASSWORD --- USE AUTH : 146 : ', response);
        successCallback();
      } catch (err) {
        // ** Handle errors
        handleErrorHooks(err, errorCallback);
      } finally {
        setLoading(false);
      }
    },
    [dispatch],
  );

  const handleUpdateAddress = useCallback(
    async (
      addressId: string,
      params: Partial<ParamCreateAddress>,
      successCallback: () => void,
      errorCallback?: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const response = await userService.updateAddress(addressId, params);
        dispatch(updateProfile(response));
        console.log('CHANGE PASSWORD --- USE AUTH : 146 : ', response);
        successCallback();
      } catch (err) {
        // ** Handle errors
        handleErrorHooks(err, errorCallback);
      } finally {
        setLoading(false);
      }
    },
    [dispatch],
  );
  return {
    loading,
    handleUpdateProfile,
    handleChangePassword,
    handleAddAddress,
    handleUpdateAddress,
  };
}
