import { TinyEditor } from '@/components/shares';
import { useBrand } from '@/hooks/services';
import { ParamCreateBrand } from '@/services/types';
import { ResponseMessage } from '@/types/commons';
import { StoreBrand } from '@/types/entities';
import { cn, getBase64, uploadSingleImage } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Typography, Upload, UploadFile, message } from 'antd';
import { RcFile } from 'antd/es/upload';
import { memo, useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type FormCreateBrand = {
  name: string;
  logo: UploadFile<File>[];
  image: UploadFile<File>[];
  history: string;
};
const defaultValues: FormCreateBrand = {
  name: '',
  logo: [],
  image: [],
  history: '',
};

type KeyImageBrand = 'logo' | 'image';

const defaultPreview: Record<KeyImageBrand, boolean> = {
  logo: false,
  image: false,
};

type FormBrandProps = {
  onClose: () => void;
  open: boolean;
  type?: 'Edit' | 'Add';
  brand?: StoreBrand;
};
const FormBrand = ({ open, onClose, brand, type = 'Add' }: FormBrandProps) => {
  const { loading, onCreateBrand, onUpdateBrand } = useBrand();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormCreateBrand>({
    defaultValues,
  });
  const [previewOpen, setPreviewOpen] = useState<Record<KeyImageBrand, boolean>>(defaultPreview);
  const [previewImage, setPreviewImage] = useState<Record<KeyImageBrand, string>>({
    image: '',
    logo: '',
  });
  const [previewTitle, setPreviewTitle] = useState<Record<KeyImageBrand, string>>({
    image: '',
    logo: '',
  });
  useEffect(() => {
    if (type === 'Edit' && brand && open) {
      reset({
        name: brand?.name,
        history: brand.history
      })
    }
  }, [brand, type, reset, open])

  const handleCancel = useCallback(() => setPreviewOpen(defaultPreview), []);

  const handlePreviewImages = useCallback(async (file: UploadFile, type_image: KeyImageBrand) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage((prev) => ({
      ...prev,
      [type_image]: file.url || (file.preview as string),
    }));
    setPreviewOpen((prev) => ({
      ...prev,
      [type_image]: true,
    }));
    setPreviewTitle((prev) => ({
      ...prev,
      [type_image]: file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1),
    }));
  }, []);

  const onSubmit = async (data: FormCreateBrand) => {
    const newData: ParamCreateBrand = {
      name: data.name,
      history: data.history,
      image: brand ? brand.image : '',
      logo: brand ? brand.logo : '',
    };
    if (data.image.length > 0) {
      const uploadedImage = await uploadSingleImage(data.image[0].originFileObj, 'brands');
      console.log('image: ', uploadedImage);

      if (uploadedImage) {
        newData.image = uploadedImage;
      }
    }
    if (data.logo.length > 0) {
      const uploadedLogo = await uploadSingleImage(data.logo[0].originFileObj, 'brands');
      console.log('logo: ', uploadedLogo);

      if (uploadedLogo) {
        newData.logo = uploadedLogo;
      }
    }

    const onSuccess = () => {
      onClose();
      reset(defaultValues);
      toast.success(`${type === 'Add' ? 'Thêm mới' : 'Cập nhật'} thương hiệu thành công !`);
    }
    const onError = ({ message: msg }: ResponseMessage) => {
      message.error(msg)
    }
    if (type === 'Add') {
      onCreateBrand(
        newData,
        onSuccess,
        onError
      );
    } else {
      onUpdateBrand(
        brand?._id || '',
        newData, onSuccess,
        onError,
      );
    }
  };

  return (
    <Modal
      open={open}
      title={`${brand ? 'Cập nhật' : 'Thêm mới'} thương hiệu`}
      onOk={handleSubmit(onSubmit)}
      centered
      width={'50vw'}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>,
      ]}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <Typography.Text>Tên thương hiệu</Typography.Text>
            <Controller
              control={control}
              name="name"
              rules={{
                required: {
                  value: true,
                  message: 'Vui lòng nhập tên thương hiệu !',
                },
              }}
              render={({ field }) => (
                <Input
                  size="large"
                  placeholder="Nhập tên thương hiệu"
                  {...field}
                  status={errors.name && 'error'}
                />
              )}
            />
            {errors.name && (
              <Typography.Text type="danger" className="text-lg">
                {errors.name.message}
              </Typography.Text>
            )}
          </div>
          <div className="flex flex-col">
            <Typography.Text>Lịch sử</Typography.Text>
            <Controller
              control={control}
              name="history"
              rules={{
                required: {
                  value: true,
                  message: 'Vui lòng nhập lịch sử thương hiệu !',
                }
              }}
              render={({ field }) => (
                <TinyEditor
                  value={field.value}
                  init={{
                    placeholder: 'Nhập lịch sử thương hiệu'
                  }}
                  onEditorChange={(a) => field.onChange(a)}
                  error={!!errors.history}
                />
              )}
            />
            {errors.history && (
              <Typography.Text type="danger" className="text-lg">
                {errors.history?.message}
              </Typography.Text>
            )}
          </div>
          <div className="flex gap-4">
            {/* Handle choose image medium */}
            <div className="flex flex-col gap-2 flex-1">
              <Typography.Text>Logo</Typography.Text>
              <Controller
                control={control}
                name="logo"
                rules={{
                  required: {
                    value: type === 'Add',
                    message: `Vui lòng chọn logo thương hiệu !`,
                  },
                }}
                render={({ field: { value, onChange } }) => (
                  <div
                    className={cn(
                      'border border-dashed p-4 rounded-md',
                      errors.logo && 'border-error',
                    )}
                  >
                    <Upload
                      listType="picture-card"
                      accept="image/*"
                      maxCount={1}
                      fileList={value}
                      onPreview={(file) => handlePreviewImages(file, 'logo')}
                      onChange={(info) => onChange(info.fileList)}
                    >
                      <div>
                        <PlusOutlined rev />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    </Upload>
                    <Modal
                      open={previewOpen.logo}
                      title={previewTitle.logo}
                      footer={null}
                      onCancel={handleCancel}
                    >
                      <img alt="" className="w-full" src={previewImage.logo} />
                    </Modal>
                  </div>
                )}
              />
              {errors.logo && (
                <Typography.Text type="danger" className="text-lg">{errors.logo?.message}</Typography.Text>
              )}
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <Typography.Text>Hình ảnh</Typography.Text>
              <Controller
                control={control}
                name="image"
                rules={{
                  required: {
                    value: type === 'Add',
                    message: `Vui lòng chọn hình ảnh thương hiệu !`,
                  },
                }}
                render={({ field: { value, onChange } }) => (
                  <div
                    className={cn(
                      'border border-dashed p-4 rounded-md',
                      errors.logo && 'border-error',
                    )}
                  >
                    <Upload
                      listType="picture-card"
                      accept="image/*"
                      maxCount={1}
                      fileList={value}
                      onPreview={(file) => handlePreviewImages(file, 'image')}
                      onChange={(info) => onChange(info.fileList)}
                    >
                      <div>
                        <PlusOutlined rev />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    </Upload>
                    <Modal
                      open={previewOpen.image}
                      title={previewTitle.image}
                      footer={null}
                      onCancel={handleCancel}
                    >
                      <img alt="" className="w-full" src={previewImage.image} />
                    </Modal>
                  </div>
                )}
              />
              {errors.image && (
                <Typography.Text type="danger" className="text-lg">{errors.image?.message}</Typography.Text>
              )}
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default memo(FormBrand);
