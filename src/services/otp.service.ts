import { OTPParams, VerifyOTPParams } from './types';
import axiosClient from '@/lib/axios';

const URL = 'emails';
const otpService = {
  createEmail: async (email: string, checkEmailExist?: boolean): Promise<OTPParams> =>
    axiosClient.post(URL, { email }, { params: { 'check-email-exist': checkEmailExist } }),
  createPhone: async (phone: string): Promise<OTPParams> => axiosClient.post('phones', { phone }),
  verify: async (body: VerifyOTPParams) => axiosClient.post(`${URL}/verify`, body),
};
export default otpService;
