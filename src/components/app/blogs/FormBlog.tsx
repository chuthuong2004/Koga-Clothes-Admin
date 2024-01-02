import { useBlog } from '@/hooks/services';
import { ParamCreateBlog } from '@/services/types';
import { ResponseMessage } from '@/types/commons';
import { StoreBlog } from '@/types/entities';
import { EModeBlog } from '@/types/enums';
import { convertContent, draftContent, uploadSingleImage } from '@/utils';
import { Button, Modal, UploadFile } from 'antd';
import { EditorState } from 'draft-js';
import { memo, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import FormContentBlog from './FormContentBlog';
import FormImageBlog from './FormImageBlog';
import FormSelectBlog from './FormSelectBlog';
import FormTagsBlog from './FormTagsBlog';
import { BASE_URL } from '@/config';

export type FormCreateBlog = {
  title: string;
  summary: EditorState;
  content: EditorState;
  category: string;
  mode: EModeBlog;
  tags: string[]
  time_public: Date;
  image: UploadFile<File>[] | string;
};
const defaultValues: FormCreateBlog = {
  title: '',
  image: [],
  summary: EditorState.createEmpty(),
  content: EditorState.createEmpty(),
  category: '',
  mode: EModeBlog.Public,
  tags: [],
  time_public: new Date()
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

  useEffect(() => {
    if (type === 'Edit' && blog && open) {
      methods.reset({
        title: blog.title,
        summary: convertContent(blog.summary),
        content: convertContent(blog.content),
        category: blog.category._id,
        mode: blog.mode,
        tags: blog.tags,
        image:[{
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: BASE_URL + blog.image,
        }],
        time_public: new Date(blog.time_public)
      })
    }
  }, [blog, type, methods, open])



  const onSubmit = async (data: FormCreateBlog) => {
    console.log(data);
    const newData: ParamCreateBlog = {
      title: data.title,
      category: data.category,
      content: draftContent(data.content),
      mode: data.mode,
      summary: draftContent(data.summary),
      tags: data.tags,
      time_public: data.time_public,
      image: typeof data.image === 'string' ? data.image : ''
      
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
      title="Thêm mới bài viết"
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
