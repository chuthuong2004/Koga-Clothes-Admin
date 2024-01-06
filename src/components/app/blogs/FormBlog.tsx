import { BASE_URL } from '@/config';
import { useBlog } from '@/hooks/services';
import { ParamCreateBlog } from '@/services/types';
import { ResponseMessage } from '@/types/commons';
import { StoreBlog } from '@/types/entities';
import { EModeBlog } from '@/types/enums';
import { draftContent, uploadSingleImage } from '@/utils';
import { Button, Modal, UploadFile } from 'antd';
import dayjs from 'dayjs';
import { memo, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import FormContentBlog from './FormContentBlog';
import FormImageBlog from './FormImageBlog';
import FormSelectBlog from './FormSelectBlog';
import FormTagsBlog from './FormTagsBlog';

export type FormCreateBlog = {
  title: string;
  summary: string;
  content: string;
  category: string;
  mode: EModeBlog;
  tags: string[]
  time_public: dayjs.Dayjs;
  image: UploadFile<File>[];
};
const defaultValues: FormCreateBlog = {
  title: '',
  image: [],
  summary: '',
  content: '',
  category: '',
  mode: EModeBlog.Public,
  tags: [],
  time_public: dayjs()
};


type FormBlogProps = {
  onClose: () => void;
  open: boolean;
  type?: 'Edit' | 'Add';
  blog?: StoreBlog;
};
const FormBlog = ({ open, onClose, blog, type = 'Add' }: FormBlogProps) => {
  const { loading, onCreateBlog, onUpdateBlog } = useBlog();

  const methods = useForm<FormCreateBlog>({
    defaultValues,
  });
  console.log(blog);

  useEffect(() => {
    if (type === 'Edit' && blog && open) {
      methods.reset({
        title: blog.title,
        summary: blog.summary,
        content: blog.content,
        category: blog.category._id,
        mode: blog.mode,
        tags: blog.tags,
        image: [{
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: BASE_URL + blog.image,
        }],
        time_public: dayjs(blog.time_public || new Date())
      })
    }
  }, [blog, type, methods, open])



  const onSubmit = async (data: FormCreateBlog) => {
    console.log(data);
    const newData: ParamCreateBlog = {
      title: data.title,
      category: data.category,
      content: data.content,
      mode: data.mode,
      summary: data.summary,
      tags: data.tags,
      time_public: new Date(dayjs(data.time_public).format("YYYY-MM-DD HH:mm:ss")),
      image: blog && data.image.find(item => item.url?.includes(blog?.image)) ? blog.image : ''

    };
    console.log("New Data: ", newData);

    if (typeof data.image !== 'string') {
      const uploadedImage = await uploadSingleImage(data.image[0].originFileObj, 'blogs');
      if (uploadedImage) {
        newData.image = uploadedImage;
      }
    }
    const onSuccess = () => {
      onClose();
      methods.reset(defaultValues);
      toast.success(`${type === 'Add' ? 'Thêm mới' : 'Cập nhật'} bài viết thành công !`);
    }
    const onError = ({ message }: ResponseMessage) => {
      console.log(message);

    }

    if (type === 'Add') {
      onCreateBlog(
        newData,
        onSuccess,
        onError
      );
    } else {
      onUpdateBlog(
        blog?._id || '',
        newData,
        onSuccess,
        onError
      );
    }
  };


  return (
    <Modal
      open={open}
      title={`${blog ? 'Cập nhật' : 'Thêm mới'} bài viết`}
      onOk={methods.handleSubmit(onSubmit)}
      centered
      width={'50vw'}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={methods.handleSubmit(onSubmit)}>
          Submit
        </Button>,
      ]}
    >
      <FormProvider
        {...methods} >
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <FormContentBlog />
            <FormSelectBlog />
            <FormTagsBlog />

            <FormImageBlog type={type} />

          </div>
        </form>
      </FormProvider>

    </Modal>
  );
};

export default memo(FormBlog);
