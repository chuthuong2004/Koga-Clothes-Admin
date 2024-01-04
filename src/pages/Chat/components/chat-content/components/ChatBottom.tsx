import { useMessageTyping } from '@/hooks/events';
import { useMessage } from '@/hooks/services';
import { ParamCreateMessage } from '@/services/types';
import { selectChat } from '@/store/selectors';
import { useAppSelector } from '@/types/commons';
import { cn, uploadMultipleImage } from '@/utils';
import { CloseCircleFilled, CloseCircleOutlined, SendOutlined } from '@ant-design/icons';
import { Button, Image, Input } from 'antd';
import { motion } from 'framer-motion';
import { memo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IoImageOutline } from 'react-icons/io5';

type FormCreateMessage = {
  text: string;
  images: File[]
};
const defaultValues: FormCreateMessage = {
  text: '',
  images: []
};

const ChatBottom = () => {
  const { selectedConversation } = useAppSelector(selectChat);
  const { onSendMessage } = useMessage();
  const { handleTypingOff, handleTypingOn } = useMessageTyping(selectedConversation?._id || '');

  const { control, handleSubmit, setFocus, reset, setValue } = useForm<FormCreateMessage>({
    defaultValues,
  });

  const onSubmit = async (data: FormCreateMessage) => {
    if (!data.text && Object.values(data.images).length === 0) return
    const newData: ParamCreateMessage = {
      text: data.text,
    }
    if (Object.values(data.images).length > 0) {
      const uploaded = await uploadMultipleImage(data.images, 'messages')
      console.log(uploaded);
      if (uploaded) {
        newData.images = uploaded
      }
    }
    console.log(newData);

    onSendMessage(newData);
    handleTypingOff();
    reset(defaultValues)
    setFocus('text', { shouldSelect: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-background flex flex-col">
      <Controller
        control={control}
        name='images'
        render={({ field: { value, onChange } }) => {
          return Object.values(value).length > 0 ? (
            <div className='overflow-hidden w-full flex-1'>
              <div className={cn('flex gap-4 bg-primary p-4 flex-wrap')}>
                {Object.values(value).map((image, index) => (
                  <div className='w-[5rem] flex relative' key={index}>
                    <Image src={URL.createObjectURL(image)} className='rounded-md' />
                    <CloseCircleFilled onClick={() => setValue("images", Object.values(value).filter(item => item.name !== image.name))} rev size={20} color='white' className='absolute -right-2 -top-2 cursor-pointer' />
                  </div>
                ))}
              </div>
            </div>
          ) : <></>
        }
        }
      />

      <div className="bg-card rounded-xl p-8 flex gap-4">
        <Controller
          control={control}
          name="text"
          render={({ field }) => (
            <Input
              size="large"
              placeholder="Type your message..."
              className="border-none focus:border-card focus:outline-none focus:shadow-none"
              {...field}
              onBlur={handleTypingOff}
              onChange={(e) => {
                field.onChange(e);
                if (e.target.value.length > 0) {
                  handleTypingOn();
                } else {
                  handleTypingOff();
                }
              }}
            />
          )}
        />
        <div className="flex gap-4 items-center">
          <Controller
            control={control}
            name='images'
            render={({ field: { value, onChange } }) => (
              <div >
                <input type='file' id="image-message" onChange={(e) => onChange(e.target.files)} multiple accept='image/*' className='d-none' />
                <label htmlFor='image-message' >
                  <IoImageOutline size={25} className='cursor-pointer' />
                </label>
              </div>

            )}
          />

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
          >
            <Button
              onSubmit={handleSubmit(onSubmit)}
              onClick={handleSubmit(onSubmit)}
              size="large"
              type="primary"
              className="flex items-center justify-center"
            >
              <SendOutlined rev size={40} />
            </Button>
          </motion.div>
        </div>
      </div>
    </form>
  );
};

export default memo(ChatBottom);
