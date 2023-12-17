import axiosClient from '@/lib/axios';
import { FileResponse } from '@/types/commons';
import { FolderUpload } from './types';

const URL = 'uploads';
const uploadService = {
  single: async (formData: FormData, folder: FolderUpload): Promise<FileResponse> =>
    axiosClient.post(`${URL}/single`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      params: {
        folder,
      },
    }),
  uploadProduct: async (
    formData: FormData,
  ): Promise<{ images: string[]; imageSmall: string; imageMedium: string }> =>
    axiosClient.post(`${URL}/products`, formData, {
      params: {
        folder: 'products',
      },
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  multiple: async (formData: FormData, folder: FolderUpload): Promise<string[]> =>
    axiosClient.post(`${URL}/multiple`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      params: {
        folder,
      },
    }),
};
export default uploadService;
