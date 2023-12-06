import { useCallback, useState } from 'react';
import { ErrCallbackType } from '../types';
import { StoreAccount } from '@/types/entities';
import { otpService } from '@/services';
import { OTPParams, VerifyOTPParams } from '@/services/types';
import { PATTERN_EMAIL, handleErrorHooks } from '@/utils';
import { toast } from 'react-toastify';

export function useOTP() {
  //   ** States
  const [loading, setLoading] = useState<boolean>(false);

  //   ** Handle verify OTP
  const handleVerifyOtp = useCallback(
    async (params: VerifyOTPParams, successCallback: () => void, errCallback: ErrCallbackType) => {
      try {
        setLoading(true);
        const verified = await otpService.verify(params);
        console.log(verified);
        setLoading(false);
        successCallback();
      } catch (err) {
        // ** Handle errors
        handleErrorHooks(err, errCallback);
        setLoading(false);
      }
    },
    [],
  );

  //   ** Handle create email OTP
  const handleCreateEmail = useCallback(
    async (
      params: Pick<StoreAccount, 'email'>,
      successCallback: () => void,
      errCallback: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const response = await otpService.createEmail(params.email);
        if (response) {
          setLoading(false);
          successCallback();
          console.log('useOTP --- create Email ==== 42 : ', response);
        }
      } catch (err) {
        // ** Handle errors
        handleErrorHooks(err, errCallback);
        setLoading(false);
      }
    },
    [],
  );

  // ** Handle create Phone OTP
  const handleCreatePhone = useCallback(
    async (
      params: Pick<StoreAccount, 'phone'>,
      successCallback: () => void,
      errCallback: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const response = await otpService.createPhone(params.phone);
        if (response) {
          setLoading(false);
          successCallback();
          console.log('useOTP --- create Phone ==== 66 : ', response);
        }
      } catch (err) {
        // ** Handle errors
        handleErrorHooks(err, errCallback);
        setLoading(false);
      }
    },
    [],
  );

  // ** Handle send code
  const handleSendCode = useCallback(
    async (
      params: Pick<StoreAccount, 'username'> & { checkEmailExist?: boolean },
      successCallback: () => void,
      errCallback: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        let response: OTPParams;
        if (PATTERN_EMAIL.test(params.username)) {
          response = await otpService.createEmail(params.username, params.checkEmailExist);
        } else {
          response = await otpService.createPhone(params.username);
        }
        if (response) {
          setLoading(false);
          successCallback();
          toast.success(response.code);
          console.log('useOTP === handle send code ==== 101 : ', response);
        }
      } catch (error) {
        // ** Handle errors
        handleErrorHooks(error, errCallback);
        setLoading(false);
      }
    },

    [],
  );

  return {
    loading,
    handleVerifyOtp,
    handleCreateEmail,
    handleCreatePhone,
    handleSendCode,
  };
}
