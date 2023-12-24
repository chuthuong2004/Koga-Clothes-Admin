import { SendOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { IoImageOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';
import { useMessage } from '@/hooks/services';
import { memo } from 'react';
import { useMessageTyping } from '@/hooks/events';
import { useAppSelector } from '@/types/commons';
import { selectChat } from '@/store/selectors';

type FormCreateMessage = {
  text: string;
};
const defaultValues: FormCreateMessage = {
  text: '',
};

const ChatBottom = () => {
  const { selectedConversation } = useAppSelector(selectChat);
  const { onSendMessage } = useMessage();
  const { handleTypingOff, handleTypingOn } = useMessageTyping(selectedConversation?._id || '');

  const { control, handleSubmit, setValue, setFocus } = useForm<FormCreateMessage>({
    defaultValues,
  });

  const onSubmit = (data: FormCreateMessage) => {
    onSendMessage({ text: data.text });
    handleTypingOff();
    setValue('text', '');
    setFocus('text', { shouldSelect: true });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-background">
      <div className="bg-card rounded-xl p-8 flex gap-4">
        <Controller
          control={control}
          name="text"
          rules={{
            required: true
          }}
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
          <div>
            <IoImageOutline size={25} />
          </div>
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
