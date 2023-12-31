import { useBlog } from '@/hooks/services';
import { ParamCreateBlog, ParamCreateBrand } from '@/services/types';
import { Nullable } from '@/types/commons';
import { StoreBlog, StoreBrand } from '@/types/entities';
import { cn, convertContent, getBase64, uploadSingleImage } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Typography, Upload, UploadFile } from 'antd';
import { RcFile } from 'antd/es/upload';
import { ContentState, EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import htmlToDraft from 'html-to-draftjs';

type FormCreateBlog = {
  title: string;
  summary: string;
  content: EditorState;
  image: UploadFile<File>[];
};
const defaultValues: FormCreateBlog = {
  title: '',
  image: [],
  summary: '',
  content: EditorState.createEmpty(),
};

type KeyImageBlog = 'image';

const defaultPreview: Record<KeyImageBlog, boolean> = {
  image: false,
};

type FormBrandProps = {
  onClose: () => void;
  open: boolean;
  type?: 'Edit' | 'Add';
  blog?: StoreBlog;
};
const FormBrand = ({ open, onClose, blog, type = 'Add' }: FormBrandProps) => {
  const { loading, onCreateBlog, onUpdateBlog } = useBlog();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormCreateBlog>({
    defaultValues,
  });
  const [previewOpen, setPreviewOpen] = useState<Record<KeyImageBlog, boolean>>(defaultPreview);
  const [previewImage, setPreviewImage] = useState<Record<KeyImageBlog, string>>({
    image: '',
  });
  const [previewTitle, setPreviewTitle] = useState<Record<KeyImageBlog, string>>({
    image: '',
  });
  useEffect(() => {
    if (type === 'Edit' && blog && open) {
      reset({
        title: blog.title,
        content: convertContent(blog.content)
      })
    }
  }, [blog, type, reset, open])

  const handleCancel = useCallback(() => setPreviewOpen(defaultPreview), []);

  const handlePreviewImages = useCallback(async (file: UploadFile, type_image: KeyImageBlog) => {
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

  const onSubmit = async (data: FormCreateBlog) => {
    console.log(data);
    const historyContentState = convertToRaw(data.content.getCurrentContent());
    const newData: ParamCreateBlog = {
      title: data.title,
      history: draftToHtml(historyContentState),
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

    if (type === 'Add') {
      onCreateBrand(
        newData,
        () => {
          onClose();
          reset(defaultValues);
          toast.success('Thêm mới thương hiệu thành công !');
        },
        ({ message }) => {
          console.log(message);
        },
      );
    } else {
      onUpdateBrand(
        brand?._id || '',
        newData,
        () => {
          onClose();
          reset(defaultValues);
          toast.success('Cập nhật thương hiệu thành công !');
        },
        ({ message }) => {
          console.log(message);
          toast.error(message);
        },
      );
    }
  };

  return (
    <Modal
      open={open}
      title="Thêm mới thương hiệu"
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
                  message: 'Vui lòng nhập mô tả sản phẩm !',
                },
                validate: (val) => {
                  const html = convertToRaw(val.getCurrentContent());
                  return html.blocks[0].text ? true : 'Vui lòng nhập lich sử thương hiệu !';
                },
              }}
              render={({ field }) => (
                <Editor
                  editorState={field.value}
                  wrapperClassName={cn(
                    `border rounded-md transition-all ${errors.history?.message ? 'border-error' : ''
                    }`,
                  )}
                  editorClassName="p-4"
                  editorStyle={{ maxHeight: '40vh' }}
                  toolbarClassName="bg-primary border-none"
                  onEditorStateChange={field.onChange}
                  placeholder="Nhập mô tả sản phẩm"
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
                <Typography.Text type="danger">{errors.logo?.message}</Typography.Text>
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
                <Typography.Text type="danger">{errors.image?.message}</Typography.Text>
              )}
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default memo(FormBrand);
