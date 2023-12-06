import axiosClient from '@/lib/axios';
import { FileResponse } from '@/types/commons';

const URL = 'uploads';
const uploadService = {
  single: (formData: FormData, folder: 'avatars'): Promise<FileResponse> =>
    axiosClient.post(`${URL}/single`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      params: {
        folder,
      },
    }),
};
export default uploadService;
