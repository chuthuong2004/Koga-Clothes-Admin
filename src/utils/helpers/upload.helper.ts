import { uploadService } from '@/services';
import { FolderUpload } from '@/services/types';
import { RcFile } from 'antd/es/upload';

export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export async function uploadImageProduct(
  images: (RcFile | undefined)[],
  imageSmall: RcFile | undefined,
  imageMedium: RcFile | undefined,
) {
  const formData = new FormData();
  Object.values(images).forEach((file) => {
    file && formData.append('images', file);
  });
  imageSmall && formData.append('imageSmall', imageSmall);
  imageMedium && formData.append('imageMedium', imageMedium);

  const updated = await uploadService.uploadProduct(formData);
  console.log(updated);
  return updated;
}

export async function uploadSingleImage(image: RcFile | undefined, folder: FolderUpload) {
  if (!image) return;
  const formData = new FormData();
  formData.append('file', image);
  const updated = await uploadService.single(formData, folder);
  console.log(updated);
  return updated.path;
}


export async function uploadMultipleImage(images: (RcFile | undefined | File)[], folder: FolderUpload) {
  const formData = new FormData();
  Object.values(images).forEach((file) => {
    file && formData.append('files', file);
  });
  const updated = await uploadService.multiple(formData, folder);
  console.log(updated);
  return updated;
}
